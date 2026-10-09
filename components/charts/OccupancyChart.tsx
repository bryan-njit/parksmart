'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { HistoricalDataPoint } from '@/types';

interface OccupancyChartProps {
  data: HistoricalDataPoint[];
  color: string;
}

// only label every 3 hours so the axis doesn't get crowded on a phone
const HOUR_TICKS = ['8 am', '11 am', '2 pm', '5 pm', '8 pm'];

export default function OccupancyChart({ data, color }: OccupancyChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="occupancyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.2} />
            <stop offset="95%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="time"
          ticks={HOUR_TICKS}
          tickFormatter={(value: string) => value.replace(' ', '')}
          tick={{ fontSize: 11, fill: '#8E8E96' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: '#8E8E96' }}
          axisLine={false}
          tickLine={false}
          width={36}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1C1918',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 8,
            fontSize: 12,
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
          }}
          labelStyle={{ color: '#EDEEF0', fontWeight: 600, marginBottom: 2 }}
          formatter={(value) => [`${value} occupied`]}
        />
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
