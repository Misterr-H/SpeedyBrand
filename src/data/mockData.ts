import { KeyMetrics, MonthlyData, RevenueSource, StreamData, TopSong } from '../types';

export const keyMetrics: KeyMetrics = {
  totalUsers: 2547890,
  activeUsers: 1847320,
  totalStreams: 15789432,
  revenue: 8947250,
  topArtist: "Taylor Swift"
};

export const monthlyGrowthData: MonthlyData[] = [
  { month: "2023-03", totalUsers: 2000000, activeUsers: 1500000 },
  { month: "2023-04", totalUsers: 2100000, activeUsers: 1600000 },
  { month: "2023-05", totalUsers: 2200000, activeUsers: 1650000 },
  { month: "2023-06", totalUsers: 2250000, activeUsers: 1700000 },
  { month: "2023-07", totalUsers: 2300000, activeUsers: 1720000 },
  { month: "2023-08", totalUsers: 2350000, activeUsers: 1750000 },
  { month: "2023-09", totalUsers: 2400000, activeUsers: 1780000 },
  { month: "2023-10", totalUsers: 2420000, activeUsers: 1800000 },
  { month: "2023-11", totalUsers: 2450000, activeUsers: 1820000 },
  { month: "2023-12", totalUsers: 2480000, activeUsers: 1830000 },
  { month: "2024-01", totalUsers: 2500000, activeUsers: 1840000 },
  { month: "2024-02", totalUsers: 2547890, activeUsers: 1847320 }
];

export const revenueDistribution: RevenueSource[] = [
  { source: "Premium Subscriptions", amount: 6258075 },
  { source: "Advertisements", amount: 1789450 },
  { source: "Student Plans", amount: 671043 },
  { source: "Family Plans", amount: 228682 }
];

export const topSongs: TopSong[] = [
  { songName: "Cruel Summer", artist: "Taylor Swift", streams: 1250000 },
  { songName: "Vampire", artist: "Olivia Rodrigo", streams: 980000 },
  { songName: "Last Night", artist: "Morgan Wallen", streams: 875000 },
  { songName: "Kill Bill", artist: "SZA", streams: 820000 },
  { songName: "Anti-Hero", artist: "Taylor Swift", streams: 780000 }
];

export const recentStreams: StreamData[] = [
  { songName: "Cruel Summer", artist: "Taylor Swift", dateStreamed: "2024-03-16T14:32:00Z", streamCount: 1, userId: "user_789" },
  { songName: "Vampire", artist: "Olivia Rodrigo", dateStreamed: "2024-03-15T14:30:00Z", streamCount: 1, userId: "user_456" },
  { songName: "Last Night", artist: "Morgan Wallen", dateStreamed: "2024-03-15T14:28:00Z", streamCount: 1, userId: "user_123" },
  { songName: "Kill Bill", artist: "SZA", dateStreamed: "2024-03-15T14:25:00Z", streamCount: 1, userId: "user_789" },
  { songName: "Anti-Hero", artist: "Taylor Swift", dateStreamed: "2024-03-15T14:20:00Z", streamCount: 1, userId: "user_456" }
];