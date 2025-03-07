"use client";

import { useEffect , Suspense } from "react";
import { useRouter ,useSearchParams } from "next/navigation"; 

const Kopage = () => {
    const router = useRouter();
    const params = useSearchParams();

    useEffect(() => {
        router.push("/Member?member=6&language=0&userId=" + params.get('userId'));

        // 전북은행용 라우팅을 추가해서 변경을 진행
        router.push("/JB?member=6&language=0&userId=" + params.get('userId'));
        

    }, [router]); // ✅ router를 의존성 배열에 추가

    return <div></div>;
};


const Ko = () => {
    return (
        <Suspense>
            <Kopage />
        </Suspense>
    );
};

export default Ko;