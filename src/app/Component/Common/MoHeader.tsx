"use client";

import styles from "@/app/css/user_detail.module.css";
import Image from "next/image";
import { usePathname  } from "next/navigation";


interface MoHeaderProps {
    state? : number;
    setState?: React.Dispatch<React.SetStateAction<number>>;
    setAc?: React.Dispatch<React.SetStateAction<boolean>>;
}

const MoHeader: React.FC<MoHeaderProps> = ({ state = 0 , setState , setAc  }) =>  {
    const path = usePathname()
    // console.log(path)

    // ㅌ버튼
    const handleCloseWebView = () => {
      if(path === '/Member'){
        if(state === 1){
            if (setAc) {
                setAc(true)
            }
        }
        else{
            if(setState){
                setState(1)
            }
        }
      }
      else{
        if (setAc) {
            setAc(true)
        }
      }
    
    //   else if (path === '/Progress'){
    //     if (setAc) {
    //         setAc(true)
    //     }
    //   }
    //   else if (path === '/Certify'){
    //     if (setAc) {
    //         setAc(true)
    //     }
    //   }
        
    };

    return (
        <div className={styles.headerbox}>
            <Image aria-hidden src="/member/back.png" alt="뒤로가기" width={30} height={30} onClick={handleCloseWebView} style={{ cursor:"pointer"}}/>
            <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "324px", }}>
                <Image aria-hidden src="/common/KPJB.png" alt="로고" width={250} height={30} />
            </div>
            {/* <Image
                aria-hidden
                src="/common/close.png"
                alt="닫기"
                width={30}
                height={30}
                style={{ cursor: "pointer" }}
                onClick={handleCloseWebView} // 클릭 시 웹뷰 닫기
            /> */}
        </div>
    );
}

export default MoHeader;
