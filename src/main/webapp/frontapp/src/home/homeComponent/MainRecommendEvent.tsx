import React, {useEffect, useState} from "react";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock as clockIcon} from "@fortawesome/free-regular-svg-icons";
import {useNavigate} from "react-router-dom";

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
        <div>
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
    )
}

export default MainRecommendEvent;