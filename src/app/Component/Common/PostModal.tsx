import React from "react";
import styles from "@/app/css/modal.module.css";
import Image from "next/image";
import { getUserApi, getUser } from "@/app/server/admin_user";
import { useEffect, useState } from "react";
import { WorkResponse, UserList } from "@/app/type/user";
import UserPost from "../Admin/Userpost";
import PostWork from "../Admin/PostWork";
import { workchangeorder } from "@/app/server/work";
import { work_detail } from "@/app/server/work";

interface ModalProps {
  onClose: () => void;
  la?: string;
  pk?: number;
}

const PostModal: React.FC<ModalProps> = ({ onClose, la, pk = 0 }) => {

  const [user, setUser] = useState<WorkResponse[] | []>([]);
  const [max, setMax] = useState<number | 0>(0);
  const [user_no, setUserNo] = useState<UserList>();
  const [modal_post, setModalPost] = useState<boolean>(false); // 로딩 상태
  const [tooltipIndex, setTooltipIndex] = useState<number | null>(null)
  const [work_id, setWork_id] = useState<number | 0>(0);
    
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserApi(pk, la === "ko" ? 0 : 1);
        const data_user = await getUser(pk);
        setUserNo(data_user)
        setUser(data);  // 성공적으로 데이터 받으면 상태에 저장

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
      } catch (error) {
        console.log(error)
      }
    };
    fetchUser();
  }, [pk]); // u)

  

  const UpGrade = async (index: number, id: number, o: number) => {
    setUser((prevUsers) => {
      if (!prevUsers || index <= 0) return prevUsers; // 첫 번째 요소는 이동 불가

      const newUsers = [...prevUsers]; // 기존 배열을 복사하여 새로운 배열 생성
      [newUsers[index - 1], newUsers[index]] = [newUsers[index], newUsers[index - 1]]; // 요소 위치 변경

      return newUsers; // 새로운 배열로 상태 업데이트
    });


    await workchangeorder({
      "pk": user_no!!.id,
      "work_id": id,
      "direction": "up",
    });

  }

  const DownGrade = async (index: number, id: number, o: number) => {
    setUser((prevUsers) => {
      if (!prevUsers || index >= prevUsers.length - 1) return prevUsers; // 마지막 요소는 이동 불가

      const newUsers = [...prevUsers]; // 기존 배열 복사
      [newUsers[index], newUsers[index + 1]] = [newUsers[index + 1], newUsers[index]]; // 요소 위치 변경

      return newUsers; // 새로운 배열로 상태 업데이트
    });

    await workchangeorder({
      "pk": user_no!!.id,
      "work_id": id,
      "direction": "down",
    });

  }


  return (
    <div className={styles.modalBackdrop}>
      {la === "ko" || la === "ch" ?
        <>
          {modal_post ?
            <PostWork n={pk} la={la} onClose={() => onClose()} max={max} work_id ={work_id}/>
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
                          onClick={() => index > 0 && UpGrade(index, user?.id, user?.user.id)}
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
                          onClick={() => index + 1 < max && DownGrade(index, user?.id, user?.user.id)} // 마지막 요소가 아닐 때만 실행
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

                            <div className={styles.tooltoplist}>
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
        la === "post" ?
          <UserPost onClose={() => onClose()} pk={pk} />
          :
          <>1</>

      }
    </div>
  );
};

export default PostModal;
