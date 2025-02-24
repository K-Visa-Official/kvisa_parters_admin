import { useEffect, useState } from "react";
import { alluserApi } from "@/app/server/admin_user";
import styles from "@/app/css/admin_user.module.css";
import { UserList, AllUserResponse } from "@/app/type/user";
import Image from "next/image";
import PostModal from "../Common/PostModal";

export default function UserListtotla() {
    const [users, setUsers] = useState<UserList[]>([]); // 유저 데이터 상태
    const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태
    const [error, setError] = useState<string | null>(null); // 에러 상태
    const [language, setLanguage] = useState<string | "ko">("ko"); // 에러 상태
    const [modal, setModal] = useState<boolean>(false); // 로딩 상태
    const [pk, setPk] = useState<number>(0); // 로딩 상태

    const list = ["순번", "가입일", "회사/업체명", "업체 소개문구", "담당자", "계정정보", "입금계좌", "중국어 업무", "한국어 업무",
        // "접수 현황", "a"
    ];

    useEffect(() => {
        async function fetchUsers() {
            try {
                const data: AllUserResponse = await alluserApi("", ""); // 파라미터 값은 실제로 적절하게 설정
                setUsers(data.results); // 받은 데이터로 상태 업데이트
                setIsLoading(false);
            } 
            catch (e) {
                console.log(e)
                setError("유저 목록을 불러오는 데 실패했습니다.");
                setIsLoading(false);
            }
        }

        fetchUsers();
    }, [modal]);

    if (isLoading) {
        return <p>로딩 중...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div style={{ padding: "0px 30px", marginTop: "30px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", width: "1470px", height: "30px", color: "black", fontWeight: "bold" }}>
                <span>전체 {users.length}개</span>
                <button className={styles.btn_post}
                    style={{ background: "white", border: "1px solid #1c68ff" }}
                    onClick={() => (
                        setLanguage("post"),
                        setModal(true)
                    )}
                >업체 리스트 추가</button>
            </div>

            {/* <div className={styles.listtop}>
                    <div style={{ width: "60px"}} className={styles.listfirst}>
                        {user.id}
                    </div>
                    <div style={{ width: "110px"}} className={styles.listfirst}>
                        {user.sign_in}
                    </div>
                    <div style={{ width: "210px"}} className={styles.listfirst}>
                        {user.bu_name}
                    </div>
                    <div style={{ width: "257px"}} className={styles.listfirst}>
                        {user.bu_intro}
                    </div>
                    <div style={{ width: "120px"}} className={styles.listfirst}>
                        {user.bu_tel_name}
                    </div>

                    <div style={{ width: "120px"}} className={styles.listfirst}>
                        {user.email}
                    </div>

                    <div style={{ width: "164px"}} className={styles.listfirst}>
                        {user.bu_bank_number}
                    </div>
                    <div style={{ width: "140px"}} className={styles.listfirst}>
                        {user.work_count}
                    </div>
                    <div style={{ width: "140px"}} className={styles.listfirst}>
                        {user.work_count_ch}
                    </div>

                    <div style={{ width: "90px"}} className={styles.listfirst}>
                        {Number(user.work_count_ch) + Number(user.work_count)}
                    </div>

                   
            </div> */}

            <div className={styles.listtop}>
                {list.map((user, index) => (
                    <div className={styles.listfirst}
                        key={index}
                        style={{
                            width:
                                user === "순번" ? "60px"
                                    : user === "가입일" ? "110px"
                                        : user === "회사/업체명" ? "210px"
                                            : user === "업체 소개문구" ? "257px"
                                                : user === "담당자" || user === "계정정보" ? "120px"
                                                    : user === "입금계좌" ? "164px"
                                                        : user === "중국어 업무" || "한국어 업무" ? "140px"
                                                            // : user === "접수 현황" ? "90px"
                                                            //     : user === "a" ? "60px" :
                                                            : "60px",
                            flexGrow: 0, // `flex-grow`를 0으로 설정하여 이 요소가 늘어나지 않도록
                            flexShrink: 0, // `flex-shrink`를 0으로 설정하여 이 요소가 줄어들지 않도록
                        }}>
                        {user}
                        {user === "순번" || user === "가입일" || user === "접수현황" ?
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
                <div className={styles.listfirst} style={{ width: "90px" }}>
                    접수현황
                </div>
                <div className={styles.listfirst} style={{ width: "60px" }}>
                    {/* {Number(user.work_count_ch) + Number(user.work_count)} */}
                </div>
            </div>
            {users.map((user, index) => (
                <div className={styles.listtotal} key={index}>
                    <div style={{ width: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        {user.id}
                    </div>
                    <div style={{ width: "110px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        {/* {user.sign_in} */}
                        {user.sign_in.slice(2, 10)} <br />
                        {user.sign_in.slice(11, 19)}
                    </div>
                    <div style={{ width: "210px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <img
                            src={user.bu_logo}
                            width={25}
                            height={25}
                            style={{ marginRight: "10px" }}
                        />
                        {user.bu_name}
                    </div>
                    <div style={{ width: "257px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        {user.bu_intro}
                    </div>
                    <div style={{ width: "120px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        {user.bu_tel_name}<br />
                        <span className={styles.secondtext}>{user.bu_tel_first}</span>
                    </div>

                    <div style={{ width: "120px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        {user.email}<br />
                        <span className={styles.secondtext}>{user.email}@</span>
                    </div>

                    <div style={{ width: "164px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        {user.bu_bank_name}<br />
                        <span className={styles.secondtext}>{user.bu_bank_number}</span>
                    </div>
                    <div style={{ width: "140px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div style={{ height: "16px", borderBottom: "1px solid black", marginRight: "16px", cursor: "pointer" }}
                            onClick={() => (
                                setLanguage("ch"),
                                setModal(true),
                                setPk(user.id)
                            )}
                        >
                            <span style={{ textDecoration: "underline" }}>{user.work_count_ch}</span>
                        </div>
                        <button className={styles.btn} style={{ background: "black", border: "none" }}
                           onClick={() => {
                            const currentUrl = window.location.href; // 현재 페이지 URL 가져오기
                            navigator.clipboard.writeText(currentUrl + 'Member?&member=' + user.id + '&language=1') // 클립보드에 복사
                                .then(() => alert("링크가 복사되었습니다!")) // 성공 시 알림
                                .catch(err => console.error("링크 복사 실패:", err));
                            // console.log(currentUrl + 'Member?&member=' + user.id + '&language=0')

                        }}>링크복사</button>
                    </div>
                    <div style={{ width: "140px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div style={{ height: "16px", borderBottom: "1px solid black", marginRight: "16px", cursor: "pointer" }}
                            onClick={() => (
                                setLanguage("ko"),
                                setModal(true),
                                setPk(user.id)
                            )}
                        >
                            <span style={{ textDecoration: "underline" }}>{user.work_count}</span>
                        </div>
                        <button className={styles.btn} style={{ background: "black", border: "none" }}
                        onClick={() => {
                            const currentUrl = window.location.href; // 현재 페이지 URL 가져오기
                            navigator.clipboard.writeText(currentUrl + 'Member?&member=' + user.id + '&language=0') // 클립보드에 복사
                                .then(() => alert("링크가 복사되었습니다!")) // 성공 시 알림
                                .catch(err => console.error("링크 복사 실패:", err));

                        }}>링크복사</button>
                    </div>

                    <div style={{ width: "90px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div style={{ height: "16px", borderBottom: "1px solid black" }}>
                            <span style={{ textDecoration: "underline" }}>{Number(user.work_count_ch) + Number(user.work_count)}</span>
                        </div>
                    </div>

                    <div style={{ width: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
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
            {modal ?
                <PostModal la={language} pk={pk} onClose={() => setModal(false)} /> :
                <></>
            }
        </div>
    );
}
