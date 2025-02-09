'use client'
import { useRouter } from 'next/navigation';
import styles from "./page.module.css";
import useAuthStore from "./store/user";
import { useEffect } from 'react';

export default function Home() {

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
        <div className={styles.page}>

        </div>
        : <></>
      }
    </>

  );
}
