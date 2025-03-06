"use client"
import Image from "next/image";

import styles from "@/app/css/admin_user.module.css";
import { useState } from "react";
import useWindowWidth from "@/app/hooks/useWindowWidth";

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
        const width = useWindowWidth(); // ✅ 현재 화면 width 가져오기

        const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = e.target.value.replace(/[0-9]/g, ""); // 숫자만 제거
            e.target.value = inputValue;
            if (onChange) onChange(e);
        };
        const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 허용
            e.target.value = inputValue;
            if (onChange) onChange(e);
        };
        // 너비에 따라 동적 스타일 적용
        const dynamicWidth = width < 375 ? "100%" : w;
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
            width: dynamicWidth,
            height: h,
            marginTop: mt,
            background: bg,
            borderRadius: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: src === "/admin/search.png" ? "0px 40px" : "0px 20px",
            color: "black",
            border: "none" , 
            fontSize:"16px"
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
                    fontSize:"16px"
                    // caretColor: "transparent", // 깜빡이는 커서 제거
                }}
                type={inputType}
                placeholder={p}
                value={v ?? ""}// "no"일 경우 빈값으로 처리
                onChange={type === "tel" ? handlePhoneChange : type === "text" ? handleTextChange : type === "number" ? handleNumberChange : onChange}
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
