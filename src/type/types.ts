export interface SpendMetric {
  current: number;
  reference: number;
  absoluteChange: number;
  percentChange: number;
}

export interface DataEntry {
  country: string;
  state: string;
  city: string;
  sector: string;
  category: string;
  startDate: string;
  endDate: string;

  mySpend: SpendMetric;
  sameStoreSpend: SpendMetric;
  newStoreSpend: SpendMetric;
  lostStoreSpend: SpendMetric;
}

export interface User {
  id: number;
  name: string;
  data: DataEntry[];
}

export interface Filters {
  startDate?: string;
  endDate?: string;
  sector?: string;
  category?: string;
  attributes?: string[]; // e.g., ["country", "sector"]
  metrics?: string[];    // e.g., ["mySpend", "newStoreSpend"]
}
