'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Lot } from '@/types';
import { getStatus, statusColors } from '@/lib/status';
import { formatAvailable } from '@/lib/format';
import { distanceMeters } from '@/lib/buildings';

interface ParkingMapProps {
  lots: Lot[];
}

// middle of all the lots, so every marker fits on a phone screen
const CAMPUS_CENTER: [number, number] = [40.7424, -74.1797];

// lots this close together share one marker (the two Fenster levels are one building)
const SAME_SPOT_METERS = 30;

function groupBySpot(lots: Lot[]): Lot[][] {
  const groups: Lot[][] = [];
  lots.forEach((lot) => {
    const group = groups.find((g) => distanceMeters(g[0], lot) < SAME_SPOT_METERS);
    if (group) group.push(lot);
    else groups.push([lot]);
  });
  return groups;
}

function markerHtml(group: Lot[]): string {
  // add up the lots that have data, and color the marker by the total
  const known = group.filter((lot) => lot.status !== 'unknown');
  const available = known.reduce((sum, lot) => sum + (lot.available ?? 0), 0);
  const total = known.reduce((sum, lot) => sum + lot.total, 0);
  const status = known.length > 0 ? getStatus(available, total) : 'unknown';

  const label = status === 'unknown' ? '?' : formatAvailable(available);
  return `
    <div style="
      background:${statusColors[status]};
      width:34px;height:34px;
      border-radius:9999px;
      border:2px solid #080504;
      box-shadow:0 1px 6px rgba(0,0,0,0.6);
      display:flex;align-items:center;justify-content:center;
      color:${status === 'unknown' ? '#EDEEF0' : '#080504'};
      font-weight:700;font-size:10px;
    ">${label}</div>
  `;
}

function popupHtml(group: Lot[]): string {
  return group
    .map((lot) => {
      const count =
        lot.status === 'unknown'
          ? '<span style="color:#8E8E96">No data</span>'
          : `<strong>${formatAvailable(lot.available)}</strong> spots open`;
      return `
        <div style="min-width:150px;margin-bottom:6px">
          <p style="font-weight:600;margin:0 0 2px">${lot.name}</p>
          <p style="margin:0 0 4px;font-size:13px">${count}</p>
          <a href="/lot/${lot.slug}" style="font-size:13px;color:#F0505F;font-weight:500">View details →</a>
        </div>
      `;
    })
    .join('');
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

    // regular OpenStreetMap tiles, turned dark with a CSS filter in globals.css
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    groupBySpot(lots).forEach((group) => {
      const icon = L.divIcon({
        html: markerHtml(group),
        className: '', // prevent default leaflet icon styles
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });

      L.marker([group[0].lat, group[0].lng], { icon })
        .addTo(map)
        .bindPopup(popupHtml(group));
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [lots]);

  return <div ref={containerRef} className="h-full w-full" />;
}
