import React from "react";
import styled from "styled-components";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock as clock} from "@fortawesome/free-regular-svg-icons";

interface Props {
    lectureList:{
        lectureNo:number;
        lectureTitle:string;
        lectureDivision:string;
        lectureTeacher:string;
        lectureTime:string;
        lectureFee:number;
        lectureInstitution:string;
        lectureStateNo:number;
        lectureCount:number;
        lectureThumbnail:string;}[];
}

const LectureListBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: fit-content;

  .lt-list-item {
    height: fit-content;
    width: 272px;
    margin: 30px 3px 0 0;
    padding: 5px;
    cursor: pointer;

    .lt-list-image {
      border-radius: 10px;
      overflow: hidden;

      img {
        height: 250px;
        width: 100%;
        border: none;
        border-radius: 10px;
        object-fit: cover;
        vertical-align: top;

        transition: transform .4s ease;
      }
    }

    .lt-list-state {
      margin-top: 10px;
      font-size: 12px;

      .span-ltState {
        border: none;
        border-radius: 10px;
        margin-right: 6px;
        padding: 3px 7px 3px 7px;
        font-size: 13px;
        font-weight: bold;
      }

      .span-ltInstitution {
        border: none;
        border-radius: 10px;
        padding: 3px 7px 3px 7px;
        font-size: 13px;
        font-weight: bold;
        background-color: lightgray;
        color: black;
      }
    }

    .lt-list-title {
      min-height: 42px;

      p {
        margin: 10px 0 0 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        word-break: keep-all;
        line-height: 1.5;
        font-size: 17px;
        font-weight: 900;

        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }

    .lt-list-division {
      margin-top: 6px;
      font-size: 14px;
      font-weight: 700;
    }

    .lt-list-time {
      margin-top: 3px;
      font-size: 14px;
      font-weight: 500;

      .icon-custom {
        margin-right: 4px;
      }

      span {
        margin-right: 4px;
      }
    }

    .lt-list-fee {
      margin-top: 3px;
      font-size: 14px;
      font-weight: 700;
    }

    &:hover img {
      transform: scale(1.1);
      transition: transform .4s ease;
    }
  }
`;

const LectureListBoxView = (props : Props) => {

    return (
        <LectureListBox>
            {props.lectureList.map((lectures) => {
                return (
                    <div key={lectures.lectureNo} className="lt-list-item">
                        <div className="lt-list-image">
                            <img src={lectures.lectureThumbnail} alt="강의 이미지" />
                        </div>
                        <div className="lt-list-state">
                                <span className="span-ltState" style={
                                    lectures.lectureStateNo === 1 ? {backgroundColor: "slategray", color: 'white'} :
                                        lectures.lectureStateNo === 2 ? {backgroundColor: "greenyellow", color: 'black'} :
                                            lectures.lectureStateNo === 3 ? {backgroundColor: "slategray", color: 'black'} :
                                                lectures.lectureStateNo === 4 ? {backgroundColor: "black", color: 'white'} :
                                                    lectures.lectureStateNo === 5 || 6 ? {backgroundColor: "red", color: 'black'} : {}}>
                                    {
                                        lectures.lectureStateNo === 1 ? '접수예정' :
                                            lectures.lectureStateNo === 2 ? '접수중' :
                                                lectures.lectureStateNo === 3 ? '대기접수' :
                                                    lectures.lectureStateNo === 4 ? '접수마감' :
                                                        lectures.lectureStateNo === 5 ? '접수불가' : '강의종료'
                                    }
                                </span>
                            <span className="span-ltInstitution">{lectures.lectureInstitution}</span>
                        </div>
                        <div className="lt-list-title">
                            <p>
                                {lectures.lectureTitle}
                            </p>
                        </div>
                        <div className="lt-list-division">
                            <span className="span-line">{lectures.lectureDivision}&nbsp;&nbsp;</span>
                            <span>&nbsp;{lectures.lectureTeacher}</span>
                        </div>
                        <div className="lt-list-time">
                            <FontAwesomeIcon icon={clock} className="icon-custom" />
                            <span>
                                    {
                                        lectures.lectureTime.substring(13, 14) === '1' ? '월' :
                                            lectures.lectureTime.substring(13, 14) === '2' ? '화' :
                                                lectures.lectureTime.substring(13, 14) === '3' ? '수' :
                                                    lectures.lectureTime.substring(13, 14) === '4' ? '목' :
                                                        lectures.lectureTime.substring(13, 14) === '5' ? '금' :
                                                            lectures.lectureTime.substring(13, 14) === '6' ? '토' : '일'
                                    }
                                </span>
                            <span>
                                    {lectures.lectureTime.substring(0, 11)},
                                </span>
                            <span>총 {lectures.lectureCount}회</span>
                        </div>
                        <div className="lt-list-fee">
                            {lectures.lectureFee.toLocaleString()}원
                        </div>
                    </div>
                )
            })}
        </LectureListBox>
    )
}

export default LectureListBoxView;