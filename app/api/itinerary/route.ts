import { NextResponse } from "next/server";
import { cities } from "@/data/cities";
import { majorCities } from "@/data/majorCities";
import { computeRouteLegs } from "@/lib/geo";
import type { ItineraryData, ItineraryDay, LegTravelOptions, TravelOption } from "@/types/itinerary";

interface PlanRequestBody {
  stops: string[];
  duration: string;
  style: string;
  budget: number;
}

function parseDurationToDays(duration: string): number {
  const match = duration.match(/\d+/);
  return match ? parseInt(match[0], 10) : 3;
}

function buildPrompt(stops: string[], daysCount: number, style: string, budget: number, totalKm: number) {
  const origin = stops[0];
  const destination = stops[stops.length - 1];
  const waypoints = stops.slice(1, -1);
  const routeDescription =
    waypoints.length > 0
      ? `${origin} → ${waypoints.join(" → ")} → ${destination}`
      : `${origin} → ${destination}`;

  const legPairs = stops.slice(0, -1).map((s, i) => `${s} → ${stops[i + 1]}`);

  return `You are a travel planner for trips within India. Create a ${daysCount}-day itinerary covering this route: ${routeDescription} (approx. ${totalKm} km total driving/flying distance), for a traveler with style "${style}" and a total budget of ₹${budget}. The trip starts at ${origin} and ends at ${destination}${waypoints.length > 0 ? `, passing through ${waypoints.join(", ")} along the way` : ""}.

Respond with ONLY valid JSON, no markdown fences, no preamble, in exactly this shape:
{
  "estCost": <number, realistic total cost in INR for this trip including travel across every leg, should be at or under ${budget}>,
  "legTravelOptions": [
    {
      "from": "<leg origin city>",
      "to": "<leg destination city>",
      "options": [
        { "mode": "<Flight|Train|Bus|Self-drive>", "duration": "<e.g. 1h 15m or 8h>", "estCost": <number, realistic one-way cost per person in INR for THIS leg only>, "notes": "<short practical tip, optional>" }
      ]
    }
  ],
  "localTransportEstCost": <number, realistic estimated cost in INR for local transport (auto/cab/bus) across the WHOLE route for the full trip duration>,
  "days": [
    { "day": 1, "title": "<short 3-6 word title>", "detail": "<one sentence, real named landmarks/activities, tied to whichever stop the traveler is at on this day>" }
  ]
}

Requirements:
- Exactly ${daysCount} day entries, numbered 1 to ${daysCount}.
- Distribute the ${daysCount} days sensibly across the full route ${routeDescription} — spend more days at stops that warrant it, and note which stop each day's activities belong to inside the "detail" text.
- Use REAL, specific landmarks, neighborhoods, food, or experiences unique to each stop — not generic descriptions.
- Match the pacing and cost level to the "${style}" travel style.

For legTravelOptions:
- Produce EXACTLY one entry per consecutive leg of the route, in order: ${legPairs.join(", ")}. Do not skip a leg, merge legs together, or add extra legs.
- Each leg's "from" and "to" must be the exact two consecutive city names for that leg — never the overall trip origin/destination if this is an intermediate leg.
- For each leg, provide 1-2 realistic options covering DIFFERENT modes where available for that specific leg (e.g. Train and Bus between two nearby cities; Flight and Train for a longer leg). Do not repeat the same mode twice for one leg.
- ALWAYS prefer the most DIRECT route between that leg's two cities. Only include a connecting/multi-leg option as a fallback within a leg, and only if a direct route genuinely doesn't exist for that leg.
- Do NOT name a specific train, flight number, airline, or seating/class tier (e.g. do not say "AC First Class", "business class"). Give a realistic AVERAGE fare across typical classes/fare tiers for that mode, appropriate to the "${style}" travel style, as a single representative number, plus typical journey duration for that specific leg.
- If a mode is impractical for a given leg, omit it for that leg rather than inventing one.

- estCost is the TOTAL trip cost including travel across every leg of the route and local transport — must be a realistic whole number in INR, at or below ${budget}.
- Output raw JSON only.`;
}

