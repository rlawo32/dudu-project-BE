import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay, Navigation, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import * as Styled from "./MainRecentEvent.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock as clockIcon} from "@fortawesome/free-regular-svg-icons";

const MainRecentEvent = () => {
    const navigate = useNavigate();

    const [eventList, setEventList] = useState<{
        lectureNo:number;
        lectureTitle:string;
        lectureDivision:string;
        lectureTeacher:string;
        lectureTime:string;
        lectureFee:number;
        lectureInstitution:string;
        lectureStateNo:number;
        lectureCount:number;
        lectureEventType:string;
        lectureThumbnail:string;
    }[]>([]);

    const recentEventSwiper = ():any[] => {
        let result:any[] = [];

        for(let i:number=0; i<eventList.length; i++) {
            result.push(<SwiperSlide key={eventList[i].lectureNo} className="els-list-item"
                                     onClick={() => navigate("/lectureDetail/" + eventList[i].lectureNo,
                                         { state: {lectureNo: eventList[i].lectureNo}})}>
                <div className="els-list-image">
                    <div className="els-image-label">
                        <div className="label-text">NEW</div>
                    </div>
                    <img src={eventList[i].lectureThumbnail} alt="강의 이미지" />
                </div>
                <div className="els-list-info">
                    <div className="els-list-state">
                        <span className="span-elsState" style={
                            eventList[i].lectureStateNo === 1 ? {backgroundColor: "slategray", color: 'white'} :
                                eventList[i].lectureStateNo === 2 ? {backgroundColor: "greenyellow", color: 'black'} :
                                    eventList[i].lectureStateNo === 3 ? {backgroundColor: "slategray", color: 'black'} :
                                        eventList[i].lectureStateNo === 4 ? {backgroundColor: "black", color: 'white'} :
                                            eventList[i].lectureStateNo === 5 || 6 ? {backgroundColor: "red", color: 'black'} : {}}>
                            {
                                eventList[i].lectureStateNo === 1 ? '접수예정' :
                                    eventList[i].lectureStateNo === 2 ? '접수중' :
                                        eventList[i].lectureStateNo === 3 ? '대기접수' :
                                            eventList[i].lectureStateNo === 4 ? '접수마감' :
                                                eventList[i].lectureStateNo === 5 ? '접수불가' : '강의종료'
                            }
                        </span>
                        <span className="span-elsInstitution">{eventList[i].lectureInstitution}</span>
                    </div>
                    <div className="els-list-title">
                        <p>
                            {eventList[i].lectureTitle}
                        </p>
                    </div>
                    <div className="els-list-division">
                        <span className="span-line">{eventList[i].lectureDivision}&nbsp;&nbsp;</span>
                        <span>&nbsp;{eventList[i].lectureTeacher}</span>
                    </div>
                    <div className="els-list-time">
                        <FontAwesomeIcon icon={clockIcon} className="icon-custom" />
                        <span>
                            {
                                eventList[i].lectureTime.substring(13, 14) === '1' ? '월' :
                                    eventList[i].lectureTime.substring(13, 14) === '2' ? '화' :
                                        eventList[i].lectureTime.substring(13, 14) === '3' ? '수' :
                                            eventList[i].lectureTime.substring(13, 14) === '4' ? '목' :
                                                eventList[i].lectureTime.substring(13, 14) === '5' ? '금' :
                                                    eventList[i].lectureTime.substring(13, 14) === '6' ? '토' : '일'
                            }
                        </span>
                        <span>
                            {eventList[i].lectureTime.substring(0, 11)},
                        </span>
                        <span>총 {eventList[i].lectureCount}회</span>
                    </div>
                    <div className="els-list-fee">
                        {eventList[i].lectureFee.toLocaleString()}원
                    </div>
                </div>
            </SwiperSlide>);
        }
        return result;
    }

    useEffect(() => {
        const listData:object = {
            listType: "M",
            pageNo: 0,
            sortType: "",
            institutionNo: 0,
            mainCategoryNo: 0,
            subCategoryNo: 0,
            searchText: "",
            searchDivision: [],
            searchState: []
        }
        const eventList = async () => {
            await axios({
                method: "POST",
                url: '/lecture/lectureList',
                data: JSON.stringify(listData),
                headers: {'Content-type': 'application/json'}
            }).then((res):void => {
                setEventList(res.data.data.lectureList);
            }).catch((err):void => {
                console.log(err.message);
            });
        }
        setTimeout(() => {eventList().then();}, 100);
    }, []);

    return (
        <Styled.MainRecentEventView>
            <div className="els-title">
                <div className="title-top">
                    신규강좌
                </div>
                <div className="title-bottom">
                    새롭게 개설된 강좌를 <br />지금 확인해보세요
                </div>
            </div>
            <Swiper className="els-list"
                    modules={[Navigation, Pagination, Autoplay]}
                    speed={1000}
                    spaceBetween={32}
                    slidesPerView={4}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false
                    }}
                    breakpoints={{
                        300: {
                            slidesPerView: 1,
                            spaceBetween: 10
                        },
                        600: {
                            slidesPerView: 2,
                            spaceBetween: 10
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 10
                        },
                    }}>
                {recentEventSwiper()}
            </Swiper>
        </Styled.MainRecentEventView>
    )
}

export default MainRecentEvent;