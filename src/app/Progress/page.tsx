"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "@/app/css/user_detail.module.css";
import Image from "next/image";
import { readlist } from "../server/work";
import { Question_Post } from "../type/user";

export default function Progress() {
    const parm = useSearchParams();
    const [work, setWork] = useState<Question_Post[] | []>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);  // 단일 선택
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);  // 복수 선택
    const [textAnswers, setTextAnswers] = useState<{ [key: number]: string }>({}); // 텍스트 입력값 상태

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await readlist(Number(parm.get("progress")));
                setWork(data);
            } catch (error) {
                console.error("유저 데이터를 불러오는 중 오류 발생:", error);
            }
        };
        fetchUser();
    }, [parm.get("progress")]);

    const handleSingleSelect = (answerId: string) => {
        setSelectedAnswer(answerId); // 단일선택
    };

    const handleMultipleSelect = (answerId: string) => {
        if (selectedAnswers.includes(answerId)) {
            // 이미 선택된 항목은 비활성화
            setSelectedAnswers(selectedAnswers.filter(id => id !== answerId));
        } else {
            // 새로운 항목은 선택
            setSelectedAnswers([...selectedAnswers, answerId]);
        }
    };

    const handleTextInputChange = (questionId: number, value: string) => {
        setTextAnswers(prev => ({ ...prev, [questionId]: value }));
    };


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
                <div className={styles.headerbox}>
                    <Image aria-hidden src="/member/back.png" alt="뒤로가기" width={30} height={30} />
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

                {work?.map((user, index) => (
                    <div key={index} className={styles.qubox}>
                        <p className={styles.qutitle} style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            wordBreak: "break-word"
                        }}>
                            {user?.answer_type === 0 ? "단일선택" :
                                user?.answer_type === 1 ? "복수선택" :
                                    user?.answer_type === 2 ? "단문형" : "장문형"
                            }</p>
                        <p className={styles.titlesub} style={{ marginTop: "10px" }}>{index} . {user?.question}</p>

                        {user.answers.map((a, index) => {
                            const isSelected = selectedAnswers.includes(a.answer) || selectedAnswer === a.answer;

                            return (
                                <>
                                    {user?.answer_type === 2 || user?.answer_type === 3 ? (
                                        <textarea
                                            value={textAnswers[a.id] || ""}
                                            placeholder="내용을 입력해주세요"
                                            className={styles.quinput}
                                            style={{
                                                background: "#f5f6f9", height: "100px", resize: "none", padding: 20,
                                                border: "none", marginTop: "20px"
                                            }}
                                            onChange={(e) => handleTextInputChange(a.id, e.target.value)}
                                        />
                                    ) : (
                                        <div
                                            key={index}
                                            style={{
                                                marginTop: "16px", display: "flex", flexDirection: "row",
                                                color: isSelected ? "#1b67ff" : "#444", // 선택된 항목 글자 색
                                            }}
                                            onClick={() => {
                                                if (user.answer_type === 0) {
                                                    handleSingleSelect(a.answer); // 단일 선택
                                                } else {
                                                    handleMultipleSelect(a.answer); // 복수 선택
                                                }
                                            }}
                                        >
                                            <Image aria-hidden src="/admin/sort.png" alt="뒤로가기" width={20} height={20}
                                                style={{ marginRight: "8px" }}
                                            />
                                            <p style={{
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                wordBreak: "break-word"
                                            }}>{a.answer}</p>
                                        </div>
                                    )}
                                </>
                            )
                        })}
                    </div>
                ))}
                {/* <button onClick={handleSubmit}>전송</button> */}
            </div>
        </div>
    );
}
