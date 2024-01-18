import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock as clockIcon} from "@fortawesome/free-regular-svg-icons";

const MainRecommendEventView = styled.div`
  width: 1440px;
  margin: 5% auto;
  
  .el-title {
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
  
  .el-list {
    display: flex;

    .el-list-item {
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
      margin: 30px 3px 0 0;
      padding: 5px;
      cursor: pointer;

      .el-list-image {
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
      }

      .el-list-info {
        @media screen and (max-width: 1024px) {
          height: 100%;
          width: calc(65% - 16px);
          margin-left: 16px;
          padding: 0 0 25px;
        }

        .el-list-state {
          height: 100%;
          margin-top: 10px;

          .span-elState {
            border: none;
            border-radius: 10px;
            margin-right: 6px;
            padding: 3px 7px 3px 7px;
            font-size: 11px;
            font-weight: bold;
          }

          .span-elInstitution {
            border: none;
            border-radius: 10px;
            padding: 3px 7px 3px 7px;
            font-size: 11px;
            font-weight: bold;
            background-color: lightgray;
            color: black;
          }
        }

        .el-list-title {
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

        .el-list-division {
          margin-top: 6px;
          font-size: 14px;
          font-weight: 500;
          opacity: 0.9;
        }

        .el-list-time {
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

        .el-list-fee {
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

const MainRecommendEvent = () => {
    const navigate = useNavigate();

    const [eventList, setEventList] = useState<{
        lectureNo: number;
        lectureTitle: string;
        lectureDivision: string;
        lectureTeacher: string;
        lectureTime: string;
        lectureFee: number;
        lectureInstitution: string;
        lectureStateNo: number;
        lectureCount: number;
        lectureEventType: string;
        lectureThumbnail: string;
    }[]>([]);

    useEffect(() => {
        const dataList = async (): Promise<void> => {
            const listData: object = {
                listType: "A",
                pageNo: 0,
                sortType: "R",
                institutionNo: 0,
                mainCategoryNo: 0,
                subCategoryNo: 0,
                searchText: "",
                searchDivision: [],
                searchState: []
            }
            await axios({
                method: "POST",
                url: '/lecture/lectureEventType',
                data: JSON.stringify(listData),
                headers: {'Content-type': 'application/json'}
            }).then((res): void => {
                setEventList(res.data.data.eventList);
            }).catch((err): void => {
                console.log(err.message);
            });
        }
        setTimeout(() => {
            dataList().then();
        }, 100);
    }, []);

    return (
        <MainRecommendEventView>
            <div className="el-title">
                <div className="title-top">
                    추천강좌
                </div>
                <div className="title-bottom">
                    엄선된 강좌를 <br />소개합니다
                </div>
            </div>
            <div className="el-list">
                {
                    eventList.map((item) => {
                        return (
                            <div key={item.lectureNo} className="el-list-item"
                                 onClick={() => navigate("/lectureDetail/" + item.lectureNo,
                                     {state: {lectureNo: item.lectureNo}})}>
                                <div className="el-list-image">
                                    <img src={item.lectureThumbnail} alt="강의 이미지"/>
                                </div>
                                <div className="el-list-info">
                                    <div className="el-list-state">
                                    <span className="span-elState" style={
                                        item.lectureStateNo === 1 ? {backgroundColor: "slategray", color: 'white'} :
                                            item.lectureStateNo === 2 ? {backgroundColor: "greenyellow", color: 'black'} :
                                                item.lectureStateNo === 3 ? {backgroundColor: "slategray", color: 'black'} :
                                                    item.lectureStateNo === 4 ? {backgroundColor: "black", color: 'white'} :
                                                        item.lectureStateNo === 5 || 6 ? {backgroundColor: "red", color: 'black'
                                                        } : {}}>
                                        {
                                            item.lectureStateNo === 1 ? '접수예정' :
                                                item.lectureStateNo === 2 ? '접수중' :
                                                    item.lectureStateNo === 3 ? '대기접수' :
                                                        item.lectureStateNo === 4 ? '접수마감' :
                                                            item.lectureStateNo === 5 ? '접수불가' : '강의종료'
                                        }
                                    </span>
                                        <span className="span-elInstitution">{item.lectureInstitution}</span>
                                    </div>
                                    <div className="el-list-title">
                                        <p>
                                            {item.lectureTitle}
                                        </p>
                                    </div>
                                    <div className="el-list-division">
                                        <span className="span-line">{item.lectureDivision}&nbsp;&nbsp;</span>
                                        <span>&nbsp;{item.lectureTeacher}</span>
                                    </div>
                                    <div className="el-list-time">
                                        <FontAwesomeIcon icon={clockIcon} className="icon-custom"/>
                                        <span>
                                        {
                                            item.lectureTime.substring(13, 14) === '1' ? '월' :
                                                item.lectureTime.substring(13, 14) === '2' ? '화' :
                                                    item.lectureTime.substring(13, 14) === '3' ? '수' :
                                                        item.lectureTime.substring(13, 14) === '4' ? '목' :
                                                            item.lectureTime.substring(13, 14) === '5' ? '금' :
                                                                item.lectureTime.substring(13, 14) === '6' ? '토' : '일'
                                        }
                                    </span>
                                        <span>
                                        {item.lectureTime.substring(0, 11)},
                                    </span>
                                        <span>총 {item.lectureCount}회</span>
                                    </div>
                                    <div className="el-list-fee">
                                        {item.lectureFee.toLocaleString()}원
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </MainRecommendEventView>
    )
}

export default MainRecommendEvent;