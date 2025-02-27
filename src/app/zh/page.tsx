"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



const ZhPage = () => {
    const router = useRouter()

    useEffect(() => {
        router.push('/Member?&member=6&language=1')
    }, []);

    return (
        <div>
            1
        </div>
    );
};

export default ZhPage;
