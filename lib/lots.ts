interface LotMeta {
  slug: string;
  lat: number;
  lng: number;
  permits: string[];
  enforcementHours: string;
  freeAfter: string;
  walkingDistances: Record<string, string>;
}

// lat/lng looked up on OpenStreetMap from each lot's street address (ECC is approximate)
export const LOT_METADATA: Record<string, LotMeta> = {
  PARK: {
    slug: 'parking-deck',
    lat: 40.7402,
    lng: -74.1784,
    permits: ['Commuter (Red)', 'Blue', 'Green'],
    enforcementHours: 'Mon–Fri 7:00am – 10:00pm',
    freeAfter: 'Free after 4:00pm Fridays, all day weekends',
    walkingDistances: { GITC: '4 min', Tiernan: '5 min', CKB: '3 min' },
  },
  'Science & Tech Garage': {
    slug: 'science-tech-garage',
    lat: 40.7433,
    lng: -74.1823,
    permits: ['Commuter (Red)', 'Blue'],
    enforcementHours: 'Mon–Fri 7:00am – 10:00pm',
    freeAfter: 'Free after 4:00pm Fridays, all day weekends',
    walkingDistances: { ECE: '2 min', Kupfrian: '3 min' },
  },
  'Lot 16': {
    slug: 'lot-16',
    lat: 40.7439,
    lng: -74.1819,
    permits: ['Commuter (Red)', 'Blue', 'Green'],
    enforcementHours: 'Mon–Fri 7:00am – 10:00pm',
    freeAfter: 'Free after 4:00pm Fridays, all day weekends',
    walkingDistances: { GITC: '6 min', CKB: '5 min' },
  },
  ECC: {
    slug: 'ecc-deck',
    lat: 40.7395,
    lng: -74.1790,
    permits: ['Commuter (Red)', 'Blue'],
    enforcementHours: 'Mon–Fri 7:00am – 10:00pm',
    freeAfter: 'Free after 4:00pm Fridays, all day weekends',
    walkingDistances: { ECE: '3 min', Colton: '4 min' },
  },
  'Lot 10': {
    slug: 'lot-10',
    lat: 40.7454,
    lng: -74.1796,
    permits: ['Commuter (Red)'],
    enforcementHours: 'Mon–Fri 7:00am – 10:00pm',
    freeAfter: 'Free after 4:00pm Fridays, all day weekends',
    walkingDistances: { Kupfrian: '4 min', ECE: '5 min' },
  },
  FENS1: {
    slug: 'fenster-l1',
    lat: 40.7424,
    lng: -74.1773,
    permits: ['Reserved'],
    enforcementHours: 'Mon–Fri 7:00am – 10:00pm',
    freeAfter: 'No free parking',
    walkingDistances: { Fenster: '1 min', CKB: '3 min' },
  },
  FENS2: {
    slug: 'fenster-l2',
    lat: 40.7424,
    lng: -74.1771,
    permits: ['Faculty/Staff'],
    enforcementHours: 'Mon–Fri 7:00am – 10:00pm',
    freeAfter: 'No free parking',
    walkingDistances: { Fenster: '1 min', CKB: '3 min' },
  },
};

export function getMetaBySiteName(siteName: string): LotMeta | null {
  return LOT_METADATA[siteName] ?? null;
}

export function getMetaBySlug(slug: string): (LotMeta & { siteName: string }) | null {
  const entry = Object.entries(LOT_METADATA).find(([, v]) => v.slug === slug);
  if (!entry) return null;
  return { ...entry[1], siteName: entry[0] };
}
