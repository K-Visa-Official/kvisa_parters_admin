const baseurl = process.env.NEXT_PUBLIC_SERVICE_VISA_URL; 
import useAuthStore from "../store/user";
import {  AllUserResponse , UserList , WorkResponse} from "../type/user";

// ✅ API 함수
export async function alluserApi(a:string,b:string , c:number): Promise<AllUserResponse> {
  try {
    const response = await fetch(baseurl + '/api/user/all?&business=' + a + "&create_at=" + b + "&page=" + c, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
    });

    if (!response.ok) {
      useAuthStore.getState().logout();
      throw new Error("유저 목록 불러오기 실패");
    }

    const data: AllUserResponse = await response.json(); // 응답을 타입에 맞게 변환
    return data;
  } catch (error) {
    throw error;
  }
}

// 유저정보
export async function getUserApi(id: number, language: number): Promise<WorkResponse[]> {
  try {
    const response = await fetch(`${baseurl}/api/client/works/${id}?language=${language}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": "Bearer " + localStorage.getItem("token"),
      },
    });

    if (!response.ok) {
      useAuthStore.getState().logout();
      throw new Error("유저 정보 불러오기 실패");
    }

    const data: WorkResponse[] = await response.json(); // 응답을 WorkResponse[] 타입으로 변환
    return data;
  } catch (error) {
    console.error("API 호출 오류:", error);
    throw error;
  }
}

// 유저정보 - 어드민
export async function getUser(id: number): Promise<UserList> {
  try {
    const response = await fetch(`${baseurl}/api/user/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": "Bearer " + localStorage.getItem("token"),
      },
    });

    if (!response.ok) {
      throw new Error("유저 정보 불러오기 실패");
    }

    const data: UserList = await response.json(); // 응답을 WorkResponse[] 타입으로 변환
    return data;
  } catch (error) {
    console.error("API 호출 오류:", error);
    throw error;
  }
}

// 회원가입
export async function registerUser(formData: FormData) {
  try {
      const response = await fetch(baseurl + "/api/register/", {
          method: "POST",
          headers: { 
            // "Content-Type": "application/json" ,
            "Authorization": "Bearer " + localStorage.getItem("token")
          }, // JSON 형식으로 전송
          body: formData, // 데이터를 JSON 문자열로 변환
      });

      if (!response.ok) {
          throw new Error("회원가입 실패");
      }

      return await response.json();
  } catch (error) {
      throw error;
  }
}

// 회원정보 수정
export async function UserEdit(formData: FormData , a:number) {
  try {
      const response = await fetch(baseurl + "/api/user/edit/" + a, {
          method: "PUT",
          headers: { 
            // "Content-Type": "application/json" ,
            "Authorization": "Bearer " + localStorage.getItem("token")
          }, // JSON 형식으로 전송
          body: formData, // 데이터를 JSON 문자열로 변환
      });

      if (!response.ok) {
          throw new Error("회원가입 실패");
      }

      return await response.json();
  } catch (error) {
      throw error;
  }
}


// 유저정보 - 의뢰인

export async function getUserMember(): Promise<UserList> {
  try {
    const response = await fetch(`${baseurl}/api/user/?&name=` , {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
    });

    if (!response.ok) {
      useAuthStore.getState().logout();
      throw new Error("유저 정보 불러오기 실패");
    }

    const data: UserList = await response.json(); // 응답을 WorkResponse[] 타입으로 변환
    return data;
  } catch (error) {
    console.error("API 호출 오류:", error);
    throw error;
  }
}