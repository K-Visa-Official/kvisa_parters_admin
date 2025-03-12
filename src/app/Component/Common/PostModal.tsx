import React from "react";
import styles from "@/app/css/modal.module.css";
import first from "@/app/css/business.module.css";
import BusinessStore from "@/app/store/business_store";
import second from "@/app/css/admin_user.module.css";
import Image from "next/image";
import { getUserApi, getUser } from "@/app/server/admin_user";
import { useEffect, useState } from "react";
import { WorkResponse, UserList, Answer_Post } from "@/app/type/user";
import UserPost from "../Admin/Userpost";
import PostWork from "../Admin/PostWork";
import { work_Detail } from "@/app/server/busioness";
import { VisaApiResponse } from "@/app/type/busioness";
import FilterInputBox from "./FilterInputBox";
import Paging from "../Common/Paging";
import {  get_answer, workchangeorder } from "@/app/server/work";
import modal from 'src/app/page.module.css';
import { workdelete } from "@/app/server/work";
import { tr } from "date-fns/locale";

interface ModalProps {
  onClose: () => void;
  la?: string;
  pk?: number;
}

const PostModal: React.FC<ModalProps> = ({ onClose, la, pk = 0 }) => {

  const [user, setUser] = useState<WorkResponse[] | []>([]);
  const [work, setWork] = useState<VisaApiResponse>();
  const [max, setMax] = useState<number | 0>(0);
  const [title, setTitle] = useState<string | "">("");
  const [choice, setChoice] = useState<string | "진행중">("진행중");
  const [user_no, setUserNo] = useState<UserList>();
  const [modal_post, setModalPost] = useState<boolean>(false); // 로딩 상태
  const [tooltipIndex, setTooltipIndex] = useState<number | null>(null)
  const [work_id, setWork_id] = useState<number | 0>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태
  const [maxpage, setMaxPage] = useState<number>(1); // 로딩 상태
  const [an_list, setAn_list] = useState<Answer_Post[]>(); // 유저 데이터 상태
  const [ac, setAc] = useState<boolean | false>(false);
  const [year, setYear] = useState<string | number>(new Date().getFullYear());
  const [year_active, setYear_active] = useState<boolean | false>(false);
  const [month, setMonth] = useState<string | number>(new Date().getMonth());
  const [month_active, setMonth_active] = useState<boolean | false>(false);
  // const order = ["접수완료", "계약완료", "서류작성", "심사진행", "처리완료", "상담종료"]
  const { pa, setPa } = BusinessStore();
  const list = ["접수날짜", "접수언어", "업무종류", "접수고객명", "고객연락처", "질문내용", "진행상태"];
  const currentYear = new Date().getFullYear();

  const year_list = Array.from({ length: 21 }, (_, i) => currentYear + i);
  const month_list = Array.from({ length: 12 }, (_, i) => i + 1);

  const fetchUser = async () => {
    try {
      if (pk !== 0) {
        const data = await getUserApi(pk, la === "ko" ? 0 : 1);
        const data_user = await getUser(pk);
  
        setUserNo(data_user);
        setUser(data);
  
        setMax(la === "ko" ? data_user.work_count || 0 : data_user.work_count_ch || 0);
      }
    } catch (error) {
      console.error("데이터 가져오기 오류:", error);
    } finally {
      setIsLoading(false); // 항상 실행되도록 보장
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await workdelete(id); // 삭제 실행
      await fetchUser(); // 삭제 후 데이터 새로고침
    } catch (error) {
      console.error("삭제 오류:", error);
    }
  };


  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
  
      try {
        if(pk !== 0){
          const data = await getUserApi(pk, la === "ko" ? 0 : 1);
          const data_user = await getUser(pk);
          setUserNo(data_user)
          setUser(data);  // 성공적으로 데이터 받으면 상태에 저장
          setIsLoading(false);
  
          if (la === "ko") {
            if (data_user.work_count === 0) {
              setMax(0)
            }
            else {
              setMax(data_user.work_count)
            }
          }
          else {
            if (data_user.work_count_ch === 0) {
              setMax(0)
            }
            else {
              setMax(data_user.work_count_ch)
            }
          }
        }
      
      } catch (error) {
        console.log(error)
      }
    };
    fetchUser();
  }, [pk ]); // u)

  useEffect(() => {
    const fetchUser_work = async () => {
      try {
        const data = await work_Detail(pk, pa);
          setWork(data)
          setMaxPage(data.count)  
      } catch (error) {
        console.log(error)
      }
    };
    fetchUser_work();
  }, [pk, pa]); // u)



  const UpGrade = async (index: number, id: number) => {
    setUser((prevUsers) => {
      if (!prevUsers || index <= 0) return prevUsers; // 첫 번째 요소는 이동 불가

      const newUsers = [...prevUsers]; // 기존 배열을 복사하여 새로운 배열 생성
      [newUsers[index - 1], newUsers[index]] = [newUsers[index], newUsers[index - 1]]; // 요소 위치 변경

      return newUsers; // 새로운 배열로 상태 업데이트
    });


    await workchangeorder({
      "pk": Number(user_no?.id),
      "work_id": id,
      "direction": "up",
    });

  }

  const DownGrade = async (index: number, id: number) => {
    setUser((prevUsers) => {
      if (!prevUsers || index >= prevUsers.length - 1) return prevUsers; // 마지막 요소는 이동 불가

      const newUsers = [...prevUsers]; // 기존 배열 복사
      [newUsers[index], newUsers[index + 1]] = [newUsers[index + 1], newUsers[index]]; // 요소 위치 변경

      return newUsers; // 새로운 배열로 상태 업데이트
    });

    await workchangeorder({
      "pk": Number(user_no?.id),
      "work_id": id,
      "direction": "down",
    });

  }

  const PageNeControl = async () => {
    if (pa === Math.floor(5 / maxpage)) {
    }
    else {
      setPa(pa + 1)
    }
  }

  const PageControl = (selectedPage: number) => {
    setPa(selectedPage);
  };

  const PageBeControl = async () => {
    // setPage(page + 1)
    if (pa === 1) {

    }
    else {
      setPa(pa - 1)
    }

  }

  // const ChangeState = async (a: number, b: number) => {

  //   if (!work || !work.results) return;

  //   // 새로운 리스트 생성 (불변성 유지)
  //   const updatedList = work.results.map((item) =>
  //     item.id === a ? { ...item, state: b } : item
  //   );

  //   // 상태 업데이트
  //   setWork({ ...work, results: updatedList });

  //   change_state(a, b)

  // }

  async function AnswerLook(a: number) {
    try {
      const data = await get_answer(a); // 비동기 데이터 가져오기
      setAn_list(data); // 가져온 데이터로 상태 업데이트
      setAc(!ac); // 상태 토글
    } catch (error) {
      console.error("Error fetching answer:", error);
    }
  }

  
  // if (!work) {
  //   return <div>로딩 중...</div>;  // 데이터가 없을 때 로딩 메시지 표시
  // }


  // if (isLoading) {
  //   return <p style={{ color: "black" }}>로딩 중...</p>;
  // }

  
  return (
    <div className={styles.modalBackdrop}>
      <style>
        {`
                  /* 스크롤바 스타일 (Chrome, Edge, Safari) */
                  ::-webkit-scrollbar {
                    width: 8px;
                  }
                  ::-webkit-scrollbar-thumb {
                    background: #ebecf1; /* 스크롤바 색상 */
                    border-radius: 4px;
                  }
                  ::-webkit-scrollbar-track {
                    background: #f5f6f9; /* 스크롤바 트랙 색상 */
                  }
                `}
      </style>
      {la === "ko" || la === "ch" ?
        <>
          {modal_post ?
            <PostWork n={pk} la={la} onClose={() => onClose()} max={max} work_id={work_id} />
            :
            <div className={styles.modaltotal}>
              <div className={styles.modaltitle}>
                {la === "ko" ?
                  <span style={{ marginLeft: "30px" }} >한국어 업무</span> :
                  <span style={{ marginLeft: "30px" }}>중국어 업무</span>
                }
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

              <div className={styles.modaluser}>
                {/* {user ? user[0]?.user?.id : "유저 정보를 불러오는 중..."} */}
                <div className={styles.modalcard}>
                  <img src=
                    {
                      user_no ? user_no?.bu_logo :
                        "/common/ic_nonprofile.svg"}
                    style={{ width: "24px", height: "24px", marginLeft: "15px" }}
                  />
                  <div style={{ marginLeft: "20px" }}>
                    {user_no ? user_no?.bu_name : ""}<br />
                    <span style={{ color: "#84848f", fontSize: "12px", marginTop: "2px" }}>{user_no ? user_no?.bu_intro : ""}</span>
                  </div>
                </div>

                <div className={styles.posttotal}>
                  <div className={styles.postbox}
                    onClick={() => (
                      setModalPost(true)
                    )}
                  >
                    업무등록
                  </div>
                </div>

              </div>

              <div className={styles.contenttotal}>
                <div style={{ width: "60px" }} className={styles.contentinner}>
                  <div style={{ background: "white", borderRadius: "50%", width: "16px", height: "16px" }}></div>
                </div>
                <div style={{ width: "530px", justifyContent: "flex-start", marginLeft: "15px" }} className={styles.contentinner}>
                  <span>업무정보</span>
                </div>
                <div style={{ width: "90px" }} className={styles.contentinner}>
                  <span>순서변경</span>
                </div>
                <div style={{ width: "60px" }} className={styles.contentinner}>
                  {/* <Image
                  aria-hidden
                  src="/admin/etc.png"
                  alt="etc icon"
                  width={20}
                  height={20}
                /> */}
                </div>
              </div>
              {max === 0 ?
                <></>
                :
                <>
                  {user?.map((user, index) => (

                    <div className={styles.contentlist} key={index}>
                      <div style={{ width: "60px", borderBottom: "1px solid #ebecf1" }} className={styles.contentinner}>
                        <div style={{ background: "#ebecf1", borderRadius: "50%", width: "16px", height: "16px" }}></div>
                      </div>
                      <div style={{ width: "530px", justifyContent: "flex-start", borderBottom: "1px solid #ebecf1", marginLeft: "15px" }} className={styles.contentinner}>
                        <img src={String(user?.detail)} style={{ width: "86px", height: "40px" }} />
                        <div style={{ fontSize: "14px", color: "black", marginLeft: "10px" }}>
                          {user?.choice}<br />
                          <span style={{ fontSize: "12px", color: "#84848f", marginTop: "2px" }}>{user?.work_detail}</span>
                        </div>
                      </div>
                      <div style={{ width: "90px" }} className={styles.contentinner}>
                        <Image
                          aria-hidden
                          src={index === 0 ? "/admin/arrow_no.png" : "/admin/arrow_active.png"}
                          alt="etc icon"
                          width={22}
                          height={22}
                          style={{ rotate: index === 0 ? "0deg" : "180deg" }}
                          onClick={() => index > 0 && UpGrade(index, user?.id)}
                        />
                        <Image
                          aria-hidden
                          src={
                            index + 1 === max // 배열의 마지막 인덱스를 체크
                              ? "/admin/arrow_no.png"
                              : "/admin/arrow_active.png"
                          }
                          alt="etc icon"
                          width={22}
                          height={22}
                          style={{ rotate: index + 1 === max ? "180deg" : "0deg", marginLeft: "5px" }}
                          onClick={() => index + 1 < max && DownGrade(index, user?.id,)} // 마지막 요소가 아닐 때만 실행
                        />
                      </div>
                      <div style={{ width: "60px" }} className={styles.contentinner}
                        onClick={() => setTooltipIndex(tooltipIndex === index ? null : index)} >
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
                            <div className={styles.tooltoplist} onClick={() => (
                              setModalPost(true),
                              setWork_id(user.id)
                            )}>
                              정보 수정하기
                            </div>

                            <div className={styles.tooltoplist} 
                              onClick={()=> handleDelete(user.id)}>
                              삭제하기 (관리자 문의)
                            </div>

                          </div>
                        )}
                      </div>

                    </div>
                  ))}
                </>
              }
              <>

              </>

            </div>
          }
        </>
        :
        la === "post"  ?
          <UserPost onClose={() => onClose()} pk={pk === 0 ? 123 : pk} />
          :
          ac === true ?
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
                  <style>
                    {`
                  /* 스크롤바 스타일 (Chrome, Edge, Safari) */
                  ::-webkit-scrollbar {
                    width: 8px;
                  }
                  ::-webkit-scrollbar-thumb {
                    background: #ebecf1; /* 스크롤바 색상 */
                    border-radius: 4px;
                  }
                  ::-webkit-scrollbar-track {
                    background: #f5f6f9; /* 스크롤바 트랙 색상 */
                  }
                `}
                  </style>
                  <div style={{ background: "#f5f6f9", width: "100%", height: "100%", overflowY: "auto", borderRadius: "10px", }}
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
                      <div key={index} style={{ display: "flex", flexDirection: "column", marginLeft: "18px", fontSize: "15px", fontWeight: "500" }}>
                        <div style={{
                          display: "flex", flexDirection: "row", color: "black", fontWeight: "600",
                          marginTop: index === 0 ? "" : "25px"
                        }}>
                          <p style={{ color: "#1c68ff" }}>Q{index + 1}&nbsp;&nbsp;</p>
                          {user.question}
                        </div>
                        <div style={{ color: "#84848f", marginTop: "8px" }}>
                          - {user.answer}
                        </div>
                      </div>
                    ))}

                  </div>
                </div>
              </div>

            </div>
            :la === "work" ?
            <div className={styles.modalwork}>
              <div className={styles.modaltitle}>
                <span style={{ marginLeft: "30px" }} >접수현황</span>

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
              <div className={styles.modaltitle} style={{ borderBottom: "none", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "30px" }}>
                <div style={{ width: "90%", height: "100%", border: "solid 1px #ebecf1", borderRadius: "10px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                  <Image src={user_no ? user_no?.bu_logo :
                    "/common/ic_nonprofile.svg"} alt="pro"
                    width={24} height={24} style={{ marginLeft: "15px" }} />
                  <div style={{
                    display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", width: "250px", height: "60px", color: "black",
                    fontSize: "14px", marginLeft: "10px"
                  }}>
                    <p style={{ fontWeight: "600" }}>{user_no?.bu_name}</p>
                    <p style={{ color: "#84848f", fontSize: "12px", fontWeight: "500" }}>{user_no?.bu_intro}</p>
                  </div>
                </div>
              </div>

              <div className={styles.modaltitle} style={{ borderBottom: "none", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "18px", fontSize: "12px", fontWeight: "500" }}>
                <div style={{ width: "90%", height: "100%", borderRadius: "10px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>

                  {year_active ?
                    <div className={first.statebox} style={{
                      zIndex: "10", marginRight: "10px", height: "280px",
                      overflowY: "scroll", flexDirection: "column", overflowX: "hidden"
                    }}
                      >
                      {year_list.map((b, index) => (
                        <div className={first.statebox} style={{ marginRight: "10px" }}
                          onClick={() => (
                            setYear_active(!year_active),
                            setYear(b)
                          )
                          } key={index}>
                          <p>{b}</p>
                        </div>
                      ))}
                    </div>
                    :
                    <div className={first.statebox} style={{ marginRight: "10px" }}
                      onClick={() => setYear_active(!year_active)}>
                      <p>{year}</p>
                      <Image
                        aria-hidden
                        src="/admin/arrow_active.png"
                        alt="Window icon"
                        width={14}
                        height={14}
                      />
                    </div>
                  }

                  {month_active ?
                    <div className={first.statebox} style={{
                      zIndex: "10", marginRight: "10px", height: "280px",
                      overflowY: "scroll", flexDirection: "column", overflowX: "hidden"
                    }}
                      >
                      {month_list.map((b, index) => (
                        <div className={first.statebox} style={{ marginRight: "10px" }}
                          onClick={() => (
                            setMonth_active(!month_active),
                            setMonth(b)
                          )
                          } key={index}>
                          <p>{b}</p>
                        </div>
                      ))}
                    </div>
                    :
                    <div className={first.statebox} style={{ marginRight: "10px" }}
                      onClick={() => setMonth_active(!month_active)}>
                      <p>{month} 월</p>
                      <Image
                        aria-hidden
                        src="/admin/arrow_active.png"
                        alt="Window icon"
                        width={14}
                        height={14}
                      />
                    </div>
                  }

                  <FilterInputBox w={200} h={28} mt={0} bg={"#f5f6f9"} p={"고객명 또는 연락처"} v={title}
                    src={"/admin/search.png"}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <button className={second.btn} style={{ background: "black", border: "none", marginLeft: "10px" }}
                    onClick={() => setIsLoading(isLoading)}
                  >조회</button>

                </div>

              </div>

              <div className={styles.modaltitle} style={{ borderBottom: "none", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "7px", fontSize: "18px", fontWeight: "500", height: "20px" }}>
                <div style={{ width: "90%", height: "100%", borderRadius: "10px", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <p>{work?.message ? 0 : work?.results.length }개의 받은견적</p>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p style={{ marginRight: "10px", color: choice === "진행중" ? "black" : "#84848f" }}
                      onClick={() => setChoice("진행중")}>진행중</p>
                    <p style={{ marginRight: "10px", }}>|</p>
                    <p style={{ color: choice === "업무완료" ? "black" : "#84848f" }}
                      onClick={() => setChoice("업무완료")}>업무완료</p>
                  </div>
                </div>
              </div>

              <div className={styles.modaltitle} style={{
                flexDirection: "column",
                borderBottom: "none", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "15px", fontSize: "18px", fontWeight: "500", height: "auto"
              }}>
                <div style={{
                  width: "90%", height: "46px", borderRadius: "10px 10px 0px 0px", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center",
                  background: "#f5f6f9",
                }}>
                  {list.map((user, index) => (
                    <div className={second.listfirst}
                      key={index}
                      style={{
                        height: "46px",
                        width:
                          user === "접수날짜" || user === "접수언어" ? "90px"
                            : user === "업무종류" ? "203px"
                              : user === "접수고객명" || user === "고객연락처" ? "140px"
                                : user === "질문내용" ? "105px" : "136px",
                        justifyContent: user === "접수고객명" ? "flex-start" : "center",
                        marginLeft: user === "접수고객명" ? "0px" : "0px",
                      }}>
                      {user}
                      {user === "접수날짜" || user === "접수언어" || user === "업무종류" ?
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
                </div>

                {work?.results?.map((a, index) => (
                  <div style={{
                    width: "90%", height: "60px", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center",
                    background: "white", borderBottom: "1px solid #ebecf1", fontSize: "13px"
                  }} key={index}>
                    <div style={{ width: "90px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                      {String(a?.created_at)?.slice(0, 10).replaceAll("-", ".")}
                    </div>
                    <div style={{ width: "90px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                      {String(a?.lang) === "0" ? "한국어" : "중국어"}
                    </div>
                    <div style={{ width: "203px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                      맞춤형 비자상담 서비스
                    </div>
                    <div style={{ width: "140px", display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                      {a.name}
                    </div>
                    <div style={{ width: "140px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                      {a.tel}
                    </div>

                    <div style={{ width: "105px", display: "flex", justifyContent: "center", alignItems: "center" }} >
                      <div className={first.ansbox}
                        onClick={() => AnswerLook(a.id)}
                      >
                        답변 확인하기
                      </div>
                    </div>
                    <div style={{
                      display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer",
                    }} >
                      <div style={{position: "relative",
                        background: a.state === 0 ? "#FF4B4C" :
                          a.state === 1 ? "#FF9D4C" :
                            a.state === 2 ? "#B44DFF" :
                              a.state === 3 ? "#1B68FF" :
                                a.state === 4 ? "#FF1A8E" : "#A3A3A3", padding: "7px 40px", color: "white", borderRadius: "5px"
                      }}>
                        {a.state === 0 ? "접수완료" :
                          a.state === 1 ? "계약완료" :
                            a.state === 2 ? "서류작성" :
                              a.state === 3 ? "심사진행" :
                                a.state === 4 ? "처리완료" : "상담종료"
                        }
                      </div>
                      
                    </div>
                  </div>


                ))}

              </div>

              <Paging w={Math.ceil(maxpage / 5)} onClick={PageNeControl} before={PageBeControl} choice={PageControl}
                la={la} />
            </div>
            :
            <></>
      }
    </div>
  );
};

export default PostModal;
