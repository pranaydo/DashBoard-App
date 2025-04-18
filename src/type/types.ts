export interface SpendData {
    sector: string;
    category: string;
    spend: number;
    percentChange: number;
    absoluteChange: number;
  }
  
  export interface User {
    id: number;
    name: string;
    data: SpendData[];
  }