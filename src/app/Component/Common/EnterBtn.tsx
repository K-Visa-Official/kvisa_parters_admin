"use client"


interface EnterBtnProps {
    w: number;
    h?: number;
    mt?: number; 
    t:string;
    c:string;
    ts?: number; 
    onClick?: () => void;
}

export default function EnterBtn({
    w, h, mt , ts = 50 , t ,c , onClick}: EnterBtnProps) {


    return (
        <div style={{
            width: w,
            height: h,
            marginTop: mt,
            background: "linear-gradient(to right, #1c68ff, #053cf0)",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems:"center",
            color:c,
            fontSize:ts,
            cursor:"pointer"
        }}
        onClick={onClick}
        >
            {t}
        </div>
    );
}
