"use client"
import Image from "next/image";

import styles from "@/app/css/admin_user.module.css";

interface FilterInputBoxProps {
    w: number;
    h?: number;
    p?: string;
    mt?: number;
    type?: string;
    bg?: string;
    src?: string;
    v?: string | null;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FilterInputBox({
    w, h, mt = 50, p, type, v, bg, src = "", onChange }: FilterInputBoxProps) {

    return (
        <div style={{
            width: w,
            height: h,
            marginTop: mt,
            background: bg,
            borderRadius: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems:"center",
            padding: src === "/admin/search.png" ? "0px 40px" : "0px 20px",
            color: "black",
            border: "none"
        }}>
            {src === "" ? <></> : 
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
                className={styles.inputbox}
                style={{
                    width: w - 50,
                    height: h,
                    background: bg,
                    border: "none",
                    color: "black",
                    outline: "none", // 포커스 테두리 제거
                    // caretColor: "transparent", // 깜빡이는 커서 제거
                }}
                type={type}
                placeholder={p}
                value={v ?? ""}
                onChange={onChange}
            >
            </input>
        </div>
    );
}
