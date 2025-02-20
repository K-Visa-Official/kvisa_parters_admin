"use client";

import styles from "@/app/css/modal.module.css";
import Image from "next/image";
import { useState } from "react";
import { registerUser } from "@/app/server/admin_user";
import FilterInputBox from "../Common/FilterInputBox";
import Modal from "../Common/Modal";


interface UserPostProps {
    onClose: () => void;
    n?: number;
}

export default function UserPost({ onClose, n = 0 }: UserPostProps) {
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [company, setCompany] = useState<string | null>(null);
    const [intro, setIntro] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [tel, setTel] = useState<string | null>(null);
    const [bank, setBank] = useState<string | null>(null);
    const [banktel, setBankTel] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [modalactive, setModalActive] = useState<boolean | false>(false); // 로딩 상태

    // 파일 선택 핸들러
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    async function handleRegister() {
        const userData = {
            email: email,
            password: password,
            bu_name: company,
            bu_intro: intro,
            bu_tel_first: tel,
            bu_tel_name: name,
            bu_bank_name: bank,
            bu_bank_number: banktel,
            work_count: 0,        // 숫자
            work_count_ch: 0      // 숫자
        };

        try {
            const formData = new FormData();

            // JSON 데이터를 FormData에 추가 (숫자는 문자열로 변환)
            Object.keys(userData).forEach((key) => {
                const value = userData[key as keyof typeof userData];
                if (value !== null && value !== undefined) {
                    formData.append(key, typeof value === "number" ? String(value) : value);
                }
            });

            // 선택된 파일 추가
            if (file) {
                formData.append("bu_logo", file);
            }

            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }
            const result = await registerUser(formData);

            console.log(result.message)
            if (result && result.message) {
                onClose();  // 모달 닫기
                console.log("test")
            }
            // console.log("회원가입 성공:", result);
        } catch (error) {
            setModalActive(true)
        }
    }

    return (
        <>
            {modalactive && <Modal t={"회원가입에 실패하였습니다"} s={"정보를 확인해주세요"} c={"확인"} onClose={() => setModalActive(false)} />}

            <div className={styles.userpostbox}>
                <div className={styles.modaltitle}>
                    <span style={{ marginLeft: "30px" }}>업체등록</span>
                    <Image
                        aria-hidden
                        src="/common/close.png"
                        alt="close"
                        width={30}
                        height={30}
                        onClick={onClose}
                        style={{ marginRight: "30px", cursor: "pointer" }}
                    />
                </div>

                <div className={styles.contentox}>
                    <p style={{ marginTop: "30px" }}> 회원가입 정보 입력</p>

                    <p style={{ marginTop: "30px", color: "#84848f", fontSize: "13px" }}> 아이디</p>

                    <FilterInputBox w={700} h={50} mt={10} bg={"#f5f6f9"} p={"아이디 입력"} v={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <p style={{ marginTop: "30px", color: "#84848f", fontSize: "13px" }}> 비밀번호</p>

                    <FilterInputBox w={700} h={50} mt={10} bg={"#f5f6f9"} p={"비밀번호 입력"} v={password}
                        type={"password"} src={"/admin/hidden_password.png"}
                        onChange={(e) => setPassword(e.target.value)}
                    />


                    {/* 파일 업로드 필드 
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ marginTop: "10px" }}
                    />

                    {/* 등록 버튼 
                    <button onClick={handleRegister} style={{ marginTop: "20px" }}>
                        회원가입
                    </button>*/}

                </div>

                <div className={styles.contentetc}>
                    <div style={{ display: "flex", flexDirection: "row", marginTop: "40px" }}>
                        <div style={{ width: "120px", height: "100px" }}>
                            로고 이미지
                        </div>
                        <label
                            htmlFor="file-upload"
                            style={{
                                width: "100px",
                                height: "100px",
                                border: "solid 1px #1c68ff",
                                borderRadius: "10px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                cursor: "pointer",
                                textAlign: "center",
                                color: "#1c68ff",
                            }}
                        >
                            {file ? (
                                // 선택된 이미지 미리보기
                                <Image
                                    src={URL.createObjectURL(file)}
                                    alt="Uploaded"
                                    width={100}
                                    height={100}
                                    style={{ borderRadius: "10px", objectFit: "cover" }}
                                />
                            ) : (
                                <>
                                    <Image
                                        aria-hidden
                                        src="/admin/user_image.png"
                                        alt="logo"
                                        width={34}
                                        height={34}
                                    />
                                    <p style={{ marginTop: "5px" }}>로고 등록</p>
                                </>
                            )}

                            {/* 숨겨진 파일 업로드 input */}
                            <input
                                type="file"
                                id="file-upload"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{
                                    position: "absolute",
                                    width: "1px",
                                    height: "1px",
                                    padding: 0,
                                    margin: "-1px",
                                    overflow: "hidden",
                                    border: 0,
                                    clip: "rect(0,0,0,0)",
                                }} // 완전히 숨김
                            />
                        </label>
                    </div>
                    <p style={{ marginTop: "10px", marginLeft: "117px", color: "#84848f" }}>· 권장 사이즈 : 가로 600px, 세로 600px, 고정 비율 (비율이 다를 시 세로값 고정 비로 반영됩니다.)</p>
                    <p style={{ marginTop: "5px", marginLeft: "117px", color: "#84848f" }}>· 지원 파일 및 형식 : png, jpg, jpeg / 용량 제한 : 5M</p>

                    <div className={styles.conti}>
                        <div className={styles.contititle} >
                            회사/업체명
                        </div>
                        <FilterInputBox w={620} h={50} mt={0} bg={"#f5f6f9"} p={"업체명 입력"} v={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                    </div>

                    <div className={styles.conti}>
                        <div className={styles.contititle} >
                            업체소개 문구
                        </div>
                        <FilterInputBox w={620} h={50} mt={0} bg={"#f5f6f9"} p={"업체소개를 적어주세요"} v={intro}
                            onChange={(e) => setIntro(e.target.value)}
                        />
                    </div>

                    <div className={styles.conti}>
                        <div className={styles.contititle} >
                            담당자 정보
                        </div>
                        <FilterInputBox w={620} h={50} mt={0} bg={"#f5f6f9"} p={"담당자명"} v={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className={styles.conti}>
                        <div className={styles.contititle} >

                        </div>
                        <FilterInputBox w={620} h={50} mt={0} bg={"#f5f6f9"} p={"휴대폰번호"} v={tel}
                            onChange={(e) => setTel(e.target.value)} type={"tel"}
                        />
                    </div>





                    <div className={styles.conti}>
                        <div className={styles.contititle} >
                            입금 계좌
                        </div>
                        <FilterInputBox w={620} h={50} mt={0} bg={"#f5f6f9"} p={"은행정보"} v={bank}
                            onChange={(e) => setBank(e.target.value)}
                        />
                    </div>

                    <div className={styles.conti}>
                        <div className={styles.contititle} >

                        </div>
                        <FilterInputBox w={620} h={50} mt={0} bg={"#f5f6f9"} p={"계좌번호 입력"} v={banktel}
                            onChange={(e) => setBankTel(e.target.value)}
                        />
                    </div>

                    <div style={{ width: "100%", height: "56px", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "40px", marginBottom: "20px" }}>
                        <div style={{
                            width: "350px", height: "100%", borderRadius: "5px", background: "linear-gradient(to right, #1c68ff, #053cf0)",
                            display: "flex", justifyContent: "center", alignItems: "center", fontSize: "15px", color: "white"
                        }} onClick={() => handleRegister()}>
                            업체 등록하기
                        </div>
                    </div>

                </div>

            </div>


        </>
    );
}
