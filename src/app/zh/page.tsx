"use client";

import { useEffect } from "react";
import { useRouter ,useSearchParams } from "next/navigation"; 

const Zh = () => {
    const router = useRouter();
    const params = useSearchParams();

    useEffect(() => {
        router.push("/Member?member=6&language=1&userId=" + params.get('userId'));
    }, [router]); // ✅ router를 의존성 배열에 추가

    return <div></div>;
};

export default Zh;
