"use client";

import React from "react";
import { useRouter  } from "next/navigation"; 
import { useEffect } from "react";



const ZhPage = () => {
    const router = useRouter();
    // const params = useParams<{ userId: string }>()


    useEffect(() => {
        // router.push("/Member?member=6&language=1&userId=" + params.userId.replace("userId%3D" , ""));
        router.replace("/404");
    }, []);

    return (
        <div>
            1
        </div>
    );
};

export default ZhPage;
