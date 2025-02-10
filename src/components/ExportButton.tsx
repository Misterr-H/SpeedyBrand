import React from 'react';
import { Download } from 'lucide-react';

interface ExportButtonProps {
  onExport: () => void;
  isLoading?: boolean;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ onExport, isLoading }) => {
  return (
    <button
      onClick={onExport}
      disabled={isLoading}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
    >
      <Download className="h-4 w-4 mr-2" />
      {isLoading ? 'Exporting...' : 'Export Data'}
    </button>
  );
};