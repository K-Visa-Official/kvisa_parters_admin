
/* 로그인 */
export async function loginApi(email:string , password:string) {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email , password}), // { email, password } 전송
      });
  
      if (!response.ok) {
        throw new Error("로그인 실패");
      }
  
      return await response.json();
    } catch (error) {
      console.error("로그인 API 에러:", error);
      throw error;
    }
}

/* 로그아웃 */  
export async function logoutApi() {
    try {
      await fetch("/api/logout", { method: "POST" });
      return true;
    } catch (error) {
      console.error("로그아웃 API 에러:", error);
      throw error;
    }
  }
  