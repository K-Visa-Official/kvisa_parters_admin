'use client'
import { useRouter  } from 'next/navigation';
import useAuthStore from "./store/user";
import { useEffect  } from 'react';
import Sidebar from './Component/Common/Sidebar';
// import { Category } from "@/app/type/typedef";
import UserBox from './Component/Admin/User';

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
        <div style={{ display:"flex" , flexDirection:"row" }}>
          <Sidebar/>
          <UserBox/>
        </div>
        : <></>
      }
    </>

  );
}
