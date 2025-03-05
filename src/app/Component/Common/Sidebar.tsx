"use client"
import { Category } from "@/app/type/typedef";
import Image from 'next/image';
import {  useRouter , usePathname } from 'next/navigation';
// import { useState } from "react";
import styles from "@/app/css/common.module.css";
import useAuthStore from "@/app/store/user";


// interface EnterBtnProps {
//     // tabActive: string;
//     // h?: number;
//     // mt?: number;
//     // t: string;
//     // c: string;
//     // ts?: number;
//     // onClick?: () => void;
// }

export default function Sidebar() {
    const router = useRouter()
    const path = usePathname()
   
    return (
        <div style={{ height: "100vh", background: "#fff", width: "230px" }}>
            <Image
                aria-hidden
                src="/common/logo.png"
                alt="Window icon"
                width={105}
                height={38}
                style={{ marginTop: "40px", marginLeft: "25px" }}
            />
            {/* {tabActive === Category.first ? */}
            <div
                className={path === '/' ? styles.active : styles.active_none}
                style={{ marginTop: "78px" }}
                onClick={() => {
                            router.push(`/`);
                    }}
                >
                <Image
                    aria-hidden
                    src={path === '/'  ?
                        '/common/sidebar/membership_selected.svg' :
                        '/common/sidebar/membership.svg'
                    }
                    alt="Membership active"
                    width={25}
                    height={25}
                    style={{ marginRight: "5px" }}
                />
                <span>{Category.first}</span>
            </div>
            <div
                className={path === '/Business' ? styles.active : styles.active_none}
                style={{ marginTop: "10px" }}
                onClick={() => {
                            router.push(`/Business`);
                    }}
                >
                <Image
                    aria-hidden
                    src={path === '/Business' ?
                        '/common/sidebar/quote_selected.svg' :
                        '/common/sidebar/quote.svg'
                    }
                    alt="quote_selected active"
                    width={25}
                    height={25}
                    style={{ marginRight: "5px" }}
                />
                <span>{Category.second}</span>
            </div>

            <div style={{ marginTop:"500px" , color:"#84848f" , marginLeft:"50px" , fontSize:"13px" , fontWeight:"500" , cursor:"pointer"}}
             onClick={()=> useAuthStore.getState().logout()}>
                로그아웃
            </div>


            {/* :
                <div className={styles.active_none} style={{ marginTop: "78px" }}
                    onClick = { () => (
                        setTabActive(Category.first) ,
                        router.push(`?cate-type=${Category.first}`)
                        )}>
                    <Image
                        aria-hidden
                        src='/common/sidebar/membership.svg'
                        alt="Membership"
                        width={25}
                        height={25}
                        style={{ marginRight: "5px" }}
                    />
                    <span>{Category.first}</span>
                </div> */}
            {/* } */}
            {/* {tabActive === Category.second ?
                <div className={styles.active} style={{ marginTop: "10px" }}>
                    <Image
                        aria-hidden
                        src='/common/sidebar/quote_selected.svg'
                        alt="Quote active"
                        width={25}
                        height={25}
                        style={{ marginRight: "5px" }}
                    />
                    <span>{Category.second}</span>
                </div>
                :
                <div className={styles.active_none} style={{ marginTop: "10px" }} 
                    onClick = { () => (
                            setTabActive(Category.second) ,
                            router.push(`?cate-type=${Category.second}`)
                            )}>
                <Image
                        aria-hidden
                        src='/common/sidebar/quote.svg'
                        alt="Quote"
                        width={25}
                        height={25}
                        style={{ marginRight: "5px" }}
                    />
                    <span>{Category.second}</span>
                </div>
            } */}


        </div>
    );
}
