"use client"
import Image from "next/image";

import styles from "@/app/css/admin_user.module.css";
import { useState } from "react";
// import { usePathname } from "next/navigation";

interface FilterInputBoxProps {
    w: number;
    h?: number;
    p?: string;
    mt?: number;
    type?: string;
    bg?: string;
    src?: string;
    a?: string;
    v?: string | null;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FilterInputBox({
    w, h, mt = 50, p, type, v, bg, a , src = "", onChange }: FilterInputBoxProps) {

        const [inputType, setInputType] = useState(type);
        const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = e.target.value.replace(/[^\d]/g, ""); // 숫자만 남기기
            let formattedValue = inputValue;
    
            // 전화번호 형식으로 하이픈 추가
            if (formattedValue.length > 3 && formattedValue.length <= 6) {
                formattedValue = formattedValue.replace(/(\d{3})(\d{1,4})/, "$1-$2");
            } else if (formattedValue.length > 6) {
                formattedValue = formattedValue.replace(/(\d{3})(\d{4})(\d{1,4})/, "$1-$2-$3");
            }
    
            e.target.value = formattedValue;
            if (onChange) onChange(e);
        };
        

    return (
        <div style={{
            width: w,
            height: h,
            marginTop: mt,
            background: bg,
            borderRadius: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: src === "/admin/search.png" ? "0px 40px" : "0px 20px",
            color: "black",
            border: "none"
        }}>
            {src === "" || src ===  "/admin/hidden_password.png" ? <></> :
                <Image
                    aria-hidden
                    src={src}
                    alt={src}
                    width={14}
                    height={15}
                    style={{ marginRight: "5px" }}
                />
            }
            <input
                className={
                    p === "세부정보 입력" ? styles.inputboxpost : 
                    styles.inputbox
                }
                style={{
                    width: w - 50,
                    height: h,
                    background: bg,
                    border: "none",
                    color: "black",
                    outline: "none", // 포커스 테두리 제거
                    // caretColor: "transparent", // 깜빡이는 커서 제거
                }}
                type={inputType}
                placeholder={p}
                value={v ?? ""}// "no"일 경우 빈값으로 처리
                onChange={type === "tel" ? handlePhoneChange : onChange}
                disabled={a === "no"} // v가 "no"일 경우 disabled
            >
            </input>
            {src === "/admin/hidden_password.png" ?
                <Image
                    aria-hidden
                    src={src}
                    alt={src}
                    width={20}
                    height={20}
                    style={{ marginRight: "15px" }}
                    onClick={()=> (
                        inputType === "password" ?
                        setInputType("text") : setInputType("password")
                    )}
                />
                :
                <></>
            }
        </div>
    );
}
