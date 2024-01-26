import React, {useEffect, useRef, useState} from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import dompurify from "dompurify";

import HeaderNavigation from "../navigation/HeaderNavigation";
import FooterNavigation from "../navigation/FooterNavigation";

import * as Styled from "./LectureDetail.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpLong as topIcon, faChevronDown as arrow} from "@fortawesome/free-solid-svg-icons";

const LectureDetail = () => {
    const location = useLocation();
    const lectureNo:number = location.state.lectureNo;

    const sanitizer = dompurify.sanitize;
    // 스크립트를 활용한 토큰 탈취 처럼 취약점을 노려서 javascript와 HTML로 악의적 코드를 웹 브라우저에 심어,
    // 사용자 접속시 그 악성코드가 실행되는 것을 크로스 사이드 스크립트, 보안을 위해 추가

    const scheduleBox:any = useRef<any>();
    const scheduleArrow:any = useRef<any>();
    const materialsBox:any = useRef<any>();
    const materialsArrow:any = useRef<any>();
    const noticeBox:any = useRef<any>();
    const noticeArrow:any = useRef<any>();
    const remoteBtn:any = useRef<any>([]);
    const remoteBox:any = useRef<any>([]);

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

    const [isScheduleBoxShow, setIsScheduleBoxShow] = useState<boolean>(false);
    const [isMaterialsBoxShow, setIsMaterialsBoxShow] = useState<boolean>(false);
    const [isNoticeBoxShow, setIsNoticeBoxShow] = useState<boolean>(false);
    const [isRemoteSelect, setIsRemoteSelect] = useState<boolean>(false);

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
        setTimeout(() => {lectureDetail().then();}, 100);

        const scrollObserver = new IntersectionObserver((e) => {
            e.forEach((div, idx) => {
                if(div.isIntersecting) {
                    div.target.className += ' remote-active';
                } else {
                    div.target.className = div.target.className.replace(' remote-active', '');
                }
                setIsRemoteSelect(div.isIntersecting);
            })

        }, {threshold: 0.4});

        remoteBox.current.forEach((ref: any) => {
            scrollObserver.observe(ref);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(isScheduleBoxShow) {
            scheduleBox.current.className += " show-list";
            scheduleArrow.current.className += " show-list";
        } else {
            scheduleBox.current.className = scheduleBox.current.className.replace(' show-list', '');
            scheduleArrow.current.className = scheduleArrow.current.className.replace(' show-list', '');
        }
    }, [isScheduleBoxShow])

    useEffect(() => {
        if(isMaterialsBoxShow) {
            materialsBox.current.className += " show-list";
            materialsArrow.current.className += " show-list";
        } else {
            materialsBox.current.className = materialsBox.current.className.replace(' show-list', '');
            materialsArrow.current.className = materialsArrow.current.className.replace(' show-list', '');
        }
    }, [isMaterialsBoxShow])

    useEffect(() => {
        if(isNoticeBoxShow) {
            noticeBox.current.className += " show-list";
            noticeArrow.current.className += " show-list";
        } else {
            noticeBox.current.className = noticeBox.current.className.replace(' show-list', '');
            noticeArrow.current.className = noticeArrow.current.className.replace(' show-list', '');
        }
    }, [isNoticeBoxShow])

    useEffect(() => {
        for(let i:number=0; i<remoteBox.current.length; i++) {
            if(remoteBox.current[i].className === 'lt-detail-info-box remote-active') {
                remoteBtn.current[1].className = remoteBtn.current[1].className.replace(' remote-active', '');
                remoteBtn.current[0].className = remoteBtn.current[0].className.replace(' remote-active', '');
                remoteBtn.current[0].className += ' remote-active';
            } else if(remoteBox.current[i].className === 'lt-detail-content-box remote-active') {
                remoteBtn.current[0].className = remoteBtn.current[0].className.replace(' remote-active', '');
                remoteBtn.current[1].className = remoteBtn.current[1].className.replace(' remote-active', '');
                remoteBtn.current[1].className += ' remote-active';
            }
        }
    }, [isRemoteSelect])

    return (
        <Styled.LectureDetailView $noticeBoxH={1}>
            <div className="header-navigation">
                <HeaderNavigation />
            </div>
            <div className="lt-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <FontAwesomeIcon icon={topIcon} className="icon-custom" />
            </div>

            <div className="detail-responsive lt-detail-top">
                <img src={lectureDetail.lectureThumbnail} alt="썸네일 이미지" />
            </div>
            <div className="detail-responsive detail-remote">
                <div className="remote-detail-info"
                     ref={btn => (remoteBtn.current[0] = btn)}
                     onClick={() => {setIsRemoteSelect(!isRemoteSelect);
                         remoteBox.current[0].scrollIntoView({ behavior: "smooth", block: "start"});}}>
                    강좌정보
                </div>
                <div className="remote-detail-content"
                     ref={btn => (remoteBtn.current[1] = btn)}
                     onClick={() => {setIsRemoteSelect(!isRemoteSelect);
                         remoteBox.current[1].scrollIntoView({ behavior: "smooth", block: "start"});}}>
                    강좌소개
                </div>
            </div>
            <div className="lt-detail-main">
                <div className="lt-detail-content-box" ref={boxContent => (remoteBox.current[1] = boxContent)}>
                    <div className="detail-responsive section-title">강좌소개</div>
                    <div className="detail-content" dangerouslySetInnerHTML={{ __html : sanitizer(`${lectureDetail.lectureDescription}`) }} />
                    <div className="detail-schedule">
                        <div className="detail-section-title"
                             onClick={() => setIsScheduleBoxShow(!isScheduleBoxShow)}>
                            <div className="box-title">
                                강의 일정
                            </div>
                            <div className="detail-responsive box-arrow" ref={scheduleArrow}>
                                <FontAwesomeIcon icon={arrow} />
                            </div>
                        </div>
                        <div className="detail-section-item" ref={scheduleBox}>
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
                        <div className="detail-section-title"
                             onClick={() => setIsMaterialsBoxShow(!isMaterialsBoxShow)}>
                            <div className="box-title">
                                준비물 및 특이사항
                            </div>
                            <div className="detail-responsive box-arrow" ref={materialsArrow}>
                                <FontAwesomeIcon icon={arrow} />
                            </div>
                        </div>
                        <div className="detail-section-item" ref={materialsBox}>
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
                        <div className="detail-section-title"
                             onClick={() => setIsNoticeBoxShow(!isNoticeBoxShow)}>
                            <div className="box-title">
                                유의사항
                            </div>
                            <div className="detail-responsive box-arrow" ref={noticeArrow}>
                                <FontAwesomeIcon icon={arrow} />
                            </div>
                        </div>
                        <div className="detail-section-item" ref={noticeBox}>
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
                <div className="lt-detail-info-box" ref={boxContent => (remoteBox.current[0] = boxContent)}>
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
                                <div className="detail-responsive section-title">강좌정보</div>
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

            <div className="footer-navigation">
                <FooterNavigation />
            </div>
        </Styled.LectureDetailView>
    )
}

export default LectureDetail;