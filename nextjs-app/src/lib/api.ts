// API configuration and utilities for Django backend integration

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface NEPSEIndexData {
  id: number;
  date: string;
  open_price: number;
  high_price: number;
  low_price: number;
  close_price: number;
  volume: number;
  turnover: number;
  created_at: string;
  updated_at: string;
}

export interface NEPSEStockData {
  id: number;
  symbol: string;
  company_name: string;
  sector: string;
  current_price: number;
  change: number;
  change_percent: number;
  volume: number;
  turnover: number;
  high_52w: number;
  low_52w: number;
  market_cap: string;
  pe_ratio: number | null;
  last_trade_time: string;
  created_at: string;
  updated_at: string;
}

export interface NEPSEIndicesData {
  id: number;
  name: string;
  symbol: string;
  current: number;
  change: number;
  change_percent: number;
  high_52w: number;
  low_52w: number;
  date: string;
  created_at: string;
  updated_at: string;
}

export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension?: number;
    yAxisID?: string;
  }>;
}

export interface MarketOverview {
  nepse_index: NEPSEIndexData;
  top_gainers: NEPSEStockData[];
  top_losers: NEPSEStockData[];
  most_active: NEPSEStockData[];
  indices: NEPSEIndicesData[];
  last_updated: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, { ...defaultOptions, ...options });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      data,
      status: response.status,
    };
  }

  // NEPSE Index endpoints
  async getNEPSEIndex(params?: {
    page?: number;
    page_size?: number;
    ordering?: string;
  }): Promise<ApiResponse<NEPSEIndexData[]>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.page_size) queryParams.append('page_size', params.page_size.toString());
    if (params?.ordering) queryParams.append('ordering', params.ordering);
    
    const queryString = queryParams.toString();
    const endpoint = `/index/${queryString ? `?${queryString}` : ''}`;
    
    return this.request<NEPSEIndexData[]>(endpoint);
  }

  async getLatestNEPSEIndex(): Promise<ApiResponse<NEPSEIndexData>> {
    return this.request<NEPSEIndexData>('/index/latest/');
  }

  async getNEPSEIndexChartData(days: number = 30): Promise<ApiResponse<ChartData>> {
    return this.request<ChartData>(`/index/chart_data/?days=${days}`);
  }

  // Stock endpoints
  async getNEPSEStocks(params?: {
    page?: number;
    page_size?: number;
    search?: string;
    sector?: string;
    ordering?: string;
  }): Promise<ApiResponse<NEPSEStockData[]>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.page_size) queryParams.append('page_size', params.page_size.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.sector) queryParams.append('sector', params.sector);
    if (params?.ordering) queryParams.append('ordering', params.ordering);
    
    const queryString = queryParams.toString();
    const endpoint = `/stocks/${queryString ? `?${queryString}` : ''}`;
    
    return this.request<NEPSEStockData[]>(endpoint);
  }

  async getTopGainers(limit: number = 10): Promise<ApiResponse<NEPSEStockData[]>> {
    return this.request<NEPSEStockData[]>(`/stocks/top_gainers/?limit=${limit}`);
  }

  async getTopLosers(limit: number = 10): Promise<ApiResponse<NEPSEStockData[]>> {
    return this.request<NEPSEStockData[]>(`/stocks/top_losers/?limit=${limit}`);
  }

  async getMostActive(limit: number = 10): Promise<ApiResponse<NEPSEStockData[]>> {
    return this.request<NEPSEStockData[]>(`/stocks/most_active/?limit=${limit}`);
  }

  async getStocksBySector(sector: string): Promise<ApiResponse<NEPSEStockData[]>> {
    return this.request<NEPSEStockData[]>(`/stocks/by_sector/?sector=${encodeURIComponent(sector)}`);
  }

  // Indices endpoints
  async getNEPSEIndices(params?: {
    page?: number;
    page_size?: number;
    ordering?: string;
  }): Promise<ApiResponse<NEPSEIndicesData[]>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.page_size) queryParams.append('page_size', params.page_size.toString());
    if (params?.ordering) queryParams.append('ordering', params.ordering);
    
    const queryString = queryParams.toString();
    const endpoint = `/indices/${queryString ? `?${queryString}` : ''}`;
    
    return this.request<NEPSEIndicesData[]>(endpoint);
  }

  async getLatestNEPSEIndices(): Promise<ApiResponse<NEPSEIndicesData[]>> {
    return this.request<NEPSEIndicesData[]>('/indices/latest/');
  }

  // Market overview endpoints
  async getMarketOverview(): Promise<ApiResponse<MarketOverview>> {
    return this.request<MarketOverview>('/overview/overview/');
  }

  async getChartData(type: 'index' | 'stocks' | 'sectors' = 'index', days: number = 30): Promise<ApiResponse<ChartData>> {
    return this.request<ChartData>(`/overview/chart_data/?type=${type}&days=${days}`);
  }
}

// Create and export a singleton instance
export const apiClient = new ApiClient();

// Export individual functions for convenience
export const {
  getNEPSEIndex,
  getLatestNEPSEIndex,
  getNEPSEIndexChartData,
  getNEPSEStocks,
  getTopGainers,
  getTopLosers,
  getMostActive,
  getStocksBySector,
  getNEPSEIndices,
  getLatestNEPSEIndices,
  getMarketOverview,
  getChartData,
} = apiClient;

export default apiClient;
