import { NextResponse } from "next/server";
import { cities } from "@/data/cities";
import type { ItineraryData, ItineraryDay, TravelOption } from "@/types/itinerary";

interface PlanRequestBody {
  origin: string;
  destination: string;
  duration: string;
  style: string;
  budget: number;
}

function parseDurationToDays(duration: string): number {
  const match = duration.match(/\d+/);
  return match ? parseInt(match[0], 10) : 3;
}

function buildPrompt(
  origin: string,
  destination: string,
  state: string,
  daysCount: number,
  style: string,
  budget: number
) {
  return `You are a travel planner for trips within India. Create a ${daysCount}-day itinerary for a trip FROM ${origin} TO ${destination}, ${state}, for a traveler with style "${style}" and a total budget of ₹${budget}.

Respond with ONLY valid JSON, no markdown fences, no preamble, in exactly this shape:
{
  "estCost": <number, realistic total cost in INR for this trip including travel, should be at or under ${budget}>,
  "travelOptions": [
    { "mode": "<Flight|Train|Bus|Self-drive>", "from": "${origin}", "duration": "<e.g. 1h 15m or 14h>", "estCost": <number, realistic one-way cost per person in INR>, "notes": "<short practical tip, optional>" }
  ],
  "localTransportEstCost": <number, realistic estimated cost in INR for local transport (auto/cab/bus) for the full trip duration>,
  "days": [
    { "day": 1, "title": "<short 3-6 word title>", "detail": "<one sentence, real named landmarks/activities specific to ${destination}>" }
  ]
}

Requirements:
- Exactly ${daysCount} day entries, numbered 1 to ${daysCount}.
- Use REAL, specific landmarks, neighborhoods, food, or experiences unique to ${destination} — not generic descriptions.
- Match the pacing and cost level to the "${style}" travel style.

For travelOptions:
- The traveler is starting from ${origin} specifically — every option's "from" field must be "${origin}", not any other city. Do not substitute a different origin city.
- Provide EXACTLY 2-3 options, covering DIFFERENT modes realistically available directly between ${origin} and ${destination} (e.g. one flight option AND one train option, not two of the same mode).
- ALWAYS prefer the most DIRECT route from ${origin} to ${destination} itself as the primary option for each mode — a direct flight or train straight into ${destination} (or its actual nearest airport/station) beats a route that requires transferring through another city with a long separate cab/transfer onward. Only include a connecting/multi-leg route as a fallback, and only if a direct route genuinely doesn't exist between ${origin} and ${destination} — never present a disjointed multi-leg option as the first or default choice when a direct one is available.
- If there is no practical direct mode between ${origin} and ${destination} for a given mode (e.g. no direct flight route exists), it's fine to describe the realistic connecting route actually used by travelers (e.g. "Flight" from "${origin}" with a layover) — but be explicit and honest about it in "notes" rather than silently inventing a clean direct option that doesn't exist.
- Do NOT name a specific train, flight number, airline, or seating/class tier (e.g. do not say "AC First Class", "business class", "sleeper class"). Describe the mode and route generally — give a realistic AVERAGE fare across typical classes/fare tiers for that mode, appropriate to the "${style}" travel style, reflected as a single representative number, plus typical journey duration for that mode/route.
- Do not invent extra private transfer legs as part of getting TO the destination — that belongs in local transport, not travelOptions, unless it's genuinely the only way to cover the last stretch.
- If a mode is impractical for this route, omit it rather than inventing one.

- estCost is the TOTAL trip cost including a round-trip travel estimate and local transport — must be a realistic whole number in INR, at or below ${budget}.
- Output raw JSON only.`;
}

async function callGemini(
  prompt: string
): Promise<{ estCost: number; travelOptions: TravelOption[]; localTransportEstCost: number; days: ItineraryDay[] }> {
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
            maxOutputTokens: 2048,
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
    const { origin, destination, duration, style, budget } = body;

    if (!origin || !destination || !duration || !style || !budget) {
      return NextResponse.json(
        { error: "Missing required fields: origin, destination, duration, style, budget" },
        { status: 400 }
      );
    }

    const city = cities.find((c) => c.name === destination);
    const code = city?.code ?? destination.slice(0, 3).toUpperCase();
    const state = city?.state ?? "";
    const daysCount = parseDurationToDays(duration);
    const nightsCount = Math.max(daysCount - 1, 1);

    const prompt = buildPrompt(origin, destination, state, daysCount, style, budget);
    const { estCost, travelOptions, localTransportEstCost, days } = await callGemini(prompt);

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

    const safeTravelOptions: TravelOption[] = Array.isArray(travelOptions)
      ? travelOptions
          .filter((t: any) => t && typeof t.mode === "string" && typeof t.estCost === "number")
          .slice(0, 3)
          .map((t: any) => ({
            mode: t.mode,
            from: t.from ?? origin,
            duration: t.duration ?? "",
            estCost: Math.max(0, Math.round(t.estCost)),
            notes: typeof t.notes === "string" ? t.notes : undefined,
          }))
      : [];

    const safeLocalTransportEstCost =
      typeof localTransportEstCost === "number" && localTransportEstCost >= 0
        ? Math.round(localTransportEstCost)
        : undefined;

    const safeEstCost = typeof estCost === "number" && estCost > 0
      ? Math.min(estCost, budget)
      : Math.round(budget * 0.9);

    const result: ItineraryData = {
      destination: city ? `${city.name}, ${city.state}` : destination,
      code,
      targetBudget: budget,
      estCost: safeEstCost,
      daysCount: safeDays.length,
      nightsCount,
      travelOptions: safeTravelOptions,
      localTransportEstCost: safeLocalTransportEstCost,
      days: safeDays,
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