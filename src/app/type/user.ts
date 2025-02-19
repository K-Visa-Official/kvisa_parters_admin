export interface UserList {
  id: number;
  email: string;
  password: string;
  sign_in: string; // ISO 날짜 형식
  last_login: string; // ISO 날짜 형식
  bu_logo: string;
  bu_name: string;
  bu_intro: string;
  bu_tel_first: string;
  bu_tel_name: string;
  bu_bank_name: string;
  bu_bank_number: string;
  work_count: number;
  work_count_ch: number;
  is_admin: boolean;
}

export interface AllUserResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: UserList[];
}

export interface WorkResponse {
  id: number;
  user: UserList;
  language: number;
  choice: string;
  work_detail: string;
  detail: string;
  detail_second: string;
  order: number;
}