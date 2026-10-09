interface LotMeta {
  slug: string;
  lat: number;
  lng: number;
}

// lat/lng looked up on OpenStreetMap from each lot's street address (ECC is approximate)
export const LOT_METADATA: Record<string, LotMeta> = {
  PARK: {
    slug: 'parking-deck',
    lat: 40.7402,
    lng: -74.1784,
  },
  'Science & Tech Garage': {
    slug: 'science-tech-garage',
    lat: 40.7433,
    lng: -74.1823,
  },
  'Lot 16': {
    slug: 'lot-16',
    lat: 40.7439,
    lng: -74.1819,
  },
  ECC: {
    slug: 'ecc-deck',
    lat: 40.7395,
    lng: -74.1790,
  },
  'Lot 10': {
    slug: 'lot-10',
    lat: 40.7454,
    lng: -74.1796,
  },
  FENS1: {
    slug: 'fenster-l1',
    lat: 40.7424,
    lng: -74.1773,
  },
  FENS2: {
    slug: 'fenster-l2',
    lat: 40.7424,
    lng: -74.1771,
  },
};
