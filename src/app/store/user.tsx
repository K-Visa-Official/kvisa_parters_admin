"use client";
import { create } from "zustand";
import { loginApi } from "src/app/server/login"; // API 가져오기

interface AuthStore {
  email: string;
  password: string;
  token: string;
  isLoggedIn: boolean;
  admin: boolean;

  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setToken: (token: string) => void;
  setisLoggedIn: (isLoggedIn: boolean) => void;
  setadmin: (admin: boolean) => void;
  login: () => Promise<boolean>;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set, get) => ({
 
  email: "",
  password: "",
  token: "",
  isLoggedIn: false,
  admin:false,

 
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setToken: (token) => set({ token }),
  setisLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  setadmin: (admin) => set({ admin }),

  login: async () : Promise<boolean> => {
    try {
      const { email, password } = get();
      const userData = await loginApi(email, password); // 로그인 요청
      const expirationDate = new Date().getTime() + 3 * 24 * 60 * 60 * 1000; // 3일 후 시간 계산 (밀리초 단위)

      set({
        token: userData.access,
        isLoggedIn: true,
        admin : userData.is_admin
      });

      // 토큰과 만료 시간 로컬스토리지에 저장
      localStorage.setItem("token", userData.access);
      localStorage.setItem("admin", userData.is_admin);
      localStorage.setItem("expirationDate", expirationDate.toString());

      return true;
    } 
    catch (error) {
      console.error("로그인 실패:", error); // 오류 로그 추가
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token"); // 토큰 삭제
    localStorage.removeItem("expirationDate"); // 만료 시간 삭제
    localStorage.removeItem("admin"); // 만료 시간 삭제
    set({
      email: "",
      password: "",
      token: "",
      isLoggedIn: false, // 로그아웃 시 isLoggedIn 상태 false로 설정
    });
    console.log("로그아웃 성공");
  },
}));

// 로그인 상태를 체크하고, 앱이 시작될 때 자동으로 로그인 상태를 업데이트
const initializeAuthStore = () => {
  if (typeof window === "undefined") return; // 서버 환경에서는 실행하지 않음

  const token = localStorage.getItem("token");
  const expirationDate = localStorage.getItem("expirationDate");

  if (token && expirationDate) {
    const currentTime = new Date().getTime();
    const expirationTime = parseInt(expirationDate, 10);

    if (currentTime < expirationTime) {
      useAuthStore.getState().setToken(token);
      useAuthStore.getState().setisLoggedIn(true);
    } else {
      useAuthStore.getState().logout();
    }
  }
};

// 클라이언트 사이드에서만 실행
if (typeof window !== "undefined") {
  initializeAuthStore();
}


// 앱 초기화 시 로그인 상태 확인
initializeAuthStore();

export default useAuthStore;
