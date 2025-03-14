"use client";

import styles from "@/app/css/user_detail.module.css";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


interface MoHeaderProps {
    state?: number;
    setState?: React.Dispatch<React.SetStateAction<number>>;
    setAc?: React.Dispatch<React.SetStateAction<boolean>>;
}

const MoHeader: React.FC<MoHeaderProps> = ({ state = 0, setState }) => {
    const path = usePathname()
    const router = useRouter()
    const parm = useSearchParams()
    // console.log(path)

    // ㅌ버튼
    const handleCloseWebView = () => {
        if (path === '/JB' || path === '/Member') {
            if (setState) {
                setState(1)
            }
        }
        else if (path === '/CRM') {
            if (parm.get("language") === "0") {
                if(parm.get("userId") === null){
                    router.push(`/Member?&member=${parm.get("member")}&language=0`)
                }
                else{
                    router.push(`/JB?&member=${parm.get("member")}&language=0&userId=${parm.get("userId")}`)
                }
            }
            else {
                if(parm.get("userId") === null){
                    router.push(`/Member?&member=${parm.get("member")}&language=1`)
                }
                else{
                    router.push(`/JB?&member=${parm.get("member")}&language=1&userId=${parm.get("userId")}`)
                }
            }
        }
        else {
            router.back()
        }

    };

    const closeWebView = () => {
        const args = {
            callbackId: "1234567890",
            className: "JBSchemeBR",
            methods: "doNCloseWebView",
            param: ""
        };

        const message = encodeURIComponent(JSON.stringify(args));

        if (window.JBPrivateBankBridge) {
            // Android
            window.JBPrivateBankBridge.callNative(message);
        } else if (window.webkit?.messageHandlers?.JBPrivateBankBridge) {
            // iOS
            window.webkit.messageHandlers.JBPrivateBankBridge.postMessage(message);
        } else {
            console.warn("웹뷰 인터페이스를 찾을 수 없음");
        }
    };

    const handleCloseEnd = () => {
        if(path === '/Member'){
            closeWebView()
        }
        else {
            closeWebView();
        }
    }

    return (
        <div className={styles.headerbox}>
            {path === '/JB' && state === 1 ?
                <></>
                :
                <Image aria-hidden src="/member/back.png" alt="뒤로가기" width={30} height={30} onClick={handleCloseWebView}  style={{ cursor: "pointer" }} />
            }
            <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width:"345px" }} >
                <Image aria-hidden src=
                    {parm.get("userId") === null ? "/common/logo.png" : "/common/KPJB.png"}
                     alt="로고" 
                     width={ parm.get("userId") === null ? 105 : 260} 
                     height={parm.get("userId") === null ? 38 :30} 
                     layout={parm.get("userId") === null? "" :"responsive" }
                   />
            </div>
            <Image
                aria-hidden
                src="/common/close.png"
                alt="닫기"
                width={30}
                height={30}
                style={{ cursor: "pointer" }}
                onClick={handleCloseEnd} // 클릭 시 웹뷰 닫기
            />
            {/* {
                path === '/Member' && state === 1 ?
                    <Image
                        aria-hidden
                        src="/common/close.png"
                        alt="닫기"
                        width={30}
                        height={30}
                        style={{ cursor: "pointer" }}
                        onClick={handleCloseEnd} // 클릭 시 웹뷰 닫기
                    /> : ""
            } */}

        </div>
    );
}

export default MoHeader;
