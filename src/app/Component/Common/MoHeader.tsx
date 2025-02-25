"use client";

// import { useState, useEffect, Suspense } from "react";
import styles from "@/app/css/user_detail.module.css";
import Image from "next/image";



function MoHeader() {
    // const [state, setState] = useState<number | 1>(1);
  

    // console.log(work[0]?.choice)

    return (
        // <>
        <div className={styles.headerbox}>
                        <Image aria-hidden src="/member/back.png" alt="뒤로가기" width={30} height={30}
                             />
                        {/* X 버튼 클릭 시 handleCloseWebView 호출 */}
                        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "324px" }}>
                            <Image
                                aria-hidden
                                src="/common/KPJB.png"
                                alt="닫기"
                                width={250}
                                height={30}
                                style={{ cursor: "pointer" }}
                            />
                        </div>
                        <Image
                            aria-hidden
                            src="/common/close.png"
                            alt="닫기"
                            width={30}
                            height={30}
                            style={{ cursor: "pointer" }}
                        />
                    </div>
        // </>
    );
}

// const askldasd = () => {
//     return (
//         <Suspense>
//             <CRM />
//         </Suspense>
//     );
// };

export default MoHeader;
