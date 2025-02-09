"use client";
import { create } from "zustand";
import { loginApi } from "src/app/server/login"; // API 가져오기

interface AuthStore {
  title: string;
  post: string;
  tel_first: string;
  tel_second: string;
  email: string;
  password: string;
  token: string;
  isLoggedIn: boolean;
  setTitle: (title: string) => void;
  setPost: (post: string) => void;
  setTelFirst: (tel_first: string) => void;
  setTelSecond: (tel_second: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setToken: (token: string) => void;
  setisLoggedIn: (isLoggedIn: boolean) => void;
  login: () => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set, get) => ({
  title: "",
  post: "",
  tel_first: "",
  tel_second: "",
  email: "",
  password: "",
  token: "",
  isLoggedIn: false,

  setTitle: (title) => set({ title }),
  setPost: (post) => set({ post }),
  setTelFirst: (tel_first) => set({ tel_first }),
  setTelSecond: (tel_second) => set({ tel_second }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setToken: (token) => set({ token }),
  setisLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

  login: async () => {
    try {
      const { email, password } = get();
      const userData = await loginApi(email, password); // 로그인 요청
      const expirationDate = new Date().getTime() + 3 * 24 * 60 * 60 * 1000; // 3일 후 시간 계산 (밀리초 단위)

      set({
        title: userData.title,
        post: userData.post,
        tel_first: userData.tel_first,
        tel_second: userData.tel_second,
        token: userData.accesstoken,
        isLoggedIn: true, // 로그인 성공 시 isLoggedIn 상태 true로 설정
      });

      // 토큰과 만료 시간 로컬스토리지에 저장
      localStorage.setItem("token", userData.accesstoken);
      localStorage.setItem("expirationDate", expirationDate.toString());
      console.log("로그인 성공:", userData);
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  },

  logout: () => {
    localStorage.removeItem("token"); // 토큰 삭제
    localStorage.removeItem("expirationDate"); // 만료 시간 삭제
    set({
      title: "",
      post: "",
      tel_first: "",
      tel_second: "",
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
  const token = localStorage.getItem("token");
  const expirationDate = localStorage.getItem("expirationDate");

  if (token && expirationDate) {
    const currentTime = new Date().getTime();
    const expirationTime = parseInt(expirationDate);

    // 토큰이 유효한지 체크 (3일 이내)
    if (currentTime < expirationTime) {
      useAuthStore.getState().setToken(token);
      useAuthStore.getState().setisLoggedIn(true); // isLoggedIn 상태를 true로 설정
    } else {
      // 토큰이 만료되었으면 자동으로 로그아웃
      useAuthStore.getState().logout();
    }
  }
};

// 앱 초기화 시 로그인 상태 확인
initializeAuthStore();

export default useAuthStore;
