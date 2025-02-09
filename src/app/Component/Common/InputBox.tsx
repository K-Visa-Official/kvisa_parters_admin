"use client"


interface InputBoxProps {
    w: number;
    h?: number;
    p?: string;
    mt?: number;
    type?: string;
    v?: string | null; 
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputBox({
    w, h, mt = 50, p, type, v , onChange }: InputBoxProps) {


    return (
        <input style={{
            width: w,
            height: h,
            marginTop: mt,
            background: "white",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "center",
            padding: "17px 15px",
            color:"black",
            border:"none"
        }}
            type={type}
            placeholder={p}
            value={v ?? ""}
            onChange={onChange}
        >
        </input>
    );
}
