export type LotStatus = 'open' | 'filling' | 'busy' | 'full' | 'unknown';

export type PermitType = 'regular' | 'facstaff';

export interface Lot {
  slug: string;
  name: string;
  address: string;
  addressURL: string;
  available: number | null;
  occupied: number | null;
  total: number;
  status: LotStatus;
  type: PermitType;
  lat: number;
  lng: number;
}

export interface HistoricalDataPoint {
  time: string;
  occupied: number;
}

export interface LotHistoricalData {
  lotId: string;
  data: HistoricalDataPoint[];
}
