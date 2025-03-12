"use client";
import { create } from "zustand";
import { alluserApi } from "../server/admin_user";


interface AdminFilter {
  title: string;
  created_at: string;

  page: number;
  order_by :string;

  seTitle: (title: string) => void;
  setCreate: (created_at: string) => void;
  setPage: (page: number) => void;
  setOrderBy: (order_by: string) => void;
  fetchAllUsers: () => Promise<boolean>;
  
}

const useAdminStore = create<AdminFilter>((set, get) => ({

  title: "",
  created_at: "",
  page: 1,
  order_by: "-id",


  seTitle: (title) => set({ title }),
  setCreate: (created_at) => set({ created_at }),
  setPage: (page) => set({ page }),
  setOrderBy: (order_by) => set({ order_by }), // 함수명 수정 ✅

  fetchAllUsers: async (): Promise<boolean> => {
    try {
      const { title, created_at , page , order_by } = get(); // 현재 상태 가져오기
      await alluserApi(title, created_at , page , order_by);

      return true;
    } catch (error) {
      console.error("로그인 실패:", error); // 오류 로그 추가
      // console.error("유저 데이터 가져오기 실패:", error);
      return false;
    }
  },



}));

// 로그인 상태를 체크하고, 앱이 시작될 때 자동으로 로그인 상태를 업데이트


// 클라이언트 사이드에서만 실행

export default useAdminStore;
