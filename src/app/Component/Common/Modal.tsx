import React from "react";
import styles from 'src/app/page.module.css';
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ModalProps {
    onClose?: () => void;
    t?: string;
    c?: string;
    n?: string;
    s?: string;
    web?: string;
    setAc?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({ onClose, t, c, n, s, web , setAc  }) => {


    function exit(){
        if(web){
            if (setAc) {
                setAc(false); // setAc가 undefined가 아닐 때만 호출
            }
            // router.back()
        }
        else{
            // const args = {
            //     callbackId: callbackId,   // callbackId 값
            //     className: "JBSchemeBR",    // 클래스명
            //     methods: "doNCloseWebView", // 호출할 메서드명
            //     param: ""                   // 파라미터 (현재는 비어 있음)
            // };
    
            // const message = encodeURIComponent(JSON.stringify(args)); // args를 JSON 문자열로 변환 후 인코딩
    
            // if (window.JBPrivateBankBridge) {
            //     // Android 웹뷰 닫기
            //     window.JBPrivateBankBridge.callNative(message);
            // } else if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.JBPrivateBankBridge) {
            //     // iOS 웹뷰 닫기
            //     window.webkit.messageHandlers.JBPrivateBankBridge.postMessage(message);
            // } else {
            //     console.warn("웹뷰 인터페이스를 찾을 수 없음");
            // }
        }
    }

    return (
        <div className={styles.modalBackdrop}>
            {web ?
                <div className={styles.webmo}>
                    <Image
                        aria-hidden
                        src="/wb/web_cancel.png"
                        alt="close"
                        width={40}
                        height={40}
                    />
                    <p className={styles.webtiotle}>{web}</p>
                    {/* <p className={styles.webtiotlesub}>{web === "wed" ? "페이지를 나가시면 입력된 사항은 저장되지 않습니다." : "한국 비자 상담을 종료합니다"}</p> */}

                    <div className={styles.footerboxsds} >
                        {/* <div className={styles.footerboxfirst} style={{ background:"#84848f"}} onClick={()=> setAc ? setAc(false) : ""}>
                            확인
                        </div> */}
                        <div className={styles.footerboxfirst} style={{ background:"#000"}} onClick={()=> exit()}>
                            확인
                        </div>
                    </div>

                </div>
                :
                <div className={styles.modalContent}>
                    {t === undefined ?
                        <h2></h2>
                        :
                        <h2 style={{ margin: "0px 0px 10px 0px", fontSize: "20px" }}>{t}</h2>
                    }

                    <p style={{ margin: "0px 0px 60px 0px", fontSize: "14px", color: "#84848f" }} >{s}</p>

                    <div style={{
                        display: "flex", flexDirection: "row", width: "100%", justifyContent:
                            n === undefined ? "center" : "space-between"
                        , alignItems: "center"
                    }}>
                        {n === undefined ?
                            <></> :
                            <p className={styles.closeButton}>{n}</p>
                        }
                        <p className={styles.activeButton} onClick={onClose}>{c}</p>
                    </div>
                    {/* <button className={styles.closeButton} onClick={onClose}>닫기</button> */}
                </div>
            }

        </div>
    );
};

export default Modal;
