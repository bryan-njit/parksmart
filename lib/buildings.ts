export interface Point {
  lat: number;
  lng: number;
}

export interface Building extends Point {
  id: string;
  name: string;
}

// positions from OpenStreetMap
export const BUILDINGS: Building[] = [
  { id: 'gitc', name: 'GITC', lat: 40.7443, lng: -74.1794 },
  { id: 'campus-center', name: 'Campus Center', lat: 40.7431, lng: -74.1782 },
  { id: 'library', name: 'Library', lat: 40.7438, lng: -74.178 },
  { id: 'ckb', name: 'CKB', lat: 40.742, lng: -74.1774 },
  { id: 'kupfrian', name: 'Kupfrian', lat: 40.7424, lng: -74.1784 },
  { id: 'fenster', name: 'Fenster', lat: 40.7425, lng: -74.1772 },
  { id: 'cullimore', name: 'Cullimore', lat: 40.7429, lng: -74.1773 },
  { id: 'tiernan', name: 'Tiernan', lat: 40.742, lng: -74.1795 },
  { id: 'colton', name: 'Colton', lat: 40.7415, lng: -74.1779 },
  { id: 'weston', name: 'Weston', lat: 40.7412, lng: -74.1774 },
  { id: 'wec', name: 'WEC', lat: 40.7423, lng: -74.1804 },
];

export const CAMPUS_CENTER: Point = { lat: 40.7425, lng: -74.1785 };

// straight-line distance in meters. a degree of latitude is about 111 km,
// and a degree of longitude shrinks the further you are from the equator
export function distanceMeters(a: Point, b: Point): number {
  const dLat = (b.lat - a.lat) * 111000;
  const dLng = (b.lng - a.lng) * 111000 * Math.cos((a.lat * Math.PI) / 180);
  return Math.sqrt(dLat * dLat + dLng * dLng);
}

// people walk about 80 meters a minute, and streets add roughly 25%
// compared to a straight line
export function walkMinutes(a: Point, b: Point): number {
  return Math.max(1, Math.round((distanceMeters(a, b) * 1.25) / 80));
}
