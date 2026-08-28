export interface ItineraryDay {
  day: number;
  title: string;
  detail: string;
}

export interface TravelOption {
  mode: string;          // "Flight", "Train", "Bus", "Self-drive"
  from: string;           // nearest major hub, e.g. "Delhi"
  duration: string;       // "1h 15m", "16h"
  estCost: number;        // one-way, per person, in ₹
  notes?: string;         // e.g. "Book 3-4 weeks ahead in peak season"
}

export interface ItineraryData {
  destination: string;
  code: string;          // short airport/city code shown in the ticket header, e.g. "JAI", "GOI", "DEL"
  targetBudget: number;
  estCost: number;
  daysCount: number;
  nightsCount: number;
  travelOptions: TravelOption[];   // how to reach the destination
  localTransportEstCost?: number;  // rough daily local transport (auto/cab/bus) budget
  days: ItineraryDay[];
}