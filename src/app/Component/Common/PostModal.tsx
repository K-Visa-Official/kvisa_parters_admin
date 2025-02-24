import React from "react";
import styles from "@/app/css/modal.module.css";
import Image from "next/image";
import { getUserApi, getUser } from "@/app/server/admin_user";
import { useEffect, useState } from "react";
import { WorkResponse, UserList } from "@/app/type/user";
import UserPost from "../Admin/Userpost";
import PostWork from "../Admin/PostWork";

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

  return (
    <div className={styles.modalBackdrop}>
      {la === "ko" || la === "ch" ?
        <>
          {modal_post ?
            <PostWork n={pk} la={la} onClose={() => onClose()} max={max} />
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
                        <img src={user?.detail} style={{ width: "86px", height: "40px" }} />
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
                        />
                      </div>
                      <div style={{ width: "60px" }} className={styles.contentinner}>
                        <Image
                          aria-hidden
                          src="/admin/etc.png"
                          alt="etc icon"
                          width={20}
                          height={20}
                        />
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
          <UserPost onClose={() => onClose()} />
          :
          <>1</>

      }
    </div>
  );
};

export default PostModal;
