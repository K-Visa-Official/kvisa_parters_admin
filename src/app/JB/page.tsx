"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense , useEffect } from "react";
import { Korean, Ch } from "../type/typedef";
import MoHeader from "../Component/Common/MoHeader";
import '../css/style.css';


function Jbank() {
    const parm = useSearchParams();
    const router = useRouter();
    const language = parm.get("language");
    const [pk, setPk] = useState<number | 1>(1);
    const [state, setState] = useState<number | 1>(1);
    const languageMap = {
        Korean,
        Ch
    };
    
    const selectedLanguage = parm.get("language") === "0" ? "Korean" : "Ch"; // 예시로 "Korean"과 "Ch"를 사용
    
    const selectedLanguageData = languageMap[selectedLanguage as keyof typeof languageMap];

    useEffect(() => {
        if (state === 2) {
          window.scrollTo(0, 0);
        }
      }, [state]);
    

    return (

        <Suspense fallback={<div>Loading...</div>}>

            <MoHeader state={state} setState={setState}  />
            {state === 1 ?
            <div className="wrap" style={{
                fontFamily: language === "0" ? "'Spoqa Han Sans Neo', 'malgun', 'Apple SD Gothic Neo', Verdana, Arial, Helvetica, Geneva, Tahoma, sans-serif" : 
                "Noto Sans, sans-serif",
              }}>
                <div className="inner">

                    <div className="tit-wrap mt-0">
                        <h2 className="page-tit">{selectedLanguageData.title}<br />
                        {selectedLanguageData.title_second}</h2>
                    </div>

                    <div className="txt-cont">
                        <div className="main-tit">{selectedLanguageData.work_post_ko}</div>
                        <p className="txt">{selectedLanguageData.cate_second}<br />
                        {selectedLanguageData.cate_third}</p>
                    </div>

                    <div className="img-wrap" onClick={() => (
                                setState(2),
                                setPk(parm.get("language") === "0" ? 28 : 31)
                            )}>
                        <div className="img blue">
                            <img src="/images/img_service1.png" alt="진행상황 확인하기 이미지"/>
                        </div>
                        <a className="btn">{selectedLanguageData.go}</a>
                    </div>

                    <div className="txt-cont">
                        <div className="main-tit"> {selectedLanguageData.progress}
                        </div>
                        <p className="txt">{selectedLanguageData.progress_first}<br />{selectedLanguageData.progress_second}</p>
                    </div>

                    <div className="img-wrap green"
                    onClick={() => router.push(
                            `/CRM?&member=${parm.get("member")}&language=${parm.get("language")}&userId=${parm.get("userId")}`
                        )}>
                        <div className="img green">
                            <img src="/images/img_service2.png" alt="진행상황 확인하기 이미지" />
                        </div>
                        <a href="#" className="btn">{selectedLanguageData.go}</a>
                    </div>

                    {/* <div className="banner" onClick={() => (
                                setState(2),
                                setPk(29)
                            )}>
                        <p className="tit-s">{parm.get("language") === "0" ? Korean.cate_crime_first : Ch?.cate_crime_first}</p>
                        <p className="txt">{parm.get("language") === "0" ? Korean.cate_crime_second : Ch?.cate_crime_second}<br />
                        {parm.get("language") === "0" ? Korean.cate_crime_third : Ch?.cate_crime_third}</p>
                        <img src="/images/icon_banner.png" alt="배너이미지" />
                    </div> */}
                </div>
            </div>
            :
            <div className="wrap" style={{
                fontFamily: language === "0" ? "'Spoqa Han Sans Neo', 'malgun', 'Apple SD Gothic Neo', Verdana, Arial, Helvetica, Geneva, Tahoma, sans-serif" : 
                "Noto Sans, sans-serif",
              }}>
            <div className="inner fix-btn">
                <div className="tit-wrap mb-0 mt-0">
                    <h2 className="page-tit">{selectedLanguageData.detail_title}</h2>
                </div>
    
                <div className="img-wrap cont">
                    <div className="img blue">
                        <img src="/images/img_detail1.png" alt="맞춤형 비자상담서비스 이미지"/>
                    </div>
                </div>
    
                
                <div className="tit-wrap">
                    <h2 className="page-tit">{selectedLanguageData.detail_title_second}<br/>
                    {selectedLanguageData.detail_title_third}</h2>
                </div>
    
                <div className="info-wrap">
                    <div className="tit">{selectedLanguageData.detail_intro}</div>
                    <img src="/images/icon_detail1.png" alt="상품대상 아이콘"/>
                    <p className="txt">{selectedLanguageData.detail_intro_detail}</p>
                </div>
    
                <div className="info-wrap">
                    <div className="tit">{selectedLanguageData.detail_intro_second}</div>
                    <img src="/images/icon_detail2.png" alt="상품 소개 아이콘"/>
                    <p className="txt">{selectedLanguageData.detail_intro_second_detail}</p>
                </div>
    
                <div className="info-wrap">
                    <div className="tit">{selectedLanguageData.detail_intro_third}</div>
                    <img src="/images/icon_detail3.png" alt="업무처리 안내 아이콘"/>
                    <p className="txt">{selectedLanguageData.detail_intro_third_detail}<br/>
                    {selectedLanguageData.detail_intro_third_detail_se}</p>
                </div>
                
                <div className="tit-wrap mb-24">
                    <h2 className="page-tit">{selectedLanguageData.step_title}</h2>
                </div>
    
                <ol className="step-list">
                    <li>
                        <div className="tit">
                            <span className="badge">step 1</span>
                            <span className="tit-s">{selectedLanguageData.step_first}</span>
                        </div>
                        <div className="desc">{selectedLanguageData.step_first_content}</div>
                    </li>
                    <li>
                        <div className="tit">
                            <span className="badge">step 2</span>
                            <span className="tit-s">{selectedLanguageData.step_second}</span>
                        </div>
                        <div className="desc">{selectedLanguageData.step_second_content}</div>
                    </li>
                    <li>
                        <div className="tit">
                            <span className="badge">step 3</span>
                            <span className="tit-s">{selectedLanguageData.step_third}</span>
                        </div>
                        <div className="desc">{selectedLanguageData.step_third_content}</div>
                    </li>
                    <li>
                        <div className="tit">
                            <span className="badge">step 4</span>
                            <span className="tit-s">{selectedLanguageData.step_four} <span className="txt">
                            {selectedLanguageData.step_four_se} </span></span>
                        </div>
                        <div className="desc">{selectedLanguageData.step_four_content}</div>
                    </li>
                    <li>
                        <div className="tit">
                            <span className="badge">step 5</span>
                            <span className="tit-s">{selectedLanguageData.step_five}</span>
                        </div>
                        <div className="desc">{selectedLanguageData.step_five_content} <br/>
                        {selectedLanguageData.step_five_content_se}</div>
                    </li>
                </ol>
    
                <div className="tit-wrap mb-24">
                    <h2 className="page-tit">{selectedLanguageData.consult_data}<br/>{selectedLanguageData.consult_data_se}</h2>
                </div>
                
                <ul className="date-list">
                    <li>
                        <span className="date">{selectedLanguageData.consult_first}</span>
                        <span className="gauge"><span style={{width:"2.4rem"}}></span></span>
                        <span className="percent">1%</span>
                    </li>
                    <li className="max">
                        <span className="date">{selectedLanguageData.consult_second}</span>
                        <span className="gauge"><span style={{width:"50%"}}></span></span>
                        <span className="percent">55%</span>
                    </li>
                    <li>
                        <span className="date">{selectedLanguageData.consult_third}</span>
                        <span className="gauge"><span style={{width:"25%"}}></span></span>
                        <span className="percent">25%</span>
                    </li>
                    <li>
                        <span className="date">{selectedLanguageData.consult_four}</span>
                        <span className="gauge"><span style={{width:"19%"}}></span></span>
                        <span className="percent">19%</span>
                    </li>
                </ul>
    
                <div className="info">{selectedLanguageData.de_end}</div>
    
                <div className="btn-wrap">
                    <p className="txt-s">{parm.get("language") === "0" ? Korean.go_third : Ch?.de_accept}</p>
                    <button type="button" className="btn"
                     onClick={() => router.push(
                        `/Progress/?&progress=${pk}&language=${parm.get("language")}&member=${parm.get("member")}&userId=${parm.get("userId")}`
                    )}
                    >{selectedLanguageData.process_enter}</button>
                </div>
            </div>
        </div>                
            }
        </Suspense>
        // </>
    );
}

const askldasd = () => {
    return (
        <Suspense>
            <Jbank />
        </Suspense>
    );
};

export default askldasd;
