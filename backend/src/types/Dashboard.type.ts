export interface DashboardItem {
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

export interface DashboardData {
  dashboard: [DashboardData];
}

interface GroupStage {
  $group: {
    _id: { region: string; sector: string };
  };
}

interface SecondGroupStage {
  $group: {
    _id: string;
    sectors: { $addToSet: string };
  };
}

export type AggregationPipeline = (GroupStage | SecondGroupStage | undefined)[];
