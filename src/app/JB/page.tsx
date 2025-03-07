"use client";

import { useSearchParams, useRouter } from "next/navigation";
// import { getUser, getUserApi } from "@/app/server/admin_user";
// import { UserList, WorkResponse } from "../type/user";
import { useState, Suspense } from "react";
// import Image from "next/image";
import { Korean, Ch } from "../type/typedef";
import MoHeader from "../Component/Common/MoHeader";
import '../css/style.css';

function Jbank() {
    const parm = useSearchParams();
    const router = useRouter()
    const [pk, setPk] = useState<number | 1>(1);
    const [state, setState] = useState<number | 1>(1);
    // const [ac, setAc] = useState<boolean | false>(false);


    return (

        <Suspense fallback={<div>Loading...</div>}>

            <MoHeader state={state} setState={setState}  />
            {state === 1 ?

            
            <div className="wrap">
                <div className="inner">

                    <div className="tit-wrap mt-0">
                        <h2 className="page-tit">{parm.get("language") === "0" ? Korean.title : Ch?.title}<br />
                        {parm.get("language") === "0" ? Korean.title_second : Ch?.title_second}</h2>
                    </div>

                    <div className="txt-cont">
                        <div className="main-tit">맞춤형 비자상담 서비스</div>
                        <p className="txt">타 업체대비 평균 30% 저렴하게 업무를<br />진행할 수 있어요</p>
                    </div>

                    <div className="img-wrap" onClick={() => (
                                setState(2),
                                setPk(28)
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
                            `/CRM?&member=${parm.get("member")}&language=0&userId=${parm.get("userId")}`
                        )}>
                        <div className="img green">
                            <img src="/images/img_service2.png" alt="진행상황 확인하기 이미지" />
                        </div>
                        <a href="#" className="btn">{parm.get("language") === "0" ? Korean.go : Ch?.go}</a>
                    </div>

                    <div className="banner" onClick={() => (
                                setState(2),
                                setPk(29)
                            )}>
                        <p className="tit-s">범죄/불법체류자 구제</p>
                        <p className="txt">국내에서 발생한 외국인 문제를<br />상담받고, 해결하세요</p>
                        <img src="/images/icon_banner.png" alt="배너이미지" />
                    </div>
                </div>
            </div>
            :
            <div className="wrap">
            <div className="inner fix-btn">
                <div className="tit-wrap mb-0 mt-0">
                    <h2 className="page-tit">외국인 맞춤형 비자상담</h2>
                </div>
    
                <div className="img-wrap cont">
                    <div className="img blue">
                        <img src="/images/img_detail1.png" alt="맞춤형 비자상담서비스 이미지"/>
                    </div>
                </div>
    
                
                <div className="tit-wrap">
                    <h2 className="page-tit">비자상담은<br/>어떤 서비스인가요?</h2>
                </div>
    
                <div className="info-wrap">
                    <div className="tit">상품 대상</div>
                    <img src="/images/icon_detail1.png" alt="상품대상 아이콘"/>
                    <p className="txt">비자 변경 / 비자 연장 상담 필요한 외국인</p>
                </div>
    
                <div className="info-wrap">
                    <div className="tit">상품 소개</div>
                    <img src="/images/icon_detail2.png" alt="상품 소개 아이콘"/>
                    <p className="txt">외국인 비자 대행 의뢰시, 타 업체 대비 평균 30%가 저렴하게 업무를 진행 할 수 있어요</p>
                </div>
    
                <div className="info-wrap">
                    <div className="tit">업무처리 안내</div>
                    <img src="/images/icon_detail3.png" alt="업무처리 안내 아이콘"/>
                    <p className="txt">상담 신청을 위해 상담폼을 작성해주세요.<br/>보다 정확한 상담을 도와드리기 위해 정확한 개인 정보 기재해주세요.</p>
                </div>
                
                <div className="tit-wrap mb-24">
                    <h2 className="page-tit">상담은 어떻게 진행되나요?</h2>
                </div>
    
                <ol className="step-list">
                    <li>
                        <div className="tit">
                            <span className="badge">step 1</span>
                            <span className="tit-s">상담폼 작성 및 제출</span>
                        </div>
                        <div className="desc">상담사 해피콜 / 유선으로 절차 안내</div>
                    </li>
                    <li>
                        <div className="tit">
                            <span className="badge">step 2</span>
                            <span className="tit-s">요건 확인</span>
                        </div>
                        <div className="desc">상담폼을 확인 후 요건 파악 진행</div>
                    </li>
                    <li>
                        <div className="tit">
                            <span className="badge">step 3</span>
                            <span className="tit-s">맞춤 상담 진행</span>
                        </div>
                        <div className="desc">상담사가 직접 연락드려 비자 상담 진행</div>
                    </li>
                    <li>
                        <div className="tit">
                            <span className="badge">step 4</span>
                            <span className="tit-s">비자 대행 의뢰 <span className="txt">(선택/협의 후 진행)</span></span>
                        </div>
                        <div className="desc">상담 완료 후 비자 대행 의뢰 진행</div>
                    </li>
                    <li>
                        <div className="tit">
                            <span className="badge">step 5</span>
                            <span className="tit-s">대행 완료</span>
                        </div>
                        <div className="desc">비자 대행 업무 진행 및 비자 <br/>연장/발급 완료</div>
                    </li>
                </ol>
    
                <div className="tit-wrap mb-24">
                    <h2 className="page-tit">상담하기까지<br/>몇 일 소요되나요?</h2>
                </div>
                
                <ul className="date-list">
                    <li>
                        <span className="date">1일이내</span>
                        <span className="gauge"><span style={{width:"2.4rem"}}></span></span>
                        <span className="percent">1%</span>
                    </li>
                    <li className="max">
                        <span className="date">2일이내</span>
                        <span className="gauge"><span style={{width:"50%"}}></span></span>
                        <span className="percent">55%</span>
                    </li>
                    <li>
                        <span className="date">3일이내</span>
                        <span className="gauge"><span style={{width:"25%"}}></span></span>
                        <span className="percent">25%</span>
                    </li>
                    <li>
                        <span className="date">4일이내</span>
                        <span className="gauge"><span style={{width:"19%"}}></span></span>
                        <span className="percent">19%</span>
                    </li>
                </ul>
    
                <div className="info">제공한 정보가 허위거나 사실을 누락한 경우, 또는 본인의 출입국 고나련 법령 위반 이력으로 인해 비자가 허가되지 않을 경우, 이에 대한 책임은 케이비자에 있지 않습니다.</div>
    
                <div className="btn-wrap">
                    <p className="txt-s">위 내용을 확인하였고, 내용에 동의합니다.</p>
                    <button type="button" className="btn"
                     onClick={() => router.push(
                        `/Progress/?&progress=${pk}&language=0&member=${parm.get("member")}&userId=${parm.get("userId")}`
                    )}
                    >맞춤형 상담폼 접수하기</button>
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
