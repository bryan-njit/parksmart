'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { HistoricalDataPoint } from '@/types';

interface OccupancyChartProps {
  data: HistoricalDataPoint[];
  total: number;
  color?: string;
  height?: number;
  currentTime?: string;
}

function formatTick(value: string): string {
  if (value.includes(':00') || value === '12 pm' || value === '7:30 am') {
    return value.replace(':00', '').replace(' am', 'am').replace(' pm', 'pm');
  }
  return '';
}

export default function OccupancyChart({
  data,
  color = '#D32032',
  height = 200,
  currentTime,
}: OccupancyChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="occupancyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.2} />
            <stop offset="95%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="time"
          tickFormatter={formatTick}
          tick={{ fontSize: 11, fill: '#94A3B8' }}
          axisLine={false}
          tickLine={false}
          interval={5}
        />
        <YAxis
          tick={{ fontSize: 11, fill: '#94A3B8' }}
          axisLine={false}
          tickLine={false}
          width={40}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #E2E8F0',
            borderRadius: 8,
            fontSize: 12,
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.07)',
          }}
          labelStyle={{ color: '#0F172A', fontWeight: 600, marginBottom: 2 }}
          formatter={(value) => [`${value} occupied`]}
        />
        {currentTime && (
          <ReferenceLine
            x={currentTime}
            stroke="#D32032"
            strokeDasharray="4 3"
            strokeWidth={1.5}
          />
        )}
        <Area
          type="monotone"
          dataKey="occupied"
          stroke={color}
          strokeWidth={2}
          fill="url(#occupancyGrad)"
          dot={false}
          activeDot={{ r: 4, fill: color, strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
