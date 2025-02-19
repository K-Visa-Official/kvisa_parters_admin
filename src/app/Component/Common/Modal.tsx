import React from "react";
import styles from 'src/app/page.module.css';

interface ModalProps {
    onClose: () => void;
    t?: string;
    c?: string;
    n?: string;
    s? : string;
}

const Modal: React.FC<ModalProps> = ({ onClose , t , c  , n , s }) => {
    return (
        <div className={styles.modalBackdrop}>
            <div className={styles.modalContent}>
                {t === undefined ?
                <h2></h2>
                :
                <h2 style={{ margin:"0px 0px 10px 0px" ,fontSize:"20px" }}>{t}</h2>    
                }
                
                <p style={{ margin:"0px 0px 60px 0px" ,fontSize:"14px" , color:"#84848f" }} >{s}</p>

                <div style={{ display:"flex" , flexDirection:"row" , width:"100%" , justifyContent:
                    n === undefined  ? "center" : "space-between"
                    , alignItems:"center"}}>
                    {n === undefined ? 
                        <></> :
                        <p className={styles.closeButton}>{n}</p>
                    }
                    <p className={styles.activeButton} onClick={onClose}>{c}</p>
                </div>
                {/* <button className={styles.closeButton} onClick={onClose}>닫기</button> */}
            </div>
        </div>
    );
};

export default Modal;
