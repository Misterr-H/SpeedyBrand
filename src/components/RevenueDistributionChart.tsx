import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { RevenueSource } from '../types';

interface RevenueDistributionChartProps {
  data: RevenueSource[];
  onSegmentClick?: (source: string) => void;
}

const COLORS = ['#2563eb', '#4f46e5', '#6366f1', '#818cf8'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-200">
        <p className="font-medium text-gray-900">{data.source}</p>
        <p className="text-gray-600">
          ${data.amount.toLocaleString()}
        </p>
        <p className="text-sm text-gray-500">
          {((data.amount / data.total) * 100).toFixed(1)}% of total revenue
        </p>
      </div>
    );
  }
  return null;
};

export const RevenueDistributionChart: React.FC<RevenueDistributionChartProps> = ({ data, onSegmentClick }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const total = data.reduce((sum, item) => sum + item.amount, 0);
  const processedData = data.map(item => ({
    ...item,
    total,
  }));

  const handleMouseEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  const handleClick = (entry: any) => {
    if (onSegmentClick) {
      onSegmentClick(entry.source);
    }
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={processedData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="amount"
          nameKey="source"
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          cursor="pointer"
        >
          {processedData.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              opacity={activeIndex === null || activeIndex === index ? 1 : 0.6}
              stroke={activeIndex === index ? '#fff' : 'none'}
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};