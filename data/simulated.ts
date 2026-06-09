import { Lot, LotHistoricalData, Report, Alert } from '@/types';
import { getStatus } from '@/lib/status';
import { LOT_METADATA } from '@/lib/lots';

// Simulated live lot data — mirrors the real NJIT API structure
// Based on actual cached API responses (parking_data.json)
const rawLots = [
  {
    siteName: 'PARK',
    name: 'Parking Deck',
    address: '154 Summit Street, Newark, NJ 07103',
    addressURL: 'http://maps.google.com/?q=154+Summit+Street,+Newark,+NJ+07103',
    available: 1491,
    occupied: 194,
    total: 1685,
    type: 'general' as const,
  },
  {
    siteName: 'Science & Tech Garage',
    name: 'Science & Technology Garage',
    address: '42 Wilsey Street, Newark, NJ 07103',
    addressURL: 'http://maps.google.com/?q=42+Wilsey+Street,+Newark,+NJ+07103',
    available: 735,
    occupied: 187,
    total: 922,
    type: 'general' as const,
  },
  {
    siteName: 'Lot 16',
    name: 'Parking Lot #16',
    address: '269 New Street, Newark, NJ 07103',
    addressURL: 'http://maps.google.com/?q=269+New+Street,+Newark,+NJ+07103',
    available: 167,
    occupied: 15,
    total: 182,
    type: 'general' as const,
  },
  {
    siteName: 'ECC',
    name: 'ECC Deck',
    address: '193 Academy St, Newark, NJ 07013',
    addressURL: 'http://maps.google.com/?q=193+Academy+St,+Newark,+NJ+07013',
    // Sensor bug: negative occupancy — treated as unknown
    available: null,
    occupied: -60,
    total: 100,
    type: 'general' as const,
  },
  {
    siteName: 'Lot 10',
    name: 'Parking Lot #10',
    address: '46 Wilsey Street, Newark, NJ 07103',
    addressURL: 'http://maps.google.com/?q=46+Wilsey+Street,+Newark,+NJ+07103',
    // API returns "Not Avaiable" (their typo) — treated as unknown
    available: null,
    occupied: 169,
    total: 37,
    type: 'general' as const,
  },
  {
    siteName: 'FENS1',
    name: 'Fenster Level 1',
    address: '142 New Street, Newark, NJ 07103',
    addressURL: 'http://maps.google.com/?q=142+New+Street,+Newark,+NJ+07103',
    available: 26,
    occupied: 16,
    total: 42,
    type: 'reserved' as const,
  },
  {
    siteName: 'FENS2',
    name: 'Fenster Level 2',
    address: '144 New Street, Newark, NJ 07103',
    addressURL: 'http://maps.google.com/?q=144+New+Street,+Newark,+NJ+07103',
    // Sensor bug: available > total
    available: null,
    occupied: -2,
    total: 42,
    type: 'facstaff' as const,
  },
];

export const SIMULATED_LOTS: Lot[] = rawLots.map((raw, i) => {
  const meta = LOT_METADATA[raw.siteName];
  return {
    id: String(i),
    slug: meta?.slug ?? raw.siteName.toLowerCase().replace(/\s+/g, '-'),
    name: raw.name,
    siteName: raw.siteName,
    address: raw.address,
    addressURL: raw.addressURL,
    available: raw.available,
    occupied: raw.occupied,
    total: raw.total,
    status: getStatus(raw.available, raw.total),
    type: raw.type,
    lat: meta?.lat ?? 40.742,
    lng: meta?.lng ?? -74.178,
    permits: meta?.permits ?? [],
    enforcementHours: meta?.enforcementHours ?? 'Mon–Fri 7:00am – 10:00pm',
    freeAfter: meta?.freeAfter ?? '',
    walkingDistances: meta?.walkingDistances ?? {},
  };
});

