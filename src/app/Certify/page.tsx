"use client";

// import { useSearchParams,  } from "next/navigation";
// import { getUser, getUserApi } from "@/app/server/admin_user";
// import { UserList, WorkResponse } from "../type/user";
import { useState, useEffect , Suspense } from "react";
import styles from "@/app/css/user_detail.module.css";
import Image from "next/image";
import FilterInputBox from "../Component/Common/FilterInputBox";
import { Korean, Ch } from "../type/typedef";
import { useSearchParams , useRouter } from "next/navigation";
import { change_name } from "../server/work";

import MoHeader from "../Component/Common/MoHeader";
import Modal from "../Component/Common/Modal";


function Certify() {
    const parm = useSearchParams();
    const router = useRouter();
    const [name, setName] = useState<string>("");
    const [modal, setModal] = useState<boolean>(false);
    const [name_active, setName_active] = useState<boolean>(false);
    const [tel, setTel] = useState<string>("");
    const [tel_active, setTel_active] = useState<boolean>(false);
    const [ce, setCe] = useState<string>("");
    const [ce_active, setCe_active] = useState<boolean>(false);
    const [active, setActive] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(180);  // 3분 타이머 설정 (180초)

    const [first, setFirst] = useState<boolean>(false);
    const [second, setSecond] = useState<boolean>(false);
    const [third, setThird] = useState<boolean>(false);
    const [four, setFour] = useState<boolean>(false);

    const [state, setState] = useState<number>(1);  // 3분 타이머 설정 (180초)
    const [ac, setAc] = useState<boolean | false>(false);

    const member = parm.get("member");
    const userId = parm.get("userId");
    
    useEffect(() => {
        if (member === "6") {
            if(userId === null){
                router.replace("/404");
            }
        }
        }, [member , userId]);

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

    function send_mess() {
        if (name === "") {
            setName_active(true)
        }
        else if (tel === "") {
            setTel_active(true)
        }

        else {
            setActive(true)
            fetch(`https://kimseongwon.store/api/verify-mobile-number/${tel.replaceAll("-", "")}?&type=test`, {
                method: 'GET',

            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('서버 오류 발생: ' + response.status);
                    }
                    return response.text(); // 응답을 JSON으로 변환
                })
                .then(data => {
                    console.log(data)
                    // alert("인증번호 발송")
                }
                )
                .catch(error => {
                    alert(error)
                });
        }

    }

    const Certify = async () => {
        const finalData = {
            id: parm.get('user'),
            tel: tel,
            name: parm.get("userId") === null ? name : name + "^" + parm.get("userId") ,
        };

        try {
            const response = await fetch(`https://kimseongwon.store/api/verify-mobile-number`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mobile_num: tel.replaceAll("-", ""),
                    certification_num: ce,
                }),
            });

            if (response.status === 200) {

                // 비동기 작업을 하는 change_name 호출
                await change_name(finalData);  // 여기서 change_name이 비동기 함수여야 합니다.
                setModal(true)

            } else {
                setCe_active(true);  // 인증번호 불일치
            }
        } catch (error) {
            console.error('Error:', error);  // 오류 처리
        }
    };

    return (
        <>
        {ac ?
            <Modal web={"wed"} setAc={setAc}/>
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
                {/* 헤더 */}
                <MoHeader setAc={setAc} />

                {state === 1 ?
                    <div className={styles.innerbox} style={{ height: "100vh" }}>
                        <div style={{ height: "100vh", marginLeft: "15px", marginRight: "15px" }}>
                            <p style={{ fontSize: "20px", fontWeight: "bold", color: " #2f2f2f", marginTop: "30px" }}>
                                {parm.get("language") === "0" ? Korean.certi_first : Ch.certi_first}</p>

                            <p style={{ fontSize: "12px", color: "#84848f", marginTop: "26px" }}>
                                {parm.get("language") === "0" ? Korean.certi_name : Ch.certi_name}</p>
                            <FilterInputBox w={345} h={50} mt={10} bg={"#f5f6f9"} p={
                                parm.get("language") === "0" ? Korean.certi_name_input : Ch.certi_name_input
                            } v={name}
                                // src={"/admin/search.png"}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {name_active ?
                                <p style={{ fontSize: "12px", color: "#ff1c8e", marginTop: "10px", fontWeight: "500" }}>
                                    {parm.get("language") === "0" ? Korean.certi_noname : Ch.certi_noname}</p>
                                :
                                <></>
                            }
                            <p style={{ fontSize: "12px", color: "#84848f", marginTop: "26px" }}>{parm.get("language") === "0" ? Korean.certi_tel : Ch.certi_tel}</p>
                            <div style={{ width: "345px", height: "50px", marginTop: "10px", background: "#f5f6f9", display: "flex", flexDirection: "row" }}>
                                <FilterInputBox w={270} h={50} mt={0} bg={"#f5f6f9"} p={
                                    parm.get("language") === "0" ? Korean.certi_tel_input : Ch.certi_tel_input
                                } v={tel} type={"tel"}
                                    // src={"/admin/search.png"} 
                                    onChange={(e) => setTel(e.target.value)}
                                />
                                <div style={{ width: "75px", height: "50px", background: "#f5f6f9", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <div style={{
                                        display: "flex", justifyContent: "center", alignItems: "center", background: "black", fontSize: "13px", color: "white",
                                        width: "65px", height: "30px", borderRadius: "5px",
                                    }} onClick={() => (
                                        // setActive(true),
                                        send_mess()
                                    )
                                    }>
                                        {active ?
                                            parm.get("language") === "0" ? Korean.certi_return : Ch.certi_return
                                            :
                                            parm.get("language") === "0" ? Korean.certi_active : Ch.certi_active
                                        }
                                    </div>
                                </div>
                            </div>
                            {tel_active ?
                                <p style={{ fontSize: "12px", color: "#ff1c8e", marginTop: "10px", fontWeight: "500" }}>
                                    {parm.get("language") === "0" ? Korean.certi_tel_input : Ch.certi_tel_input}</p>
                                :
                                <></>
                            }

                            {active ?
                                <>
                                    <div style={{ width: "345px", height: "50px", marginTop: "10px", background: "#f5f6f9", display: "flex", flexDirection: "row" }}>
                                        <FilterInputBox w={270} h={50} mt={0} bg={"#f5f6f9"} p={
                                            parm.get("language") === "0" ? Korean.certi_no : Ch.certi_no
                                        } v={ce}
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
                                    {ce_active ?
                                        <p style={{ fontSize: "12px", color: "#ff1c8e", marginTop: "10px", fontWeight: "500" }}>
                                            {parm.get("language") === "0" ? Korean.certi_nonumber : Ch.certi_nonumber}
                                        </p>
                                        :
                                        <></>
                                    }
                                </>
                                :
                                <></>
                            }

                            <div style={{
                                marginTop: "100px", width: "345px", height: "60px", background: "linear-gradient(to left, #33405a, #112448)", color: "white",
                                display: "flex", justifyContent: "center", alignItems: "center", fontSize: "18px", borderRadius: "5px"
                            }} onClick={() => Certify()}>
                                {parm.get("language") === "0" ? Korean.certi_next : Ch.certi_next}
                            </div>

                        </div>
                    </div>
                    :
                    <div  className={styles.innerbox} style={{ height: "100vh" }}>
                        <Image
                            aria-hidden
                            src='/admin/chech_process.png'
                            alt="close"
                            width={50}
                            height={50}
                            style={{ marginTop: "150px" }}
                        />
                        <p style={{ marginTop:"15px" , fontWeight:"bold" , fontSize:"20px"}}> {parm.get("language") === "0" ? Korean.accept_eight : Ch.accept_eleven}
                            {/* 접수가 완료되었습니다 */}
                            </p>
                        <p style={{ marginTop:"10px" , fontWeight:"500" , fontSize:"13px" , color:"#84848f"}}>
                        {parm.get("language") === "0" ? Korean.accept_nine : Ch.accept_nine}</p>
                        <p style={{ marginTop:"20px" , fontWeight:"500" , fontSize:"14px" , color:"#1c68ff" , textAlign:"center"}}>
                        {parm.get("language") === "0" ? Korean.accept_ten : Ch.accept_ten}<br/>
                        {parm.get("language") === "0" ? Korean.accept_ten_s : Ch.accept_ten_s}</p>

                        <div style={{
                            marginTop: "150px", width: "345px", height: "60px", color:"white" , background:"linear-gradient(to left, #02f, #3d7dff)" ,
                            display: "flex", justifyContent: "center", alignItems: "center", fontSize: "15px", borderRadius: "5px" ,
                            fontWeight:"600"
                        }} onClick={() =>(
                            parm.get("userId") === null ?
                            (
                                parm.get("language") === "0" ? 
                                router.push(`/Member?&member=${parm.get("member")}&language=0`) 
                                :
                                router.push(`/Member?&member=${parm.get("member")}&language=1`) 
                            )
                            :
                            (
                                parm.get("language") === "0" ? 
                                router.push(`/CRM?&member=${parm.get("member")}&language=${parm.get("language")}&userId=${parm.get("userId")}`) 
                                :
                                router.push(`/CRM?&member=${parm.get("member")}&language=${parm.get("language")}&userId=${parm.get("userId")}`) 
                            )
                        )
                        }>
                            {parm.get("language") === "0" ? Korean.accept_eleven : Ch.accept_eleven}
                        </div>

                    </div>
                }
            </div>

            {modal ?
                <div className={styles.modalBackdrop} style={{ alignItems: "flex-end" }}>
                    <div className={styles.acceptbox}>
                        <div style={{ width: "100%", height: "30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <p style={{ fontSize: "20px", fontWeight: "bold", color: "#000" }}>
                            {parm.get("language") === "0" ? Korean.accept_first : Ch.accept_first}</p>
                            <Image
                                aria-hidden
                                src='/common/close.png'
                                alt="close"
                                width={30}
                                height={30}
                                onClick={() => setModal(true)}
                            />
                        </div>

                        <div style={{
                            width: "100%", height: "50px", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px",
                            borderBottom: "1px solid #ebecf1"
                        }}>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <Image
                                    aria-hidden
                                    src={first && second && third && four ? '/member/check_active.png' : '/member/check.png'}
                                    alt="close"
                                    width={20}
                                    height={20}
                                    onClick={() => (
                                        setFirst(!first),
                                        setSecond(!second),
                                        setThird(!third),
                                        setFour(!four)
                                    )}
                                />
                                <p style={{ fontSize: "15px", fontWeight: "600", color: "#000", marginLeft: "10px" }}>
                                {parm.get("language") === "0" ? Korean.accept_second : Ch.accept_second}
                                </p>
                            </div>
                            <Image
                                aria-hidden
                                src='/member/back.png'
                                alt="close"
                                width={20}
                                height={20}
                                style={{ rotate: "180deg" }}
                            />
                        </div>

                        <div style={{
                            width: "100%", height: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px",
                        }}>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <Image
                                    aria-hidden
                                    src={first ? '/member/check_active.png' : '/member/check.png'}
                                    alt="close"
                                    width={20}
                                    height={20}
                                    onClick={() => setFirst(!first)}
                                />
                                <p style={{ fontSize: "14px", fontWeight: "500", color: "#1c68ff", marginLeft: "10px" }}>
                                {parm.get("language") === "0" ? Korean.fi : Ch.fi}</p>
                                <p style={{ fontSize: "15px", fontWeight: "600", color: "#000", marginLeft: "5px" }}>
                                {parm.get("language") === "0" ? Korean.accept_third : Ch.accept_third}
                                </p>
                            </div>
                            <Image
                                aria-hidden
                                src='/member/back.png'
                                alt="close"
                                width={20}
                                height={20}
                                style={{ rotate: "180deg" }}
                            />
                        </div>

                        <div style={{
                            width: "100%", height: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px",
                        }}>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <Image
                                    aria-hidden
                                    src={second ? '/member/check_active.png' : '/member/check.png'}
                                    alt="close"
                                    width={20}
                                    height={20}
                                    onClick={() => setSecond(!second)}
                                />
                                <p style={{ fontSize: "14px", fontWeight: "500", color: "#1c68ff", marginLeft: "10px" }}>
                                    {parm.get("language") === "0" ? Korean.fi : Ch.fi}
                                </p>
                                <p style={{ fontSize: "15px", fontWeight: "600", color: "#000", marginLeft: "5px" }}>
                                {parm.get("language") === "0" ? Korean.accept_four : Ch.accept_four}</p>
                            </div>
                            <Image
                                aria-hidden
                                src='/member/back.png'
                                alt="close"
                                width={20}
                                height={20}
                                style={{ rotate: "180deg" }}
                            />
                        </div>

                        <div style={{
                            width: "100%", height: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px",
                        }}>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <Image
                                    aria-hidden
                                    src={third ? '/member/check_active.png' : '/member/check.png'}
                                    alt="close"
                                    width={20}
                                    height={20}
                                    onClick={() => setThird(!third)}
                                />
                                <p style={{ fontSize: "14px", fontWeight: "500", color: "#1c68ff", marginLeft: "10px" }}>
                                {parm.get("language") === "0" ? Korean.fi : Ch.fi}
                                </p>
                                <p style={{ fontSize: "15px", fontWeight: "600", color: "#000", marginLeft: "5px" }}>
                                {parm.get("language") === "0" ? Korean.accept_five : Ch.accept_five}
                                </p>
                            </div>
                            <Image
                                aria-hidden
                                src='/member/back.png'
                                alt="close"
                                width={20}
                                height={20}
                                style={{ rotate: "180deg" }}
                            />
                        </div>

                        <div style={{
                            width: "100%", height: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px",
                        }}>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <Image
                                    aria-hidden
                                    src={four ? '/member/check_active.png' : '/member/check.png'}
                                    alt="close"
                                    width={20}
                                    height={20}
                                    onClick={() => setFour(!four)}
                                />
                                <p style={{ fontSize: "14px", fontWeight: "500", color: "#84848f", marginLeft: "10px" }}>
                                {parm.get("language") === "0" ? Korean.fi_no : Ch.fi_no}
                                </p>
                                <p style={{ fontSize: "15px", fontWeight: "600", color: "#000", marginLeft: "5px" }}>
                                {parm.get("language") === "0" ? Korean.accept_six : Ch.accept_six}</p>
                            </div>
                            <Image
                                aria-hidden
                                src='/member/back.png'
                                alt="close"
                                width={20}
                                height={20}
                                style={{ rotate: "180deg" }}
                            />
                        </div>

                        <div style={{
                            marginTop: "60px", width: "345px", height: "60px",
                            background: first && second && third ? "linear-gradient(to left, #33405a, #112448)" : "#ebecf1",
                            color: first && second && third ? "white" : "#84848f", fontWeight: "600",
                            display: "flex", justifyContent: "center", alignItems: "center", fontSize: "15px", borderRadius: "5px"
                        }} onClick={() =>
                            first && second && third ?
                                (
                                    setState(2),
                                    setModal(false)
                                )
                                :
                                ""
                        }>
                            {parm.get("language") === "0" ? Korean.accept_seven : Ch.accept_seven}
                            {/* 위 내용에 동의하고, 접수완료 */}
                        </div>

                    </div>
                </div>
                :
                <></>
            }

            </div>
        }
       </>
       
    );
}

const OAuthTokenPage = () => {
    return (
      <Suspense>
        <Certify />
      </Suspense>
    );
  };
  
  export default OAuthTokenPage;