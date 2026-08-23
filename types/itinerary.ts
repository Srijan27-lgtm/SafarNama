export interface ItineraryDay {
  day: number;
  title: string;
  detail: string;
}

export interface ItineraryData {
  destination: string;
  code: string;          // short airport/city code shown in the ticket header, e.g. "JAI", "GOI", "DEL"
  targetBudget: number;
  estCost: number;
  daysCount: number;
  nightsCount: number;
  days: ItineraryDay[];
}