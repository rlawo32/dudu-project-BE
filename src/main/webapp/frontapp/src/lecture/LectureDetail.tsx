import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";
import dompurify from "dompurify";

import HeaderNavigation from "../navigation/HeaderNavigation";

import * as Styled from "./LectureDetail.style";
import dayjs from "dayjs";

const LectureDetail = () => {
    const location = useLocation();
    const lectureNo:number = location.state.lectureNo;

    const sanitizer = dompurify.sanitize;
    // 스크립트를 활용한 토큰 탈취 처럼 취약점을 노려서 javascript와 HTML로 악의적 코드를 웹 브라우저에 심어,
    // 사용자 접속시 그 악성코드가 실행되는 것을 크로스 사이드 스크립트, 보안을 위해 추가

    const [lectureDetail, setLectureDetail] = useState<{
        lectureNo:number; lectureStateNo:number; lectureTitle:string; lectureThumbnail:string;
        lectureInstitution:string; lectureDivision:string; lectureTeacher:string; lecturePeriod:string;
        lectureTime:string; lectureCount:number; lectureCapacity:number; lectureRoom:string;
        lectureFee:number; lectureReception:string; lectureContact:string; lectureDescription:string;
    }>({
        lectureNo: 0, lectureStateNo: 0, lectureTitle: '', lectureThumbnail: '',
        lectureInstitution: '', lectureDivision: '', lectureTeacher: '', lecturePeriod: '',
        lectureTime: '', lectureCount: 0, lectureCapacity: 0, lectureRoom: '',
        lectureFee: 0, lectureReception: '', lectureContact: '', lectureDescription: ''
    });

    const [lectureScheduleArr, setLectureScheduleArr] = useState<string[]>([]);
    const [lectureScheduleDateArr, setLectureScheduleDateArr] = useState<string[]>([]);
    const [materialsAndSignificantArr, setMaterialsAndSignificantArr] = useState<string[]>([]);
    const noticeArr:string[] = [
        "강좌 취소 및 환불은 수업 참여여부와 상관없이 [평생교육법 시행령]에 의거해 처리됩니다.",
        "일반 강좌는 개강 1일 전까지 취소 및 환불 가능하며, 당일 취소는 적용되지 않습니다.",
        "재료 준비가 필요한 일부 강좌는 강좌 시작일의 3일 전까지만 전액 취소가 가능합니다.",
        "수강신청 인원이 미달될 경우 강좌가 폐강될 수 있으며, 수강료는 전액 환불됩니다.",
        "회원정보에서 실제수강자명과 핸드폰 번호를 반드시 확인해주세요.",
        "영유아 강좌는 아이와 보호자 1인만 참여 가능합니다.",
        "강의 당일 무료주차를 위하여 개강 전일까지 회원정보수정 메뉴를 통해 차량번호 등록 바랍니다. (일부 점포 제외)",
        "문의 : 해당 점 데스크 (운영시간 점별 상이)"
    ];

    const onActiveArrangement = (result:any):void => {
        setLectureScheduleArr(result.lectureSchedule.split("^*"));
        setMaterialsAndSignificantArr(result.materialsAndSignificant.split("^*"));

        const startDate:dayjs.Dayjs = dayjs(result.lecturePeriod.substring(0, result.lecturePeriod.indexOf("~")));
        const endDate:dayjs.Dayjs = dayjs(result.lecturePeriod.substring(result.lecturePeriod.indexOf("~") + 1));
        let dow:string = result.lectureTime.substring(result.lectureTime.indexOf("(") + 1, result.lectureTime.indexOf("(") + 2);
        if(dow === '7') {dow = '0';}
        const dayDiff:number = endDate.diff(startDate, "day");

        for (let i:number=0; i <= dayDiff; i++) {
            if(startDate.add(i, "day").get("day") + "" === dow) {
                let week:string = "";
                switch (startDate.add(i, "day").get("day")) {
                    case 1:week = "월";break;
                    case 2:week = "화";break;
                    case 3:week = "수";break;
                    case 4:week = "목";break;
                    case 5:week = "금";break;
                    case 6:week = "토";break;
                    default: week = "일";break;
                }
                let date:string = startDate.add(i, "day").format("MM/DD") + "(" + week + ")";
                setLectureScheduleDateArr(lectureScheduleDateArr => [...lectureScheduleDateArr, date]);
            }
        }
    }

    useEffect(() => {
        const lectureDetail = async () => {
            await axios({
                method: "GET",
                url: '/lecture/lectureDetail',
                params: {lectureNo: lectureNo}
            }).then((res):void => {
                setLectureDetail(res.data.data);
                onActiveArrangement(res.data.data);
            }).catch((err):void => {
                console.log(err.message);
            });
        }
        lectureDetail().then();
    }, [])

    return (
        <Styled.LectureDetailView>
            <div className="header-navigation">
                <HeaderNavigation />
            </div>

            <div className="lt-detail-main">
                <div className="lt-detail-content-box">
                    <div className="detail-content" dangerouslySetInnerHTML={{ __html : sanitizer(`${lectureDetail.lectureDescription}`) }} />
                    <div className="detail-schedule">
                        <div className="detail-section-title">
                            강의 일정
                        </div>
                        <div className="detail-section-item">
                            <ul>
                                {lectureScheduleArr.map((item, idx) => (
                                    <div className="schedule-item" key={idx}>
                                        <div className="schedule-date">
                                            {lectureScheduleDateArr[idx]}
                                        </div>
                                        <li key={idx}>
                                            <div className="schedule-text">
                                                {item}
                                            </div>
                                        </li>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="detail-materialsAndSignificant">
                        <div className="detail-section-title">
                            준비물 및 특이사항
                        </div>
                        <div className="detail-section-item">
                            <ul>
                                {materialsAndSignificantArr.map((item, idx) => (
                                    <li key={idx}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="detail-notice">
                        <div className="detail-section-title">
                            유의사항
                        </div>
                        <div className="detail-section-item">
                            <ul>
                                {noticeArr.map((item, idx) => (
                                    <li key={idx}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="lt-detail-info-box">
                    <div className="detail-info">
                        <div className="info-main">

                            <div className="info-head">
                                <div className="head-top">
                                    <div className="detail-state" style={
                                        lectureDetail.lectureStateNo === 1 ? {backgroundColor: "slategray", color: 'white'} :
                                            lectureDetail.lectureStateNo === 2 ? {backgroundColor: "greenyellow", color: 'black'} :
                                                lectureDetail.lectureStateNo === 3 ? {backgroundColor: "slategray", color: 'black'} :
                                                    lectureDetail.lectureStateNo === 4 ? {backgroundColor: "black", color: 'white'} :
                                                        lectureDetail.lectureStateNo === 5 || 6 ? {backgroundColor: "red", color: 'black'} : {}}>
                                        {
                                            lectureDetail.lectureStateNo === 1 ? '접수예정' :
                                                lectureDetail.lectureStateNo === 2 ? '접수중' :
                                                    lectureDetail.lectureStateNo === 3 ? '대기접수' :
                                                        lectureDetail.lectureStateNo === 4 ? '접수마감' :
                                                            lectureDetail.lectureStateNo === 5 ? '접수불가' : '강의종료'
                                        }
                                    </div>
                                    <div className="detail-division">
                                        {lectureDetail.lectureDivision}
                                    </div>
                                </div>
                                <div className="head-bot">
                                    <div className="detail-thumbnail">
                                        <img src={lectureDetail.lectureThumbnail} alt="썸네일 이미지" />
                                    </div>
                                    <div className="detail-title">
                                        {lectureDetail.lectureTitle}
                                    </div>
                                </div>
                            </div>
                            <div className="info-body">
                                <div className="dl detail-institution">
                                    <div className="dt">지점</div>
                                    <div className="dd">{lectureDetail.lectureInstitution}</div>
                                </div>
                                <div className="dl detail-division">
                                    <div className="dt">강좌구분</div>
                                    <div className="dd">{lectureDetail.lectureDivision}</div>
                                </div>
                                <div className="dl detail-teacher">
                                    <div className="dt">강사명</div>
                                    <div className="dd">{lectureDetail.lectureTeacher}</div>
                                </div>
                                <div className="dl detail-period">
                                    <div className="dt">강의기간</div>
                                    <div className="dd">{lectureDetail.lecturePeriod}</div>
                                </div>
                                <div className="dl detail-time">
                                    <div className="dt">강의시간</div>
                                    <div className="dd">
                                        {lectureDetail.lectureTime.substring(0, 12)}
                                        {
                                            lectureDetail.lectureTime.substring(13, 14) === '1' ? '(월)' :
                                                lectureDetail.lectureTime.substring(13, 14) === '2' ? '(화)' :
                                                    lectureDetail.lectureTime.substring(13, 14) === '3' ? '(수)' :
                                                        lectureDetail.lectureTime.substring(13, 14) === '4' ? '(목)' :
                                                            lectureDetail.lectureTime.substring(13, 14) === '5' ? '(금)' :
                                                                lectureDetail.lectureTime.substring(13, 14) === '6' ? '(토)' : '(일)'
                                        }
                                    </div>
                                </div>
                                <div className="dl detail-capacity">
                                    <div className="dt">강의횟수/정원</div>
                                    <div className="dd">
                                        {lectureDetail.lectureCount}회/{lectureDetail.lectureCapacity}명
                                    </div>
                                </div>
                                <div className="dl detail-room">
                                    <div className="dt">강의실</div>
                                    <div className="dd">{lectureDetail.lectureRoom}</div>
                                </div>
                                <div className="dl detail-fee">
                                    <div className="dt">수강료</div>
                                    <div className="dd">{lectureDetail.lectureFee.toLocaleString()}원</div>
                                </div>
                                <div className="dl detail-reception">
                                    <div className="dt">접수기간</div>
                                    <div className="dd">{lectureDetail.lectureReception}</div>
                                </div>
                                <div className="dl detail-contact">
                                    <div className="dt">문의처</div>
                                    <div className="dd">{lectureDetail.lectureContact}</div>
                                </div>
                            </div>
                        </div>
                        <div className="info-foot">
                            {
                                lectureDetail.lectureStateNo === 1 ?
                                    <button style={{backgroundColor: "gray"}}>접수 기간이 아닙니다.</button> :
                                    lectureDetail.lectureStateNo === 2 ? <button>수강 신청하기</button> :
                                        lectureDetail.lectureStateNo === 3 ? <button>인원이 다찼습니다</button> :
                                            lectureDetail.lectureStateNo === 4 ? <button>접수 종료</button> :
                                                lectureDetail.lectureStateNo === 5 ? <button>접수 불가</button> :
                                                    <button>강의 종료</button>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </Styled.LectureDetailView>
    )
}

export default LectureDetail;