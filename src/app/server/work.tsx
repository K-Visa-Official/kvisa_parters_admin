const baseurl = process.env.NEXT_PUBLIC_SERVICE_VISA_URL; 
import useAuthStore from "../store/user";
// import {  AllUserResponse , UserList , WorkPost} from "../type/user";
import { Question_Post,WorkResponse , Question , CRM_res , Order_Change ,   } from "../type/user";
import { Answer_Post } from "../type/user";

interface tel_change {
  id: number | null;
  name: string| null;  // 언어 코드 (예: 0: 한국어, 1: 영어)
  tel: string| null; // 업무 선택
}

// interface work_list {
//   tel: string| null; // 업무 선택
// }


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
  // name: string;
  // tel: number;
  // marketing: "y" | "n";
  questions: string;
  answers: string;
  match: string;
}

interface ProcessData_user {
  id:string;
  name: string;
  tel: number;
  marketing: "y" | "n";
  lang:string | "0";
  match: string;
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

export async function registerProcessUser(payload: ProcessData_user) {
  try {
    
    const response = await fetch(baseurl + '/api/client/work/user', {
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

export async function change_name(payload: tel_change) {
  try {
    // const token = localStorage.getItem("token");

    // // 토큰이 없을 경우 에러 처리
    // if (!token) {
    //   throw new Error("Authorization token is missing");
    // }

    const response = await fetch(baseurl + "/api/client/progress/edit", {
      method: "PATCH",
      headers: { 
        // "Authorization": "Bearer " + token, // Bearer token 추가
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

export async function get_crm(tel?: string, name?: string): Promise<CRM_res[]> {
  try {
    let url = baseurl + "/api/client/crm?";

    // 파라미터가 있을 경우 URL에 추가
    if (tel) url += `&tel=${tel}`;
    if (name) url += `&name=${name}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("유저 목록 불러오기 실패");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

// 업무 순서 변경
export async function workchangeorder(payload: Order_Change) {
  try {
    const token = localStorage.getItem("token");

    // 토큰이 없을 경우 에러 처리
    if (!token) {
      throw new Error("Authorization token is missing");
    }

    const response = await fetch(baseurl + "/api/admin/work/order", {
      method: "PATCH",
      headers: { 
        "Authorization": "Bearer " + token, // Bearer token 추가
        "Content-Type": "application/json", // JSON 형식으로 보내기 위한 헤더 추가
      },
      body: JSON.stringify(payload), // payload를 JSON으로 변환하여 전송
    });

    // 응답 상태가 200 OK가 아닐 경우 예외 처리
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "수정 실패");
    }

    // 성공 시 JSON 데이터 반환
    return await response.json();
    
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
}

// 업무 삭제
export async function workdelete(a:number) {
  try {
    const token = localStorage.getItem("token");

    // 토큰이 없을 경우 에러 처리
    if (!token) {
      throw new Error("Authorization token is missing");
    }

    const response = await fetch(baseurl + "/api/admin/work/delete/" + a + "/", {
      method: "DELETE",
      headers: { 
        "Authorization": "Bearer " + token, // Bearer token 추가
        // "Content-Type": "application/json", // JSON 형식으로 보내기 위한 헤더 추가
      },
      // body: JSON.stringify(payload), // payload를 JSON으로 변환하여 전송
    });

    // 응답 상태가 200 OK가 아닐 경우 예외 처리
    if (!response.ok) {
      throw new Error(`Failed to delete work with id ${a}`);
      }

      // 응답이 비어있지 않은 경우에만 JSON 파싱
      const responseData = await response.text();  // 먼저 텍스트로 받아본다
      const parsedData = responseData ? JSON.parse(responseData) : {};  // 응답이 비어있지 않으면 JSON으로 변환

      console.log('Deleted work:', parsedData);

      return parsedData;  // 삭
    
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
}

export async function workchangenoimage(formData: FormData) {
  try {
    const token = localStorage.getItem("token");

    // 토큰이 없을 경우 에러 처리
    if (!token) {
      throw new Error("Authorization token is missing");
    }

    const response = await fetch(baseurl + "/api/admin/work/change/no", {
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

export async function change_state( a:number , b:number) {
  try {
    // const token = localStorage.getItem("token");

    // // 토큰이 없을 경우 에러 처리
    // if (!token) {
    //   throw new Error("Authorization token is missing");
    // }

    const response = await fetch(baseurl + "/api/client/work/state/" + a + "/", {
      method: "PATCH",
      headers: { 
        "Authorization": "Bearer " + localStorage.getItem("token"), // Bearer token 추가
        "Content-Type": "application/json", // JSON 형식으로 보내기 위한 헤더 추가
      },
      body: JSON.stringify({
          id:a , state : b
      }), // payload를 JSON으로 변환하여 전송
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

export async function get_answer(a:number): Promise<Answer_Post[]> {
  try {
    
    const response = await fetch(baseurl + '/api/admin/answer/?&id=' + a, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
    });

    if (!response.ok) {
      // useAuthStore.getState().logout();
      throw new Error("유저 목록 불러오기 실패");
    }
    const data: Answer_Post[] = await response.json();  // .json()으로 응답 데이터를 파싱
    return data;
  } catch (error) {
    throw error;
  }
}