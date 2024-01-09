import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import HeaderNavigation from "../../navigation/HeaderNavigation";
import LectureListBoxView from "./LectureListBoxView";

const LectureEventList = styled.div`
  position: relative;
  margin: 75px auto;
  
  .le-body {
    padding: 0 20% 0 20%;
    
    .lt-list-item {
      width: 367px;

      .lt-list-image {

        img {
          height: 310px;
        }
      }

      .lt-list-title {
        min-height: 55px;
      }
    }
  }
  
`;

const LectureEventMainView = styled.div<{ $url:string }>`
  position: relative;
  height: 380px;
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
    cursor: pointer;

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
      top: 70%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;

      .le-header-name {
        margin-bottom: 10px;
        word-break: keep-all;
        font-size: 46px;
      }

      .le-header-desc {
        font-size: 26px;
      }
    }
  }
`;

const LectureEventListView = () => {
    const location = useLocation();

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
        lectureThumbnail:string;
    }[]>([{
        lectureNo: 0,
        lectureTitle: '',
        lectureDivision: '',
        lectureTeacher: '',
        lectureTime: '',
        lectureFee: 0,
        lectureInstitution: '',
        lectureStateNo: 0,
        lectureCount: 0,
        lectureThumbnail: ''
    }]);

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
            const institutionNo:number = location.state.institutionNo;
            const lectureEventNo:number = location.state.eventNo;
            await axios({
                method: "GET",
                url: '/lecture/lectureEventList',
                params: {institutionNo: institutionNo, lectureEventNo: lectureEventNo}
            }).then((res):void => {
                setLectureList(res.data.data);
            }).catch((err):void => {
                console.log(err.message);
            });
            await axios({
                method: "GET",
                url: '/lecture/lectureEventOne',
                params: {lectureEventNo: lectureEventNo}
            }).then((res):void => {
                setLectureEventOne(res.data.data);
            }).catch((err):void => {
                console.log(err.message);
            });
        }
        lectureList().then();
    }, [])

    return (
        <LectureEventList>
            <HeaderNavigation />

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
                <LectureListBoxView ltCount={lectureList.length} lectureList={lectureList} />
            </div>

        </LectureEventList>
    )
}

export default LectureEventListView;