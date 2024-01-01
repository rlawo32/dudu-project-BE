import HeaderNavigation from "../navigation/HeaderNavigation";
import axios from "axios";

import LectureMainCategoryView from "./lectureListComponent/LectureMainCategoryView";
import LectureSubCategoryView from "./lectureListComponent/LectureSubCategoryView";
import {useEffect, useState} from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock as clock} from "@fortawesome/free-regular-svg-icons";
import * as Styled from "./LectureList.style";

const LectureList = () => {

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

    const [mainCategoryNo, setMainCategoryNo] = useState<number>(0);
    const [subCategoryNo, setSubCategoryNo] = useState<number>(0);

    const paging:object = {
        mainCategoryNo: mainCategoryNo,
        subCategoryNo: subCategoryNo
    }

    useEffect(() => {
        const lectureList = async () => {
           await axios({
               method: "GET",
               url: '/lecture/lectureList',
               params: paging
           }).then((res):void => {
               console.log(res.data.data);
               setLectureList(res.data.data);
           }).catch((err):void => {
               console.log(err.message);
           });
        }

        lectureList().then();
    }, [mainCategoryNo, subCategoryNo])

    return (
        <Styled.LectureListView>
            <HeaderNavigation />

            <LectureMainCategoryView setMainCategoryNo={setMainCategoryNo}/>
            {
                mainCategoryNo !== 0 ?
                    <LectureSubCategoryView mainCategoryNo={mainCategoryNo} setSubCategoryNo={setSubCategoryNo}/>
                    :
                    <></>
            }

            <div className="lt-list-box">
                {lectureList.map((lectures) => {
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
            </div>

        </Styled.LectureListView>
    )
}

export default LectureList;