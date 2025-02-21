export interface UserList {
  id: number;
  email: string;
  password: string;
  sign_in: string; // ISO 날짜 형식
  last_login: string; // ISO 날짜 형식
  bu_logo: string;
  bu_name: string;
  bu_intro: string;
  bu_name_ch?: string;
  bu_intro_ch?: string;
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
  bu_logo: string;
}

export interface Answer {
  answer: string;
  sort: number;
}

export interface Question {
  question: string;
  answer_type: number;  // 0: 단일선택, 1: 복수선택, 2: 단문형, 3: 장문형
  answers: Answer[];
}

export interface WorkPost {
  id: number;
  language: number; // 언어 코드 (예: 0: 한국어, 1: 영어)
  choice: string; // 업무 선택
  work_detail: string; // 업무 상세 설명
  detail?: string; // (선택 사항) 이미지 URL 또는 추가적인 상세 정보
  detail_second?: string; // (선택 사항) 두 번째 이미지 URL 또는 추가 정보
  order: number; // 업무 순서
  user: number; // 사용자 ID
  questions: Question[]; // 질문 목록
}

// 각 답변(Answer)의 타입 정의
interface Answer_Post {
  id: number;
  answer: string;
  answer_count: number;
  question: number; // 연결된 질문 ID
}

// 각 질문(Question)의 타입 정의
export interface Question_Post {
  id: number;
  question: string;
  answer_type: number; // 0, 1, 2 등
  work: number; // 연결된 업무 ID
  answers: Answer_Post[]; // 해당 질문에 대한 답변 배열
}

