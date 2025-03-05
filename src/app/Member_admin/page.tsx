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
import { busi_work } from "../server/busioness";
import { VisaApiResponse } from "../type/busioness";

function Member_admin() {
    const [user, setUser] = useState<UserList | null>(null);
    const [work, setWork] = useState<VisaApiResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태    
    const [pro, setPro] = useState<string>("전체"); // 로딩 상태    
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
    const [isTooltipVisible, setTooltipVisible] = useState(false);
    const { title_bu, created_at_bu, seTitle_bu, setCreate_bu, state, setState } = BusinessStore();
    const order = ["접수완료", "계약완료", "서류작성", "심사진행", "처리완료", "상담종료"]
    const cate = ["전체", "맞춤형 비자상담 서비스", "범죄/불법체류자 구제"]
    const { admin, isLoggedIn } = useAuthStore();
    const handleCheckboxChange = (index: string) => {
        setCheckedItems((prev) => ({
            ...prev,
            [index]: !prev[index], // 체크 여부 토글
        }));
    };
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
                const data_work = await busi_work();
                setUser(data);
                setWork(data_work)
                console.log(data_work)
            } catch (error) {
                console.error("유저 데이터를 불러오는 중 오류 발생:", error);
            } finally {
                setIsLoading(false); // 로딩 상태 업데이트
            }
        };

        fetchUser();

    }, [admin, router]); // 🔥 `user` 제거하여 무한 루프 방지

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/Login'); // 로그인 후 이동할 페이지
        }
    }, [isLoggedIn, router]);

    const handleToggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index); // 클릭된 항목을 확장하거나 축소
    };


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
                        }} onClick={() => useAuthStore.getState().logout()}>
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

            <div style={{ width: "100%", height: "auto", display: "flex", justifyContent: "center", alignItems: "center", background: "white", marginTop: "52px", flexDirection: "column", paddingBottom: "100px" }}>
                <div style={{ width: "1200px", height: "50px", background: "white", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ebecf1" }}>
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

                <div style={{ width: "1200px", height: "auto1", display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginTop: "30px", flexDirection: "row" }}>
                    <div style={{ width: "180px", height: "240px", border: "solid 1px #ebecf1", borderRadius: "10px", display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "column" }}>
                        <div style={{ width: "130px", height: "48px", borderBottom: "1px solid black", color: "#33405a", fontSize: "15px", fontWeight: "600", display: "flex", alignItems: "center" }}>
                            카테고리
                        </div>
                        <div style={{ width: "auto", height: "auto", display: "flex", alignItems: "flex-start", flexDirection: "column", marginLeft: "20px" }}>
                            {cate.map((b, index) => (
                                <div key={index} style={{ color: " #33405a", fontSize: "13px", marginTop: "10px" }}>
                                    <input
                                        type="checkbox"
                                        id={`checkbox-${b}`}
                                        checked={!!checkedItems[b]} // 상태 반영
                                        onChange={() => handleCheckboxChange(b)}
                                        style={{
                                            accentColor: checkedItems[b] ? "black" : "#4CAF50", // ✅ 체크 표시 색상 변경
                                            marginRight: "10px",
                                            width: "14px",
                                            height: "14px"
                                        }}
                                    />
                                    <label htmlFor={`checkbox-${b}`}>{b}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ width: "980px", height: "auto" }}>
                        <div style={{ width: "980px", height: "75px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", color: "black", flexDirection: "row" }}>
                            <p style={{ fontSize: "20px", fontWeight: "600" }}>{work?.results?.length}개의 업무 진행</p>
                            <div style={{ display: "flex", flexDirection: "row", fontSize: "18px", fontWeight: "600", cursor: "pointer" }}>
                                <p style={{ marginRight: "10px", color: pro === "진행중" ? "black" : "#84848f" }} onClick={() => setPro("진행중")}>진행중</p>
                                <p>|</p>
                                <p style={{ marginLeft: "10px", color: pro === "처리완료" ? "black" : "#84848f" }} onClick={() => setPro("처리완료")} >처리완료</p>
                            </div>
                        </div>

                        {work?.results.map((b, index) => (
                            <div style={{
                                width: "980px", height: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "25px 20px 15px 20px", background: "#f5f6f9", flexDirection: "column",
                                borderRadius: "10px", marginTop: "15px"
                            }} key={index} onClick={() => handleToggleExpand(index)}>

                                <div style={{ width: "100%", height: "auto", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <div style={{ height: "61px" }}>
                                        <div style={{
                                            fontSize: "12px", background: "#e8eaf1", borderRadius: "2px", color: "#33405a", width: "120px", height: "30px", display: "flex",
                                            justifyContent: "center", alignItems: "center"
                                        }}>
                                            접수날짜 : {new Date(String(b?.created_at)).toLocaleDateString("ko-KR").replace(/-/g, ".").slice(2)}
                                        </div>
                                        <div style={{ marginTop: "10px", fontSize: "20px", color: "black", fontWeight: "600" }}>{b.work?.choice} / {b.name} / {b.work?.language === 0 ? "한국어" : "중국어"}</div>
                                    </div>

                                    <div style={{ width: "150px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div style={{
                                            padding: "9px 20px", border: "solid 3px #fff", borderRadius: "22px",
                                            background: b.state === 0 ? "#FF4B4C" :
                                                b.state === 1 ? "#FF9D4C" :
                                                    b.state === 2 ? "#B44DFF" :
                                                        b.state === 3 ? "#1B68FF" :
                                                            b.state === 4 ? "#FF1A8E" : "#A3A3A3"
                                        }}>
                                            {
                                                b.state === 0 ? "접수완료" :
                                                    b.state === 1 ? "계약완료" :
                                                        b.state === 2 ? "서류작성" :
                                                            b.state === 3 ? "심사진행" :
                                                                b.state === 4 ? "처리완료" : "상담종료"
                                            }
                                        </div>
                                        <Image
                                            aria-hidden
                                            src="/admin/etc.png"
                                            alt="etc icon"
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                </div>

                                {expandedIndex === index && (
                                    <div style={{ width: "100%", height: "167px", marginTop: "25px" }}>
                                        <div style={{ width: "940px", height: "167px", background: "white", borderRadius: "5px", paddingTop: "15px", paddingLeft: "15px" }}>
                                            <div style={{
                                                fontSize: "12px", background: "#e8eaf1", borderRadius: "2px", color: "#33405a", width: "120px", height: "30px", display: "flex",
                                                justifyContent: "center", alignItems: "center"
                                            }}>
                                                접수날짜 : {new Date(String(b?.created_at)).toLocaleDateString("ko-KR").replace(/-/g, ".").slice(2)}
                                            </div>
                                            <div style={{ display: "flex", flexDirection: "row", fontSize: "15px", marginTop: "15px", fontWeight: "500" }}>
                                                <div style={{ width: "70px", color: "#84848f" }}>
                                                    업무종류
                                                </div>
                                                <div style={{ width: "150px", color: "black" }}>
                                                    {b.work?.choice}
                                                </div>

                                                <div style={{ width: "70px", color: "#84848f", marginLeft: "35px" }}>
                                                    의뢰인명
                                                </div>
                                                <div style={{ width: "150px", color: "black" }}>
                                                    {b.name}
                                                </div>
                                            </div>

                                            <div style={{ display: "flex", flexDirection: "row", fontSize: "15px", marginTop: "15px", fontWeight: "500" }}>
                                                <div style={{ width: "70px", color: "#84848f" }}>
                                                    연락처
                                                </div>
                                                <div style={{ width: "150px", color: "black" }}>
                                                    {b.tel}
                                                </div>

                                                <div style={{ width: "70px", color: "#84848f", marginLeft: "35px" }}>
                                                    진행상태
                                                </div>
                                                <div style={{ width: "150px", color: "black" }}>
                                                    {
                                                        b.state === 0 ? "접수완료" :
                                                            b.state === 1 ? "계약완료" :
                                                                b.state === 2 ? "서류작성" :
                                                                    b.state === 3 ? "심사진행" :
                                                                        b.state === 4 ? "처리완료" : "상담종료"
                                                    }
                                                </div>
                                            </div>

                                            <div style={{ display: "flex", flexDirection: "row", fontSize: "15px", marginTop: "15px", fontWeight: "500" }}>
                                                <div style={{ width: "70px", color: "#84848f" }}>
                                                    접수언어
                                                </div>
                                                <div style={{ width: "150px", color: "black" }}>
                                                    {b.work?.language === 0 ? "한국어" : "중국어"}
                                                </div>

                                                <div style={{ width: "70px", color: "#84848f", marginLeft: "35px" }}>
                                                   
                                                </div>
                                                <div style={{ width: "150px", color: "black" }}>
                                                    
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                )}
                            </div>

                        ))}
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Member_admin;
