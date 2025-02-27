"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import styles from "@/app/css/user_detail.module.css";
import Image from "next/image";
import { readlist, work_detail, registerProcess, registerProcessUser } from "../server/work";
import { Question_Post, WorkResponse } from "../type/user";
import { Korean, Ch } from "../type/typedef";
import MoHeader from "../Component/Common/MoHeader";
import Modal from "../Component/Common/Modal";

function Progress() {
    const parm = useSearchParams();
    const router = useRouter()
    const [progressId, setProgressId] = useState<string | null>(null);
    const [work, setWork] = useState<Question_Post[]>([]);
    const [workdetail, setWorkDetail] = useState<WorkResponse[]>([]);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string[] }>({});
    const [textAnswers, setTextAnswers] = useState<{ [key: number]: string }>({});
    const [modal, setModal] = useState<boolean>(false); // 로딩 상태
    const [ac, setAc] = useState<boolean | false>(false);

    const finalData = work.map(user => ({
        questionId: user.id,
        question: user.question,
        answerType: user.answer_type,
        answer: user.answer_type >= 2
            ? textAnswers[user.id] || ""  // 단문/장문형은 그대로 사용
            : (selectedAnswers[user.id] || []).join(", ") // 배열이면 , 로 합치기
    }));

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const progress = parm.get("progress");
                if (progress !== progressId) {
                    setProgressId(progress); // progress가 바뀔 때마다 상태 업데이트
                }
                const data = await readlist(Number(progress));
                const data_detail = await work_detail(Number(progress));
                setWork(data);
                setWorkDetail(data_detail)
            } catch (error) {
                console.log(error)
            }
        };
        fetchUser();
    }, [parm, progressId]);


    // 답변 선택 (단일/복수 공통)
    const handleAnswerSelect = (questionId: number, answer: string, answerType: number) => {
        setSelectedAnswers(prev => {
            const currentAnswers = prev[questionId] || [];

            if (answerType === 0) {
                // 단일 선택: 기존 답변을 새로운 값으로 교체
                return { ...prev, [questionId]: [answer] };
            } else {
                // 복수 선택: 선택/해제 로직
                const newAnswers = currentAnswers.includes(answer)
                    ? currentAnswers.filter(a => a !== answer)
                    : [...currentAnswers, answer];

                return { ...prev, [questionId]: newAnswers };
            }
        });
    };

    // 텍스트 입력 변경
    const handleTextInputChange = (questionId: number, value: string) => {
        setTextAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const handleSubmit = async () => {

        if (finalData.filter(a => a.answer === "").length > 0) {
            alert(parm.get("language") === "0" ? Korean.enter_alert : Ch?.enter_alert)
        }
        else {
            if (!modal) {
                setModal(!modal)
            }
            else {


                for (let i = 0; i < finalData.length; i++) {
                    const response = await registerProcess(
                        {
                            "user": Number(workdetail[0]?.user),
                            "work": workdetail[0]?.id,
                            // "name" : "미입력" ,
                            // "tel" : 0 ,
                            // "marketing" : "n" , 
                            "questions": finalData[i].question,
                            "answers": finalData[i].answer,
                        }
                    );
                    if (response.detail === "Process created successfully") {
                        if (i === finalData.length - 1) {
                            const response_se = await registerProcessUser(
                                {
                                    "id": response.return,
                                    "name": "미입력",
                                    "tel": 0,
                                    "marketing": "n",
                                    "lang": String(parm.get("language"))
                                }
                            );
                            if(parm.get("userId") === null){
                                if (parm.get("language") === "0") {
                                    router.push(`/Certify/?&user=${response_se.return}&language=0&member=${parm.get("member")}`)
                                }
                                else {
                                    router.push(`/Certify/?&user=${response_se.return}&language=1&member=${parm.get("member")}`)
                                }
                            }
                            else{
                                if (parm.get("language") === "0") {
                                    router.push(`/Certify/?&user=${response_se.return}&language=0&member=${parm.get("member")}&userId=${parm.get("userId")}`)
                                }
                                else {
                                    router.push(`/Certify/?&user=${response_se.return}&language=1&member=${parm.get("member")}&userId=${parm.get("userId")}`)
                                }
                            }
                        }
                    }
                    else {
                        alert("에러발생")
                    }

                }
            }



        }

    };


    return (
        <>
            {ac ?
                <Modal web={"wed"} setAc={setAc} />
                :

                <Suspense fallback={<div>Loading...</div>}>
                    {modal ?
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "flex-end",
                                background: "grey",
                                width: "100vw",
                                height: "100vh",
                                // opacity:0.5
                            }}
                        >
                            <div className={styles.innerbox} style={{ borderRadius: "10px 10px 0 0" }}>
                                <div className={styles.endbox}>
                                    <div className={styles.endheader}>
                                        <div style={{ width: "30px", height: "100%" }}>

                                        </div>
                                        <div style={{ width: "250px", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            내 답변확인
                                        </div>
                                        <div style={{ width: "30px", height: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center", marginRight: "20px" }}>
                                            <Image aria-hidden src="/common/close.png" alt="닫기" width={30} height={30} style={{ cursor: "pointer" }}
                                                onClick={() => setModal(!modal)}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.endcontentbox}>
                                        <p className={styles.endcontenttitle}>{workdetail[0]?.choice}</p>

                                        {finalData.map((user, index) => (
                                            <div style={{ display: "flex", flexDirection: "column", marginTop: "20px" }} key={index}>
                                                <div style={{ display: "flex", flexDirection: "row", marginLeft: "15px" }}>
                                                    <p style={{ color: "#1c68ff", fontSize: "14px", fontWeight: "bold" }}>Q{Number(index + 1)}</p>
                                                    <p style={{
                                                        color: "#000", fontSize: "14px", marginLeft: "5px", WebkitLineClamp: 2,
                                                        WebkitBoxOrient: "vertical",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        wordBreak: "break-word",
                                                    }}>{user.question}</p>
                                                </div>
                                                <div style={{ marginTop: "5px", marginLeft: "15px" }}>
                                                    <p style={{
                                                        fontSize: "13px", color: "#84848f", WebkitLineClamp: 2,
                                                        WebkitBoxOrient: "vertical",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        wordBreak: "break-word",
                                                    }}>{user.answer}</p>
                                                </div>
                                            </div>
                                        ))}

                                        <div className={styles.footer}
                                            onClick={() => handleSubmit()}
                                        // onClick={() => router.push(`/Progress/?&progress=${pk}`)}
                                        >
                                            <div className={styles.nextStep}>
                                                {parm.get("language") === "0" ? Korean.ok : Ch?.ok}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
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

                                <div style={{
                                        position: "fixed",
                                        top: 0,  // 상단에 고정
                                        zIndex: 10, // 상위 요소가 덮어쓰지 않도록 zIndex를 높여줌
                                        background: "#f0f5ff", // 배경색
                                    }}
                                >
                                    <MoHeader setAc={setAc} />

                                    <div style={{ width: "100%", height: "117px", display: "flex", flexDirection: "column", background: "#f0f5ff" }}>
                                        <p style={{ marginTop: "18px", fontSize: "20px", fontWeight: "bold", marginLeft: "15px", color: "black" }}>
                                            {workdetail[0]?.choice}
                                        </p>
                                        <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", marginTop: "10px", marginLeft: "15px" }}>
                                            <p style={{ fontSize: "13px", color: "#33405a" }}>
                                                {parm.get("language") === "0" ? Korean.safety : Ch?.safety}
                                            </p>
                                            <p style={{ color: "black", marginRight: "15px", fontSize: "18px", fontWeight: "bold" }}>
                                                {Math.floor((finalData.filter(a => a.answer != "").length / finalData.length) * 100)}%
                                            </p>
                                        </div>

                                        <div style={{ width: "345px", height: "5px", margin: "15px", display: "flex", flexDirection: "row", borderRadius: "20px" }}>
                                            <div style={{
                                                width: (finalData.filter(a => a.answer != "").length / finalData.length) * 100 + "%",
                                                height: "100%",
                                                background: "#1c68ff",
                                                borderRadius: "10px"
                                            }}></div>
                                            <div style={{
                                                width: (finalData.filter(a => a.answer === "").length / finalData.length) * 100 + "%",
                                                height: "100%",
                                                background: "white"
                                            }}></div>
                                        </div>
                                    </div>
                                </div>


                                {work.map((user, index) => (
                                    <div key={user.id} className={styles.qubox}
                                        style={{ marginTop: index === 0 ? "180px" : ""}}>
                                        <p className={styles.qutitle}>
                                            {user.answer_type === 0 ? "단일선택" :
                                                user.answer_type === 1 ? "복수선택" :
                                                    user.answer_type === 2 ? "단문형" : "장문형"}
                                        </p>
                                        <p className={styles.titlesub} style={{
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            wordBreak: "break-word"
                                        }}>{index + 1}. {user.question}</p>

                                        <div className={styles.answerBox}>
                                            {user.answers.map((a) => {
                                                const isSelected = selectedAnswers[user.id]?.includes(a.answer);

                                                return (
                                                    <div key={a.id} className={styles.answerWrapper}>
                                                        {user.answer_type >= 2 ? (
                                                            // 단문형 또는 장문형 입력 처리
                                                            <textarea
                                                                value={textAnswers[user.id] || ""}
                                                                placeholder="내용을 입력해주세요"
                                                                className={styles.quinput}
                                                                style={{
                                                                    background: "#f5f6f9", height: "100px", resize: "none", padding: 20,
                                                                    border: "none", marginTop: "20px", width: "300px"
                                                                }}
                                                                onChange={(e) => handleTextInputChange(user.id, e.target.value)}
                                                            />
                                                        ) : (
                                                            // 단일/복수 선택 처리
                                                            <div
                                                                className={styles.answerItem}
                                                                onClick={() => handleAnswerSelect(user.id, a.answer, user.answer_type)}
                                                                style={{
                                                                    marginTop: "16px", display: "flex", flexDirection: "row",
                                                                    color: isSelected ? "#1b67ff" : "#444", // 선택된 항목 글자 색
                                                                }}
                                                            >

                                                                <Image
                                                                    src={isSelected ? "/member/check_active.png" : "/member/check.png"}
                                                                    alt={isSelected ? "선택됨" : "선택 안됨"}
                                                                    width={20} height={20} />

                                                                <p style={{
                                                                    display: "-webkit-box",
                                                                    WebkitLineClamp: 2,
                                                                    WebkitBoxOrient: "vertical",
                                                                    overflow: "hidden",
                                                                    textOverflow: "ellipsis",
                                                                    wordBreak: "break-word",
                                                                    marginLeft: "8px"
                                                                }}>{a.answer}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}

                                {/* <div className={styles.footer}
                        onClick={handleSubmit}>
                        <div className={styles.nextStep}>
                            제출하기
                        </div>
                    </div> */}

                                <div style={{ width: "100%", height: "56px", display: "flex", flexDirection: "row", marginTop: "50px", marginBottom: "60px" }}>
                                    <div style={{ width: "50%", height: "56px" }}>

                                    </div>
                                    <div style={{
                                        width: "50%", height: "56px", background: "linear-gradient(91deg, #1c68ff 0%, #053cf0 100%)", borderRadius: "5px",
                                        fontSize: "15px", color: "white", display: "flex", justifyContent: "center", alignItems: "center"
                                    }} onClick={handleSubmit}>
                                        {parm.get("language") === "0" ? Korean.enter : Ch?.enter}

                                    </div>
                                </div>


                            </div>
                        </div>
                    }
                </Suspense>
            }
        </>
    );
}

const OAuthTokenPage = () => {
    return (
        <Suspense>
            <Progress />
        </Suspense>
    );
};

export default OAuthTokenPage;