// Historical occupancy data — from real deck_PARK.json and deck_stpg.json
// Values represent avg occupied count at each 10-min interval, 7:30am–10:50pm
const TIME_KEYS = [
  '7:30 am','7:40 am','7:50 am','8 am','8:10 am','8:20 am','8:30 am','8:40 am','8:50 am',
  '9 am','9:10 am','9:20 am','9:30 am','9:40 am','9:50 am','10 am','10:10 am','10:20 am',
  '10:30 am','10:40 am','10:50 am','11 am','11:10 am','11:20 am','11:30 am','11:40 am',
  '11:50 am','12 pm','12:10 pm','12:20 pm','12:30 pm','12:40 pm','12:50 pm','1 pm',
  '1:10 pm','1:20 pm','1:30 pm','1:40 pm','1:50 pm','2 pm','2:10 pm','2:20 pm','2:30 pm',
  '2:40 pm','2:50 pm','3 pm','3:10 pm','3:20 pm','3:30 pm','3:40 pm','3:50 pm','4 pm',
  '4:10 pm','4:20 pm','4:30 pm','4:40 pm','4:50 pm','5 pm','5:10 pm','5:20 pm','5:30 pm',
  '5:40 pm','5:50 pm','6 pm','6:10 pm','6:20 pm','6:30 pm','6:40 pm','6:50 pm','7 pm',
  '7:10 pm','7:20 pm','7:30 pm','7:40 pm','7:50 pm','8 pm','8:10 pm','8:20 pm','8:30 pm',
  '8:40 pm','8:50 pm','9 pm','9:10 pm','9:20 pm','9:30 pm','9:40 pm','9:50 pm','10 pm',
  '10:10 pm','10:20 pm','10:30 pm','10:40 pm','10:50 pm',
];

const PARK_OCCUPIED = [
  366,368,373,381,405,432,464,496,531,566,611,651,668,678,688,
  691,691,695,697,701,700,698,695,693,693,686,679,665,650,637,
  617,597,583,562,543,523,509,497,486,474,457,441,426,418,409,
  401,394,391,387,381,378,378,377,377,377,376,376,378,382,383,
  386,385,387,390,390,392,394,395,396,400,400,399,398,397,394,
  392,392,389,391,392,391,392,392,393,395,393,396,395,394,395,
  397,398,399,
];

const STPG_OCCUPIED = [
  255,256,257,259,259,260,261,277,301,320,322,324,325,326,327,
  327,328,329,327,327,326,328,328,326,325,323,322,320,316,315,
  314,312,312,310,307,304,302,301,299,296,294,292,290,290,288,
  286,285,285,283,283,285,284,282,281,281,282,283,284,283,284,
  284,284,284,285,286,287,289,290,288,290,290,291,294,294,296,
  293,293,295,296,298,301,303,303,307,308,310,312,313,315,318,
  318,319,321,
];

const LOT16_OCCUPIED = [
  10,11,12,14,17,22,30,42,58,75,90,100,107,112,118,
  121,124,127,130,132,134,135,136,137,138,138,139,138,137,136,
  135,134,133,132,130,128,126,124,123,121,119,116,113,110,108,
  105,102,100,98,96,94,93,92,91,90,89,88,87,86,85,
  84,83,82,81,80,79,78,77,77,77,76,76,75,75,75,
  74,74,74,73,73,73,72,72,72,71,71,71,70,70,70,
  69,69,69,
];

export const SIMULATED_HISTORY: LotHistoricalData[] = [
  {
    lotId: 'parking-deck',
    data: TIME_KEYS.map((time, i) => ({ time, occupied: PARK_OCCUPIED[i] ?? 0 })),
  },
  {
    lotId: 'science-tech-garage',
    data: TIME_KEYS.map((time, i) => ({ time, occupied: STPG_OCCUPIED[i] ?? 0 })),
  },
  {
    lotId: 'lot-16',
    data: TIME_KEYS.map((time, i) => ({ time, occupied: LOT16_OCCUPIED[i] ?? 0 })),
  },
];

export const SIMULATED_REPORTS: Report[] = [
  {
    id: 'r1',
    lotId: 'parking-deck',
    lotName: 'Parking Deck',
    type: 'open',
    note: 'Spots open on level 3',
    createdAt: Date.now() - 8 * 60 * 1000,
    expiresAt: Date.now() + 22 * 60 * 1000,
  },
  {
    id: 'r2',
    lotId: 'lot-16',
    lotName: 'Parking Lot #16',
    type: 'open',
    createdAt: Date.now() - 14 * 60 * 1000,
    expiresAt: Date.now() + 16 * 60 * 1000,
  },
];

export const SIMULATED_ALERTS: Alert[] = [
  {
    id: 'a1',
    severity: 'warning',
    title: 'ECC Deck — Sensor Error',
    subtitle: 'Sensor malfunction detected. Availability data may be inaccurate.',
    lotId: 'ecc-deck',
  },
  {
    id: 'a2',
    severity: 'warning',
    title: 'Lot 10 — Data Unavailable',
    subtitle: 'Live availability data is not reporting for this lot.',
    lotId: 'lot-10',
  },
];
