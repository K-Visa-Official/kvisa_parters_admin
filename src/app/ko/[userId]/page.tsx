"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; 

const Sdakjhasdhjsa = () => {
    const router = useRouter();
    // const params = useParams<{ userId: string }>()
    
    useEffect(() => {
        // router.push("/Member?member=6&language=0&userId=" + params.userId.replace("userId%3D" , ""));

        router.replace("/404");
    }, [router]); // ✅ router를 의존성 배열에 추가

    return <div></div>;
};

export default Sdakjhasdhjsa;
