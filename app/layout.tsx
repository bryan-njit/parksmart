import type { Metadata, Viewport } from 'next';
import { DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ParkingDataProvider } from '@/hooks/useParkingData';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-jetbrains',
});

export const metadata: Metadata = {
  title: 'ParkSmart — NJIT Parking',
  description: 'A parking availability demo for NJIT students, faculty, and staff.',
  // iPhones use these instead of manifest.ts when the app is added to the home screen
  appleWebApp: {
    capable: true,
    title: 'ParkSmart',
    statusBarStyle: 'black',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#080504',
  // lets the app use the whole screen on iPhones; BottomNav adds space for the swipe bar
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${jetbrains.variable} font-sans`}>
        <ParkingDataProvider>{children}</ParkingDataProvider>
      </body>
    </html>
  );
}
