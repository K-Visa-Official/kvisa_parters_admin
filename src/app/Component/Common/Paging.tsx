"use client"
import Image from "next/image";

interface PagingProps {
    w: number;
    before?: () => void;
    onClick?: () => void;
    choice?: (page: number) => void;
}

export default function Paging({
    w, onClick, before , choice }: PagingProps) {

    const pages = Array.from({ length: w }, (_, index) => index + 1);

        

    return (
        <div style={{ marginTop: "80px", display: "flex", flexDirection: "row" , width:"100%" , justifyContent:"center" , alignItems:"center" }}>
            <div style={{ width: "24px", height: "24px", borderRadius: "50%", border: "1px solid black" , display:"flex" , justifyContent:"center" , alignItems:"center" }}>
                <Image aria-hidden src="/member/back.png" alt="뒤로가기" width={14} height={14}
                    onClick={before} />
            </div>
            {pages.map((page) => (
                <div
                    key={page}
                    style={{ margin: "0 20px", cursor: "pointer" , fontSize:"13px" , color:"#84848f" }}
                // 클릭 시 페이지 번호 전달
                onClick={() => choice && choice(page)} 
                >
                    {page}
                </div>
            ))}
            <div style={{ width: "24px", height: "24px", borderRadius: "50%", border: "1px solid black" , display:"flex" , justifyContent:"center" , alignItems:"center" }}>
                <Image aria-hidden src="/member/back.png" alt="뒤로가기" width={14} height={14}
                    onClick={onClick} style={{ rotate:"180deg"}}
                />
            </div>
        </div >
    );
}
