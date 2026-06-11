'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Lot } from '@/types';
import { statusColors } from '@/lib/status';
import { formatAvailable } from '@/lib/format';

interface ParkingMapProps {
  lots: Lot[];
}

// campus center, roughly between the deck and Fenster
const CAMPUS_CENTER: [number, number] = [40.7416, -74.1768];

function markerHtml(lot: Lot): string {
  const color = statusColors[lot.status];
  const label = lot.status === 'unknown' ? '?' : formatAvailable(lot.available);
  return `
    <div style="
      background:${color};
      width:34px;height:34px;
      border-radius:9999px;
      border:2px solid #fff;
      box-shadow:0 1px 4px rgba(0,0,0,0.3);
      display:flex;align-items:center;justify-content:center;
      color:#fff;font-weight:700;font-size:10px;
    ">${label}</div>
  `;
}

function popupHtml(lot: Lot): string {
  const count =
    lot.status === 'unknown'
      ? '<span style="color:#94A3B8">No data</span>'
      : `<strong>${formatAvailable(lot.available)}</strong> spots open`;
  return `
    <div style="font-family:inherit;min-width:140px">
      <p style="font-weight:600;margin:0 0 2px">${lot.name}</p>
      <p style="margin:0 0 6px;font-size:13px">${count}</p>
      <a href="/lot/${lot.slug}" style="font-size:13px;color:#D32032;font-weight:500">View details →</a>
    </div>
  `;
}

export default function ParkingMap({ lots }: ParkingMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: CAMPUS_CENTER,
      zoom: 16,
      zoomControl: true,
    });
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    lots.forEach((lot) => {
      const icon = L.divIcon({
        html: markerHtml(lot),
        className: '', // prevent default leaflet icon styles
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });

      L.marker([lot.lat, lot.lng], { icon })
        .addTo(map)
        .bindPopup(popupHtml(lot));
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [lots]);

  return <div ref={containerRef} className="h-full w-full" />;
}
