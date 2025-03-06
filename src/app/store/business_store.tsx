"use client";
import { create } from "zustand";


interface BusinessFilter {
  title_bu: string;
  created_at_bu: string;
  choice: string;
  page_bu: number;
  state: number;

  title_user: string;
  created_at_user: string;
  state_user: number;
  

  seTitle_bu: (title: string) => void;
  setCreate_bu: (created_at: string) => void;
  setPage_bu: (page: number) => void;
  setState: (state: number) => void;
  setChoice: (choice: string) => void;

  seTitle_User: (title_user: string) => void;
  setCreate_User: (created_at_user: string) => void;
  setState_User: (state_user: number) => void;

}

const BusinessStore = create<BusinessFilter>((set, 
    // get
) => ({

  title_bu: "",
  created_at_bu: "",
  state: 10,
  page_bu: 1,
  choice:"" ,
  title_user: "",
  created_at_user: "",
  state_user: 10,

  seTitle_bu: (title_bu) => set({ title_bu }),
  setCreate_bu: (created_at_bu) => set({ created_at_bu }),
  setPage_bu: (page_bu) => set({ page_bu }),
  setState: (state) => set({ state }),
  setChoice: (choice) => set({ choice }),
  
  seTitle_User: (title_user) => set({ title_user }),
  setCreate_User: (created_at_user) => set({ created_at_user }),
  setState_User: (state_user) => set({ state_user }),



}));

// 로그인 상태를 체크하고, 앱이 시작될 때 자동으로 로그인 상태를 업데이트


// 클라이언트 사이드에서만 실행

export default BusinessStore;
