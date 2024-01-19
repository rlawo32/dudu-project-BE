import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay, Navigation, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock as clockIcon} from "@fortawesome/free-regular-svg-icons";

const MainRecentEventView = styled.div`
  width: 1440px;
  margin: 5% auto;

  .els-title {
    word-break: keep-all;
    overflow-wrap: break-word;

    .title-top {
      margin-bottom: 10px;
      font-size: 24px;
      font-weight: bold;
      line-height: 32px;
      letter-spacing: -.6px;
    }

    .title-bottom {
      font-size: 64px;
      font-weight: lighter;
      line-height: 80px;
      letter-spacing: -4.8px;
    }
  }
  
  .els-list {
    position: relative;
    display: flex;
    box-sizing: content-box;
    height: 100%;
    width: 100%;
    margin: 64px auto 0;
    padding-bottom: 50px;
    z-index: 1;
    transition-property: transform;

    .els-list-item {
      position: relative;
      height: 100%;
      width: calc(100% / 4);
      @media screen and (max-width: 1280px) {
        width: calc((100% - 48px) / 3);
      }
      @media screen and (max-width: 1024px) {
        display: flex;
        flex-direction: row;
        width: 100%;
        border-bottom: 1px solid gray;
      }
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;

      .els-list-image {
        height: 250px;
        @media screen and (max-width: 1024px) {
          height: 100%;
          width: 35%;
        }
        border-radius: 10px;
        overflow: hidden;

        img {
          height: 100%;
          width: 100%;
          border: none;
          border-radius: 10px;
          object-fit: cover;
          vertical-align: top;

          transition: transform .4s ease;
        }
        
        .els-image-label {
          position: absolute;
          top: -14px;
          right: -40px;
          height: 48px;
          width: 98px;
          background-color: greenyellow;
          color: black;
          z-index: 2;
          transform: rotate(45deg);
          
          .label-text {
            position: absolute;
            bottom: 0;
            right: 32px;
            font-size: 15px;
            font-weight: bold;
          }
        }
      }

      .els-list-info {
        @media screen and (max-width: 1024px) {
          height: 100%;
          width: calc(65% - 16px);
          margin-left: 16px;
          padding: 0 0 25px;
        }

        .els-list-state {
          height: 100%;
          margin-top: 10px;

          .span-elsState {
            border: none;
            border-radius: 10px;
            margin-right: 6px;
            padding: 3px 7px 3px 7px;
            font-size: 11px;
            font-weight: bold;
          }

          .span-elsInstitution {
            border: none;
            border-radius: 10px;
            padding: 3px 7px 3px 7px;
            font-size: 11px;
            font-weight: bold;
            background-color: lightgray;
            color: black;
          }
        }

        .els-list-title {
          min-height: 50px;

          p {
            margin: 10px 0 0 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
            word-break: keep-all;
            line-height: 1.5;
            font-size: 16px;
            font-weight: bold;

            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }

        .els-list-division {
          margin-top: 6px;
          font-size: 14px;
          font-weight: 500;
          opacity: 0.9;
        }

        .els-list-time {
          margin-top: 3px;
          font-size: 14px;
          font-weight: 500;
          opacity: 0.9;

          .icon-custom {
            margin-right: 4px;
          }

          span {
            margin-right: 4px;
          }
        }

        .els-list-fee {
          margin-top: 3px;
          font-size: 14px;
          font-weight: bold;
        }
      }

      &:hover img {
        transform: scale(1.1);
        transition: transform .4s ease;
      }
    }
  }
`;

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
        <MainRecentEventView>
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

                    }}>
                {recentEventSwiper()}
            </Swiper>
        </MainRecentEventView>
    )
}

export default MainRecentEvent;