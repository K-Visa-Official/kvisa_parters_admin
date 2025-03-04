"use client";

import { useEffect ,Suspense } from "react";
import { useRouter ,useSearchParams } from "next/navigation"; 

const Zhpage = () => {
    const router = useRouter();
    const params = useSearchParams();

    useEffect(() => {
        router.push("/Member?member=6&language=1&userId=" + params.get('userId'));
    }, [router]); // ✅ router를 의존성 배열에 추가

    return <div></div>;
};

const Zh = () => {
    return (
        <Suspense>
            <Zhpage />
        </Suspense>
    );
};

export default Zh;