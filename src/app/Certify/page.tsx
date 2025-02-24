"use client";

import { useSearchParams,  } from "next/navigation";
// import { getUser, getUserApi } from "@/app/server/admin_user";
// import { UserList, WorkResponse } from "../type/user";
import { useState, useEffect } from "react";
import styles from "@/app/css/user_detail.module.css";
import Image from "next/image";
import FilterInputBox from "../Component/Common/FilterInputBox";


export default function Certify() {
    // const parm = useSearchParams();
    const [name, setName] = useState<string>("");
    const [tel, setTel] = useState<string>("");
    const [ce, setCe] = useState<string>("");
    const [active, setActive] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(180);  // 3분 타이머 설정 (180초)

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (active && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);  // 1초마다 타이머 감소
        }

        // 타이머가 0이 되면 active를 false로 설정
        if (timer === 0) {
            setActive(false);
            setTimer(180);  // 타이머 초기화
        }

        // cleanup function: 컴포넌트 언마운트 시 타이머를 정리
        return () => clearInterval(interval);

    }, [active, timer]);  // active나 timer가 변경될 때마다 실행

    // console.log(parm.get('user'))

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                background: "#f5f6f9",
                width: "100vw",
                height: "auto",
            }}
        >
            <div className={styles.innerbox}>
                {/* 헤더 */}
                <div className={styles.headerbox}>
                    <Image aria-hidden src="/member/back.png" alt="뒤로가기" width={30} height={30} />
                    {/* X 버튼 클릭 시 handleCloseWebView 호출 */}
                    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "324px" }}>
                        <Image
                            aria-hidden
                            src="/common/KPJB.png"
                            alt="닫기"
                            width={250}
                            height={30}
                            style={{ cursor: "pointer" }}
                        />
                    </div>
                    <Image
                        aria-hidden
                        src="/common/close.png"
                        alt="닫기"
                        width={30}
                        height={30}
                        style={{ cursor: "pointer" }}
                    />
                </div>
                <div className={styles.innerbox} style={{ height: "100vh" }}>
                    <div style={{ height: "100vh", marginLeft: "15px", marginRight: "15px" }}>
                        <p style={{ fontSize: "20px", fontWeight: "bold", color: " #2f2f2f", marginTop: "30px" }}>연락받을 번호와 이름을 입력해주세요</p>

                        <p style={{ fontSize: "12px", color: "#84848f", marginTop: "26px" }}>이름</p>
                        <FilterInputBox w={345} h={50} mt={10} bg={"#f5f6f9"} p={"이름을 입력해주세요"} v={name}
                            // src={"/admin/search.png"}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <p style={{ fontSize: "12px", color: "#84848f", marginTop: "26px" }}>연락처</p>
                        <div style={{ width: "345px", height: "50px", marginTop: "10px", background: "#f5f6f9", display: "flex", flexDirection: "row" }}>
                            <FilterInputBox w={270} h={50} mt={0} bg={"#f5f6f9"} p={"연락처를 입력해주세요"} v={tel} type={"tel"}
                                // src={"/admin/search.png"} 
                                onChange={(e) => setTel(e.target.value)}
                            />
                            <div style={{ width: "75px", height: "50px", background: "#f5f6f9", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <div style={{
                                    display: "flex", justifyContent: "center", alignItems: "center", background: "black", fontSize: "13px", color: "white",
                                    width: "65px", height: "30px", borderRadius: "5px",
                                }} onClick={()=> setActive(true)}>
                                    {active ? "다시받기" : "인증하기"}
                                </div>
                            </div>
                        </div>

                        {active ?
                            <div style={{ width: "345px", height: "50px", marginTop: "10px", background: "#f5f6f9", display: "flex", flexDirection: "row" }}>
                                <FilterInputBox w={270} h={50} mt={0} bg={"#f5f6f9"} p={"연락처를 입력해주세요"} v={ce}
                                    // src={"/admin/search.png"} 
                                    onChange={(e) => setCe(e.target.value)}
                                />
                                <div style={{ width: "75px", height: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <div style={{
                                        display: "flex", justifyContent: "center", alignItems: "center", fontSize: "14px", color: "#ff1c8e",
                                        width: "65px", height: "30px", borderRadius: "5px",
                                    }}>
                                        {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
                                    </div>
                                </div>
                            </div>
                            :
                            <></>
                        }

                        <div style={{
                            marginTop: "100px", width: "345px", height: "60px", background: "linear-gradient(to left, #33405a, #112448)", color: "white",
                            display: "flex", justifyContent: "center", alignItems: "center", fontSize: "18px", borderRadius: "5px"
                        }}>
                            다음
                        </div>

                    </div>
                </div>

            </div>


        </div>
    );
}
