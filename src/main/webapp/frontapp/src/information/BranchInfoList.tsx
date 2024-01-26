import React, {useEffect, useRef, useState} from "react";

import HeaderNavigation from "../navigation/HeaderNavigation";
import FooterNavigation from "../navigation/FooterNavigation";

import * as Styled from "./BranchInfo.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowUpLong as topIcon, faLocationDot as positionIcon,
    faPhone as contactIcon, faDoorClosed as roomIcon
} from "@fortawesome/free-solid-svg-icons";

import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import axios from "axios";
import BranchInfoMap from "./BranchInfoMap";

const BranchInfoList = () => {
    const institutionBtn:any = useRef<any>([]);

    const [institutionList, setInstitutionList] = useState<{
        institutionNo:number;
        institutionName:string;
        institutionPosition:string;
        institutionContact:string;
    }[]>([{
        institutionNo: 0,
        institutionName: '',
        institutionPosition: '',
        institutionContact: ''
    }]);
    const [institutionImageList, setInstitutionImageList] = useState<{
        institutionImageNo:number;
        institutionImageCustom:string;
        institutionImageUrl:string;
    }[]>([]);
    const [lectureRoomList, setLectureRoomList] = useState<{
        lectureRoomNo:string;
        lectureInstitutionNo:string;
        lectureRoomName:string;
        lectureRoomContact:string;
    }[]>([]);

    const [institutionNo, setInstitutionNo] = useState<number>(1);
    const [selectInstitution, setSelectInstitution] = useState<number>(0);

    const customInstitutionCategorySelectBox = ():any => {
        const result:any[] = [];
        for(let i:number=0; i<institutionList.length; i++) {
            result.push(<div key={i} className="bi-category-item"
                             ref={btn => (institutionBtn.current[i] = btn)}
                             onClick={() => {setInstitutionNo(institutionList[i].institutionNo);
                                 setSelectInstitution(i);}}>
                {institutionList[i].institutionName}
            </div>)
        }
        return result;
    }

    const customInstitutionImageSwiper = ():any[] => {
        let result:any[] = [];

        for(let i:number=0; i<institutionImageList.length; i++) {
            result.push(<SwiperSlide key={i} className="bis-item">
                <img src={institutionImageList[i].institutionImageUrl} alt="지점 이미지" />
            </SwiperSlide>);
        }
        return result;
    }

    useEffect(() => {
        const institutionList = async ():Promise<void> => {
            await axios({
                method: "GET",
                url: "/lecture/lectureInstitutionList"
            }).then((res):void => {
                setInstitutionList(res.data.data);
            }).catch((err):void => {
                console.log(err.message);
            })
        }
        setTimeout(() => {institutionList().then();}, 0);
    }, [])

    useEffect(() => {
        const institutionList = async ():Promise<void> => {
            await axios({
                method: "GET",
                url: "/lecture/lectureInstitutionImageList",
                params: {institutionNo: institutionNo}
            }).then((res):void => {
                setInstitutionImageList(res.data.data);
            }).catch((err):void => {
                console.log(err.message);
            })
            await axios({
                method: "GET",
                url: "/lecture/lectureRoomList",
                params: {institutionNo: institutionNo}
            }).then((res):void => {
                setLectureRoomList(res.data.data);
            }).catch((err):void => {
                console.log(err.message);
            })
        }
        setTimeout(() => {institutionList().then();}, 0);
    }, [institutionNo])

    useEffect(() => {
        institutionBtn.current[selectInstitution].className = institutionBtn.current[selectInstitution].className.replace(' active', '');
        institutionBtn.current[selectInstitution].className += ' active';

        for(let i:number=0; i<institutionBtn.current.length; i++) {
            if(i !== selectInstitution) {
                institutionBtn.current[i].className = institutionBtn.current[i].className.replace(' active', '');
            }
        }
    }, [selectInstitution])

    return (
        <Styled.BranchInfoListView>
            <HeaderNavigation />

            <div className="top-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <FontAwesomeIcon icon={topIcon} className="icon-custom" />
            </div>

            <div className="bi-sub-view">
                <div className="bi-sub">
                    <div className="bi-sub-title">
                        지점안내
                    </div>
                </div>
            </div>
            <div className="bi-view-main">
                <div className="bi-main-category">
                    {customInstitutionCategorySelectBox()}
                </div>
                <div className="bi-main-image">
                    <Swiper className="bis-list"
                            modules={[Navigation, Pagination]}
                            speed={1000}
                            spaceBetween={25}
                            slidesPerView={1}
                            navigation
                            breakpoints={{

                            }}>
                        {customInstitutionImageSwiper()}
                    </Swiper>
                </div>
                <div className="bi-main-info">
                    <div className="info-item info-position">
                        <FontAwesomeIcon icon={positionIcon} className="icon-custom" />
                        <div>
                            {institutionList[selectInstitution].institutionPosition}
                        </div>
                    </div>
                    <div className="info-item info-contact">
                        <FontAwesomeIcon icon={contactIcon} className="icon-custom" />
                        <div>
                            {institutionList[selectInstitution].institutionContact}
                        </div>
                    </div>
                    <div className="info-item info-room">
                        <FontAwesomeIcon icon={roomIcon} className="icon-custom" />
                        <div>
                            강의실 {lectureRoomList.length}실
                        </div>
                    </div>
                </div>
                {
                    institutionList.length > 0 ?
                        <div className="bi-main-map">
                            <div className="bi-map-title">
                                {institutionList[selectInstitution].institutionName} 오시는 길
                            </div>
                            <BranchInfoMap mapPosition={institutionList[selectInstitution].institutionPosition}
                                           mapName={institutionList[selectInstitution].institutionName}/>
                        </div> : <div />
                }
            </div>

            <FooterNavigation />
        </Styled.BranchInfoListView>
    )
}

export default BranchInfoList;