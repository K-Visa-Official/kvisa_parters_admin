"use client";

import { getUserMember } from "../server/admin_user";
import { UserList } from "../type/user";
import { useState, useEffect } from "react";
import useAuthStore from "../store/user";
import { useRouter } from "next/navigation";
// import useWindowWidth from "../hooks/useWindowWidth";
import Image from "next/image";
import FilterInputBox from "../Component/Common/FilterInputBox";
import BusinessStore from "../store/business_store";
import styles from "@/app/css/business.module.css";
import first from "@/app/css/admin_user.module.css";

function Member_admin() {
    const [user, setUser] = useState<UserList | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태    
    const [isTooltipVisible, setTooltipVisible] = useState(false);
    const { title_bu, created_at_bu, seTitle_bu, setCreate_bu, state, setState } = BusinessStore();
    const order = ["접수완료", "계약완료", "서류작성", "심사진행", "처리완료", "상담종료"]
    const { admin , isLoggedIn} = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (admin) {
            router.push("/");  // 운영진이면 즉시 리다이렉트 후 함수 종료
            return;
        }

        // 일반 회원일 경우 유저 데이터 불러오기
        const fetchUser = async () => {
            try {
                const data = await getUserMember();
                setUser(data);
            } catch (error) {
                console.error("유저 데이터를 불러오는 중 오류 발생:", error);
            } finally {
                setIsLoading(false); // 로딩 상태 업데이트
            }
        };

        fetchUser();
        console.log(user)

    }, [admin, router]); // 🔥 `user` 제거하여 무한 루프 방지

    useEffect(() => {
        if (!isLoggedIn) {
          router.push('/Login'); // 로그인 후 이동할 페이지
        }
      }, [isLoggedIn, router]);
  
      
    if (isLoading) {
        return <p>로딩 중...</p>;
    }

    return (
        <div style={{ background: "white" }}>
            <div style={{ width: "100%", height: "auto", display: "flex", justifyContent: "center", alignItems: "center", background: "white" }}>
                <div style={{ width: "1200px", height: "90px", background: "white" }}>
                    <Image
                        aria-hidden
                        src="/common/logo.png"
                        alt="Window icon"
                        width={105}
                        height={38}
                    />
                </div>
            </div>

            <div style={{ width: "100%", height: "auto", display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(to right, #33405a 1%, #4e5f82 100%)" }}>
                <div style={{ width: "1200px", height: "270px", display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
                    <Image
                        aria-hidden
                        src={user ? user?.bu_logo : "/common/ic_nonprofile.svg"}
                        alt="logo"
                        width={90}
                        height={90}
                        style={{ borderRadius: "50%" }}
                    />
                    <div style={{ display: "flex", flexDirection: "column", fontSize: "32px", fontWeight: "bold", marginLeft: "25px" }}>
                        {user?.bu_name}<br />
                        <span style={{ marginTop: "4px", fontSize: "18px", fontWeight: "500", opacity: "0.5" }}>{user?.bu_intro}</span>
                        <div style={{
                            width: "63px", height: "29px", opacity: "0.3", border: "solid 1px #fff", borderRadius: "14px", fontSize: "12px",
                            display: "flex", justifyContent: "center", alignItems: "center", marginTop: "14px"
                        }} onClick={()=> useAuthStore.getState().logout()}>
                            로그아웃
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ width: "100%", height: "60px", background: "#515d78", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "16px", fontWeight: "600" }}>
                <div style={{ width: "1200px", height: "60px", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                    고객센터
                </div>
            </div>

            <div style={{ width: "100%", height: "auto", display: "flex", justifyContent: "center", alignItems: "center", background: "white", marginTop: "52px" }}>
                <div style={{ width: "1200px", height: "50px", background: "white", display: "flex", justifyContent: "space-between", alignItems: "center" , borderBottom:"1px solid #ebecf1" }}>
                    <div style={{ width: "114px", height: "100%", borderBottom: "5px solid black", color: "black", fontSize: "25px", fontWeight: "bold" }}>
                        진행현황
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", width: "640px", height: "100%", justifyContent: "space-between" }} className={styles.filter}>
                        <FilterInputBox w={200} h={28} mt={0} bg={"#f5f6f9"} p={"고객명 또는 연락처"} v={title_bu}
                            src={"/admin/search.png"}
                            onChange={(e) => seTitle_bu(e.target.value)}
                        />

                        <FilterInputBox w={200} h={28} mt={0} bg={"#f5f6f9"} p={"접수일자(yyyy.mm.dd)"} v={created_at_bu}
                            src={"/admin/calendar.png"}
                            onChange={(e) => setCreate_bu(e.target.value)}
                        />

                        {isTooltipVisible ?
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                {order.map((b, index) => (
                                    <div className={styles.statebox} key={index}
                                        onClick={() => (
                                            setTooltipVisible(!isTooltipVisible),
                                            setState(index)
                                        )
                                        }>
                                        <p>{b}</p>
                                        <Image
                                            aria-hidden
                                            src="/admin/arrow_active.png"
                                            alt="Window icon"
                                            width={14}
                                            height={14}
                                        />
                                    </div>
                                ))}
                            </div>
                            :
                            <div className={styles.statebox}
                                onClick={() => setTooltipVisible(!isTooltipVisible)}>
                                <p>{state === 10 ? "진행상태" :
                                    state === 0 ? "접수완료" :
                                        state === 1 ? "계약완료" :
                                            state === 2 ? "서류작성" :
                                                state === 3 ? "심사진행" :
                                                    state === 4 ? "처리완료" : "상담종료"
                                }</p>
                                <Image
                                    aria-hidden
                                    src="/admin/arrow_active.png"
                                    alt="Window icon"
                                    width={14}
                                    height={14}
                                />
                            </div>
                        }

                        <button className={first.btn} style={{ background: "black", border: "none" }}
                        >조회</button>
                        <button className={first.btn} style={{ background: "#fff", border: "1px solid #e6eaee", color: "#000" }}
                            onClick={() => (
                                seTitle_bu(""),
                                setCreate_bu(""),
                                setState(10)
                            )}
                        >초기화</button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Member_admin;
