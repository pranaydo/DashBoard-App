export interface UserData {
  sector: string;
  category: string;
  spend: number;
  percentChange: number;
  absoluteChange: number;
  date: string; 
}

export interface User {
  id: number;
  name: string;
  data: UserData[];
}

export interface Filters {
  sector?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  attributes?: string[];  
  metrics?: string[];     
}

