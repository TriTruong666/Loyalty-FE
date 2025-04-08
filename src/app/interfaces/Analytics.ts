export interface AnalyticsData {
  data: number | string;
}

export interface AnalyticsDataGateway {
  data: {
    total: number;
  };
}

export interface AnalyticsDataTransaction {
  total: number;
}

export interface AnalyticsDailyRevenueData {
  data: DailyRevenue[];
}

export interface DailyRevenue {
  date: string;
  total: number;
}

export interface AnalyticsYearlyRevenueData {
  data: YearlyRevenue[];
}

export interface YearlyRevenue {
  month: string;
  total: number;
}
