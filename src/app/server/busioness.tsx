import { VisaApiResponse } from "../type/busioness";

const baseurl = process.env.NEXT_PUBLIC_SERVICE_VISA_URL; 


export async function businesslist(a:string,b:string , c:number , d:number , e:string): Promise<VisaApiResponse> {
    try {
      const sta = c ===10 ? "" : c

      const response = await fetch(baseurl + '/api/admin/visa/?&business=' + a + "&created_at=" + b + "&state=" + sta + "&page=" + d + "&choice=" + e, {
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
      const data: VisaApiResponse = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
  

  export async function busi_work(): Promise<VisaApiResponse> {
    try {

      const response = await fetch(baseurl + '/api/client/worklist/', {
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
      const data: VisaApiResponse = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }