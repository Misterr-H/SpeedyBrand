export interface StreamData {
  songName: string;
  artist: string;
  dateStreamed: string;
  streamCount: number;
  userId: string;
}

export interface KeyMetrics {
  totalUsers: number;
  activeUsers: number;
  totalStreams: number;
  revenue: number;
  topArtist: string;
}

export interface MonthlyData {
  month: string;
  totalUsers: number;
  activeUsers: number;
}

export interface RevenueSource {
  source: string;
  amount: number;
}

export interface TopSong {
  songName: string;
  artist: string;
  streams: number;
}