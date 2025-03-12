"use client"
// import Image from "next/image";
import styles from 'src/app/page.module.css';
// import AuthStore from "@/app/store/user";
import Image from 'next/image';

export default function Footer() {

    // const { isLoggedIn } = AuthStore()

    return (
        <>
            {/* {isLoggedIn ?
                <footer className={styles.footer}>

                </footer>
                : */}
            <footer className={styles.footer_v2024}>
                <div className={styles.wrapper}>
                    <div className={styles.logo}>
                        {/* <div className={styles.k_visa}> */}
                        <Image aria-hidden
                            src="/common/footer_logo.png"
                            alt="로고"
                            width={105}
                            height={38}
                        // layout={parm.get("userId") === null ? "" : "responsive"}
                        />
                        {/* </div> */}
                        {/* <ul className={`${styles.social} pc-view`}>
                                <li>
                                    <a href="https://www.facebook.com/officialkvisa" className="facebook">
                                        <img src="/path/to/footer-img-facebook.png" alt="Facebook" />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com/kvisa_official/" className="instagram">
                                        <img src="/path/to/footer-img-instagram.png" alt="Instagram" />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://blog.naver.com/kvisaofficial" className="naver">
                                        <img src="/path/to/footer-img-youtube.png" alt="Youtube" />
                                    </a>
                                </li>
                            </ul> */}
                    </div>
                    <div className={styles.cont}>
                        <div className={styles.box}>
                            <ul>
                                <li><a href="https://www.k-visa.net/">회사 소개</a></li>
                                <li><a href="https://www.k-visa.co.kr/html/notice.php">공지사항</a></li>
                                <li><a href="https://kvisa.notion.site/ef3e026a576f457db2b12664a82051aa">이용약관</a></li>
                                <li><a href="https://kvisa.notion.site/c808a0a18ceb4b5587ee1428ba1d6803">개인정보처리방침</a></li>
                            </ul>
                            {/* <ul>
                                    <li><a href="https://kvisa.notion.site/ef3e026a576f457db2b12664a82051aa">이용약관</a></li>
                                    <li><a href="https://kvisa.notion.site/c808a0a18ceb4b5587ee1428ba1d6803">개인정보 처리방침</a></li>
                                </ul> */}
                            <div style={{ marginTop: "15px" ,lineHeight:"16px" }}>
                                <span className={styles.footertitlesecond}>대표이사 : 이상욱&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                                <span className={styles.footertitlesecond}>사업자 등록번호 : 438-88-01978</span>
                            </div>

                            <div style={{ marginTop: "0px",lineHeight:"16px" }}>
                                <span className={styles.footertitlethird} >제휴/문의 : official@k-visa.co.kr&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                                <span className={styles.footertitlethird}>대표 번호 : 1811-1942</span>
                            </div>

                            <div style={{ marginTop: "0px" ,lineHeight:"16px"}}>
                                <span className={styles.footertitlethird} >주소 : 서울 강서구 공항대로 103 마곡엠밸리9단지 807호</span>
                            </div>
                            <div style={{ marginTop: "0px" ,lineHeight:"16px"}}>
                                <span className={styles.footertitlethird}>통신판매신고번호 : 제 2023-서울영등포-0502호</span>
                            </div>

                            <div style={{ marginTop: "0px" ,lineHeight:"16px"}}>
                                <span className={styles.footertitlethird}>행정사업무신고번호 : 35200000202169</span>
                            </div>

                            <div style={{ marginTop: "10px",lineHeight:"16px" }}>
                                <span className={styles.footertitlefour} >(주)케이비자</span>
                                <span className={styles.footertitlefive} >COYPRIGHT(C) 2023by (주)K-VISA</span>
                            </div>
                        </div>
                        <ul style={{ listStyle: "none", display: "flex", flexDirection: "row" , gap:"15px" , marginTop:"30px"}}>
                            <li>
                                <a href="https://www.facebook.com/officialkvisa" className="facebook">
                                    <Image aria-hidden
                                        src="/common/footer_facebook.png"
                                        alt="로고"
                                        width={30}
                                        height={30}
                                    // layout={parm.get("userId") === null ? "" : "responsive"}
                                    />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/kvisa_official/" className="instagram">
                                    <Image aria-hidden
                                        src="/common/footer_instagram.png"
                                        alt="로고"
                                        width={30}
                                        height={30}
                                    // layout={parm.get("userId") === null ? "" : "responsive"}
                                    />
                                </a>
                            </li>
                            <li>
                                <a href="https://blog.naver.com/kvisaofficial" className="naver">
                                    <Image aria-hidden
                                        src="/common/footer_youtube.png"
                                        alt="로고"
                                        width={30}
                                        height={30}
                                    // layout={parm.get("userId") === null ? "" : "responsive"}
                                    />
                                </a>
                            </li>
                        </ul>
                        <div className={styles.contact} style={{ marginTop:"15px"}}>
                            <p className={styles.telTitle}>대표번호</p>
                            <p className={styles.tel}><a href="tel:+821811-1942">1811-1942</a></p>
                            <p className={styles.hour}>평일 오전 09시 ~ 오후 18시<br/>(점심시간 : 평일 오후 12시 ~ 오후 1시)</p>
                        </div>
                    </div>
                </div>
            </footer>

            {/* } */}

        </>
    );
}
