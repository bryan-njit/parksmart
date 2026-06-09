export type LotStatus = 'open' | 'filling' | 'busy' | 'full' | 'unknown';

export type PermitType = 'general' | 'reserved' | 'facstaff';

export interface Lot {
  id: string;
  slug: string;
  name: string;
  siteName: string;
  address: string;
  addressURL: string;
  available: number | null;
  occupied: number | null;
  total: number;
  status: LotStatus;
  type: PermitType;
  lat: number;
  lng: number;
  permits: string[];
  enforcementHours: string;
  freeAfter: string;
  walkingDistances: Record<string, string>;
}

export interface HistoricalDataPoint {
  time: string;
  occupied: number;
}

export interface LotHistoricalData {
  lotId: string;
  data: HistoricalDataPoint[];
}

export interface Report {
  id: string;
  lotId: string;
  lotName: string;
  type: 'full' | 'open' | 'event' | 'other';
  note?: string;
  createdAt: number;
  expiresAt: number;
}

export interface Alert {
  id: string;
  severity: 'danger' | 'warning' | 'info';
  title: string;
  subtitle: string;
  lotId?: string;
  startsAt?: string;
  endsAt?: string;
}

export type UserPermit =
  | 'Commuter (Red)'
  | 'Blue'
  | 'Green'
  | 'Faculty/Staff'
  | 'Visitor'
  | 'No Permit';
