import React, { useState } from 'react';
import { StreamData } from '../types';
import { ArrowUpDown } from 'lucide-react';

interface DataTableProps {
  data: StreamData[];
}

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [sortField, setSortField] = useState<keyof StreamData>('dateStreamed');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: keyof StreamData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1;
    }
    return a[sortField] < b[sortField] ? 1 : -1;
  });

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('songName')}
            >
              <div className="flex items-center">
                Song Name
                <ArrowUpDown className="ml-1 h-4 w-4" />
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('artist')}
            >
              <div className="flex items-center">
                Artist
                <ArrowUpDown className="ml-1 h-4 w-4" />
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('dateStreamed')}
            >
              <div className="flex items-center">
                Date Streamed
                <ArrowUpDown className="ml-1 h-4 w-4" />
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('streamCount')}
            >
              <div className="flex items-center">
                Stream Count
                <ArrowUpDown className="ml-1 h-4 w-4" />
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              User ID
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.map((stream, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {stream.songName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {stream.artist}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(stream.dateStreamed).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {stream.streamCount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {stream.userId}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}