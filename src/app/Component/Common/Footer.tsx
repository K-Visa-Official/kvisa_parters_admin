"use client"
import Image from "next/image";
import styles from 'src/app/page.module.css';
import AuthStore from "@/app/store/user";

export default function Footer() {

    const { isLoggedIn } = AuthStore()

    return (
        <>
            {isLoggedIn ?
                <footer className={styles.footer}>
                  
                </footer>
                :
                <></>
            }

        </>
    );
}
