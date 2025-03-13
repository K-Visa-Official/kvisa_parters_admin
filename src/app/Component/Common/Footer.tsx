"use client"
// import Image from "next/image";
import styles from 'src/app/page.module.css';
// import AuthStore from "@/app/store/user";
import Image from 'next/image';
import { Korean , Ch } from '@/app/type/typedef';
import { useSearchParams } from 'next/navigation';

export default function Footer() {

    const parm = useSearchParams();
    
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
                                <li><a href="https://www.k-visa.net/">{parm.get("language") === "0" ? Korean.footer_op_zero : Ch?.footer_op_zero}</a></li>
                                <li><a href="https://www.k-visa.co.kr/html/notice.php">
                                    {parm.get("language") === "0" ? Korean.footer_op_first : Ch?.footer_op_first}
                                </a></li>
                                <li><a href="https://kvisa.notion.site/ef3e026a576f457db2b12664a82051aa">
                                    {parm.get("language") === "0" ? Korean.footer_op_second : Ch?.footer_op_second}
                                </a></li>
                                <li><a href="https://kvisa.notion.site/c808a0a18ceb4b5587ee1428ba1d6803">
                                {parm.get("language") === "0" ? Korean.footer_op_third : Ch?.footer_op_third}
                                </a></li>
                            </ul>
                            {/* <ul>
                                    <li><a href="https://kvisa.notion.site/ef3e026a576f457db2b12664a82051aa">이용약관</a></li>
                                    <li><a href="https://kvisa.notion.site/c808a0a18ceb4b5587ee1428ba1d6803">개인정보 처리방침</a></li>
                                </ul> */}
                            <div style={{ marginTop: "15px" ,lineHeight:"16px" }}>
                                <span className={styles.footertitlesecond}>
                                    {parm.get("language") === "0" ? Korean.footer_a : Ch?.footer_a}
                                     : 이상욱&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                                <span className={styles.footertitlesecond}>
                                    {parm.get("language") === "0" ? Korean.footer_b : Ch?.footer_b}
                                    : 438-88-01978</span>
                            </div>

                            <div style={{ marginTop: "0px",lineHeight:"16px" }}>
                                <span className={styles.footertitlethird} >
                                    {parm.get("language") === "0" ? Korean.footer_c : Ch?.footer_c}
                                 : official@k-visa.co.kr&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                                <span className={styles.footertitlethird}>
                                    
                                    {parm.get("language") === "0" ? Korean.footer_e : Ch?.footer_e}
                                     : 1811-1942</span>
                            </div>

                            <div style={{ marginTop: "0px" ,lineHeight:"16px"}}>
                                <span className={styles.footertitlethird} >
                                {parm.get("language") === "0" ? Korean.footer_f : Ch?.footer_f}
                                    </span>
                            </div>
                            <div style={{ marginTop: "0px" ,lineHeight:"16px"}}>
                                <span className={styles.footertitlethird}>
                                {parm.get("language") === "0" ? Korean.footer_g : Ch?.footer_g}
                                </span>
                            </div>

                            <div style={{ marginTop: "0px" ,lineHeight:"16px"}}>
                                <span className={styles.footertitlethird}>
                                {parm.get("language") === "0" ? Korean.footer_h : Ch?.footer_h}
                                </span>
                            </div>

                            <div style={{ marginTop: "10px",lineHeight:"16px" }}>
                                <span className={styles.footertitlefour} >
                                {parm.get("language") === "0" ? "(주)케이비자" : "K-VISA"}
                                </span>
                                <span className={styles.footertitlefive} >COYPRIGHT(C) 2023by 
                                {parm.get("language") === "0" ? "(주)케이비자" : "K-VISA"}
                                </span>
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
                            <p className={styles.telTitle}>{parm.get("language") === "0" ? Korean.footer_e : Ch?.footer_e}</p>
                            <p className={styles.tel}><a href="tel:+821811-1942">1811-1942</a></p>
                            <p className={styles.hour}>
                            {parm.get("language") === "0" ? Korean.footer_k : Ch?.footer_k}
                                <br/>
                                {parm.get("language") === "0" ? Korean.footer_l : Ch?.footer_l}</p>
                        </div>
                    </div>
                </div>
            </footer>

            {/* } */}

        </>
    );
}
