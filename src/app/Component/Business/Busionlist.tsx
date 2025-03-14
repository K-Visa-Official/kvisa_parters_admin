import { useState, useEffect } from "react";
import styles from "@/app/css/admin_user.module.css";
import first from "@/app/css/business.module.css";
import Image from "next/image";
import Paging from "../Common/Paging";
import BusinessStore from "@/app/store/business_store";
import { businesslist } from "@/app/server/busioness";
import { VisaApiResponse } from "@/app/type/busioness";
import { useRouter } from "next/navigation";
import { change_state, get_answer } from "@/app/server/work";
import modal from 'src/app/page.module.css';
import { Answer_Post } from "@/app/type/user";

interface ModalProps {
    search?: boolean;
}

const Busionlist: React.FC<ModalProps> = ({ search }) => {

    const {
        title_bu, created_at_bu,
        page_bu, state , choice , order_by_bu , setOrderBy_bu ,
        // seTitle_bu, setCreate_bu, setState , 
        setPage_bu } = BusinessStore();
    const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태
    const [error, setError] = useState<string | null>(null); // 에러 상태
    const [maxpage, setMaxPage] = useState<number>(1); // 로딩 상태
    const [bu_list, setBu_list] = useState<VisaApiResponse>(); // 유저 데이터 상태
    const [an_list, setAn_list] = useState<Answer_Post[]>(); // 유저 데이터 상태
    const [tooltipIndex, setTooltipIndex] = useState<number | null>(null)
    const [tooltip, setTooltip] = useState<number | null>(null)
    const [ac, setAc] = useState<boolean | false>(false);

    const router = useRouter()

    const list = ["순번", "접수언어", "업무종류", "접수날짜", "B2B담당회사", "담당자", "접수고객명", "고객연락처", "질문내용", "진행상황"
        // "접수 현황", "a"
    ];

    const order = ["접수완료", "계약완료", "서류작성", "심사진행", "처리완료", "상담종료"]

    useEffect(() => {
        async function fetchUsers() {
            setIsLoading(true);
            try {
                const data: VisaApiResponse = await businesslist(title_bu, created_at_bu, state , page_bu , choice , order_by_bu); // 파라미터 값은 실제로 적절하게 설정
                setBu_list(data); // 받은 데이터로 상태 업데이트
                setIsLoading(false);
                setMaxPage(data.count)

                router.push('/Business?&page=' + page_bu)
                // router.push('/CRM')
            }
            catch (e) {
                console.log(e)
                setError("유저 목록을 불러오는 데 실패했습니다.");
                setIsLoading(false);
            }
        }

        fetchUsers();
    }, [search, page_bu ,choice , order_by_bu]);

    // useEffect(() => {
    //     async function fetchUsers() {
    //         try {
    //             const data: VisaApiResponse = await businesslist(title_bu, created_at_bu, page_bu); // 파라미터 값은 실제로 적절하게 설정
    //             setBu_list(data); // 받은 데이터로 상태 업데이트
    //             setIsLoading(false);
    //             setMaxPage(data.count)

    //             router.push('/Business?&page=' + page_bu)
    //             // router.push('/CRM')
    //         }
    //         catch (e) {
    //             console.log(e)
    //             setError("유저 목록을 불러오는 데 실패했습니다.");
    //             setIsLoading(false);
    //         }
    //     }

    //     fetchUsers();
    // }, [search, page_bu]);

    if (isLoading) {
        return <p style={{ color:"black"}}>로딩 중...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const PageNeControl = async () => {
        if (page_bu === Math.floor(10 / maxpage)) {
        }
        else {
            setPage_bu(page_bu + 1)
        }
    }

    const PageControl = (selectedPage: number) => {
        setPage_bu(selectedPage);
    };

    const PageBeControl = async () => {
        // setPage(page + 1)
        if (page_bu === 1) {

        }
        else {
            setPage_bu(page_bu - 1)
        }

    }

    const ChangeState = async (a: number, b: number) => {

        if (!bu_list || !bu_list.results) return;

        // 새로운 리스트 생성 (불변성 유지)
        const updatedList = bu_list.results.map((item) =>
            item.id === a ? { ...item, state: b } : item
        );

        // 상태 업데이트
        setBu_list({ ...bu_list, results: updatedList });

        change_state(a, b)

    }

    async function AnswerLook(a: number) {
        try {
            const data = await get_answer(a); // 비동기 데이터 가져오기
            setAn_list(data); // 가져온 데이터로 상태 업데이트
            setAc(!ac); // 상태 토글
        } catch (error) {
            console.error("Error fetching answer:", error);
        }
    }


    return (
        <>
            {ac ?
                <div className={modal.modalBackdrop}>

                    <div style={{ width: "420px", height: "550px", borderRadius: "10px", background: "white" }}>
                        <div style={{
                            display: "flex", justifyContent: "space-between", alignItems: "center", height: "60px", borderBottom: "1px solid #ebecf1",
                            padding: "0px 15px"
                        }}>
                            <div style={{ width: "30px", height: "60px" }}>
                            </div>
                            <div style={{ width: "120", height: "60px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "20px", fontWeight: "bold", color: "black" }}>
                                질의 문답 보기
                            </div>
                            <div style={{ width: "30px", height: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Image
                                    aria-hidden
                                    src="/common/close.png"
                                    alt="etc icon"
                                    width={30}
                                    height={30}
                                    onClick={() => setAc(!ac)}
                                />
                            </div>
                        </div>

                        <div style={{
                            display: "flex", justifyContent: "center", alignItems: "center", height: "365px", borderBottom: "1px solid #ebecf1",
                            padding: "20px 15px"
                        }}>
                            <div style={{ background: "#f5f6f9", width: "100%", height: "100%", overflowY: "auto", borderRadius: "10px" , }} 
                                    className={styles.quinner}>
                                <div style={{
                                    width: "100%", height: "70px", overflowY: "auto", borderRadius: "10px", fontSize: "16px", color: "black",
                                    display: "flex", alignItems: "center", fontWeight: "bold"
                                }}>
                                    <p style={{ marginLeft: "18px" }}>
                                        질의문답
                                    </p>
                                </div>
                                {an_list?.map((user, index) => (
                                    <div key={index} style={{ display: "flex", flexDirection: "column" , marginLeft:"18px" , fontSize:"15px" , fontWeight:"500"  }}>
                                        <div style={{ display: "flex", flexDirection: "row" ,  color:"black" , fontWeight:"600" , 
                                            marginTop: index === 0 ? "" : "25px"}}>
                                            <p style={{ color:"#1c68ff" }}>Q{index + 1}&nbsp;&nbsp;</p>
                                            {user.question}
                                        </div>
                                        <div style={{ color:"#84848f" , marginTop:"8px" }}>
                                            - {user.answer}
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>

                </div>
                :
                <div style={{ padding: "0px 30px", marginTop: "30px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "1470px", height: "30px", color: "black", fontWeight: "bold" }}>
                        <span>전체 {bu_list?.count} 개</span>
                        {/* <button className={styles.btn_post}
                    style={{ background: "white", border: "1px solid #1c68ff" }}
                    onClick={() => (
                        setLanguage("post"),
                        setModal(true),
                        setPk(0)
                    )}
                >업체 리스트 추가</button> */}
                    </div>


                    <div className={styles.listtop}>
                        {list.map((user, index) => (
                            <div className={styles.listfirst}
                                key={index}
                                style={{
                                    width:
                                        user === "순번" ? "60px"
                                            : user === "접수언어" ? "90px"
                                                : user === "업무종류" ? "203px"
                                                    : user === "접수날짜" ? "100px"
                                                        : user === "B2B담당회사" ? "210px"
                                                            : user === "담당자" ? "120px"
                                                                : user === "접수고객명" || user === "고객연락처" ? "140px"
                                                                    : user === "질문내용" ? "105px"
                                                                        : user === "진행상황" ? "135px" : "60px",
                                    justifyContent: user === "B2B담당회사" || user === "담당자" || user === "접수고객명" ? "flex-start" : "center",
                                    marginLeft: user === "B2B담당회사" ? "20px" : "0px",
                                }}
                                onClick={()=> {
                                    if (user === "순번") {
                                        setOrderBy_bu(order_by_bu === "-id" ? "id" : "-id");
                                    } else if (user === "접수언어") {
                                        setOrderBy_bu(order_by_bu === "-lang" ? "lang" : "-lang");
                                    } else if (user === "업무종류") {
                                        setOrderBy_bu(order_by_bu === "-process__work__choice" ? "process__work__choice" : "-process__work__choice");
                                    } else if (user === "접수날짜") {
                                        setOrderBy_bu(order_by_bu === "-created_at" ? "created_at" : "-created_at");
                                    }
                                }}
                                >
                                {user}
                                {user === "순번" || user === "접수언어" || user === "업무종류" || user === "접수날짜" || user === "진행상황" ?
                                    <Image
                                        aria-hidden
                                        src="/admin/sort.png"
                                        alt="sort"
                                        width={12}
                                        height={12}
                                        style={{ marginLeft: "5px", cursor: "pointer" }}
                                    />
                                    :
                                    <></>
                                }

                            </div>
                        ))}

                        <div className={styles.listfirst} style={{ width: "60px" }}>
                            {/* {Number(user.work_count_ch) + Number(user.work_count)} */}
                        </div>
                    </div>

                    {bu_list?.results.map((a, index) => (
                        <div className={styles.listtotal} key={index} style={{ gap: "20px", fontSize: "14px", fontWeight: "500" }}>
                            <div style={{ width: "60px", display: "flex", justifyContent: "center", alignItems: "center" }} >
                                {10 * (page_bu - 1) + index + 1}
                            </div>
                            <div style={{ width: "90px", display: "flex", justifyContent: "center", alignItems: "center" }} >
                                {Number(a.lang) === 0 ? "한국어" : "중국어"}
                            </div>
                            <div style={{ width: "203px", display: "flex", justifyContent: "center", alignItems: "center" }} >
                                {a.work?.choice}
                            </div>
                            <div style={{ width: "100px", display: "flex", justifyContent: "center", alignItems: "center" }} >
                                {String(a?.created_at)?.slice(0, 10).replaceAll("-", ".")}
                            </div>
                            <div style={{ width: "210px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row" }} >
                                <div style={{ width: "30px", height: "30px", margin: "0px 10px", }}>
                                    <Image
                                        aria-hidden
                                        src={a.user?.bu_logo ? a.user?.bu_logo : "/common/ic_nonprofile.svg"}
                                        alt="Window icon"
                                        width={24}
                                        height={24}
                                        style={{ borderRadius: "50%" }}
                                    />
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", width: "158px" }}>
                                    {a.user?.bu_name}<br />
                                    <p style={{
                                        fontSize: "12px",
                                        color: "#84848f",
                                        display: "-webkit-box",
                                        WebkitLineClamp: 1,  // 최대 2줄
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        maxHeight: "36px", // 줄 간격에 맞게 설정 (12px * 1.5줄 간격 * 2줄 = 36px)
                                        lineHeight: "1.5"
                                    }}>{a.user?.bu_intro}</p>
                                </div>

                            </div>
                            <div style={{ width: "120px", display: "flex", justifyContent: "center", alignItems: "flex-start", flexDirection: "column" }} >
                                {a.user?.bu_tel_name}<br />
                                <p style={{
                                    fontSize: "12px",
                                    color: "#84848f",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 1,  // 최대 2줄
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    maxHeight: "36px", // 줄 간격에 맞게 설정 (12px * 1.5줄 간격 * 2줄 = 36px)
                                    lineHeight: "1.5"
                                }}>{a.user?.bu_tel_first}</p>
                            </div>
                            <div style={{ width: "140px", display: "flex", justifyContent: "flex-start", alignItems: "center" }} >
                                {a.name.split("^")[0]}
                            </div>
                            <div style={{ width: "140px", display: "flex", justifyContent: "center", alignItems: "center" }} >
                                {a.tel}
                            </div>
                            <div style={{ width: "105px", display: "flex", justifyContent: "center", alignItems: "center" }} >
                                <div className={first.ansbox} onClick={() => AnswerLook(a.id)}>
                                    답변 확인하기
                                </div>
                            </div>
                            <div style={{
                                width: "135px", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", // 툴팁 위치를 위한 상대 위치 설정
                                cursor: "pointer",
                            }}
                                onClick={() => setTooltip(tooltip === index ? null : index)}>
                                <div style={{
                                    width: "120px", height: "28px", borderRadius: "5px", fontSize: "12px", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center",
                                    background: a.state === 0 ? "#FF4B4C" :
                                        a.state === 1 ? "#FF9D4C" :
                                            a.state === 2 ? "#B44DFF" :
                                                a.state === 3 ? "#1B68FF" :
                                                    a.state === 4 ? "#FF1A8E" : "#A3A3A3",
                                    padding: "0px 8px 0px 31px"
                                }}>
                                    {a.state === 0 ? "접수완료" :
                                        a.state === 1 ? "계약완료" :
                                            a.state === 2 ? "서류작성" :
                                                a.state === 3 ? "심사진행" :
                                                    a.state === 4 ? "처리완료" : "상담종료"
                                    }
                                    <Image
                                        aria-hidden
                                        src="/common/bu_under.png"
                                        alt="Window icon"
                                        width={14}
                                        height={14}
                                    />
                                </div>


                                {tooltip === index && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "35px", right: "50px",
                                            background: "#fff", color: "#000",
                                            borderRadius: "5px", border: "solid 1px #ebecf1",
                                            fontSize: "14px", whiteSpace: "nowrap",
                                            boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.05)", zIndex: 3
                                        }}
                                    >
                                        {order.map((b, index) => (
                                            <div className={styles.tooltoplist_second} key={index} 
                                                style={{
                                                    background: b === "접수완료" ? "#FF4B4C" :
                                                        b === "계약완료" ? "#FF9D4C" :
                                                            b === "서류작성" ? "#B44DFF" :
                                                                b === "심사진행" ? "#1B68FF" :
                                                                    b === "처리완료" ? "#FF1A8E" : "#A3A3A3",
                                                    padding: "0px 8px 0px 31px", display: "flex", justifyContent: "space-between", alignItems: "center",
                                                    color:"white" , height:"30px"
                                                }}
                                                onClick={() => ChangeState(a.id, index)}>
                                                {b}
                                                <Image
                                                    aria-hidden
                                                    src="/common/bu_under.png"
                                                    alt="Window icon"
                                                    width={14}
                                                    height={14}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div
                                style={{
                                    width: "60px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    position: "relative", // 툴팁 위치를 위한 상대 위치 설정
                                    cursor: "pointer"
                                }}
                                onClick={() => setTooltipIndex(tooltipIndex === index ? null : index)} // 클릭 시 툴팁 열기/닫기
                            >
                                <Image
                                    aria-hidden
                                    src="/admin/etc.png"
                                    alt="etc icon"
                                    width={20}
                                    height={20}
                                />

                                {tooltipIndex === index && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "35px", transform: "translateX(-50%)",
                                            background: "#fff", color: "#000",
                                            borderRadius: "5px", border: "solid 1px #ebecf1",
                                            fontSize: "14px", whiteSpace: "nowrap", width: "174px", height: "100px",
                                            boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.05)", zIndex: 2
                                        }}
                                    >
                                        <div className={styles.tooltoplist_second}
                                        >
                                            답변확인하기
                                        </div>

                                        <div className={styles.tooltoplist_second}>
                                            삭제하기 (관리자 문의)
                                        </div>

                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    <Paging w={Math.ceil(maxpage / 10)} onClick={PageNeControl} before={PageBeControl} choice={PageControl} />


                </div>
            }
        </>
    );
}

export default Busionlist;
