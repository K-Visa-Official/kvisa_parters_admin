"use client";
import { create } from "zustand";
import { alluserApi } from "../server/admin_user";


interface AdminFilter {
  title: string;
  created_at: string;
  seTitle: (title: string) => void;
  setCreate: (created_at: string) => void;
  fetchAllUsers: () => Promise<boolean>;
}

const useAdminStore = create<AdminFilter>((set, get) => ({

  title: "",
  created_at: "",


  seTitle: (title) => set({ title }),
  setCreate: (created_at) => set({ created_at }),

  fetchAllUsers: async (): Promise<boolean> => {
    try {
      const { title, created_at } = get(); // 현재 상태 가져오기
      const response = await alluserApi(title, created_at);

      return true;
    } catch (error) {
      // console.error("유저 데이터 가져오기 실패:", error);
      return false;
    }
  },



}));

// 로그인 상태를 체크하고, 앱이 시작될 때 자동으로 로그인 상태를 업데이트


// 클라이언트 사이드에서만 실행

export default useAdminStore;
