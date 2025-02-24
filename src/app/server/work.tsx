const baseurl = process.env.NEXT_PUBLIC_SERVICE_VISA_URL; 
import useAuthStore from "../store/user";
// import {  AllUserResponse , UserList , WorkPost} from "../type/user";
import { Question_Post,WorkResponse , Question   } from "../type/user";

interface ProcessData {
  user_id: number;
  language: number; // 언어 코드 (예: 0: 한국어, 1: 영어)
  choice: string; // 업무 선택
  work_detail: string; // 업무 상세 설명
  order: number; // 업무 순서
  questions: Question[]; // 질문 목록
}

interface ProcessData_se {
  user: number | null; // 사용자 ID (null 허용)
  work: number | null; // 업무 ID (null 허용)
  name: string;
  tel: number;
  marketing: "y" | "n";
  questions: string;
  answers: string;
}

// 요청을 보내는 함수
export async function registerWork(payload: ProcessData) {
  try {
    const token = localStorage.getItem("token");

    // 토큰이 없을 경우 에러 처리
    if (!token) {
      throw new Error("Authorization token is missing");
    }

    const response = await fetch(baseurl + "/api/admin/work/", {
      method: "POST",
      headers: { 
        "Authorization": "Bearer " + token, // Bearer token 추가
        "Content-Type": "application/json", // JSON 형식으로 보내기 위한 헤더 추가
      },
      body: JSON.stringify(payload), // payload를 JSON으로 변환하여 전송
    });

    // 응답 상태가 200 OK가 아닐 경우 예외 처리
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "회원가입 실패");
    }

    // 성공 시 JSON 데이터 반환
    return await response.json();
    
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
}


export async function workchangeimage(formData: FormData) {
  try {
    const token = localStorage.getItem("token");

    // 토큰이 없을 경우 에러 처리
    if (!token) {
      throw new Error("Authorization token is missing");
    }

    const response = await fetch(baseurl + "/api/admin/work/change", {
      method: "PATCH",
      headers: { 
        "Authorization": "Bearer " + token, // Bearer token 추가
        // "Content-Type": "application/json", // JSON 형식으로 보내기 위한 헤더 추가
      },
      body: formData, // payload를 JSON으로 변환하여 전송
    });

    // 응답 상태가 200 OK가 아닐 경우 예외 처리
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "회원가입 실패");
    }

    // 성공 시 JSON 데이터 반환
    return await response.json();
    
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
}

// ✅ API 함수
export async function readlist(a:number): Promise<Question_Post []> {
  try {
    
    const response = await fetch(baseurl + '/api/client/works/detail/' + a, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": "Bearer " + localStorage.getItem("token"),
      },
    });

    if (!response.ok) {
      useAuthStore.getState().logout();
      throw new Error("유저 목록 불러오기 실패");
    }
    const data: Question_Post[] = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function work_detail(a:number): Promise<WorkResponse[]> {
  try {
    
    const response = await fetch(baseurl + '/api/client/work/detail/' + a, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": "Bearer " + localStorage.getItem("token"),
      },
    });

    if (!response.ok) {
      useAuthStore.getState().logout();
      throw new Error("유저 목록 불러오기 실패");
    }
    const data: WorkResponse[] = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function registerProcess(payload: ProcessData_se) {
  try {
    
    // 토큰이 없을 경우 에러 처리
    

    const response = await fetch(baseurl + '/api/client/work/', {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", // JSON 형식으로 보내기 위한 헤더 추가
      },
      body: JSON.stringify(payload), // payload를 JSON으로 변환하여 전송
    });

    // 응답 상태가 200 OK가 아닐 경우 예외 처리
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "회원가입 실패");
    }

    // 성공 시 JSON 데이터 반환
    return await response.json();
    
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
}


// 예시 payload


// JSON 형식으로 전송
