"use client"
import first from "@/app/css/admin_user.module.css";
import styles from "@/app/css/business.module.css";
import Image from 'next/image';
import BusinessStore from "@/app/store/business_store";
import FilterInputBox from "../Common/FilterInputBox";
import { useState } from "react";
import { Busioness } from "@/app/type/typedef";
import Busionlist from "./Busionlist";

export default function Business() {

    const { title_bu, created_at_bu, seTitle_bu, setCreate_bu , state , setState , setPage_bu ,  setChoice} = BusinessStore();
    const [search, setSearch] = useState<boolean>(false); // 로딩 상태
    const [kind, setKind] = useState<string>(Busioness.total);
    const [isTooltipVisible, setTooltipVisible] = useState(false);
    const order = ["접수완료", "계약완료", "서류작성", "심사진행", "처리완료", "상담종료"]

    return (
        <div className={first.total}>
            <div className={first.totalinner}>
                <h3 className={first.titlebox}>
                    <Image
                        aria-hidden
                        src="/admin/cate_title.png"
                        alt="Window icon"
                        width={30}
                        height={30}
                        style={{ marginRight: "10px" }}
                    />
                    <p>접수된 업무현황</p>
                </h3>

                <div className={first.sub} style={{ justifyContent: "space-between" }}>
                    <p style={{ color: "#000", marginRight: "20px" }}>업무현황</p>
                    <div className={styles.filter}>
                        <FilterInputBox w={200} h={28} mt={0} bg={"#f5f6f9"} p={"고객명 또는 연락처"} v={title_bu}
                            src={"/admin/search.png"}
                            onChange={(e) => seTitle_bu(e.target.value)}
                        />

                        <FilterInputBox w={152} h={28} mt={0} bg={"#f5f6f9"} p={"접수일자(yyyy.mm.dd)"} v={created_at_bu}
                            src={"/admin/calendar.png"}
                            onChange={(e) => setCreate_bu(e.target.value)}
                        />

                        {isTooltipVisible ?
                            <div style={{ display:"flex" , flexDirection:"column"}}>
                                {order.map((b, index) => (
                                    <div className={styles.statebox} key={index}
                                        onClick={() => (
                                            setTooltipVisible(!isTooltipVisible) ,
                                            setState(index)
                                            )
                                            }> 
                                        <p>{b}</p>
                                        <Image
                                            aria-hidden
                                            src="/admin/arrow_active.png"
                                            alt="Window icon"
                                            width={14}
                                            height={14}
                                        />
                                    </div>
                                ))}
                            </div>
                            :
                            <div className={styles.statebox}
                                onClick={() => setTooltipVisible(!isTooltipVisible)}>
                                <p>{state === 10 ? "진행상태" : 
                                         state === 0 ? "접수완료" :
                                            state === 1 ? "계약완료" :
                                                state === 2 ? "서류작성" :
                                                    state === 3 ? "심사진행" :
                                                        state === 4 ? "처리완료" : "상담종료"
                                        }</p>
                                <Image
                                    aria-hidden
                                    src="/admin/arrow_active.png"
                                    alt="Window icon"
                                    width={14}
                                    height={14}
                                />
                            </div>
                        }


                        <button className={first.btn} style={{ background: "black", border: "none" }}
                            onClick={() => setSearch(!search)}
                        >조회</button>


                        <button className={first.btn} style={{ background: "#fff", border: "1px solid #e6eaee", color: "#000" }}
                            onClick={()=> (
                                seTitle_bu(""),
                                setCreate_bu(""),
                                setState(10),
                                setPage_bu(1)
                            )}  
                        >초기화</button>
                    </div>
                </div>

                <div className={styles.catebox}>
                    {Object.values(Busioness).map((item) => (
                        <span
                            key={item}
                            onClick={() => (
                                setKind(item) ,
                                item === "전체" ? 
                                setChoice(""):
                                setChoice(item)
                            )
                            }
                            style={{
                                borderBottom: kind === item ? "3px solid black" : "", paddingBottom: "12px",
                                color: kind === item ? "black" : "#c1c1c5", fontWeight: "600"
                            }}
                        >
                            {item}
                        </span>
                    ))}
                </div>

                <Busionlist search={search} />

            </div>
        </div>
    );
}
