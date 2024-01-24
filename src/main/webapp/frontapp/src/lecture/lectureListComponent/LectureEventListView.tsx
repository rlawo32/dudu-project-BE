import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import HeaderNavigation from "../../navigation/HeaderNavigation";
import LectureListMainView from "./LectureListMainView";
import LectureListToolView from "./LectureListToolView";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpLong as topIcon} from "@fortawesome/free-solid-svg-icons";
import FooterNavigation from "../../navigation/FooterNavigation";

const LectureEventList = styled.div`
  position: relative;
  
  .lt-top-btn {
    position: fixed;
    bottom: 40px;
    right: 40px;
    height: 50px;
    width: 50px;
    border: 1px solid ${({theme}) => theme.boxBgColor};
    border-radius: 50%;
    background-color: ${({theme}) => theme.boxBgColor};
    color: ${({theme}) => theme.textColor};;
    text-align: center;
    z-index: 99;
    cursor: pointer;

    .icon-custom {
      position: relative;
      top: 12px;
      font-size: 25px;
    }
  }
  
  .le-body {
    width: 1160px;
    @media screen and (max-width: 1280px) {
      width: calc(100% - 48px);
    }
    @media screen and (max-width: 1024px) {
      margin: 0 2rem;
      width: calc(100% - 4rem);
    }
    padding: 0;
    margin: 2% auto 10%;
    
    .lt-list-item {
      width: 370px;
      @media screen and (max-width: 1280px) {
        width: calc((100% - 48px) / 2);
      }
      @media screen and (max-width: 1024px) {
        display: flex;
        flex-direction: row;
        width: 100%;
        border-bottom: 1px solid gray;
      }

      .lt-list-image {
        height: 300px;
        @media screen and (max-width: 1280px) {
          height: 400px;
        }
        @media screen and (max-width: 1024px) {
          height: 170px;
          width: 30%;
        }
      }
    }
  }
  
`;

const LectureEventMainView = styled.div<{ $url:string }>`
  position: relative;
  height: 480px;
  @media screen and (max-width: 1024px) {
    height: 350px;
  }
  width: 100vw;
  overflow: hidden;
  
  .le-header-bg {
    height: 100%;
    background-image: url("${({$url}) => $url}");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    filter: blur(10px);
  }
  
  .le-header {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    height: 100%;
    width: 750px;
    margin: 0 auto 70px;
    color: white;

    .le-header-image {
      height: 100%;
      width: 100%;

      img {
        height: 100%;
        width: 100%;
        border: none;
        object-fit: cover;
        vertical-align: top;
      }
    }

    .le-header-text {
      width: 100%;
      position: absolute;
      top: 80%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;

      .le-header-name {
        margin-bottom: 10px;
        word-break: keep-all;
        font-size: 46px;
        @media screen and (max-width: 1024px) {
          font-size: 33px;
        }
      }

      .le-header-desc {
        font-size: 26px;
        @media screen and (max-width: 1024px) {
          font-size: 17px;
        }
      }
    }
  }
`;

const LectureEventListView = () => {
    const location = useLocation();
    const institutionNo:number = location.state.institutionNo;
    const lectureEventNo:number = location.state.eventNo;

    const [pageNo, setPageNo] = useState<number>(1);
    const [sortType, setSortType] = useState<string>("");
    const [totalPage, setTotalPage] = useState<number>(0);
    const [isSearchBoxShow, setIsSearchBoxShow] = useState<boolean>(false);

    const [lectureList, setLectureList] = useState<{
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

    const [lectureEventOne, setLectureEventOne] = useState<{
        lectureEventNo:number;
        lectureInstitutionNo:number;
        lectureEventName:string;
        lectureEventDesc:string;
        lectureEventThumbnail:string;
    }>({
        lectureEventNo: 0,
        lectureInstitutionNo: 0,
        lectureEventName: '',
        lectureEventDesc: '',
        lectureEventThumbnail: ''
    });

    useEffect(():void => {
        const lectureList = async () => {
            const getEventData:object = {
                pageNo: pageNo,
                sortType: sortType,
                institutionNo: institutionNo,
                lectureEventNo: lectureEventNo
            }
            await axios({
                method: "POST",
                url: '/lecture/lectureEventList',
                data: JSON.stringify(getEventData),
                headers: {'Content-type': 'application/json'}
            }).then((res):void => {
                setLectureList(res.data.data.eventList);
                setTotalPage(res.data.data.totalPage);
            }).catch((err):void => {
                console.log(err.message);
            });
            await axios({
                method: "GET",
                url: '/lecture/lectureEventDetail',
                params: {lectureEventNo: lectureEventNo}
            }).then((res):void => {
                setLectureEventOne(res.data.data);
            }).catch((err):void => {
                console.log(err.message);
            });
        }
        setTimeout(() => {lectureList().then();}, 100);
    }, [sortType])

    return (
        <LectureEventList>
            <HeaderNavigation />

            <div className="lt-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <FontAwesomeIcon icon={topIcon} className="icon-custom" />
            </div>

            <LectureEventMainView $url={lectureEventOne.lectureEventThumbnail}>
                <div className="le-header-bg">

                </div>
                <div className="le-header">
                    <div className="le-header-image">
                        <img src={lectureEventOne.lectureEventThumbnail} alt="이벤트 대표 이미지" />
                    </div>
                    <div className="le-header-text">
                        <div className="le-header-name">
                            {lectureEventOne.lectureEventName}
                        </div>
                        <div className="le-header-desc">
                            {lectureEventOne.lectureEventDesc}
                        </div>
                    </div>
                </div>
            </LectureEventMainView>

            <div className="le-body">
                <LectureListToolView ltType={"E"} ltCount={totalPage} isSetBoxShow={setIsSearchBoxShow}
                                     institutionNo={institutionNo} setSortType={setSortType}/>
                <LectureListMainView ltCount={lectureList.length} lectureList={lectureList} />
            </div>

            <FooterNavigation />
        </LectureEventList>
    )
}

export default LectureEventListView;