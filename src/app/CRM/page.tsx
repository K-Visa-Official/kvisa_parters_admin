"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import styles from "@/app/css/user_detail.module.css";
import Image from "next/image";
import { Korean, Ch } from "../type/typedef";
import MoHeader from "../Component/Common/MoHeader";
import FilterInputBox from "../Component/Common/FilterInputBox";
import { get_crm } from "../server/work";
import { CRM_res } from "../type/user";
import Modal from "../Component/Common/Modal";

import useWindowWidth from "@/app/hooks/useWindowWidth";
import Footer from "../Component/Common/Footer";

function CRM() {
    const parm = useSearchParams();
    const router = useRouter()
    const [workNumber, setWorkNumber] = useState<string | "">("");
    const [ceNumber, setCeNumber] = useState<string | null>(null);
    const [active, setActive] = useState<boolean>(false);
    const [firstActive, setFirstActive] = useState<boolean>(false);
    const [secondActive, setSecondActive] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(60); // 3분 타이머 설정 (180초)
    const [state, setState] = useState<number>(1); // 3분 타이머 설정 (180초)

    const [li, setLi] = useState<CRM_res[] | []>([]);
    const [ac, setAc] = useState<boolean | false>(false);
    const width = useWindowWidth()
    const arra = ["접수완료", "계약완료", "서류작성", "심사진행", "처리완료", "상담종료"]
    const arra_zh = ["提交完成", "合同完成", "资料准备", "审查进行中", "办理完成", "咨询结束"]
    const userId = parm.get("userId");
    const languageMap = {
        Korean,
        Ch
    };
    
    
    const selectedLanguage = parm.get("language") === "0" ? "Korean" : "Ch"; // 예시로 "Korean"과 "Ch"를 사용
    
    const selectedLanguageData = languageMap[selectedLanguage as keyof typeof languageMap];

    // 타이머 관련 useEffect
    useEffect(() => {
        if (active) {
            setActive(false);
        }
    }, [workNumber]); // tel이 변경될 때 실행

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (active && timer > 0) {
            interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000); // 1초마다 타이머 감소
        }

        if (timer === 0) {
            setActive(false);
            setTimer(180); // 타이머 초기화
        }

        return () => clearInterval(interval);
    }, [active, timer]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const member = parm.get("member");
                const userId = parm.get("userId");
    
                // member가 "6"일 때 userId가 없으면 404로 리다이렉트
                if (member === "6" && !userId) {
                    router.replace("/404");
                    return; // 더 이상 진행하지 않음
                }
    
                // userId에 따라 데이터 가져오기
                const data = await get_crm(
                    userId ? undefined : workNumber, 
                    userId ? `${userId}^` : undefined
                );
    
                setLi(data);
                console.log(data);
                if (member === "6") setState(2); // state를 2로 설정
    
            } catch (error) {
                console.error("유저 데이터를 불러오는 중 오류 발생:", error);
            }
        };
    
        fetchUser();
    }, [state, parm.get("userId")]);


