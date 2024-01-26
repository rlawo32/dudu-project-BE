import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const LectureEventDelete = () => {
    const navigate = useNavigate();

    const [eventList, setEventList] = useState<{
        lectureEventNo:number;
        lectureInstitutionNo:number;
        lectureEventType:string;
        lectureEventName:string;
        lectureEventDesc:string;
        lectureEventThumbnail:string;
        lectureEventImageName:string;
    }[]>([]);
    const [catalogList, setCatalogList] = useState<{
        lectureNo:number;
        lectureInstitution:string;
        lectureTitle:string;
        lectureTeacher:string;
    }[]>([]);

    const [eventPageNo, setEventPageNo] = useState<number>(0);
    const [eventTotalPage, setEventTotalPage] = useState<number>(0);
    const [catalogTitle, setCatalogTitle] = useState<string>("");

    const eventListPagination = ():any[] => {
        let result:any[] = [];
        for (let i:number=0; i<eventTotalPage; i++) {
            result.push(<li key={i} onClick={() => setEventPageNo(i)}>{i+1}</li>);
        }
        return result;
    }

    const catalogLectureViewHandler = (eventNo:number, eventTitle:string):void => {
        axios({
            method: "GET",
            url: "/lecture/lectureEventCatalog",
            params: {lectureEventNo: eventNo}
        }).then((res):void => {
            setCatalogList(res.data.data);
            setCatalogTitle(eventTitle);
        }).catch((err):void => {
            console.log(err.message);
        })
    }

    const catalogEventDeleteHandler = (eventNo:number, image:string):boolean => {
        if(window.confirm("정말 삭제하시겠습니까??") === true) {
            axios({
                method: "DELETE",
                url: "/lecture/lectureDeleteEvent",
                params: {lectureEventNo: eventNo,
                    type: "E", imageFileName: image}
            }).then((res):void => {
                window.location.reload();
            }).catch((err):void => {
                console.log(err.message);
            })
            return true;
        }else{
            return false;
        }
    }

    const catalogLectureDeleteHandler = (lectureNo:number):boolean => {
        if(window.confirm("정말 삭제하시겠습니까??") === true) {
            axios({
                method: "DELETE",
                url: "/lecture/lectureDeleteEventList",
                params: {lectureNo: lectureNo}
            }).then((res):void => {
                window.location.reload();
            }).catch((err):void => {
                console.log(err.message);
            })
            return true;
        }else{
            return false;
        }
    }

    useEffect(() => {
        const listData:object = {
            pageNo: eventPageNo,
            sortType: "",
            institutionNo: 0,
            lectureEventNo: 0
        }
        const eventList = async ():Promise<void> => {
            await axios({
                method: "POST",
                url: '/lecture/lectureEventAll',
                data: JSON.stringify(listData),
                headers: {'Content-type': 'application/json'}
            }).then((res):void => {
                setEventList(res.data.data.eventList);
                setEventTotalPage(res.data.data.totalPage);
            }).catch((err):void => {
                console.log(err.message);
            })
        }
        setTimeout(() => {eventList().then();}, 100);
    }, [eventPageNo]);

    return (
        <div className="ed-view">
            <div>이벤트리스트</div>
            {
                eventList.length > 0 ?
                    <div className="ed-list-view">
                        <table>
                            <thead>
                                <tr style={{height: "35px", fontWeight: "bold"}}>
                                    <td style={{width: "40px"}}>No.</td>
                                    <td style={{width: "60px"}}>이벤트번호</td>
                                    <td style={{width: "60px"}}>이벤트타입</td>
                                    <td style={{width: "150px"}}>이벤트제목</td>
                                    <td style={{width: "150px"}}>이벤트설명</td>
                                    <td style={{width: "50px"}}>선택</td>
                                </tr>
                            </thead>
                            <tbody>
                                {eventList.map((events, idx) => {
                                    return (
                                        <tr key={events.lectureEventNo} style={{height: "30px"}}>
                                            <td>{(idx+1) + (eventPageNo*10)}</td>
                                            <td>{events.lectureEventNo}</td>
                                            <td>{events.lectureEventType}</td>
                                            <td style={{cursor: "pointer"}}
                                                onClick={() => navigate("/lectureEventList/" + events.lectureEventNo,
                                                    { state: {institutionNo: events.lectureInstitutionNo, eventNo: events.lectureEventNo}})}>
                                                {events.lectureEventName}</td>
                                            <td>{events.lectureEventDesc}</td>
                                            <td>
                                                <span style={{cursor: "pointer"}}
                                                      onClick={() => catalogLectureViewHandler(events.lectureEventNo, events.lectureEventName)}>
                                                    목록
                                                </span>
                                                <span style={{margin: "0 5px"}}>/</span>
                                                <span style={{cursor: "pointer"}}
                                                      onClick={() => catalogEventDeleteHandler(events.lectureEventNo, events.lectureEventImageName)}>
                                                    X
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <div className="paging-view">
                            <ul>
                                {eventListPagination()}
                            </ul>
                        </div>
                    </div>
                    :
                    <div />
            }
            {catalogList.length > 0 ?
                <div className="ed-catalog-box">
                    <div style={{margin: "10px 10px", fontWeight: "bold"}}>이벤트제목 : {catalogTitle}</div>
                    <table>
                        <thead>
                            <tr style={{height: "35px", fontWeight: "bold"}}>
                                <td style={{width: "40px"}}>No.</td>
                                <td style={{width: "60px"}}>강의번호</td>
                                <td style={{width: "200px"}}>강의제목</td>
                                <td style={{width: "80px"}}>강사명</td>
                                <td style={{width: "40px"}}>선택</td>
                            </tr>
                        </thead>
                        <tbody>
                            {catalogList.map((item, idx) => {
                                return (
                                    <tr key={idx} style={{height: "30px"}}>
                                        <td>{(idx+1) + (eventPageNo*10)}</td>
                                        <td>{item.lectureNo}</td>
                                        <td style={{cursor: "pointer"}}
                                            onClick={() => navigate("/lectureDetail/" + item.lectureNo,
                                                { state: {lectureNo: item.lectureNo}})}>
                                            {item.lectureTitle}</td>
                                        <td>{item.lectureTeacher}</td>
                                        <td style={{cursor: "pointer"}}
                                            onClick={() => catalogLectureDeleteHandler(item.lectureNo)}>X</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                :
                <div/>
            }
        </div>
    )
}

export default LectureEventDelete;