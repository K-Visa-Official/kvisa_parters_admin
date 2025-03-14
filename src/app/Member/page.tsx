"use client";

import { useSearchParams, useRouter  } from "next/navigation";
import { getUser, getUserApi } from "@/app/server/admin_user";
import { UserList, WorkResponse } from "../type/user";
import { useState, useEffect, Suspense } from "react";
import styles from "@/app/css/user_detail.module.css";
import Image from "next/image";
import { Korean, Ch } from "../type/typedef";
import MoHeader from "../Component/Common/MoHeader";
import Modal from "../Component/Common/Modal";
import Footer from "../Component/Common/Footer";

function CaseStoriesDetailPage() {
    const parm = useSearchParams();
    const router = useRouter()
    const [user, setUser] = useState<UserList>();
    const [state, setState] = useState<number | 1>(1);
    const [pk, setPk] = useState<number | 1>(1);
    const [url, setUrl] = useState<string | "">("");
    const [work, setWork] = useState<WorkResponse[] | []>([]);
    const [memberId, setMemberId] = useState<string | null>(null);
    const [ac, setAc] = useState<boolean | false>(false);
    const languageMap = {
        Korean,
        Ch
    };
    
    const selectedLanguage = parm.get("language") === "0" ? "Korean" : "Ch"; // 예시로 "Korean"과 "Ch"를 사용
    
    const selectedLanguageData = languageMap[selectedLanguage as keyof typeof languageMap];

    useEffect(() => {
        // if (typeof window !== "undefined") {
        //     window.JBPrivateBankBridge = {
        //         callNative: function (message) {
        //             const decodedMessage = decodeURIComponent(message);
        //             const data = JSON.parse(decodedMessage);
        //             const url = data.param.url; // 전달된 URL 값

        //             if (url.includes("ko")) {
        //                 window.location.href = "https://main.d1ixxx006maf83.amplifyapp.com/Member?&member=6&language=0";
        //             } else {
        //                 window.location.href = "https://main.d1ixxx006maf83.amplifyapp.com/Member?&member=6&language=1";
        //             }
        //         },
        //     };
        // }

    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const member = parm.get("member");
                const userId = parm.get("userId");

                if (member !== memberId) {
                    setMemberId(member);  // memberId가 바뀔 때 상태 업데이트
                }
                if (member === "6") {
                    if(userId === null){
                        router.replace("/404");
                    }
                }

                const data = await getUser(Number(member));  // 유저 데이터 가져오기
                const data_sec = await getUserApi(Number(member), parm.get("language") === "0" ? 0 : 1);  // 추가 작업 데이터 가져오기
                setUser(data);
                setWork(data_sec)
                
            } catch (error) {
                console.error("유저 데이터를 불러오는 중 오류 발생:", error);
            }
        };
        if (parm.get("member")) {
            fetchUser();
        }
    }, [parm, memberId]);



    return (
        // <>
        <Suspense fallback={<div>Loading...</div>}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    background: "#f5f6f9",
                    width: "100%",
                    height: "auto",
                }}
            >
                <div className={styles.innerbox}>
                    {/* 헤더 */}
                    <MoHeader state={state} setState={setState} setAc={setAc} />

                    {state === 1 ?
                    <>
                        <div className={styles.contentsbox}>

                                <div className={styles.cardbox}>
                                    {/* <img src
                                ={user ? user?.bu_logo : "/common/ic_nonprofile.svg"}
                                className={styles.logo}
                                alt = "pro"
                            /> */}
                                    <Image src={user ? user?.bu_logo : "/common/ic_nonprofile.svg"} alt="pro" width={60} height={60} />
                                    <div style={{
                                        display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", width: "250px", height: "60px", color: "black",
                                        fontSize: "20px", marginLeft: "10px"
                                    }}>
                                        <p style={{ fontWeight: "600" }}>{parm.get("language") === "0" ? user?.bu_name : user?.bu_name_ch}</p>
                                        <p style={{ color: "#84848f", fontSize: "15px", fontWeight: "500" }}>{parm.get("language") === "0" ? user?.bu_intro : user?.bu_intro_ch}</p>
                                    </div>
                                </div>
                            

                            <div style={{ width:"100%" , display:"flex" , justifyContent:"flex-start" , alignItems:"center"}}>
                                <p className={styles.title} 
                                style={{  marginTop:parm.get("userId") === null ? "40px" : ""}}>
                                    {selectedLanguageData.title} <br />
                                    {selectedLanguageData.title_second}
                                </p>
                            </div>

                            {work?.map((user) => (
                                <div key={user.id} style={{ width:"100%"}}>
                                    {work[0]?.choice === undefined ?
                                        null
                                        :
                                        <>
                                                <div key={user.id}>
                                                    <div className={styles.post} onClick={() => (
                                                        setUrl(user.detail_second),
                                                        setState(2),
                                                        setPk(user?.id)
                                                    )}
                                                    >
                                                        {/* <img src={user?.detail} className={styles.postimg} alt="profile"/> */}
                                                        <Image src={user?.detail} className={styles.postimg} alt="profile" 
                                                             width={335} height={120}/>
                                                        <div className={styles.nextstep}
                                                            style={{ background: 
                                                                parm.get("member") === "9" ? "#652B8B" :
                                                                parm.get("member") === "10" ? "linear-gradient(#eb008b 0%, #3b058e 100%)"
                                                                :""
                                                                }}>
                                                            {selectedLanguageData.go}
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
                                                </div>
                                              
                                        </>
                                    }

                                </div>
                            ))}

                            <div style={{ width:"100%" , display:"flex" , justifyContent:"center" , alignItems:"flex-start" , flexDirection:"column"}}>
                            
                            <p style={{ marginTop: "40px", fontSize: "20px", color: "black", fontWeight: "600" }}>
                                {selectedLanguageData.progress}</p>

                            <p style={{ marginTop: "10px", fontSize: "18px", color: "#84848f", fontWeight: "500" }}>
                                {selectedLanguageData.progress_first}<br />
                                {selectedLanguageData.progress_second}
                            </p>
                            </div>
                            <div className={styles.post} onClick={() => router.push(
                                parm.get("userId") === null ?
                                    `/CRM?&member=${parm.get("member")}&language=${parm.get("language")}`
                                    :
                                    `/CRM?&member=${parm.get("member")}&language=${parm.get("language")}&userId=${parm.get("userId")}`
                                )}>
                                {/* <div className={styles.postimg} style={{ color: "black" , }}> */}
                                    <Image
                                        aria-hidden
                                        // src="/common/CRM.png"
                                        src={parm.get("userId") === null ?"/common/CRM_second.png" : "/bank/bank_2.png" }
                                        alt="다음"
                                        width={335}
                                        height={120}
                                        className={styles.postimg}
                                        // layout="responsive" 
                                        style={{ borderRadius:"10px" }}
                                    />
                                    {/* </div> */}
                                {/* <img src={user?.detail} className={styles.postimg} /> */}
                                <div className={styles.nextstep}
                                style={{ 
                                    background: 
                                    parm.get("member") === "9" ? "#652B8B" :
                                    parm.get("member") === "10" ? "linear-gradient(#eb008b 0%, #3b058e 100%)" :
                                    parm.get("member") === "6" ? "#00B887" :
                                    ""
                                    }}>
                                    {selectedLanguageData.go}
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

                           
                            
                            {/* {parm.get("userId") === null ?
                                <></>
                                :
                                <Image aria-hidden src= {parm.get("userId") === null ? "/common/main_banner.png" :"/bank/bank_3.png"} alt="닫기" width={335} height={114} 
                                // layout="responsive" 
                                style={{ cursor: "pointer" , marginBottom:"40px" , marginTop:"40px" }}
                                 onClick={() => (
                                    setUrl(work.filter(a => a?.choice === "외국인 범죄/불법체류자 구제")[0].detail_second),
                                    setState(2),
                                    setPk(work.filter(a => a?.choice === "외국인 범죄/불법체류자 구제")[0].id)
                                )}
                                />
                            } */}
                            
                        </div>

                        <Footer/>
                    </>
                        :
                        <>
                            <div style={{ position: "relative", width: "100%", height: "auto" , 
                                top:parm.get("userId") === null ? "60px" :"0px" }}>
                                <Image 
                                // src={url}
                                src={parm.get("userId") === null ? url : "/bank/bank_detail.png" } 
                                alt="샘플 이미지" layout="responsive" width={16} height={9} />
                            </div>

                            <div className={styles.footer}
                                onClick={() => router.push(
                                    parm.get("userId") === null ?
                                        (
                                            parm.get("language") === "0" ?
                                                `/Progress/?&progress=${pk}&language=0&member=${parm.get("member")}` :
                                                `/Progress/?&progress=${pk}&language=1&member=${parm.get("member")}`
                                        )
                                        :
                                        (
                                            parm.get("language") === "0" ?
                                                `/Progress/?&progress=${pk}&language=0&member=${parm.get("member")}&userId=${parm.get("userId")}` :
                                                `/Progress/?&progress=${pk}&language=1&member=${parm.get("member")}&userId=${parm.get("userId")}`
                                        )
                                )}
                            >
                                <p>
                                    {selectedLanguageData.go_third}
                                </p>
                                <div className={styles.nextStep}
                                    style={{ background: 
                                        parm.get("member") === "9" ? "#652B8B" :
                                        parm.get("member") === "10" ? "linear-gradient(#eb008b 0%, #3b058e 100%)"
                                        :""
                                        }}>
                                    {selectedLanguageData.go_second}
                                </div>
                            </div>
                        </>
                    }

                    {ac ?
                        <Modal web={"we"} setAc={setAc} />
                        :
                        <></>
                    }


                </div>
                


            </div>
        </Suspense>
        // </>
    );
}

const askldasd = () => {
    return (
        <Suspense>
            <CaseStoriesDetailPage />
        </Suspense>
    );
};

export default askldasd;
