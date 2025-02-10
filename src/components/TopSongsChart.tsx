import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TopSong } from '../types';

interface TopSongsChartProps {
  data: TopSong[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-200">
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-gray-600">Artist: {payload[0].payload.artist}</p>
        <p className="text-indigo-600">
          {payload[0].value.toLocaleString()} streams
        </p>
      </div>
    );
  }
  return null;
};

const formatYAxis = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value;
};

export const TopSongsChart: React.FC<TopSongsChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="songName"
          angle={-45}
          textAnchor="end"
          height={80}
          interval={0}
          tick={{ fontSize: 12 }}
        />
        <YAxis tickFormatter={formatYAxis} />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="streams"
          fill="#4f46e5"
          radius={[4, 4, 0, 0]}
          maxBarSize={50}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};