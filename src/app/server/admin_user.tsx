const baseurl = process.env.NEXT_PUBLIC_SERVICE_VISA_URL; 
import useAuthStore from "../store/user";
import {  AllUserResponse , UserList , WorkResponse} from "../type/user";

// ✅ API 함수
export async function alluserApi(a:string,b:string): Promise<AllUserResponse> {
  try {
    
    const response = await fetch(baseurl + '/api/user/all?&business=' + a + "&create_at=" + b, {
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