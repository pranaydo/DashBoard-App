export interface UserData {
    sector: string;
    category: string;
    spend: number;
    percentChange: number;
    absoluteChange: number;
  }
  
  export interface User {
    id: number;
    name: string;
    data: UserData[];
  }


export interface Filters {
  sector?: string;
  category?: string;
}
