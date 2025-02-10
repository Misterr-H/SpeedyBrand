import React from 'react';
import { RefreshCw } from 'lucide-react';

interface RefreshTimerProps {
  lastUpdated: Date;
  onRefresh: () => void;
  isLoading?: boolean;
}

export const RefreshTimer: React.FC<RefreshTimerProps> = ({
  lastUpdated,
  onRefresh,
  isLoading,
}) => {
  return (
    <div className="flex items-center space-x-2 text-sm text-gray-500">
      <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
      <button
        onClick={onRefresh}
        disabled={isLoading}
        className="inline-flex items-center p-1 hover:text-indigo-600 disabled:opacity-50"
      >
        <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
      </button>
    </div>
  );
};