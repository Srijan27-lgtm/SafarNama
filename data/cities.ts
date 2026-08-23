export interface City {
  name: string;
  state: string;
  code: string; // used later in ItineraryCard's "Trip Ticket · CODE"
}

export const cities: City[] = [
  { name: "Jaipur", state: "Rajasthan", code: "JAI" },
  { name: "Puri", state: "Odisha", code: "PUR" },
  { name: "Goa", state: "Goa", code: "GOI" },
  { name: "Varanasi", state: "Uttar Pradesh", code: "VNS" },
  { name: "Leh", state: "Ladakh", code: "LEH" },
  { name: "Munnar", state: "Kerala", code: "MUN" },
  { name: "Udaipur", state: "Rajasthan", code: "UDR" },
  { name: "Rishikesh", state: "Uttarakhand", code: "RIS" },
  { name: "Jamshedpur", state: "Jharkhand", code: "JSR"},
  // Add every other city/circuit here later — the form and dropdown
  // need no changes, they just read from this array.
];