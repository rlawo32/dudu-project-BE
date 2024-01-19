import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay, Navigation, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const LectureEventView = styled.div`
  position: relative;
  
  .les-list {
    padding-bottom: 50px;
    
    .les-item {
      position: relative;
      height: 380px;
      @media screen and (max-width: 1024px) {
        height: 250px;
      }
      width: 550px;
      color: white;
      font-weight: bold;
      cursor: pointer;
      
      .les-item-image {
        height: 100%;
        width: 100%;
        
        img {
          height: 100%;
          width: 100%;
          border: none;
          border-radius: 10px;
          object-fit: cover;
          vertical-align: top;
        }
      }
      
      .les-item-text {
        width: 100%;
        position: absolute;
        top: 83%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        
        .les-item-name {
          margin-bottom: 10px;
          font-size: 26px;
          @media screen and (max-width: 1024px) {
            font-size: 22px;
          }
        }

        .les-item-desc {
          font-size: 16px;
          @media screen and (max-width: 1024px) {
            font-size: 14px;
          }
        }
      }
    }
  }
`;

const LectureEventSwiperView = (props : {institutionNo:number;}) => {
    const navigate = useNavigate();

    const [lectureEventList, setLectureEventList] = useState<{
        lectureEventNo:number;
        lectureInstitutionNo:number;
        lectureEventName:string;
        lectureEventDesc:string;
        lectureEventThumbnail:string;
    }[]>([]);

    const lectureEventSwiper = ():any[] => {
        let result:any[] = [];

        for(let i:number=0; i<lectureEventList.length; i++) {
            result.push(<SwiperSlide key={lectureEventList[i].lectureEventNo} className="les-item"
                                     onClick={() => navigate("/lectureEventList/" + lectureEventList[i].lectureEventNo,
                                         { state: {institutionNo: props.institutionNo, eventNo: lectureEventList[i].lectureEventNo}})}>
                <div className="les-item-image">
                    <img src={lectureEventList[i].lectureEventThumbnail} alt="이벤트 이미지" />
                </div>
                <div className="les-item-text">
                    <div className="les-item-name">
                        {lectureEventList[i].lectureEventName}
                    </div>
                    <div className="les-item-desc">
                        {lectureEventList[i].lectureEventDesc}
                    </div>
                </div>
            </SwiperSlide>);
        }
        return result;
    }

    useEffect(() => {
        const eventList = async () => {
            const getEventData:object = {
                pageNo: 1,
                sortType: '',
                institutionNo: props.institutionNo,
                lectureEventNo: 0
            }
            await axios({
                method: "POST",
                url: '/lecture/lectureEventList',
                data: JSON.stringify(getEventData),
                headers: {'Content-type': 'application/json'}
            }).then((res):void => {
                setLectureEventList(res.data.data);
            }).catch((err):void => {
                console.log(err.message);
            });
        }
        setTimeout(() => {eventList().then();}, 100);
    }, [props.institutionNo])

    return (
        <LectureEventView>

            <Swiper className="les-list"
                    modules={[Navigation, Pagination, Autoplay]}
                    speed={1000}
                    spaceBetween={10}
                    slidesPerView={2}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false
                    }}
                    breakpoints={{
                        400: {
                            slidesPerView: 1,
                            spaceBetween: 10
                        },
                        700: {
                            slidesPerView: 2,
                            spaceBetween: 10
                        },
                    }}>
                {lectureEventSwiper()}
            </Swiper>

        </LectureEventView>
    )
}

export default LectureEventSwiperView;