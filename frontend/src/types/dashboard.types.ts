export interface DashboardItem {
  _id: string;
  end_year: string;
  intensity: number;
  sector: string;
  topic: string;
  insight: string;
  url: string;
  region: string;
  start_year: string;
  impact: string;
  added: string;
  published: string;
  country: string;
  relevance: number;
  pestle: string;
  source: string;
  title: string;
  likelihood: number;
}

export interface DashboardContext {
  data: Array<DashboardItem>;
  setData: (res: Array<DashboardItem>) => void;
}

export interface DashboardResponseInterface {
  success: boolean;
  dashboard: Array<DashboardItem>;
  message: string;
}

export interface getData {
  _id: string | number;
  count: number;
}

export interface IFetchData {
  data: Array<getData>;
}

export interface IAggData {
  _id: string;
  sectors: Array<string>;
}

export interface IAggFetchData {
  data: Array<IAggData>;
}
