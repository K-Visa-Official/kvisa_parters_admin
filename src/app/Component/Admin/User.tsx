"use client"
import styles from "@/app/css/admin_user.module.css";
import Image from 'next/image';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { User } from "@/app/type/typedef";
import useAdminStore from "@/app/store/adminuser";
import FilterInputBox from "../Common/FilterInputBox";
import UserListtotla from "./Userlist";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale"; // 한국어 locale

export default function UserBox() {

    const { title, created_at, seTitle, setCreate } = useAdminStore();
    const searchParams = useSearchParams();
    const subkind = searchParams.get('user-ch');
    const [active, setActive] = useState<string>(subkind ? subkind : User.total);
    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const [search, setSearch] = useState<boolean>(false); // 로딩 상태



    return (
        <div className={styles.total}>
            <div className={styles.totalinner}>
                <h3 className={styles.titlebox}>
                    <Image
                        aria-hidden
                        src="/admin/cate_title.png"
                        alt="Window icon"
                        width={30}
                        height={30}
                        style={{ marginRight: "10px" }}
                    />
                    <p>제휴업체 관리</p>
                </h3>

                <div className={styles.sub}>
                    <p style={active === User.total ? { color: "#000", marginRight: "20px" } : { color: "#c1c1c5", marginRight: "20px" }}
                        onClick={() => setActive(User.total)}>
                        {User.total}
                    </p>
                    {/* <p style={active === User.ex ? { color: "#000" } : { color: "#c1c1c5" }}
                        onClick={() => setActive(User.ex)}>
                        {User.ex}
                    </p> */}
                </div>

                <div className={styles.catebox}>
                    <FilterInputBox w={200} h={28} mt={0} bg={"#f5f6f9"} p={"업체명 또는 연락처"} v={title}
                        src={"/admin/search.png"}
                        onChange={(e) => seTitle(e.target.value)}
                    />

                    <div onClick={() => setShowCalendar(!showCalendar)} style={{ position: "relative"}}>
                        <FilterInputBox w={152} h={28} mt={0} bg={"#f5f6f9"} p={"가입일자(yyyy.mm.dd)"} v={created_at}
                            src={"/admin/calendar.png"}
                            onChange={(e) => setCreate(e.target.value)}
                        />
                    </div>
                        {showCalendar && (
                             <div style={{ position: "absolute",top: "200px", left: "330px" }}>
                                <DatePicker
                                    selected={created_at ? new Date(created_at) : null}
                                    onChange={(date) => {
                                        if (date) {
                                            setCreate(date.toISOString().split("T")[0]); // yyyy-MM-dd 형식 저장
                                        }
                                        setShowCalendar(false);
                                    }}
                                    dateFormat="yyyy.MM.dd"
                                    locale={ko} // 한국어 설정
                                    inline
                                />
                            </div>
                        )}
                    

                    <button className={styles.btn} style={{ background: "black", border: "none" }}
                        onClick={() => setSearch(!search)}
                    >조회</button>
                    <button className={styles.btn} style={{ background: "#fff", border: "1px solid #e6eaee", color: "#000" }}
                     onClick={()=> (
                        seTitle(""),
                        setCreate(""),
                        setSearch(!search)
                     )}>초기화</button>

                </div>


                {active === User.total ?
                    <UserListtotla search={search} />
                    :
                    <>2</>
                }
            </div>
        </div>
    );
}
