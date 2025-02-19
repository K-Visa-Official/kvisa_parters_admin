'use client'
import { useEffect } from "react";
import useAuthStore from "../store/user";
import { useRouter , useSearchParams } from 'next/navigation';
import Sidebar from "../Component/Common/Sidebar";

export default function Business_Main() {

    const { isLoggedIn } = useAuthStore();
    const router = useRouter(); // useRouter hook 사용


    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/Login'); // 로그인 후 이동할 페이지
        }
    }, [isLoggedIn, router]);


    return (
        <>
            {isLoggedIn ?
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <Sidebar />
                    업무
                </div>
                : <></>
            }
        </>

    );
}