async function callGemini(
  prompt: string
): Promise<{
  estCost: number;
  legTravelOptions: LegTravelOptions[];
  localTransportEstCost: number;
  days: ItineraryDay[];
}> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }

  const attempt = async () => {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.8,
            responseMimeType: "application/json",
            maxOutputTokens: 2560,
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API error ${response.status}: ${errText}`);
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error("No text content in Gemini API response");
    }

    const cleaned = text.replace(/```json|```/g, "").trim();

    try {
      return JSON.parse(cleaned);
    } catch (e) {
      throw new Error(`Failed to parse model JSON: ${(e as Error).message} | raw: ${cleaned.slice(0, 300)}`);
    }
  };

  try {
    return await attempt();
  } catch (firstErr) {
    console.warn("First Gemini attempt failed, retrying once:", firstErr);
    return await attempt();
  }
}

export async function POST(req: Request) {
  try {
    const body: PlanRequestBody = await req.json();
    const { stops, duration, style, budget } = body;

    if (!stops || !Array.isArray(stops) || stops.length < 2 || !duration || !style || !budget) {
      return NextResponse.json(
        { error: "Missing required fields: stops (min 2), duration, style, budget" },
        { status: 400 }
      );
    }

    const destination = stops[stops.length - 1];
    const destCity = cities.find((c) => c.name === destination);
    const code = destCity?.code ?? destination.slice(0, 3).toUpperCase();
    const daysCount = parseDurationToDays(duration);
    const nightsCount = Math.max(daysCount - 1, 1);

    // Compute real great-circle distance across every leg of the route.
    const stopCoords = stops
      .map((name) => majorCities.find((c) => c.name === name))
      .filter((c): c is (typeof majorCities)[number] => !!c);
    const { legs, totalKm } = computeRouteLegs(stopCoords as any);
    const distanceByLeg = new Map(legs.map((l) => [`${l.from}|${l.to}`, l.distanceKm]));

    const prompt = buildPrompt(stops, daysCount, style, budget, totalKm);
    const { estCost, legTravelOptions, localTransportEstCost, days } = await callGemini(prompt);

    const safeDays: ItineraryDay[] = Array.isArray(days) && days.length > 0
      ? days.slice(0, daysCount).map((d: any, i: number) => ({
          day: typeof d.day === "number" ? d.day : i + 1,
          title: d.title ?? `Day ${i + 1}`,
          detail: d.detail ?? "",
        }))
      : [];

    if (safeDays.length === 0) {
      throw new Error("Model returned no valid day entries");
    }

    // Build the expected leg order from the actual stops array, then match
    // the model's response onto it — falling back to an empty options list
    // for any leg the model missed, rather than dropping the leg entirely.
    const expectedLegPairs = stops.slice(0, -1).map((s, i) => [s, stops[i + 1]] as const);

    const modelLegsByPair = new Map<string, any>();
    if (Array.isArray(legTravelOptions)) {
      for (const leg of legTravelOptions) {
        if (leg && typeof leg.from === "string" && typeof leg.to === "string") {
          modelLegsByPair.set(`${leg.from}|${leg.to}`, leg);
        }
      }
    }

    const safeLegTravelOptions: LegTravelOptions[] = expectedLegPairs.map(([from, to]) => {
      const matched = modelLegsByPair.get(`${from}|${to}`);
      const rawOptions = matched?.options;

      const options: TravelOption[] = Array.isArray(rawOptions)
        ? rawOptions
            .filter((t: any) => t && typeof t.mode === "string" && typeof t.estCost === "number")
            .slice(0, 3)
            .map((t: any) => ({
              mode: t.mode,
              from,
              duration: t.duration ?? "",
              estCost: Math.max(0, Math.round(t.estCost)),
              notes: typeof t.notes === "string" ? t.notes : undefined,
            }))
        : [];

      return {
        from,
        to,
        distanceKm: distanceByLeg.get(`${from}|${to}`),
        options,
      };
    });

    const safeLocalTransportEstCost =
      typeof localTransportEstCost === "number" && localTransportEstCost >= 0
        ? Math.round(localTransportEstCost)
        : undefined;

    const safeEstCost = typeof estCost === "number" && estCost > 0
      ? Math.min(estCost, budget)
      : Math.round(budget * 0.9);

    const result: ItineraryData = {
      destination: destCity ? `${destCity.name}, ${destCity.state}` : destination,
      code,
      targetBudget: budget,
      estCost: safeEstCost,
      daysCount: safeDays.length,
      nightsCount,
      legTravelOptions: safeLegTravelOptions,
      localTransportEstCost: safeLocalTransportEstCost,
      days: safeDays,
      stops,
      routeLegs: legs,
      totalDistanceKm: totalKm,
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error("Error in /api/itinerary:", err);
    return NextResponse.json(
      {
        error: "Failed to generate itinerary",
        detail: process.env.NODE_ENV !== "production" ? (err as Error).message : undefined,
      },
      { status: 500 }
    );
  }
}