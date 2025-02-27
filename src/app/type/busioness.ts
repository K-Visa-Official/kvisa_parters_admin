import { WorkPost , UserList } from "./user";

export interface VisaApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProcessData[];
}

export interface ProcessData {
  id:number;
  name: string;
  tel: number;
  marketing: "y" | "n";
  lang:string | "0";
  created_at ?: Date;
  work? : WorkPost;
  user? :UserList;
  state?:number
}