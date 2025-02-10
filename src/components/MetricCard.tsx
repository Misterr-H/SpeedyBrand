import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon: Icon, trend }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {typeof value === 'number' && !title.toLowerCase().includes('revenue')
              ? value.toLocaleString()
              : typeof value === 'number'
              ? `$${value.toLocaleString()}`
              : value}
          </p>
        </div>
        <div className="p-3 bg-indigo-50 rounded-lg">
          <Icon className="w-6 h-6 text-indigo-600" />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          <span className={`text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
          </span>
          <span className="ml-2 text-sm text-gray-500">vs last month</span>
        </div>
      )}
    </div>
  );
}