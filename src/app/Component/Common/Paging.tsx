"use client"
import Image from "next/image";
import BusinessStore from "@/app/store/business_store";
import useAdminStore from "@/app/store/adminuser";
import { usePathname } from "next/navigation";

interface PagingProps {
    w: number;
    before?: () => void;
    onClick?: () => void;
    choice?: (page: number) => void;
}

export default function Paging({
    w, onClick, before, choice }: PagingProps) {

    const pages = Array.from({ length: w }, (_, index) => index + 1);
    const { page_bu } = BusinessStore();
    const { page } = useAdminStore();
    // const parm = useSearchParams()
    const pathname = usePathname()

    // console.log(pathname)
    // if (parm.get('page') === String(page_bu)){
    //     console.log("!23")
    // }
    // else{
    //     console.log("!asdasdsad")
    // }

    return (
        <div style={{ marginTop: "80px", display: "flex", flexDirection: "row", width: "100%", justifyContent: "center", alignItems: "center", marginBottom: "40px" }}>
            <div style={{ width: "24px", height: "24px", borderRadius: "50%", border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Image aria-hidden src="/member/back.png" alt="뒤로가기" width={14} height={14}
                    onClick={before} />
            </div>
            {pages.map((a, index) => (
                <div
                    key={index}
                    style={{
                        margin: "0 20px", cursor: "pointer", fontSize: "13px",
                        color:
                            pathname === "/Business" ? (
                                page_bu === a ? "#000" : "#84848f"
                            )
                            :(
                                page === a ? "#000" : "#84848f"
                            ),
                        fontWeight:
                            pathname === "/Business" ? (
                                page_bu === a ? "bold" : ""
                            )
                            :(
                                page === a ? "bold" : ""
                            )
                    }}
                    // 클릭 시 페이지 번호 전달
                    onClick={() => choice && choice(a)}
                >
                    {a}
                </div>
            ))}
            <div style={{ width: "24px", height: "24px", borderRadius: "50%", border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Image aria-hidden src="/member/back.png" alt="뒤로가기" width={14} height={14}
                    onClick={onClick} style={{ rotate: "180deg" }}
                />
            </div>
        </div >
    );
}
