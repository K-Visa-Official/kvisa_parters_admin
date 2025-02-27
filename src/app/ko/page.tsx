"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ModalProps {
    onClose: () => void;
    la?: string;
    pk?: number;
}

const ko: React.FC<ModalProps> = ({ onClose, la, pk = 0 }) => {
    const router = useRouter()

    useEffect(() => {
        router.push('/Member?&member=6&language=0')
    }, []);

    return (
        <div>
            1
        </div>
    );
};

export default ko;
