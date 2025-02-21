"use client";

import { useSearchParams , useRouter } from "next/navigation";
import { getUser, getUserApi } from "@/app/server/admin_user";
import { UserList, WorkResponse } from "../type/user";
import { useState, useEffect } from "react";
import styles from "@/app/css/user_detail.module.css";
import Image from "next/image";
import { Korean } from "../type/typedef";



export default function CaseStoriesDetailPage() {
    const parm = useSearchParams();
    const router = useRouter()
    const [user, setUser] = useState<UserList>();
    const [state, setState] = useState<number | 1>(1);
    const [pk, setPk] = useState<number | 1>(1);
    const [url, setUrl] = useState<string | "">("");
    const [work, setWork] = useState<WorkResponse[] | []>([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUser(Number(parm.get("member")));
                const data_sec = await getUserApi(Number(parm.get("member")), parm.get("language") === "0" ? 0 : 1);
                setUser(data);
                setWork(data_sec)
            } catch (error) {
                console.error("유저 데이터를 불러오는 중 오류 발생:", error);
            }
        };
        fetchUser();
    }, [parm.get("member")]);


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
                    <Image aria-hidden src="/member/back.png" alt="뒤로가기" width={30} height={30}
                        onClick={() => state === 2 ? setState(1) : ""} />
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

                
                    {state === 1 ?
                        <div className={styles.contentsbox}>

                            <div className={styles.cardbox}>
                                <img src
                                    ={user ? user?.bu_logo : "/common/ic_nonprofile.svg"}
                                    className={styles.logo}
                                />
                                <div style={{
                                    display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", width: "250px", height: "60px", color: "black",
                                    fontSize: "20px", marginLeft: "10px"
                                }}>
                                    <p style={{ fontWeight: "600" }}>{parm.get("language") === "0" ? user?.bu_name : user?.bu_name_ch}</p>
                                    <p style={{ color: "#84848f", fontSize: "15px", fontWeight: "500" }}>{parm.get("language") === "0" ? user?.bu_intro : user?.bu_intro_ch}</p>
                                </div>
                            </div>
                            <p className={styles.title}>
                                {Korean.title} <br />
                                {Korean.title_second}</p>

                            {work?.map((user, index) => (
                                <>
                                    <div className={styles.post} onClick={() => (
                                        setUrl(user.detail_second),
                                        setState(2),
                                        setPk(user?.id)
                                    )}
                                        key={index}
                                    >
                                        <img src={user?.detail} className={styles.postimg} />
                                        <div className={styles.nextstep}>
                                            바로가기
                                            <Image
                                                aria-hidden
                                                src="/member/next_white.png"
                                                alt="다음"
                                                width={16}
                                                height={16}
                                                style={{ marginLeft: "5px" }}
                                            />
                                        </div>

                                    </div>
                                    <p style={{ marginTop: "15px", fontSize: "18px", color: "black", fontWeight: "600" }}>{user?.choice}</p>

                                    <p style={{ marginTop: "6px", fontSize: "13px", color: "#84848f", fontWeight: "500" }}>{user?.work_detail}</p>
                                </>
                            ))}

                            <div className={styles.post}>
                                <div className={styles.postimg} style={{ color: "black" }}>CRM 이미지</div>
                                {/* <img src={user?.detail} className={styles.postimg} /> */}
                                <div className={styles.nextstep}>
                                    바로가기
                                    <Image
                                        aria-hidden
                                        src="/member/next_white.png"
                                        alt="다음"
                                        width={16}
                                        height={16}
                                        style={{ marginLeft: "5px" }}
                                    />
                                </div>

                            </div>
                            <p style={{ marginTop: "15px", fontSize: "18px", color: "black", fontWeight: "600" }}>{Korean.progress}</p>

                            <p style={{ marginTop: "6px", fontSize: "13px", color: "#84848f", fontWeight: "500" }}>{Korean?.progress_first}<br />{Korean.progress_second}</p>
                        </div>
                        :
                        <>
                            <img src={url} style={{ width: "100%", height: "auto" }} />
                            <div className={styles.footer} 
                            onClick={() => router.push(`/Progress/?&progress=${pk}`)}
                            >
                                <p>위 내용을 확인하였고, 내용에 동의합니다.</p>
                                <div className={styles.nextStep}>
                                맞춤형 상담폼 접수하기
                                </div>
                            </div>
                        </>

                    }



            </div>


        </div>
    );
}
