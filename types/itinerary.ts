export interface TravelOption {
  mode: string;
  from: string;
  duration: string;
  estCost: number;
  notes?: string;
}

export interface LegTravelOptions {
  from: string;
  to: string;
  distanceKm?: number;
  options: TravelOption[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  detail: string;
}

export interface RouteLeg {
  from: string;
  to: string;
  distanceKm: number;
}

export interface ItineraryData {
  destination: string;
  code: string;
  targetBudget: number;
  estCost: number;
  daysCount: number;
  nightsCount: number;
  /** Travel options grouped by each leg of the route, in order. */
  legTravelOptions: LegTravelOptions[];
  localTransportEstCost?: number;
  days: ItineraryDay[];
  stops?: string[];
  routeLegs?: RouteLeg[];
  totalDistanceKm?: number;
}