// console.log(li)
// console.log(state)

    const sendMessage = () => {
        if (workNumber === "") {
            setFirstActive(true);
        } else {
            setActive(true);
            fetch(`https://kimseongwon.store/api/verify-mobile-number/${workNumber.replaceAll("-", "")}?&type=test`, {
                method: 'GET',
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('서버 오류 발생: ' + response.status);
                    }
                    return response.text();
                })
                .catch(error => alert(error));
        }
    };

    const certify = async () => {
        if (ceNumber === "") {
            setSecondActive(true);
        }
        else {
            const response = await fetch(`https://kimseongwon.store/api/verify-mobile-number`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mobile_num: workNumber.replaceAll("-", ""),
                    certification_num: ceNumber,
                }),
            });

            if (response.status === 200) {
                setState(2)
                // 비동기 작업을 처리할 경우 이곳에 작성
            } else {

                setSecondActive(true);
                // 인증번호 불일치 처리
            }
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    };


    return (
        <>
            {ac ?
                <Modal web={"wed"} setAc={setAc} />
                :
                <Suspense fallback={<div>Loading...</div>}>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", background: "#f5f6f9", width: "100%", height: "auto", overflowY: "auto" ,
                         fontFamily: parm.get("language") === "0" ? "'Spoqa Han Sans Neo', 'malgun', 'Apple SD Gothic Neo', Verdana, Arial, Helvetica, Geneva, Tahoma, sans-serif" : 
                         "Noto Sans, sans-serif",
                     }}>
                        <div className={styles.innerbox} style={{ width:"500px"}}>
                            <MoHeader setAc={setAc} />

                            {state === 1 ?
                                <div className={styles.crminner}>
                                    <div style={{ width: width < 375 ? "100%" : "345px", display: "flex", justifyContent: "center", alignItems: "flex-start", flexDirection: "column" }}>

                                        <p style={{ marginTop: "10px", color: "black" , fontWeight:"bold" }}>
                                            {selectedLanguageData.bu_progress}
                                        </p>
                                        <p style={{ marginTop: "6px", fontSize: "12px", color: "#84848f" }}>
                                            {selectedLanguageData.bu_progress_first}<br />
                                            {selectedLanguageData.bu_progress_second}
                                        </p>
                                        <p style={{ marginTop: "40px", fontSize: "12px", color: "#84848f" }}>
                                            {selectedLanguageData.bu_progress_tel}
                                        </p>
                                    </div>

                                    <div style={{
                                        width: width < 375 ? "100%" : "345px", height: "50px", marginTop: "10px", background: "#f5f6f9", display: "flex",
                                        flexDirection: width < 375 ? "column" : "row"
                                    }}>
                                        <FilterInputBox
                                            w={270} h={50} mt={0} bg={"#f5f6f9"}
                                            p={selectedLanguageData.bu_progress_tel}
                                            v={workNumber} type={"tel"}
                                            onChange={(e) => setWorkNumber(e.target.value)}
                                        />
                                        <div style={{
                                            width: width < 375 ? "100%" : "75px", height: "50px",
                                            background: width < 375 ? "" : "#f5f6f9", marginTop: width < 375 ? "10px" : "",
                                            display: "flex", justifyContent: "center", alignItems: "center"
                                        }}>
                                            <div
                                                style={{
                                                    display: "flex", justifyContent: "center", alignItems: "center", background: "black", fontSize: "13px", color: "white",
                                                    width: "65px", height: "30px", borderRadius: "5px",
                                                }}
                                                onClick={sendMessage}
                                            >
                                                {selectedLanguageData.certi_active}
                                            </div>
                                        </div>
                                    </div>

                                    {firstActive && (
                                        <p style={{ fontSize: "12px", color: "#ff1c8e", marginTop: "10px", fontWeight: "500" }}>
                                            {selectedLanguageData.certi_tel_input}
                                        </p>
                                    )}

                                    <p style={{ marginTop: width < 375 ? "50px" : "10px", fontSize: "12px", color: "#1c68ff" }}>
                                        {selectedLanguageData.bu_progress_ex}
                                    </p>

                                    {active && (
                                        <div style={{ width: "345px", height: "50px", marginTop: "35px", background: "#f5f6f9", display: "flex", flexDirection: "row" }}>
                                            <FilterInputBox
                                                w={270} h={50} mt={0} bg={"#f5f6f9"}
                                                p={selectedLanguageData.certi_no}
                                                v={ceNumber}
                                                onChange={(e) => setCeNumber(e.target.value)}
                                            />
                                            <div style={{ width: "75px", height: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <div
                                                    style={{
                                                        display: "flex", justifyContent: "center", alignItems: "center", fontSize: "14px", color: "#ff1c8e",
                                                        width: "65px", height: "30px", borderRadius: "5px",
                                                    }}
                                                >
                                                    {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {secondActive && (
                                        <p style={{ fontSize: "12px", color: "#ff1c8e", marginTop: "10px", fontWeight: "500" }}>
                                            {selectedLanguageData.certi_nonumber}
                                        </p>
                                    )}

                                    {active && (
                                        <div
                                            style={{
                                                marginTop: "50px", width: "345px", height: "60px", background: "linear-gradient(to left, #33405a, #112448)", color: "white",
                                                display: "flex", justifyContent: "center", alignItems: "center", fontSize: "18px", borderRadius: "5px"
                                            }}
                                            onClick={certify}
                                        >
                                            {selectedLanguageData.certi_next}
                                        </div>
                                    )}

                                    <Image
                                        src='/crm/Main_ad.png'
                                        alt="close"
                                        width={345}
                                        height={310}
                                        style={{ marginTop: "75px" }}
                                        layout="responsive"
                                        onClick={() => window.open("https://www.k-visa.net", "_blank")}
                                    />
                                </div>
                                :
                                <div className={styles.crminner}>
                                    <div style={{ width: width < 375 ? "100%" : "100%", display: "flex", justifyContent: "center", alignItems: "flex-start", flexDirection: "column" }}>

                                        <div style={{ marginTop: "10px", color: "black", display: "flex", flexDirection: "row" }}>
                                            <Image
                                                aria-hidden
                                                src='/crm/crm_logo.png'
                                                alt="close"
                                                width={24}
                                                height={24}
                                                style={{ marginRight: "4px" }}
                                            />
                                            <p style={{ fontWeight:"bold"}}>
                                                {selectedLanguageData.progress}
                                            </p>
                                        </div>

                                        <p style={{ marginTop: "6px", fontSize: "12px", color: "#84848f" }}>
                                            {parm.get("language") === "0" ? Korean.pro_cer : Ch.progress}
                                        </p>
                                    </div>

                                    {li?.map((user) => (
                                        <div className={styles.probox} key={user.id}>
                                            <p style={{ fontSize: "20px", color: "black", fontWeight: "600" }}>
                                            {selectedLanguageData.crm_first}
                                                </p>
                                            <p style={{ fontSize: "15px", color: "#84848f", fontWeight: "500", marginTop: "10px" }}>{selectedLanguageData.crm_second}<br />
                                            {selectedLanguageData.crm_third}</p>
                                            <div style={{ display: "flex", flexDirection: "column", marginTop: "23px" }}>
                                                <Image
                                                    aria-hidden
                                                    src='/crm/cabby.png'
                                                    alt="close"
                                                    width={57}
                                                    height={67}
                                                    style={{
                                                        marginLeft:
                                                            user.state === 0 ? "10px" :
                                                                user.state === 1 ? "45px" :
                                                                    user.state === 2 ? "100px" :
                                                                        user.state === 3 ? "155px" :
                                                                            user.state === 4 ? "205px" : "263px"
                                                    }}
                                                />
                                                <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "5px", borderRadius: "2.5px" }}>
                                                    <div style={{
                                                        display: "flex", flexDirection: "row", borderRadius: "2.5px",
                                                        width: user.state === 0 ? "5%" :
                                                            user.state === 1 ? "25%" :
                                                                user.state === 2 ? "40%" :
                                                                    user.state === 3 ? "57%" :
                                                                        user.state === 4 ? "73%" : "100%"
                                                        , background: "#1c68ff"
                                                    }}>

                                                    </div>
                                                    <div style={{
                                                        display: "flex", flexDirection: "row", borderRadius: "2.5px",
                                                        width: user.state === 0 ? "95%" :
                                                            user.state === 1 ? "75%" :
                                                                user.state === 2 ? "60%" :
                                                                    user.state === 3 ? "43%" :
                                                                        user.state === 4 ? "27%" : "0%"
                                                        , background: "white"
                                                    }}>

                                                    </div>
                                                </div>
                                                <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                                    {(parm.get("language") === "0" ? arra : arra_zh)?.map((user, index) => (
                                                        <div
                                                            key={index}
                                                            style={{ fontSize: "12px", color: "#84848f", marginTop: "3px", display: "flex", justifyContent: "space-between", width: "100%" }}
                                                        >
                                                            {user}
                                                        </div>
                                                    ))}
                                                </div>

                                                <p style={{ marginTop: "10px", color: "#1c69ff", fontSize: "12px", fontWeight: "500" }}>
                                                {selectedLanguageData.crm_four}
                                                </p>

                                                <div className={styles.contenttal}>
                                                    <div className={styles.daybox}>
                                                    {selectedLanguageData.crm_info_first} : {formatDate(user.created_at)}
                                                    </div>

                                                    <div style={{ width: "100%", height: "15px", fontSize: "13px", fontWeight: "500", display: "flex", flexDirection: "row", marginTop: "20px" }}>
                                                        <div style={{ width: "30%", color: "rgb(132, 132, 143)" }}>
                                                            {selectedLanguageData.crm_info_second}
                                                        </div>
                                                        <div style={{ width: "70%", color: "black" }}>
                                                        {parm.get("language") === "0" ? 
                                                        (Number(user.lang) === 0 ? "한국어"  : "중국어")
                                                        :
                                                        (Number(user.lang) === 0 ? "韩文"  : "中文")
                                                        }

                                                        </div>
                                                    </div>

                                                    <div style={{ width: "100%", height: "15px", fontSize: "13px", fontWeight: "500", display: "flex", flexDirection: "row", marginTop: "20px" }}>
                                                        <div style={{ width: "30%", color: "rgb(132, 132, 143)" }}>
                                                        {selectedLanguageData.crm_info_third}
                                                        </div>
                                                        <div style={{ width: "70%", color: "black" }}>
                                                            
                                                            {user.work.choice}
                                                        </div>
                                                    </div>

                                                    <div style={{ width: "100%", height: "15px", fontSize: "13px", fontWeight: "500", display: "flex", flexDirection: "row", marginTop: "20px" }}>
                                                        <div style={{ width: "30%", color: "rgb(132, 132, 143)" }}>
                                                            
                                                        {selectedLanguageData.crm_info_four}
                                                        </div>
                                                        <div style={{ width: "70%", color: "black" }}>
                                                        {user.name.split("^")[0].replace(/.(.+)/, (match, p1) => match[0] + "*".repeat(p1.length))}
                                                        </div>
                                                    </div>

                                                    <div style={{ width: "100%", height: "15px", fontSize: "13px", fontWeight: "500", display: "flex", flexDirection: "row", marginTop: "20px" }}>
                                                        <div style={{ width: "30%", color: "rgb(132, 132, 143)" }}>
                                                            
                                                        {selectedLanguageData.certi_tel}
                                                        </div>
                                                        <div style={{ width: "70%", color: "black" }}>
                                                            {user.tel.replace(/(\d{3})-\d{4}-(\d{4})/, "$1-****-$2")}
                                                        </div>
                                                    </div>

                                                    <div style={{ width: "100%", height: "15px", fontSize: "13px", fontWeight: "500", display: "flex", flexDirection: "row", marginTop: "20px" }}>
                                                        <div style={{ width: "30%", color: "rgb(132, 132, 143)" }}>
                                                            
                                                        {selectedLanguageData.crm_info_six}
                                                        </div>
                                                        <div style={{ width: "70%", color: "black" }}>
                                                            {(() => {
                                                                const stateText =
                                                                    user.state === 0 ? "접수완료" :
                                                                        user.state === 1 ? "계약완료" :
                                                                            user.state === 2 ? "서류작성" :
                                                                                user.state === 3 ? "심사진행" :
                                                                                    user.state === 4 ? "처리완료" : "상담종료";

                                                                const stateText_zh =
                                                                    user.state === 0 ? "提交完成" :
                                                                        user.state === 1 ? "合同完成" :
                                                                            user.state === 2 ? "资料准备" :
                                                                                user.state === 3 ? "审查进行中" :
                                                                                    user.state === 4 ? "办理完成" : "咨询结束";


                                                                return parm.get("language") === "0" ? stateText : stateText_zh;
                                                            })()}
                                                        </div>
                                                    </div>
                                                </div>


                                                <div style={{ width: "100%", height: "47px", fontSize: "12px", fontWeight: "500", display: "flex", flexDirection: "row", marginTop: "20px", 
                                                    justifyContent: parm.get("userId") === null ? "space-between" : "center" }}>
                                                    <div className={styles.firstboxsd}>
                                                    <a href="tel:+821811-1942">
                                                    {selectedLanguageData.work_tel}<br />
                                                        1811-1942
                                                        </a>
                                                    </div>

                                                    
                                                    {parm.get("userId") === null ?
                                                     <div className={styles.secondboxsd}>
                                                        <a href="https://pf.kakao.com/_mYlIxj/chat">
                                                            {selectedLanguageData.work_kakao}
                                                        </a>
                                                    </div>
                                                    :
                                                    <>
                                                  
                                                    </>
                                                    }

                                                </div>

                                                <p style={{ marginTop: "10px", color: "#1c69ff", fontSize: "12px", fontWeight: "500" }}>
                                                {selectedLanguageData.work_time}
                                                    {/* 업무시간 : 평일 9:00 ~ 18:00 ( 점심시간 : 12:00 ~13:00 ) */}
                                                </p>

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                            <Footer/>

                        </div>
                    </div>
                </Suspense>
            }
        </>

    );
}


const askldasd = () => {
    return (
        <Suspense>
            <CRM />
        </Suspense>
    );
};

export default askldasd;
