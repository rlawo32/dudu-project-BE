import React from "react";
import {useNavigate} from "react-router-dom";

import useLectureSearchDataStore from "../../stores/useLectureSearchDataStore";
import * as Styled from "./LectureListMainView.style";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamation as emptyIcon, faQuoteLeft as quoteLeft, faQuoteRight as quoteRight} from "@fortawesome/free-solid-svg-icons";
import {faClock as clockIcon} from "@fortawesome/free-regular-svg-icons";

interface Props {
    ltCount:number;
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

const LectureListMainView = (props : Props) => {
    const navigate = useNavigate();
    const {searchText} = useLectureSearchDataStore();

    return (
        <Styled.LectureListMain $lectureList={props.lectureList}>
            {
                props.ltCount > 0 ?
                    props.lectureList.map((lectures) => {
                            return (
                                <div key={lectures.lectureNo} className="lt-list-item"
                                     onClick={() => navigate("/lectureDetail/" + lectures.lectureNo,
                                         { state: {lectureNo: lectures.lectureNo}})}>
                                    <div className="lt-list-image">
                                        <img src={lectures.lectureThumbnail} alt="강의 이미지" />
                                    </div>
                                    <div className="lt-list-info">
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
                                            <FontAwesomeIcon icon={clockIcon} className="icon-custom" />
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
                                </div>
                            )
                        })
                    :
                    <div className="lt-list-empty">
                        <div>
                            <FontAwesomeIcon icon={emptyIcon} className="icon-custom" />
                            {
                                searchText.length > 0 ?
                                    <div className="empty-text">
                                        <FontAwesomeIcon icon={quoteLeft} className="icon-custom" />
                                        <span className="search-text">
                                            {searchText}
                                        </span>
                                        <FontAwesomeIcon icon={quoteRight} className="icon-custom" />
                                        <span className="default-text">
                                            에 대한
                                        </span>
                                        <div className="default-text">
                                            검색결과가 없어요.
                                        </div>
                                    </div>
                                    :
                                    <div className="default-text">
                                        진행중인 강좌가 없습니다.
                                    </div>
                            }
                        </div>
                    </div>
            }

        </Styled.LectureListMain>
    )
}

export default LectureListMainView;