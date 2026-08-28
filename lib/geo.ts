export interface LatLng {
  lat: number;
  lng: number;
}

const EARTH_RADIUS_KM = 6371;

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/** Great-circle distance between two points, in kilometers. */
export function haversineDistanceKm(a: LatLng, b: LatLng): number {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));

  return Math.round(EARTH_RADIUS_KM * c);
}

export interface RouteLeg {
  from: string;
  to: string;
  distanceKm: number;
}

/** Distance for each consecutive pair of stops, plus the running total. */
export function computeRouteLegs(stops: LatLng[] & { name?: string }[]): {
  legs: RouteLeg[];
  totalKm: number;
} {
  const legs: RouteLeg[] = [];
  let totalKm = 0;

  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i] as any;
    const b = stops[i + 1] as any;
    const distanceKm = haversineDistanceKm(a, b);
    legs.push({ from: a.name, to: b.name, distanceKm });
    totalKm += distanceKm;
  }

  return { legs, totalKm: Math.round(totalKm) };
}