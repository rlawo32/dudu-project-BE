import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";
import dompurify from "dompurify";

import * as Styled from "./LectureDetail.style";
import HeaderNavigation from "../navigation/HeaderNavigation";

const LectureDetail = () => {
    const location = useLocation();
    const lectureNo:number = location.state.lectureNo;

    const sanitizer = dompurify.sanitize;
    // 스크립트를 활용한 토큰 탈취 처럼 취약점을 노려서 javascript와 HTML로 악의적 코드를 웹 브라우저에 심어,
    // 사용자 접속시 그 악성코드가 실행되는 것을 크로스 사이드 스크립트, 보안을 위해 추가

    const [lectureDetail, setLectureDetail] = useState<{
        lectureNo:number; lectureState:string; lectureTitle:string; lectureInstitution:string;
        lectureDivision:string; lectureTeacher:string; lecturePeriod:string; lectureTime:string;
        lectureCount:number; lectureCapacity:number; lectureRoom:string; lectureFee:number;
        lectureReception:string; lectureContact:string; lectureDescription:string;
    }>({
        lectureNo: 0, lectureState: '', lectureTitle: '', lectureInstitution: '',
        lectureDivision: '', lectureTeacher: '', lecturePeriod: '', lectureTime: '',
        lectureCount: 0, lectureCapacity: 0, lectureRoom: '', lectureFee: 0,
        lectureReception: '', lectureContact: '', lectureDescription: ''
    });

    useEffect(() => {
        const lectureDetail = async () => {
            await axios({
                method: "GET",
                url: '/lecture/lectureDetail',
                params: {lectureNo: lectureNo}
            }).then((res):void => {
                setLectureDetail(res.data.data);
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
                <div className="lt-detail-content">
                    <div className="detail-content" dangerouslySetInnerHTML={{ __html : sanitizer(`${lectureDetail.lectureDescription}`) }} />
                </div>
                <div className="lt-detail-info">
                    1
                </div>
            </div>

        </Styled.LectureDetailView>
    )
}

export default LectureDetail;