"use client";

import { useSearchParams, useRouter } from "next/navigation";
// import { getUser, getUserApi } from "@/app/server/admin_user";
// import { UserList, WorkResponse } from "../type/user";
import { useState, Suspense , useEffect } from "react";
// import Image from "next/image";
import { Korean, Ch } from "../type/typedef";
import MoHeader from "../Component/Common/MoHeader";
import '../css/style.css';


function Jbank() {
    const parm = useSearchParams();
    const router = useRouter();
    const language = parm.get("language");
    const [pk, setPk] = useState<number | 1>(1);
    const [state, setState] = useState<number | 1>(1);
    // const [ac, setAc] = useState<boolean | false>(false);

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
                        <h2 className="page-tit">{parm.get("language") === "0" ? Korean.title : Ch?.title}<br />
                        {parm.get("language") === "0" ? Korean.title_second : Ch?.title_second}</h2>
                    </div>

                    <div className="txt-cont">
                        <div className="main-tit">{parm.get("language") === "0" ? Korean.work_post_ko : Ch?.work_post_ko}</div>
                        <p className="txt">{parm.get("language") === "0" ? Korean.cate_second : Ch?.cate_second}<br />
                        {parm.get("language") === "0" ? Korean.cate_third : Ch?.cate_third}</p>
                    </div>

                    <div className="img-wrap" onClick={() => (
                                setState(2),
                                setPk(parm.get("language") === "0" ? 28 : 31)
                            )}>
                        <div className="img blue">
                            <img src="/images/img_service1.png" alt="진행상황 확인하기 이미지"/>
                        </div>
                        <a className="btn">{parm.get("language") === "0" ? Korean.go : Ch?.go}</a>
                    </div>

                    <div className="txt-cont">
                        <div className="main-tit"> {parm.get("language") === "0" ? Korean.progress : Ch?.progress}
                        </div>
                        <p className="txt">{parm.get("language") === "0" ? Korean.progress_first : Ch?.progress_first}<br />{parm.get("language") === "0" ? Korean.progress_second : Ch?.progress_second}</p>
                    </div>

                    <div className="img-wrap green"
                    onClick={() => router.push(
                            `/CRM?&member=${parm.get("member")}&language=${parm.get("language")}&userId=${parm.get("userId")}`
                        )}>
                        <div className="img green">
                            <img src="/images/img_service2.png" alt="진행상황 확인하기 이미지" />
                        </div>
                        <a href="#" className="btn">{parm.get("language") === "0" ? Korean.go : Ch?.go}</a>
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
                    <h2 className="page-tit">{parm.get("language") === "0" ? Korean.detail_title : Ch?.detail_title}</h2>
                </div>
    
                <div className="img-wrap cont">
                    <div className="img blue">
                        <img src="/images/img_detail1.png" alt="맞춤형 비자상담서비스 이미지"/>
                    </div>
                </div>
    
                
                <div className="tit-wrap">
                    <h2 className="page-tit">{parm.get("language") === "0" ? Korean.detail_title_second : Ch?.detail_title_second}<br/>
                    {parm.get("language") === "0" ? Korean.detail_title_third : Ch?.detail_title_third}</h2>
                </div>
    
                <div className="info-wrap">
                    <div className="tit">{parm.get("language") === "0" ? Korean.detail_intro : Ch?.detail_intro}</div>
                    <img src="/images/icon_detail1.png" alt="상품대상 아이콘"/>
                    <p className="txt">{parm.get("language") === "0" ? Korean.detail_intro_detail : Ch?.detail_intro_detail}</p>
                </div>
    
                <div className="info-wrap">
                    <div className="tit">{parm.get("language") === "0" ? Korean.detail_intro_second : Ch?.detail_intro_second}</div>
                    <img src="/images/icon_detail2.png" alt="상품 소개 아이콘"/>
                    <p className="txt">{parm.get("language") === "0" ? Korean.detail_intro_second_detail : Ch?.detail_intro_second_detail}</p>
                </div>
    
                <div className="info-wrap">
                    <div className="tit">{parm.get("language") === "0" ? Korean.detail_intro_third : Ch?.detail_intro_third}</div>
                    <img src="/images/icon_detail3.png" alt="업무처리 안내 아이콘"/>
                    <p className="txt">{parm.get("language") === "0" ? Korean.detail_intro_third_detail : Ch?.detail_intro_third_detail}<br/>
                    {parm.get("language") === "0" ? Korean.detail_intro_third_detail_se : Ch?.detail_intro_third_detail_se}</p>
                </div>
                
                <div className="tit-wrap mb-24">
                    <h2 className="page-tit">{parm.get("language") === "0" ? Korean.step_title : Ch?.step_title}</h2>
                </div>
    
                <ol className="step-list">
                    <li>
                        <div className="tit">
                            <span className="badge">step 1</span>
                            <span className="tit-s">{parm.get("language") === "0" ? Korean.step_first : Ch?.step_first}</span>
                        </div>
                        <div className="desc">{parm.get("language") === "0" ? Korean.step_first_content : Ch?.step_first_content}</div>
                    </li>
                    <li>
                        <div className="tit">
                            <span className="badge">step 2</span>
                            <span className="tit-s">{parm.get("language") === "0" ? Korean.step_second : Ch?.step_second}</span>
                        </div>
                        <div className="desc">{parm.get("language") === "0" ? Korean.step_second_content : Ch?.step_second_content}</div>
                    </li>
                    <li>
                        <div className="tit">
                            <span className="badge">step 3</span>
                            <span className="tit-s">{parm.get("language") === "0" ? Korean.step_third : Ch?.step_third}</span>
                        </div>
                        <div className="desc">{parm.get("language") === "0" ? Korean.step_third_content : Ch?.step_third_content}</div>
                    </li>
                    <li>
                        <div className="tit">
                            <span className="badge">step 4</span>
                            <span className="tit-s">{parm.get("language") === "0" ? Korean.step_four : Ch?.step_four} <span className="txt">
                            {parm.get("language") === "0" ? Korean.step_four_se : Ch?.step_four_se} </span></span>
                        </div>
                        <div className="desc">{parm.get("language") === "0" ? Korean.step_four_content : Ch?.step_four_content}</div>
                    </li>
                    <li>
                        <div className="tit">
                            <span className="badge">step 5</span>
                            <span className="tit-s">{parm.get("language") === "0" ? Korean.step_five : Ch?.step_five}</span>
                        </div>
                        <div className="desc">{parm.get("language") === "0" ? Korean.step_five_content : Ch?.step_five_content} <br/>
                        {parm.get("language") === "0" ? Korean.step_five_content_se : Ch?.step_five_content_se}</div>
                    </li>
                </ol>
    
                <div className="tit-wrap mb-24">
                    <h2 className="page-tit">{parm.get("language") === "0" ? Korean.consult_data : Ch?.consult_data}<br/>{parm.get("language") === "0" ? Korean.consult_data_se : Ch?.consult_data_se}</h2>
                </div>
                
                <ul className="date-list">
                    <li>
                        <span className="date">{parm.get("language") === "0" ? Korean.consult_first : Ch?.consult_first}</span>
                        <span className="gauge"><span style={{width:"2.4rem"}}></span></span>
                        <span className="percent">1%</span>
                    </li>
                    <li className="max">
                        <span className="date">{parm.get("language") === "0" ? Korean.consult_second : Ch?.consult_second}</span>
                        <span className="gauge"><span style={{width:"50%"}}></span></span>
                        <span className="percent">55%</span>
                    </li>
                    <li>
                        <span className="date">{parm.get("language") === "0" ? Korean.consult_third : Ch?.consult_third}</span>
                        <span className="gauge"><span style={{width:"25%"}}></span></span>
                        <span className="percent">25%</span>
                    </li>
                    <li>
                        <span className="date">{parm.get("language") === "0" ? Korean.consult_four : Ch?.consult_four}</span>
                        <span className="gauge"><span style={{width:"19%"}}></span></span>
                        <span className="percent">19%</span>
                    </li>
                </ul>
    
                <div className="info">{parm.get("language") === "0" ? Korean.de_end : Ch?.de_end}</div>
    
                <div className="btn-wrap">
                    <p className="txt-s">{parm.get("language") === "0" ? Korean.go_third : Ch?.de_accept}</p>
                    <button type="button" className="btn"
                     onClick={() => router.push(
                        `/Progress/?&progress=${pk}&language=${parm.get("language")}&member=${parm.get("member")}&userId=${parm.get("userId")}`
                    )}
                    >{parm.get("language") === "0" ? Korean.process_enter : Ch?.process_enter}</button>
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
