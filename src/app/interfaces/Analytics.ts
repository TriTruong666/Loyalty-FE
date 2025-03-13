export interface AnalyticsData {
  data: number | string;
}

export interface AnalyticsRevenueData {
  data: Revenue[];
}

export interface Revenue {
  date: string;
  total: number;
}
