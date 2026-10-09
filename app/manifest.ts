import type { MetadataRoute } from 'next';

// tells phones how to show ParkSmart when it's added to the home screen
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ParkSmart',
    short_name: 'ParkSmart',
    description: 'A parking availability demo for NJIT students, faculty, and staff.',
    start_url: '/',
    display: 'standalone',
    background_color: '#080504',
    theme_color: '#080504',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
