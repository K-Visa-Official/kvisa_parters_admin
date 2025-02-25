"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { getUser, getUserApi } from "@/app/server/admin_user";
import { UserList, WorkResponse } from "../type/user";
import { useState, useEffect, Suspense } from "react";
import styles from "@/app/css/user_detail.module.css";
import Image from "next/image";
import { Korean  , Ch} from "../type/typedef";
import MoHeader from "../Component/Common/MoHeader";
import Modal from "../Component/Common/Modal";

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

    window.JBPrivateBankBridge = {
        callNative: function(message) {
          const decodedMessage = decodeURIComponent(message);
          const data = JSON.parse(decodedMessage);
          const url = data.param.url;  // 전달된 URL 값
      
          console.log("받은 URL:", url);  // URL 확인
      
          // 'ko'가 URL에 포함되어 있는지 확인
          if (url.includes("ko")) {
            // 'ko'가 포함되어 있으면 language=0
            window.location.href = "https://main.d1ixxx006maf83.amplifyapp.com/Member?&member=6&language=0";
          } else {
            // 'ko'가 포함되어 있지 않으면 language=1
            window.location.href = "https://main.d1ixxx006maf83.amplifyapp.com/Member?&member=6&language=1";
          }
        }
      };
      
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const member = parm.get("member");
                if (member !== memberId) {
                    setMemberId(member);  // memberId가 바뀔 때 상태 업데이트
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
                    width: "100vw",
                    height: "auto",
                }}
            >
                <div className={styles.innerbox}>
                    {/* 헤더 */}
                    <MoHeader state={state} setState={setState} setAc={setAc}/>


                    {state === 1 ?
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
                            <p className={styles.title}>
                                {parm.get("language") === "0" ? Korean.title : Ch.title} <br />
                                {parm.get("language") === "0" ? Korean.title_second : Ch.title_second}</p>

                            {work?.map((user) => (
                                <div key={user.id} > 
                                    {work[0]?.choice === undefined ?
                                        null
                                        :
                                        <div key={user.id}>
                                            <div className={styles.post} onClick={() => (
                                                setUrl(user.detail_second),
                                                setState(2),
                                                setPk(user?.id)
                                            )}
                                            >
                                                {/* <img src={user?.detail} className={styles.postimg} alt="profile"/> */}
                                                <Image src={user?.detail} className={styles.postimg} alt="profile" width={345} height={200} />
                                                <div className={styles.nextstep}>
                                                    {parm.get("language") === "0" ? Korean.go: Ch.go}
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
                                    }

                                </div>
                            ))}

                            <div className={styles.post} onClick={() => router.push(`/CRM?&language=${parm.get("language")}`)}>
                                <div className={styles.postimg} style={{ color: "black" }}>
                                    <Image
                                        aria-hidden
                                        src="/common/CRM.png"
                                        alt="다음"
                                        width={345}
                                        height={200}
                                    /></div>
                                {/* <img src={user?.detail} className={styles.postimg} /> */}
                                <div className={styles.nextstep}>
                                {parm.get("language") === "0" ? Korean.go: Ch.go}
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
                            <p style={{ marginTop: "15px", fontSize: "18px", color: "black", fontWeight: "600" }}>{parm.get("language") === "0" ? Korean.progress: Ch.progress}</p>

                            <p style={{ marginTop: "6px", fontSize: "13px", color: "#84848f", fontWeight: "500" , marginBottom:"120px" }}>
                                {parm.get("language") === "0" ? Korean.progress_first : Ch?.progress_first}<br />
                                {parm.get("language") === "0" ? Korean.progress_second : Ch.progress_second}
                                </p>
                        </div>
                        :
                        <>
                            <div style={{ position: "relative", width: "100%", height: "auto" }}>
                                <Image src={url} alt="샘플 이미지" layout="responsive" width={16} height={9} />
                            </div>

                            <div className={styles.footer}
                                onClick={() => router.push(
                                    parm.get("language") === "0" ?
                                    `/Progress/?&progress=${pk}&language=0&member=${parm.get("member")}` :
                                    `/Progress/?&progress=${pk}&language=1&member=${parm.get("member")}`
                                )}
                            >
                                <p>
                                    {parm.get("language") === "0" ? Korean.go_third: Ch.go_third }
                                </p>
                                <div className={styles.nextStep}>
                                    {parm.get("language") === "0" ? Korean.go_second: Ch.go_second }
                                </div>
                            </div>
                        </>

                    }

                    {ac ?
                    <Modal web={"we"} setAc={setAc}/>
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
