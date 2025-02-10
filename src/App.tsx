import  { useState, useCallback, useEffect } from 'react';
import { Users, UserCheck, Music2, DollarSign, Trophy, BarChart3 } from 'lucide-react';
import { MetricCard } from './components/MetricCard';
import { DataTable } from './components/DataTable';
import { UserGrowthChart } from './components/UserGrowthChart';
import { RevenueDistributionChart } from './components/RevenueDistributionChart';
import { TopSongsChart } from './components/TopSongsChart';
import { DateRangePicker } from './components/DateRangePicker';
import { ExportButton } from './components/ExportButton';
import { RefreshTimer } from './components/RefreshTimer';
import { keyMetrics, recentStreams, monthlyGrowthData, revenueDistribution, topSongs } from './data/mockData';
import { StreamData } from './types';

function App() {
  const [filteredStreams] = useState<StreamData[]>(recentStreams);
  const [selectedRevenueSource, setSelectedRevenueSource] = useState<string | null>(null);
  const [startDate, setStartDate] = useState(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleRevenueSourceClick = (source: string) => {
    setSelectedRevenueSource(source === selectedRevenueSource ? null : source);
  };

  const handleRefresh = useCallback(async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastUpdated(new Date());
    setIsLoading(false);
  }, []);

  const handleExport = useCallback(async () => {
    setIsExporting(true);
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const csvContent = [
      ['Song Name', 'Artist', 'Date Streamed', 'Stream Count', 'User ID'],
      ...filteredStreams.map(stream => [
        stream.songName,
        stream.artist,
        new Date(stream.dateStreamed).toLocaleString(),
        stream.streamCount,
        stream.userId
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `streamify-data-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    setIsExporting(false);
  }, [filteredStreams]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(handleRefresh, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [handleRefresh]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="px-8 mx-auto  py-8">
        {/* Header */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Streamify Analytics</h1>
            <p className="mt-1 text-sm text-gray-500">
              Real-time insights into your music streaming platform
              {selectedRevenueSource && (
                <span className="ml-2 text-indigo-600">
                  Filtered by: {selectedRevenueSource}
                </span>
              )}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
            />
            <div className="flex items-center space-x-4">
              <ExportButton onExport={handleExport} isLoading={isExporting} />
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                <BarChart3 className="h-4 w-4 mr-2" />
                Generate Report
              </button>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <RefreshTimer
            lastUpdated={lastUpdated}
            onRefresh={handleRefresh}
            isLoading={isLoading}
          />
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          <MetricCard
            title="Total Users"
            value={keyMetrics.totalUsers}
            icon={Users}
            trend={{ value: 5.2, isPositive: true }}
          />
          <MetricCard
            title="Active Users"
            value={keyMetrics.activeUsers}
            icon={UserCheck}
            trend={{ value: 3.1, isPositive: true }}
          />
          <MetricCard
            title="Total Streams"
            value={keyMetrics.totalStreams}
            icon={Music2}
            trend={{ value: 8.4, isPositive: true }}
          />
          <MetricCard
            title="Revenue"
            value={keyMetrics.revenue}
            icon={DollarSign}
            trend={{ value: 4.7, isPositive: true }}
          />
          <MetricCard
            title="Top Artist"
            value={keyMetrics.topArtist}
            icon={Trophy}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">User Growth</h3>
            <UserGrowthChart data={monthlyGrowthData} />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Distribution</h3>
            <RevenueDistributionChart
              data={revenueDistribution}
              onSegmentClick={handleRevenueSourceClick}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top 5 Streamed Songs</h3>
          <TopSongsChart data={topSongs} />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Recent Streams</h3>
          <DataTable data={filteredStreams} />
        </div>
      </div>
    </div>
  );
}

export default App;