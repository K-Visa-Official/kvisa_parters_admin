'use client'
import styles from 'src/app/styles/auth.module.css'
import Image from 'next/image';
import { useState, useEffect } from 'react';
import InputBox from '../Common/InputBox';
import EnterBtn from '../Common/EnterBtn';
import useAuthStore from '@/app/store/user';

export default function Login() {
    const { email, setEmail, password, setPassword, login } = useAuthStore();
    const [loading, setLoading] = useState<boolean | false>(false); // 로딩 상태
    const [error, setError] = useState<string | "">("");; // 에러 메시지 상태

    const handleLogin = async () => {
        if (!email || !password) {
            setError("이메일과 비밀번호를 입력하세요.");
            return;
        }

        try {
            await login(); // ✅ Zustand의 login() 호출
            // router.push("/dashboard"); // ✅ 로그인 성공 후 이동
        
        } catch (error) {
            setError("로그인 실패. 아이디와 비밀번호를 확인하세요.");
        }
    };

    return (
        <div className={styles.home}>
            <Image
                aria-hidden
                src="/common/logo.png"
                alt="Window icon"
                width={150}
                height={50}
                style={{ marginBottom: "15px" }}
            />
            <span style={{ fontSize: "25px", fontWeight: "bold" }}>케이비자 비즈 솔루션</span>
            
            <InputBox w={345} h={50} mt={30} p={"아이디를 입력해주세요"} v = {email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <InputBox w={345} h={50} mt={10} p={"비밀번호를 입력해주세요"} type = {"password"}
                v = {password} onChange={(e) => setPassword(e.target.value)}/>

            <EnterBtn w={345} h={56} mt={15} t={"로그인"} c = {"white"} 
                ts ={15} 
                onClick={handleLogin}
            />

        </div>
    );
}
