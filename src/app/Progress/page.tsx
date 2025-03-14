"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense, useRef } from "react";
import styles from "@/app/css/user_detail.module.css";
import Image from "next/image";
import {
    readlist, work_detail,
    registerProcess, registerProcessUser
} from "../server/work";
import { Question_Post, WorkResponse } from "../type/user";
import { Korean, Ch } from "../type/typedef";
import MoHeader from "../Component/Common/MoHeader";
import Modal from "../Component/Common/Modal";
import AutoComplete from "../Component/Common/AutoComplete";
import Footer from "../Component/Common/Footer";
// import DatePicker from "../Component/Common/DatePicker";


function Progress() {
    const parm = useSearchParams();
    const router = useRouter()
    const targetRefs = useRef<(HTMLParagraphElement | null)[]>([]);
    const [progressId, setProgressId] = useState<string | null>(null);
    const [work, setWork] = useState<Question_Post[]>([]);
    const [workdetail, setWorkDetail] = useState<WorkResponse[]>([]);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string[] }>({});
    const [textAnswers, setTextAnswers] = useState<{ [key: number]: string }>({});
    const [modal, setModal] = useState<boolean>(false); // 로딩 상태
    const [ac, setAc] = useState<boolean | false>(false);
    const [year, setYear] = useState<string>("");
    const [month, setMonth] = useState<string>("");
    const [world, setWorld] = useState<string>("");
    const [day, setDay] = useState("");
    const [days, setDays] = useState<string[]>([]); // 일수를 담을 배열
    const [phone, setPhone] = useState<string>("010");
    const [phone_second, setPhone_second] = useState<string>("");
    const [phone_third, setPhone_third] = useState<string>("");
    const [aler, setAler] = useState("");
    const languageMap = {
        Korean,
        Ch
    };
    
    const selectedLanguage = parm.get("language") === "0" ? "Korean" : "Ch"; // 예시로 "Korean"과 "Ch"를 사용
    
    const selectedLanguageData = languageMap[selectedLanguage as keyof typeof languageMap];

    const isLeapYear = (year: number) => {
        return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
    };

    // 🔹 현재 연도를 기준으로 선택할 연도 리스트
    const years = Array.from({ length: 2099 - 2025 + 1 }, (_, i) => (2025 + i).toString());

    // 🔹 월 리스트 (01~12)
    const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));

    // 🔹 일 리스트 (1~31)
    useEffect(() => {
        // 2월일 경우 윤년에 따라 일수 변경
        if (month === "02") {
            const lastDay = isLeapYear(Number(year)) ? 29 : 28;
            setDays(Array.from({ length: lastDay }, (_, i) => (i + 1).toString().padStart(2, "0")));
        } else {
            // 다른 월은 기본 31일까지
            const maxDays: { [key: string]: number } = {
                "01": 31,
                "03": 31,
                "04": 30,
                "05": 31,
                "06": 30,
                "07": 31,
                "08": 31,
                "09": 30,
                "10": 31,
                "11": 30,
                "12": 31
            };
            setDays(Array.from({ length: maxDays[month] || 31 }, (_, i) => (i + 1).toString().padStart(2, "0")));
        }
    }, [year, month]);

    const suggestionsList = [
        "한국", "중국", "인도네시아", "베트남", "인도", "일본", "필리핀",
        "영국", "프랑스", "이탈리아", "독일", "그리스", "미국", "캐나다",
        "멕시코", "브라질", "아르헨티나", "칠레", "페루", "콜롬비아", "네팔",
        "스페인", "포르투갈", "네덜란드", "벨기에", "스위스", "스웨덴",
        "노르웨이", "덴마크", "핀란드", "러시아", "터키", "사우디아라비아",
        "아랍에미리트", "이집트", "남아프리카공화국", "나이지리아", "케냐",
        "호주", "뉴질랜드", "태국", "말레이시아", "싱가포르"
    ];

    const suggestionsList_ch = [
        "韩国", "中国", "印度尼西亚", "越南", "印度", "日本", "菲律宾",
        "英国", "法国", "意大利", "德国", "希腊", "美国", "加拿大",
        "墨西哥", "巴西", "阿根廷", "智利", "秘鲁", "哥伦比亚", "尼泊尔",
        "西班牙", "葡萄牙", "荷兰", "比利时", "瑞士", "瑞典",
        "挪威", "丹麦", "芬兰", "俄罗斯", "土耳其", "沙特阿拉伯",
        "阿拉伯联合酋长国", "埃及", "南非", "尼日利亚", "肯尼亚",
        "澳大利亚", "新西兰", "泰国", "马来西亚", "新加坡"
    ];

    console.log(workdetail[0])

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
                const member = parm.get("member");
                const userId = parm.get("userId");

                if (progress !== progressId) {
                    setProgressId(progress); // progress가 바뀔 때마다 상태 업데이트
                }
                if (member === "6") {
                    if (userId === null) {
                        router.replace("/404");
                    }
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
            let currentAnswers = prev[questionId] || [];

            if (answerType === 0) {
                // 단일 선택: 기존 답변을 새로운 값으로 교체
                return { ...prev, [questionId]: [answer] };
            } else {

                if (answer === "없음") {
                    return { ...prev, [questionId]: ["없음"] };
                }

                // 기존 선택이 "없음"이면 먼저 없애고 새 선택 시작
                if (currentAnswers.includes("없음")) {
                    currentAnswers = []; // "없음"을 선택하면 모든 기존 선택 해제
                }

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
        // setWorld(value);
    };

    const handleSubmit = async () => {
        console.log(finalData.filter(a => a.answer === ""))
        if (finalData.filter(a => a.answer === "").length > 0) {
            if(workdetail[0]?.choice === "맞춤형 비자상담 서비스"){
                if(finalData.filter(a => a.answer.trim() === "")[0].question.includes("국적")){
                    setAler("국적을 입력해주세요")
                }
                else if(finalData.filter(a => a.answer === "")[0].question.includes("비자는")){
                    setAler("비자를 선택해주세요")
                }
                else if(finalData.filter(a => a.answer === "")[0].question.includes("비자 및 서비스")){
                    setAler("비자를 선택해주세요")
                }
                else if(finalData.filter(a => a.answer === "")[0].question.includes("나이")){
                    setAler("나이를 선택해주세요")
                }
                else if(finalData.filter(a => a.answer === "")[0].question.includes("소득금액")){
                    setAler("소득금액을 선택해주세요")
                }
                else if(finalData.filter(a => a.answer === "")[0].question.includes("체류기간")){
                    setAler("체류기간을 선택해주세요")
                }
                else if(finalData.filter(a => a.answer === "")[0].question.includes("비자 만료일")){
                    setAler("비자 만료일을 선택해주세요")
                }
                else if(finalData.filter(a => a.answer === "")[0].question.includes("아래")){
                    setAler("특이사항을 선택해주세요")
                }
                else if(finalData.filter(a => a.answer === "")[0].question.includes("이름")){
                    setAler("이름을 입력해주세요")
                }
                else if(finalData.filter(a => a.answer === "")[0].question.includes("전화번호")){
                    setAler("연락받을 전화번호를 입력해주세요")
                }
                else if(finalData.filter(a => a.answer === "")[0].question.includes("시간은")){
                    setAler("연락가능한 시간을 선택해주세요")
                }
            }
            else if(workdetail[0]?.choice === "客製化签证谘询服务"){
                if(finalData.filter(a => a.answer.trim() === "")[0].question.includes("请问你的")){
                    setAler("请选择国籍")
                }
                else if(finalData.filter(a => a.answer === "")[0].question.includes("您现在持")){
                    setAler("请选择签证类型")
                }
                else if(finalData.filter(a => a.answer === "")[0].question.includes("请选择想要变更")){
                    setAler("请选择签证类型")
                }
                else if(finalData.filter(a => a.answer === "")[0].question.includes("请问您")){
                    setAler("请选择年龄")
                }
                else if(finalData.filter(a => a.answer === "")[0].question.includes("请问您的年")){
                    setAler("请选择收入金额")
                }
                else if(finalData.filter(a => a.answer === "")[0].question.includes("您以目前的签")){
                    setAler("请选择居留期限")
                }
                else if(finalData.filter(a => a.answer === "")[0].question.includes("目前签证")){
                    setAler("请选择签证到期日")
                }
                else if(finalData.filter(a => a.answer === "")[0].question.includes("以下有符合")){
                    setAler("请选择特殊事项")
                }
                else if(finalData.filter(a => a.answer === "")[0].question.includes("请留下您的姓")){
                    setAler("请输入姓名")
                }
                else if(finalData.filter(a => a.answer === "")[0].question.includes("请留下您")){
                    setAler("请输入联系电话")
                }
                else if(finalData.filter(a => a.answer === "")[0].question.includes("方便联繫的")){
                    setAler("请选择可联系时间")
                }
            }
            else{
                setAler("답변을 선택해주세요")
            }
            setAc(true)
        }
        else {
            if (!modal) {
                setModal(!modal)
            }
            else {
                const today = new Date();
                const formattedDate = today.toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false // 24시간 형식
                });

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
                            "match": Number(workdetail[0]?.user) + "_" + formattedDate
                        }
                    );
                    if (response.detail === "Process created successfully") {
                        if (i === finalData.length - 1) {
                            const response_se = await registerProcessUser(
                                {
                                    "id": response.return,
                                    "name": "미입력",
                                    "tel": 0,
                                    "marketing": "y",
                                    "lang": String(parm.get("language")),
                                    "match": Number(workdetail[0]?.user) + "_" + formattedDate
                                }
                            );
                            if (parm.get("userId") === null) {
                                if (parm.get("language") === "0") {
                                    router.push(`/Certify/?&user=${response_se.return}&language=0&member=${parm.get("member")}`)
                                }
                                else {
                                    router.push(`/Certify/?&user=${response_se.return}&language=1&member=${parm.get("member")}`)
                                }
                            }
                            else {
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

    console.log(workdetail[0]?.choice)

    return (
        <>
            {ac ?
                <Modal web={aler} setAc={setAc} />
                :
                <Suspense fallback={<div>Loading...</div>}>
                    {modal ?
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                background: "grey",
                                width: "100%",
                                height: "100%",
                                position:"absolute",
                                bottom:0 ,
                                fontFamily: parm.get("language") === "0" ? "'Spoqa Han Sans Neo', 'malgun', 'Apple SD Gothic Neo', Verdana, Arial, Helvetica, Geneva, Tahoma, sans-serif" : 
                                "Noto Sans, sans-serif",
                                // opacity:0.5
                            }}
                        >
                            <div className={styles.innerbox} style={{ borderRadius: "10px 10px 0 0" , position:"absolute" , bottom:"0" }}>
                                <div className={styles.endbox}>
                                    <div className={styles.endheader}>
                                        <div style={{ width: "30px", height: "100%" }}>

                                        </div>
                                        <div style={{ width: "250px", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        {selectedLanguageData.prce_end}
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
                                                {selectedLanguageData.ok}
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
                                width: "100% !important",
                                height: "auto",
                                fontFamily: parm.get("language") === "0" ? "'Spoqa Han Sans Neo', 'malgun', 'Apple SD Gothic Neo', Verdana, Arial, Helvetica, Geneva, Tahoma, sans-serif" : 
                                "Noto Sans, sans-serif",
                               
                            }}
                        >
                            <div className={styles.innerbox}>

                                <div className={styles.dfjskd}
                                >
                                    <MoHeader setAc={setAc} />

                                    <div style={{ width: "100%", height: "117px", display: "flex", flexDirection: "column", background: "#f0f5ff" , marginTop:"60px" }}>
                                        <p style={{ marginTop: "18px", fontSize: "20px", fontWeight: "bold", marginLeft: "24px", color: "black" }}>
                                            {workdetail[0]?.choice}
                                        </p>
                                        <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", marginTop: "10px", marginLeft: "24px" }}>
                                            <p style={{ fontSize: "13px", color: "#33405a" }}>
                                                {selectedLanguageData.safety}
                                            </p>
                                            <p style={{ color: "black", marginRight: "15px", fontSize: "18px", fontWeight: "bold" }}>
                                                {Math.floor((finalData.filter(a => a.answer != "").length / finalData.length) * 100)}%
                                            </p>
                                        </div>

                                        <div style={{ width: "90%", height: "5px", margin: "15px", display: "flex", flexDirection: "row", borderRadius: "20px" }}>
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
                                        style={{ marginTop: index === 0 ? "180px" : "" }}>

                                        {/* {parm.get("userId") === null ?
                                            <p className={styles.qutitle}>
                                                {user.answer_type === 0 ? "단일선택" :
                                                    user.answer_type === 1 ? "복수선택" :
                                                        user.answer_type === 2 ? "단문형" : "장문형"}
                                            </p>
                                            :
                                            <></>
                                        } */}

                                        <p className={styles.titlesub} style={{
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            wordBreak: "break-word"
                                        }}
                                            ref={(el) => { targetRefs.current[index] = el; }}
                                        >{index + 1}. {user.question}</p>

                                        <div className={styles.answerBox}>
                                            {user.answers.map((a) => {
                                                const isSelected = selectedAnswers[user.id]?.includes(a.answer);

                                                return (
                                                    <>
                                                        {workdetail[0]?.choice === "맞춤형 비자상담 서비스" || workdetail[0]?.choice ===  "客製化签证谘询服务" ?
                                                            <div key={a.id} className={styles.answerWrapper}>
                                                                {user.answer_type >= 2 ? (
                                                                    // 단문형 또는 장문형 입력 처리
                                                                    index === 0 ? (

                                                                        <AutoComplete 
                                                                        suggestions={
                                                                            parm.get("language") === "0" ? 
                                                                            suggestionsList : suggestionsList_ch
                                                                        }
                                                                            selectedValue={world}
                                                                            onSelect={(value) => {
                                                                                handleTextInputChange(user.id, value);
                                                                                setWorld(value);
                                                                            }}
                                                                        />

                                                                    ) :
                                                                        index === 6 ? (
                                                                            <div className="flex gap-2" style={{ marginTop: "20px" }}>
                                                                                {/* 연도 선택 */}
                                                                                <select value={year}
                                                                                    onChange={(e) => (
                                                                                        setYear(e.target.value),

                                                                                        month === "" || day === "" ? "" :
                                                                                            handleTextInputChange(user.id, e.target.value + "." + month + "." + day)
                                                                                    )}
                                                                                    // onChange={(e) => setYear(e.target.value)}
                                                                                    style={{
                                                                                        border: "none",
                                                                                        width: "80px",
                                                                                        height: "30px",
                                                                                        padding: "5px",
                                                                                        background: "#f5f6f9",
                                                                                        color: "black", fontSize: "16px"
                                                                                    }}
                                                                                >
                                                                                    <option value="">YYYY</option>
                                                                                    {years.map((y) => (
                                                                                        <option key={y} value={y} style={{ fontSize: "16px" }}>
                                                                                            {y}
                                                                                        </option>
                                                                                    ))}
                                                                                </select>

                                                                                {/* 월 선택 */}
                                                                                <select value={month} onChange={(e) => (
                                                                                    setMonth(e.target.value),

                                                                                    year === "" || day === "" ? "" :
                                                                                        handleTextInputChange(user.id, year + "." + e.target.value + "." + day)
                                                                                )}
                                                                                    // onChange={(e) => setMonth(e.target.value)}
                                                                                    style={{
                                                                                        border: "none",
                                                                                        width: "80px",
                                                                                        height: "30px",
                                                                                        padding: "5px",
                                                                                        background: "#f5f6f9", marginLeft: "10px",
                                                                                        color: "black", fontSize: "16px"
                                                                                    }}>
                                                                                    <option value="">MM</option>
                                                                                    {months.map((m) => (
                                                                                        <option key={m} value={m}>
                                                                                            {m}
                                                                                        </option>
                                                                                    ))}
                                                                                </select>

                                                                                {/* 일 선택 */}
                                                                                <select
                                                                                    value={day}
                                                                                    onChange={(e) => (
                                                                                        setDay(e.target.value),
    
                                                                                        year === "" || month === "" ? "" :
                                                                                            handleTextInputChange(user.id, year + "." + month + "." + e.target.value)
                                                                                    )}
                                                                                    style={{
                                                                                        border: "none",
                                                                                        width: "80px",
                                                                                        height: "30px",
                                                                                        padding: "5px",
                                                                                        background: "#f5f6f9",
                                                                                        color: "black", fontSize: "16px", marginLeft: "10px"
                                                                                    }}>
                                                                                
                                                                                    <option value="">DD</option>
                                                                                    {days.map((d) => (
                                                                                        <option key={d} value={d}>
                                                                                            {d}
                                                                                        </option>
                                                                                    ))}
                                                                                </select>
                                                                            </div>
                                                                        )
                                                                            :
                                                                            index === 9 ? (
                                                                                <div className="flex gap-2" style={{ marginTop: "20px" }}>
                                                                                    {/* 연도 선택 */}
                                                                                    <input
                                                                                        type="number"
                                                                                        value={phone}
                                                                                        disabled
                                                                                        onChange={(e) => setPhone(e.target.value)}
                                                                                        placeholder=""
                                                                                        style={{
                                                                                            border: "none", textAlign: "center",
                                                                                            width: "80px",
                                                                                            height: "30px",
                                                                                            padding: "5px",
                                                                                            background: "#f5f6f9",
                                                                                            color: "black", fontSize: "16px",
                                                                                            borderRadius: "5px", marginRight: "5px"
                                                                                        }}
                                                                                    />
                                                                                    -
                                                                                    <input
                                                                                        type="text"
                                                                                        value={phone_second}
                                                                                        onChange={(e) => {
                                                                                            let value = e.target.value;

                                                                                            // 숫자 4자리까지만 입력 가능하도록 제한
                                                                                            value = value.replace(/[^0-9]/g, "").slice(0, 4);

                                                                                            setPhone_second(value);
                                                                                            
                                                                                            if (phone_third !== "") {
                                                                                                handleTextInputChange(user.id,
                                                                                                    phone + "-" + value + "-" + phone_third
                                                                                                )
                                                                                            }

                                                                                            }}
                                                                                        // onChange={(e)=> setPhone_second(e.target.value)}
                                                                                        placeholder=""
                                                                                        style={{
                                                                                            border: "none", textAlign: "center",
                                                                                            width: "80px",
                                                                                            height: "30px",
                                                                                            padding: "5px",
                                                                                            background: "#f5f6f9",
                                                                                            color: "black", fontSize: "16px",
                                                                                            borderRadius: "5px", marginRight: "5px", marginLeft: "5px"
                                                                                        }}
                                                                                        className={styles.dfsopkdf}
                                                                                    />
                                                                                    -
                                                                                    <input
                                                                                        type="text"
                                                                                        value={phone_third}
                                                                                        onChange={(e) => {
                                                                                            let value = e.target.value;

                                                                                            // 숫자 4자리까지만 입력 가능하도록 제한
                                                                                            value = value.replace(/[^0-9]/g, "").slice(0, 4);

                                                                                            setPhone_third(value);
                                                                                            
                                                                                            if (phone_second !== "") {
                                                                                                handleTextInputChange(user.id,
                                                                                                    phone + "-" + phone_second + "-" + value
                                                                                                )
                                                                                            }

                                                                                    
                                                                                            }}
                                                                                        placeholder=""
                                                                                        style={{
                                                                                            border: "none", textAlign: "center",
                                                                                            width: "80px",
                                                                                            height: "30px",
                                                                                            padding: "5px",
                                                                                            background: "#f5f6f9",
                                                                                            color: "black", fontSize: "16px",
                                                                                            borderRadius: "5px", marginLeft: "5px" ,
                                                                                        }}
                                                                                        className={styles.dfsopkdf}
                                                                                    />
                                                                                </div>
                                                                            )
                                                                                :
                                                                                (
                                                                                    <textarea
                                                                                        value={textAnswers[user.id] || ""}
                                                                                        // placeholder="내용을 입력해주세요"
                                                                                        className={styles.quinput}
                                                                                        style={{
                                                                                            fontSize: "16px",}}
                                                                                        onChange={(e) => {
                                                                                            let newValue = e.target.value;

                                                                                            // index 8: 문자만 입력 가능
                                                                                            if (index === 8) {
                                                                                                newValue = e.target.value.replace(/[^a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣\s]/g, ""); // 문자만 입력
                                                                                            }

                                                                                            // index 9: 전화번호 형식 적용
                                                                                            if (index === 9) {
                                                                                                let formattedValue = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 남기기
                                                                                                if (formattedValue.length > 3 && formattedValue.length <= 6) {
                                                                                                    formattedValue = formattedValue.replace(/(\d{3})(\d{1,4})/, "$1-$2");
                                                                                                } else if (formattedValue.length > 6) {
                                                                                                    formattedValue = formattedValue.replace(/(\d{3})(\d{4})(\d{1,4})/, "$1-$2-$3");
                                                                                                }
                                                                                                newValue = formattedValue;
                                                                                            }

                                                                                            // 최종적으로 값 변경 처리
                                                                                            handleTextInputChange(user.id, newValue);
                                                                                        }}
                                                                                    />
                                                                                )

                                                                ) : (
                                                                    // 단일/복수 선택 처리
                                                                    <div
                                                                        className={styles.answerItem}
                                                                        onClick={() => {
                                                                            if (user.answer_type === 0) {
                                                                                const targetElement = targetRefs.current[index+1];
                                                                                    if (targetElement) {
                                                                                        // 화면의 가운데로 스크롤
                                                                                        window.scrollTo({
                                                                                            top: targetElement.offsetTop - (window.innerHeight / 2),
                                                                                            behavior: 'smooth'
                                                                                        });
                                                                                    }
                                                                            }
                                                                            handleAnswerSelect(user.id, a.answer, user.answer_type)
                                                                        }}
                                                                        // onClick={() => handleAnswerSelect(user.id, a.answer, user.answer_type)}
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
                                                            :
                                                            <div key={a.id} className={styles.answerWrapper}>
                                                            {user.answer_type >= 2 ? (
                                                                // 단문형 또는 장문형 입력 처리
                                                                <textarea
                                                                    value={textAnswers[user.id] || ""}
                                                                    placeholder="내용을 입력해주세요"
                                                                    className={styles.quinput}
                                                                    style={{
                                                                        background: "#f5f6f9", height: "100px", resize: "none", padding: 20,
                                                                        border: "none", marginTop: "20px", width: "300px",
                                                                    }}
                                                                    onChange={(e) => handleTextInputChange(user.id, e.target.value)}
                                                                />
                                                            ) : (
                                                                // 단일/복수 선택 처리
                                                                <div
                                                                    className={styles.answerItem}
                                                                    onClick={() => {
                                                                        if (user.answer_type === 0) {
                                                                            const targetElement = targetRefs.current[index+1];
                                                                                if (targetElement) {
                                                                                    // 화면의 가운데로 스크롤
                                                                                    window.scrollTo({
                                                                                        top: targetElement.offsetTop - (window.innerHeight / 2),
                                                                                        behavior: 'smooth'
                                                                                    });
                                                                                }
                                                                        }
                                                                        handleAnswerSelect(user.id, a.answer, user.answer_type)
                                                                    }}
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
                                                        }
                                                    </>
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

                                <div style={{
                                    width: "100%", height: "56px", display: "flex", flexDirection: "row", marginTop: "50px", marginBottom: "60px",
                                    justifyContent: "center", alignItems: "center"
                                }}>
                                    {/* <div style={{ width: "50%", height: "56px" }}>

                                    </div> */}
                                    <div style={{
                                        width: "50%", height: "56px", background: "linear-gradient(91deg, #1c68ff 0%, #053cf0 100%)", borderRadius: "5px",
                                        fontSize: "15px", color: "white", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold"
                                    }} onClick={handleSubmit}>
                                        {selectedLanguageData.enter}

                                    </div>
                                </div>


                                <Footer/>
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