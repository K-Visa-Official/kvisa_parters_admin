"use client";

import styles from "@/app/css/modal.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import FilterInputBox from "../Common/FilterInputBox";
import Modal from "../Common/Modal";
import { useRef } from "react";
import { registerWork, workchangeimage, work_detail , workchangenoimage } from "@/app/server/work";
import { Korean, Ch } from "@/app/type/typedef";
import { WorkResponse } from "@/app/type/user";

interface WorkPostProps {
    onClose: () => void;
    n?: number;
    la?: string;
    max: number;
    work_id: number;
}

interface Answer {
    answer: string;
    // sort: number;
    answer_count?: number;
}

interface Question {
    question: string;
    answer_type: number;
    answers: Answer[];
    isExpanded: boolean;
}

export default function PostWork({ onClose, n = 0, la, max, work_id }: WorkPostProps) {
    const [work, setWork] = useState<string | "업무를 선택해주세요">("업무를 선택해주세요");
    const [content, setContent] = useState<string | "">("");
    const [active, setActive] = useState<boolean>(false); // 로딩 상태
    const [file, setFile] = useState<File | null>(null);
    const [state, setState] = useState<number | 1>(1);
    const [alert, setAlert] = useState<boolean>(false); // 로딩 상태
    const [file_detail, setFile_Detail] = useState<File | null>(null);
    const [workdetail, setWorkDetail] = useState<WorkResponse[]>();
    const [first_img, setFirst_img] = useState<string | null>(null);
    const [second_img, setSecond_img] = useState<string | null>(null);
   

    // const [questionsac, setQuestionsac] = useState<boolean>(false); // 로딩 상태
    const [questions, setQuestions] = useState<Question[]>([
        {
            question: "",
            answer_type: 0,
            answers: [],
            isExpanded: false,  // 드롭다운 상태 추가
        },
    ]);

    useEffect(() => {
        const fetchUser = async () => {
            try {

                const data_detail = await work_detail(Number(work_id));

                setWorkDetail(data_detail)
                setWork(data_detail[0].choice)
                setContent(data_detail[0].work_detail)
                setFirst_img(String(data_detail[0].detail))
                setSecond_img(String(data_detail[0].detail_second))
                
                const formattedQuestions = (data_detail[0]?.question ?? []).map(q => ({
                    ...q,
                    isExpanded: q.isExpanded ?? false,
                }));

                setQuestions(formattedQuestions);
                // setQuestions(data_detail[0].)

            } catch (error) {
                console.log(error)
            }
        };
        if (work_id !== 0) { // pk가 0이 아닌 경우에만 실행
            fetchUser();
        }
    }, [work_id]);

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

    // // 질문 삭제 함수
    // const removeQuestion = (index: number) => {
    //     setQuestions(questions.filter((_, qIndex) => qIndex !== index));
    // };

    // 답변 추가 함수
    const addAnswer = (qIndex: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].answers.push({
            answer: "",
            answer_count: updatedQuestions[qIndex].answers.length + 1,
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

   

    const NextStep = async () => {
        if (state === 1) {
            if(workdetail){
                setState(2)
            }
            else{
                if (work === "업무를 선택해주세요" || content === "" || file === null) {
                    setAlert(true)
                }
                else {
                    setState(2)
                }    
            }
        }
        else if (state === 2) {
            if(workdetail){
                setState(3)
            }
            else{
                if (file_detail === null) {
                    setAlert(true)
                }
                else {
                    setState(3)
                }
            }
        }
        else if (state === 3) {

            const transformedData = {
                user_id: n, // 사용자 ID
                language: la === "ko" ? 0 : 1, // 언어 코드
                choice: work, // 선택된 업무
                work_detail: content, // 업무에 대한 상세 설명
                order: workdetail ? workdetail[0].order : max + 1, // 답변 타입
                questions: questions.map((question) => ({
                    question: question.question, // 질문 텍스트
                    answer_type: question.answer_type, // 답변 타입
                    answers: question.answer_type === 2 || question.answer_type === 3 ?
                        [{ answer: "입력형", answer_count: 0 }] :
                        question.answers.map((answer) => ({
                            answer: answer.answer, // 답변 내용
                            answer_count: answer.answer_count, // 답변 순서
                        })),
                })),
            };
            // console.log(transformedData)
            try {
                // 업무 수정을 진행
                if(workdetail){
                    console.log(transformedData)
                    console.log(workdetail[0])
                    const response = await registerWork(transformedData);
                    
                    if (response?.id) {

                        // workdelete(workdetail[0]?.id)

                        const formData = new FormData();
                        formData.append("new_id", response.id);
                        formData.append("before_id", String(work_id));

                        if (file) {
                            formData.append("detail_url", file);
                        }
                       
                        if (file_detail) {
                            formData.append("detail_second", file_detail); // 오타 수정
                        }
                        

                        // 파일 업로드 처리 
                        await workchangenoimage(formData);

                        // if (result && result.message) {

                        //     console.log(2)
                        onClose() // 모달 닫기
                        //     console.log("File upload successful");
                        // } else {
                        //     console.error("File upload failed", result);
                        // }
                    } else {
                        console.error("Response does not contain id");
                    }

                }
                // 업무 등록 요청
                else{
                    const response = await registerWork(transformedData);

                    if (response?.id) {
                        const formData = new FormData();
                        formData.append("id", response.id);
                        if (file) {
                            formData.append("detail_url", file);
                        }
                        if (file_detail) {
                            formData.append("detail_second", file_detail); // 오타 수정
                        }
                        // for (let [key, value] of formData.entries()) {
                        //     console.log(key, value);
                        // }
                        // 파일 업로드 처리 
                        await workchangeimage(formData);

                        // if (result && result.message) {

                        //     console.log(2)
                        onClose() // 모달 닫기
                        //     console.log("File upload successful");
                        // } else {
                        //     console.error("File upload failed", result);
                        // }
                    } else {
                        console.error("Response does not contain id");
                    }
                }
                
            } catch (error) {
                console.error("Error during registration:", error);
                // 실패 시 알림을 표시하지 않음
                setAlert(false);
            }
        }
    }


    return (
        <>
            {alert && <Modal t={state === 1 ? "입력안된 정보가 있습니다" : "이미지를 확인해주세요"} s={state === 1 ? "빈칸을 확인해주세요" : ""} c={"확인"} onClose={() => setAlert(false)} />}
            <div className={styles.postworktotal}>
                <div className={styles.modaltitle}>
                    <span style={{ marginLeft: "30px" }}>
                        {state === 1 ?
                            workdetail ? "B2B 업무수정" : "B2B 업무등록" :
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
                    <div className={styles.postcontentbox} style={{ marginTop: "30px" }}>

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
                                                setWork(la === "ko" ? Korean.work_post_ko : Ch.work_post_ko)
                                            )}
                                        >
                                            <p style={{ marginLeft: "15px" }}>
                                                {la === "ko" ? Korean.work_post_ko : Ch.work_post_ko}
                                            </p>
                                        </div>
                                        <div className={styles.woch}
                                            style={{ background: "white", borderTop: "solid 1px #ebecf1" }}
                                            onClick={() => (
                                                setActive(true),
                                                setWork(la === "ko" ? Korean.work_post_ko_second : Ch.work_post_ko_second)
                                            )}
                                        >
                                            <p style={{ marginLeft: "15px" }}>{la === "ko" ? Korean.work_post_ko_second : Ch.work_post_ko_second}</p>
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
                                ) :
                                workdetail ? (
                                        // 선택된 이미지 미리보기
                                        <>
                                            <Image
                                                aria-hidden
                                                src={String(first_img)}
                                                alt="logo"
                                                width={300}
                                                height={145}
                                            />
                                        </>
                                        
                                    ) :
                                        (
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
                                    workdetail ? (
                                        // 선택된 이미지 미리보기
                                        <>
                                            <Image
                                                aria-hidden
                                                src={String(second_img)}
                                                alt="logo"
                                                width={780}
                                                height={710}
                                            />
                                        </>
                                        
                                    ) :
                                    <></>

                                }
                            </div>
                        </div>
                        :
                        <div className={styles.postcontentbox} style={{ width: "100%", marginLeft: "0px" }} >
                            <div className={styles.qubox}>
                                <div style={{ marginTop: "30px", height: "100%" }}>
                                    <div style={{ height: "auto", width: "100%" }}>
                                        {/* 질문 목록 */}
                                        {questions.map((question, qIndex) => (
                                            <div key={qIndex} style={{ borderBottom: "1px solid #bfbfbf", paddingBottom: "30px", marginTop: "15px" }}>
                                                {/* 질문 수정 */}
                                                <div style={{ marginLeft: "30px", marginRight: "30px", display: "flex", justifyContent: "space-between", flexDirection: "row" }}>

                                                    <FilterInputBox w={750} h={50} mt={0} bg={"#f5f6f9"} p={"질문을 입력해주세요"} v={question.question}
                                                        onChange={(e) => updateQuestion(qIndex, e.target.value)}
                                                    />
                                                    <div style={{ height: "auto", width: "200px", position: "relative" }}>
                                                        <div
                                                            className={styles.wochqusd}
                                                            onClick={() => {
                                                                const updatedQuestions = [...questions];
                                                                updatedQuestions[qIndex].isExpanded = !updatedQuestions[qIndex].isExpanded;
                                                                setQuestions(updatedQuestions);
                                                            }}
                                                        >
                                                            <p style={{ marginLeft: "15px", color: "black" }}>
                                                                {question.answer_type === 0 ? "단일선택" :
                                                                    question.answer_type === 1 ? "복수선택" :
                                                                        question.answer_type === 2 ? "단문형" : "장문형"}
                                                            </p>
                                                            <Image
                                                                aria-hidden
                                                                src={"/admin/arrow_active.png"}
                                                                alt="etc icon"
                                                                width={16}
                                                                height={16}
                                                                style={{
                                                                    transform: question.isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                                                                    marginRight: "20px",
                                                                    transition: "0.3s"
                                                                }}
                                                            />
                                                        </div>

                                                        {/* isExpanded가 true일 때만 absolute 툴팁이 표시됨 */}
                                                        {question.isExpanded && (
                                                            <div className={styles.tooltipBoxqus}>
                                                                {[
                                                                    { value: 0, label: "단일선택" },
                                                                    { value: 1, label: "복수선택" },
                                                                    { value: 2, label: "단문형" },
                                                                    { value: 3, label: "장문형" }
                                                                ].map(option => (
                                                                    <div
                                                                        key={option.value}
                                                                        className={styles.wochqusd}
                                                                        style={{ background: "white", borderTop: "solid 1px #ebecf1" }}
                                                                        onClick={() => {
                                                                            const updatedQuestions = [...questions];
                                                                            updatedQuestions[qIndex].answer_type = option.value;
                                                                            updatedQuestions[qIndex].isExpanded = false;
                                                                            if (option.value === 2 || option.value === 3) {
                                                                                updatedQuestions[qIndex].answers = [
                                                                                    { answer: "", answer_count: 1 }  // 기본 답변 추가
                                                                                ];
                                                                            }
                                                                            setQuestions(updatedQuestions);
                                                                        }}
                                                                    >
                                                                        <p style={{ marginLeft: "15px" }}>{option.label}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}</div>
                                                </div>


                                                {/* 🛠 단문형이면 input 박스, 아니면 기존의 답변 리스트 */}
                                                {question.answer_type === 2 ? (
                                                    <div style={{ marginTop: "20px", marginLeft: "30px", marginRight: "40px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                                        <input type="text"
                                                            value={question.answers[0]?.answer || ""}
                                                            placeholder="내용을 입력해주세요"
                                                            className={styles.quinput}
                                                            style={{ background: "#f5f6f9", height: "50px", padding: 20 }}
                                                            onChange={(e) => updateAnswer(qIndex, 0, e.target.value)}
                                                        />
                                                    </div>
                                                ) : question.answer_type === 3 ? (
                                                    <div style={{ marginTop: "20px", marginLeft: "30px", marginRight: "40px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                                        <textarea
                                                            value={question.answers[0]?.answer || ""}
                                                            placeholder="내용을 입력해주세요"
                                                            className={styles.quinput}
                                                            style={{ background: "#f5f6f9", height: "100px", resize: "none", padding: 20 }}
                                                            onChange={(e) => updateAnswer(qIndex, 0, e.target.value)}
                                                        />
                                                    </div>
                                                ) : (
                                                    // 단일선택/복수선택 (기존 리스트)
                                                    question.answers.map((answer, aIndex) => (
                                                        <div key={aIndex} style={{ marginTop: "20px", marginLeft: "30px", marginRight: "40px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                                            <div className={styles.quinbox}>
                                                                <input type="text"
                                                                    value={answer.answer}
                                                                    placeholder="내용을 입력해주세요"
                                                                    className={styles.quinput}
                                                                    onChange={(e) => updateAnswer(qIndex, aIndex, e.target.value)}
                                                                />
                                                            </div>
                                                            <div className={styles.anbox}>
                                                                <div className={styles.aninner} onClick={() => removeAnswer(qIndex, aIndex)}>
                                                                    내용에서 제거
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                )}

                                                {/* 단문형이 아닐 경우에만 "내용 추가하기" 버튼 표시 */}
                                                {question.answer_type !== 2 && question.answer_type !== 3 && (
                                                    <div className={styles.addcon} onClick={() => addAnswer(qIndex)}>내용 추가하기</div>
                                                )}

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
