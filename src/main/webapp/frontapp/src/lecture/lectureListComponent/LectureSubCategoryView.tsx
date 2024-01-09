import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import styled from "styled-components";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck as check} from "@fortawesome/free-solid-svg-icons";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Props {
    mainCategoryNo:number;
    setSubCategoryNo: React.Dispatch<React.SetStateAction<number>>;
}

const TabLectureSubCategory = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  border-bottom: 1px solid darkgray;
  
  .sc-list {
    height: 100%;
    width: 100%;
    margin-bottom: 15px;
    padding: 10px 0 45px 0;
      
    .sc-item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-top: 30px;
      text-align: center;
      cursor: pointer;
        
      .sc-item-image {
        position: relative;
        height: 100px;
        width: 100px;
        @media screen and (max-width: 900px) {
          height: 60px;
          width: 60px;
          font-size: 18px;
        }
        border-radius: 50%;
        margin-bottom: 15px;
        
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;

        font-size: 25px;
        background-color: lightgrey;
        text-align: center;

        .sc-item-cover {
          display: none;
        }
        
        img {
          height: 100%;
          width: 100%;
          border: none;
          object-fit: cover;
        }
      }
      
      .sc-item-name {
        font-size: 15px;
        @media screen and (max-width: 900px) {
          font-size: 12px;
        }
        font-weight: 500;
      }
      
      .scBtn-active {

        .sc-item-cover {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 100%;
          background: rgba(255,127,0,0.7);
        }
        
        .sc-item-name {
          font-weight: 900;
        }
      }
    }
  }
`;

const LectureSubCategoryView = (props: Props) => {
    const scBtn:any = useRef<any>([]);

    const [lectureSubCategoryData, setLectureSubCategoryData] = useState<{
        lectureSubCategoryNo:number;
        lectureMainCategoryNo:number;
        lectureSubCategoryName:string;
        lectureSubCategoryDesc:string;
        lectureSubCategoryThumbnail:string;
    }[]>([{
        lectureSubCategoryNo: 0,
        lectureMainCategoryNo: 0,
        lectureSubCategoryName: '',
        lectureSubCategoryDesc: '',
        lectureSubCategoryThumbnail: ''
    }]);

    const tabSubCategory = ():any[] => {
        let result:any[] = [];

        for(let i:number=0; i<=lectureSubCategoryData.length; i++) {
            if(i === 0) {
                result.push(<SwiperSlide key={i} onClick={() => onClickSubCategory(i, 0)}
                                         className="sc-item">
                    <div ref={btn => (scBtn.current[i] = btn)}>
                        <div className="sc-item-image">
                            ALL
                            <div className="sc-item-cover">
                                <FontAwesomeIcon icon={check} />
                            </div>
                        </div>
                        <div className="sc-item-name">전체</div>
                    </div>
                </SwiperSlide>);
            } else {
                result.push(<SwiperSlide key={i} onClick={() => onClickSubCategory(i, lectureSubCategoryData[i-1].lectureSubCategoryNo)}
                                         className="sc-item">
                    <div ref={btn => (scBtn.current[i] = btn)}>
                        <div className="sc-item-image">
                            <img src={lectureSubCategoryData[i-1].lectureSubCategoryThumbnail} alt="카테고리 이미지" />
                            <div className="sc-item-cover">
                                <FontAwesomeIcon icon={check} />
                            </div>
                        </div>
                        <div className="sc-item-name">
                            {lectureSubCategoryData[i-1].lectureSubCategoryName}
                        </div>
                    </div>
                </SwiperSlide>);
            }
        }
        return result;
    }

    const onClickSubCategory = (idx:number, subNo:number):void => {
        props.setSubCategoryNo(subNo);
        scBtn.current[idx].className = scBtn.current[idx].className.replace('scBtn-active', '');
        scBtn.current[idx].className += 'scBtn-active';

        for(let i:number=0; i<=lectureSubCategoryData.length; i++) {
            if(i !== idx) {
                scBtn.current[i].className = scBtn.current[i].className.replace('scBtn-active', '');
            }
        }
    }

    useEffect(() => {
        if(props.mainCategoryNo > 0) {
            for(let i:number=0; i<lectureSubCategoryData.length; i++) {
                scBtn.current[i].className = scBtn.current[i].className.replace('scBtn-active', '');
            }
            const lectureCategoryData = async ():Promise<void> => {
                await axios({
                    method: "GET",
                    url: "/lecture/lectureSubCategoryList",
                    params: {mainCategoryNo: props.mainCategoryNo}
                }).then((res):void => {
                    setLectureSubCategoryData(res.data.data);
                }).catch((err):void => {
                    console.log(err.message);
                })
            }
            lectureCategoryData().then();
            props.setSubCategoryNo(0);
            scBtn.current[0].className = scBtn.current[0].className.replace('scBtn-active', '');
            scBtn.current[0].className += 'scBtn-active';
        } else {
            setLectureSubCategoryData([]);
        }
    }, [props.mainCategoryNo])

    return (
        <TabLectureSubCategory>

            <Swiper className="sc-list"
                    modules={[Navigation, Pagination]}
                    speed={1000}
                    slidesPerView={2}
                    spaceBetween={10}
                    navigation
                    pagination={{ clickable: true }}
                    breakpoints={{
                        500: {
                            slidesPerView: 5,
                            spaceBetween: 10
                        },
                        600: {
                            slidesPerView: 6,
                            spaceBetween: 10
                        },
                        700: {
                            slidesPerView: 8,
                            spaceBetween: 10
                        },
                        900: {
                            slidesPerView: 7,
                            spaceBetween: 10
                        },
                        1250: {
                            slidesPerView: 9,
                            spaceBetween: 10
                        }
                    }}>
                {tabSubCategory()}
            </Swiper>

        </TabLectureSubCategory>
    )
}

export default LectureSubCategoryView;