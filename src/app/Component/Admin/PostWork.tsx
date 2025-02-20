"use client";

import styles from "@/app/css/modal.module.css";
import Image from "next/image";
import { useState } from "react";
import FilterInputBox from "../Common/FilterInputBox";
import Modal from "../Common/Modal";
import { useRef } from "react";

interface WorkPostProps {
    onClose: () => void;
    n?: number;
    la?: string;
}

interface Answer {
    answer: string;
    sort: number;
}

interface Question {
    question: string;
    answer_type: number;
    answers: Answer[];
    isExpanded: boolean;
}

export default function PostWork({ onClose, n = 0, la }: WorkPostProps) {
    const [work, setWork] = useState<string | "업무를 선택해주세요">("업무를 선택해주세요");
    const [content, setContent] = useState<string | "">("");
    const [active, setActive] = useState<boolean>(false); // 로딩 상태
    const [file, setFile] = useState<File | null>(null);
    const [state, setState] = useState<number | 3>(3);
    const [alert, setAlert] = useState<boolean>(false); // 로딩 상태
    const [file_detail, setFile_Detail] = useState<File | null>(null);
    const [questionsac, setQuestionsac] = useState<boolean>(false); // 로딩 상태
    const [questions, setQuestions] = useState<Question[]>([
        {
            question: "",
            answer_type: 0,
            answers: [],
            isExpanded: false,  // 드롭다운 상태 추가
        },
    ]);

    // 1번째 상세이미지
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const fileDetailInputRef = useRef<HTMLInputElement | null>(null);

    // first_detail 사진 변경 클릭 시 input 클릭
    const handleClickChangeDetail = () => {
        if (fileDetailInputRef.current) {
            fileDetailInputRef.current.click();
        }
    };

    // 1번째 상세이미지
    const handleFileChangeDetail = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile_Detail(event.target.files[0]);
        }
    };

    // 질문 추가 함수
    const addQuestion = () => {
        setQuestions([
            ...questions,
            {
                question: "",
                answer_type: 0,
                answers: [],
                isExpanded: false
            },
        ]);
    };

    // 질문 수정 함수
    const updateQuestion = (index: number, newQuestion: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].question = newQuestion;
        setQuestions(updatedQuestions);
    };

    // 질문 삭제 함수
    const removeQuestion = (index: number) => {
        setQuestions(questions.filter((_, qIndex) => qIndex !== index));
    };

    // 답변 추가 함수
    const addAnswer = (qIndex: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].answers.push({
            answer: "",
            sort: updatedQuestions[qIndex].answers.length + 1,
        });
        setQuestions(updatedQuestions);
    };

    // 답변 수정 함수
    const updateAnswer = (qIndex: number, aIndex: number, newAnswer: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].answers[aIndex].answer = newAnswer;
        setQuestions(updatedQuestions);
    };

    // 답변 삭제 함수
    const removeAnswer = (qIndex: number, aIndex: number) => {
        const updatedQuestions = [...questions];
        
        // 해당 질문의 answers 배열에서 특정 답변을 삭제
        updatedQuestions[qIndex].answers = updatedQuestions[qIndex].answers
            .filter((_, ansIndex) => ansIndex !== aIndex)
            .map((answer, index) => ({
                ...answer,
                sort: index + 1, // 삭제 후 sort 값 재정렬 (1부터 시작)
            }));
    
        setQuestions(updatedQuestions);
    };

    function NextStep() {
        if (state === 1) {
            if (work === "업무를 선택해주세요" || content === "" || file === null) {
                setAlert(true)
            }
            else {
                setState(2)
            }
        }
        else if (state === 2) {
            if (file_detail === null) {
                setAlert(true)
            }
            else {
                setState(3)
            }
        }
        else if (state === 3) {

            const transformedData = {
                user: n, // 사용자 ID
                language: la === "ko" ? 0 : 1, // 언어 코드
                choice: work, // 선택된 업무
                work_detail: content, // 업무에 대한 상세 설명
                questions: questions.map((question) => ({
                    question: question.question, // 질문 텍스트
                    answer_type: question.answer_type, // 답변 타입
                    answers: question.answers.map((answer) => ({
                        answer: answer.answer, // 답변 내용
                        sort: answer.sort, // 답변 순서
                    })),
                })),
            };

            console.log(transformedData)
        }
    }

    return (
        <>
            {alert && <Modal t={state === 1 ? "입력안된 정보가 있습니다" : "이미지를 확인해주세요"} s={state === 1 ? "빈칸을 확인해주세요" : ""} c={"확인"} onClose={() => setAlert(false)} />}
            <div className={styles.postworktotal}>
                <div className={styles.modaltitle}>
                    <span style={{ marginLeft: "30px" }}>
                        {state === 1 ?
                            "B2B 업무등록" :
                            state === 2 ? "상세이미지" : "질문등록"
                        }
                    </span>
                    <Image
                        aria-hidden
                        src='/common/close.png'
                        alt="close"
                        width={30}
                        height={30}
                        onClick={onClose}
                        style={{ marginRight: "30px" }}
                    />
                </div>
                {/* {modalactive && <Modal t={"회원가입에 실패하였습니다"} s={"정보를 확인해주세요"} c={"확인"} onClose={() => setModalActive(false)} />} */}
                {state === 1 ?
                    <div className={styles.postcontentbox}>

                        <div className={styles.worktitle}>
                            <div className={styles.woti}>
                                <span>언어선택</span>
                            </div>

                            <div className={styles.wola}>
                                {la === "ko" ? "한국어" : la === "ch" ? "중국어" : ""}
                            </div>
                        </div>

                        <div className={styles.worktitle} style={{ marginTop: "18px" }}>
                            <div className={styles.woti}>
                                <span>업무선택</span>
                            </div>

                            <div style={{ height: "auto", zIndex: "2" }}>
                                <div className={styles.woch} onClick={() => setActive(!active)}>
                                    <p style={{
                                        marginLeft: "15px",
                                        color: work !== "업무를 선택해주세요" ? "black" : "#bcbdc4"
                                    }}>{work}</p>
                                    <Image
                                        aria-hidden
                                        src={"/admin/arrow_active.png"}
                                        alt="etc icon"
                                        width={16}
                                        height={16}
                                        style={{ rotate: "0deg", marginRight: "20px" }}
                                    />
                                </div>
                                {active ?
                                    <div className={styles.tooltipBox} onClick={() => setActive(false)}>
                                        <div className={styles.woch}
                                            style={{ background: "white" }}
                                            onClick={() => (
                                                setActive(true),
                                                setWork("맞춤형 비자상담 서비스")
                                            )}
                                        >
                                            <p style={{ marginLeft: "15px" }}>맞춤형 비자상담 서비스</p>
                                        </div>
                                        <div className={styles.woch}
                                            style={{ background: "white", borderTop: "solid 1px #ebecf1" }}
                                            onClick={() => (
                                                setActive(true),
                                                setWork("외국인 범죄/불법체류자 구제")
                                            )}
                                        >
                                            <p style={{ marginLeft: "15px" }}>외국인 범죄/불법체류자 구제</p>
                                        </div>
                                    </div>
                                    : <></>
                                }
                            </div>
                            {/* <div className={styles.woch} onClick={() => setActive(true)}>
             <p style={{ marginLeft: "15px" }}>업무를 선택해주세요</p>
             <Image
                 aria-hidden
                 src={"/admin/arrow_active.png"}
                 alt="etc icon"
                 width={16}
                 height={16}
                 style={{ rotate: "0deg", marginRight: "20px" }}
             />
         </div>
         {active && (
             <div className={styles.tooltipBox} onClick={() => setActive(false)}>
                 <div className={styles.woch} onClick={() => setActive(true)}>
                     <p style={{ marginLeft: "15px" }}>맞춤형 비자상담 서비스</p>
                     <p style={{ marginLeft: "15px" }}>외국인 범죄/불법체류자 구제</p>
                 </div>
             </div>
         )} */}
                        </div>

                        <div className={styles.wochcontent} style={{ marginTop: "18px" }}>
                            <div className={styles.woti}>
                                <span>세부정보</span>
                            </div>
                            <FilterInputBox w={850} h={80} mt={0} bg={"#f5f6f9"} p={"세부정보 입력"} v={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>

                        <div className={styles.wochcontent} style={{ marginTop: "18px", height: "145px" }}>
                            <div className={styles.woti} style={{ height: "100%", alignItems: "flex-start" }}>
                                <span>상세페이지</span>
                            </div>
                            <label
                                htmlFor="file-upload"
                                style={{
                                    width: "300px",
                                    height: "145px",
                                    border: "solid 1px #1c68ff",
                                    borderRadius: "10px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    textAlign: "center",
                                    color: "#1c68ff",
                                }}
                            >
                                {file ? (
                                    // 선택된 이미지 미리보기
                                    <div style={{
                                        backgroundImage: `url(${URL.createObjectURL(file)})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        width: "300px",
                                        height: "145px",
                                        borderRadius: "10px",
                                        display: "flex", justifyContent: "center", alignItems: "center"
                                    }}>
                                        <p className={styles.chph}>사진변경</p>
                                    </div>
                                ) : (
                                    <>
                                        <Image
                                            aria-hidden
                                            src="/admin/user_image.png"
                                            alt="logo"
                                            width={34}
                                            height={34}
                                        />
                                        <p style={{ marginTop: "5px" }}>썸네일 이미지 등록</p>
                                    </>
                                )}

                                {/* 숨겨진 파일 업로드 input */}
                                <input
                                    type="file"
                                    id="file-upload"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    style={{
                                        position: "absolute",
                                        width: "1px",
                                        height: "1px",
                                        padding: 0,
                                        margin: "-1px",
                                        overflow: "hidden",
                                        border: 0,
                                        clip: "rect(0,0,0,0)",
                                    }} // 완전히 숨김
                                />
                            </label>
                        </div>

                    </div>
                    : state === 2 ?
                        <div className={styles.postcontentboxse} style={{ background: "#f5f6f9" }}>
                            <div className={styles.photoinner}>
                                <div className={styles.phototop}>
                                    <label
                                        htmlFor="file-upload"
                                        style={{
                                            display: 'flex',
                                            justifyContent: "center",
                                            alignItems: "center",
                                            flexDirection: "column"
                                        }}
                                    >
                                        {file_detail ? (
                                            // 선택된 이미지 미리보기
                                            <>
                                                <Image
                                                    aria-hidden
                                                    src="/common/plus_image.png"
                                                    alt="close"
                                                    width={30}
                                                    height={30}
                                                    style={{ cursor: "pointer" }}
                                                />
                                                <p>사진</p>
                                            </>
                                        ) : (
                                            <>
                                                <Image
                                                    aria-hidden
                                                    src="/common/plus_image.png"
                                                    alt="close"
                                                    width={30}
                                                    height={30}
                                                    style={{ cursor: "pointer" }}
                                                />
                                                <p>사진</p>
                                            </>
                                        )}

                                        {/* 숨겨진 파일 업로드 input */}
                                        <input
                                            ref={fileDetailInputRef}
                                            type="file"
                                            id="file-upload"
                                            accept="image/*"
                                            onChange={handleFileChangeDetail}
                                            style={{
                                                position: "absolute",
                                                width: "1px",
                                                height: "1px",
                                                padding: 0,
                                                margin: "-1px",
                                                overflow: "hidden",
                                                border: 0,
                                                clip: "rect(0,0,0,0)",
                                            }} // 완전히 숨김
                                        />
                                    </label>
                                </div>

                                {file_detail ?
                                    <div
                                        onClick={handleClickChangeDetail}
                                        style={{
                                            backgroundImage: `url(${URL.createObjectURL(file_detail)})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            width: "100%",
                                            height: "710px",
                                            borderRadius: "10px",
                                            display: "flex", justifyContent: "center", alignItems: "center"
                                        }}>
                                        <p className={styles.chph}>사진변경</p>
                                    </div>
                                    :
                                    <></>

                                }
                            </div>
                        </div>
                        :
                        <div className={styles.postcontentbox} style={{ width: "100%", marginLeft: "0px" }} >
                            <div className={styles.qubox}>
                                <div style={{ marginTop: "30px", height: "100%" }}>
                                    <div style={{ height: "auto", width: "100%"  }}>
                                        {/* 질문 목록 */}
                                        {questions.map((question, qIndex) => (
                                            <div key={qIndex} style={{  borderBottom:"1px solid #bfbfbf" , paddingBottom:"30px" , marginTop:"15px"}}>
                                                {/* 질문 수정 */}
                                                <div style={{ marginLeft: "30px", marginRight: "30px", display: "flex", justifyContent: "space-between", flexDirection: "row" }}>

                                                    <FilterInputBox w={750} h={50} mt={0} bg={"#f5f6f9"} p={"질문을 입력해주세요"} v={question.question}
                                                        onChange={(e) => updateQuestion(qIndex, e.target.value)}
                                                    />
                                                    <div style={{ height: "auto", zIndex: "2", width: "200px" }}>
                                                        <div className={styles.wochqu} onClick={() => {
                                                            const updatedQuestions = [...questions];
                                                            updatedQuestions[qIndex].isExpanded = !updatedQuestions[qIndex].isExpanded;
                                                            setQuestions(updatedQuestions);
                                                        }}>
                                                            <p style={{ marginLeft: "15px", color: "black" }}>{
                                                                question.answer_type === 0 ? "단문형" :
                                                                    question.answer_type === 1 ? "단일선택" : "복수선택"

                                                            }</p>
                                                            <Image
                                                                aria-hidden
                                                                src={"/admin/arrow_active.png"}
                                                                alt="etc icon"
                                                                width={16}
                                                                height={16}
                                                                style={{ rotate: "0deg", marginRight: "20px" }}
                                                            />
                                                        </div>
                                                        {question.isExpanded && (
                                                            <div className={styles.tooltipBox}>
                                                                <div
                                                                    className={styles.wochqu}
                                                                    style={{ background: "white" }}
                                                                    onClick={() => {
                                                                        const updatedQuestions = [...questions];
                                                                        updatedQuestions[qIndex].answer_type = 1;
                                                                        setQuestions(updatedQuestions);
                                                                        updatedQuestions[qIndex].isExpanded = false
                                                                    }}
                                                                >
                                                                    <p style={{ marginLeft: "15px" }}>단일선택</p>
                                                                </div>
                                                                <div className={styles.wochqu}
                                                                    style={{ background: "white", borderTop: "solid 1px #ebecf1" }}
                                                                    onClick={() => {
                                                                        const updatedQuestions = [...questions];
                                                                        updatedQuestions[qIndex].answer_type = 2;
                                                                        setQuestions(updatedQuestions);
                                                                        updatedQuestions[qIndex].isExpanded = false
                                                                    }}
                                                                >
                                                                    <p style={{ marginLeft: "15px" }}>복수선택</p>
                                                                </div>
                                                                <div className={styles.wochqu}
                                                                    style={{ background: "white", borderTop: "solid 1px #ebecf1" }}
                                                                    onClick={() => {
                                                                        const updatedQuestions = [...questions];
                                                                        updatedQuestions[qIndex].answer_type = 3;
                                                                        setQuestions(updatedQuestions);
                                                                        updatedQuestions[qIndex].isExpanded = false
                                                                    }}
                                                                >
                                                                    <p style={{ marginLeft: "15px" }}>단문형</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>


                                                {/* 질문 삭제 */}
                                                {/* <button onClick={() => removeQuestion(qIndex)}>삭제</button> */}



                                                {/* 답변 목록 */}
                                                {question.answers.map((answer, aIndex) => (
                                                    <div key={aIndex} style={{ marginTop: "20px", marginLeft: "30px", marginRight: "40px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                                        {/* 답변 수정 */}
                                                        <div className={styles.quinbox}>
                                                            <input type="text" value={answer.answer} placeholder="내용을 입력해주세요"
                                                                className={styles.quinput}
                                                                onChange={(e) =>
                                                                    updateAnswer(qIndex, aIndex, e.target.value)
                                                                } />
                                                        </div>

                                                        {/* 답변 삭제 */}
                                                        <div className={styles.anbox}>
                                                            <div className={styles.aninner} onClick={() => removeAnswer(qIndex, aIndex)}>
                                                                내용에서 제거
                                                            </div>
                                                        </div>
                                                        {/* <button onClick={() => removeAnswer(qIndex, aIndex)}>삭제</button> */}
                                                    </div>
                                                ))}
                                                {/* 답변 추가 */}
                                                <div className={styles.addcon} onClick={() => addAnswer(qIndex)}>내용 추가하기</div>
                                                {/* <button onClick={() => addAnswer(qIndex)}>답변 추가</button> */}

                                            </div>
                                        ))}

                                    </div>

                                </div>

                            </div>
                            <div className={styles.adddn} onClick={() => addQuestion()}>
                                + 질문을 추가하기
                            </div>

                        </div>
                }

                <div className={styles.nebt} style={{ marginTop: state === 2 ? "0px" : "50px", justifyContent: state === 2 ? "space-between" : "" }}>
                    {state === 2 ?
                        <button
                            onClick={() =>
                                setState(1)
                            }
                            className={styles.btso} style={{ background: " #84848f;", marginLeft: "30px" }}>
                            이전</button> : <></>
                    }
                    {state === 1 ?
                        <button className={styles.btso} style={{ marginRight: "15px" }} onClick={() => onClose()}>취소</button> : <></>
                    }
                    <button
                        onClick={() =>
                            NextStep()
                        }
                        className={styles.btso} style={{ background: "linear-gradient(to right, #1c68ff, #053cf0)", marginRight: "30px" }}>
                        다음</button>

                </div>
            </div>
        </>
    );
}
