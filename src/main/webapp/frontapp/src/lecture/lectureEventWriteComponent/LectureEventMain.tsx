import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const LectureEventMain = () => {
    const navigate = useNavigate();

    const [lectureMainCategoryList, setLectureMainCategoryList] = useState<{
        lectureMainCategoryNo:number;
        lectureMainCategoryName:string;
        lectureMainCategoryDesc:string;
    }[]>([]);
    const [lectureSubCategoryList, setLectureSubCategoryList] = useState<{
        lectureSubCategoryNo:number;
        lectureSubCategoryName:string;
        lectureSubCategoryDesc:string;
    }[]>([]);
    const [mainEventList, setMainEventList] = useState<{
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

    const [eventCategorySelectArr, setEventCategorySelectArr] = useState<{
        lectureNo:number;
        lectureInstitution:string;
        lectureTitle:string;
        lectureTeacher:string;
        lectureEventType:string;
    }[]>([]);
    const [eventCategoryRemoveArr, setEventCategoryRemoveArr] = useState<{
        lectureNo:number;
        lectureInstitution:string;
        lectureTitle:string;
        lectureTeacher:string;
        lectureEventType:string;
    }[]>([]);
    const [eventRecommendSelectArr, setEventRecommendSelectArr] = useState<{
        lectureNo:number;
        lectureInstitution:string;
        lectureTitle:string;
        lectureTeacher:string;
        lectureEventType:string;
    }[]>([]);
    const [eventRecommendRemoveArr, setEventRecommendRemoveArr] = useState<{
        lectureNo:number;
        lectureInstitution:string;
        lectureTitle:string;
        lectureTeacher:string;
        lectureEventType:string;
    }[]>([]);

    const [mainEventPageNo, setMainEventPageNo] = useState<number>(0);
    const [mainEventTotalPage, setMainEventTotalPage] = useState<number>(0);

    const [mainCategoryNo, setMainCategoryNo] = useState<string>("1");
    const [subCategoryNo, setSubCategoryNo] = useState<string>("1");

    const mainEventListPagination = ():any[] => {
        let result:any[] = [];
        for (let i:number=0; i<mainEventTotalPage; i++) {
            result.push(<li key={i} onClick={() => setMainEventPageNo(i)}>{i+1}</li>);
        }
        return result;
    }

    const addAndRemoveCategoryEventHandler = (checked:boolean, item:any):void => {
        if(checked) {
            if(eventCategorySelectArr.length !== 2) {
                setEventCategorySelectArr((prevList) => [...prevList, {
                    lectureNo:item.lectureNo,
                    lectureInstitution:item.lectureInstitution,
                    lectureTitle:item.lectureTitle,
                    lectureTeacher:item.lectureTeacher,
                    lectureEventType:item.lectureEventType
                }]);
            } else {
                alert('추가가 더이상 불가능합니다.');
            }
        } else {
            setEventCategorySelectArr(eventCategorySelectArr.filter(
                (elArr) => elArr.lectureNo !== item.lectureNo));
        }
    }

    const deleteCategoryEventHandler = (item:any):void => {
        setEventCategorySelectArr(eventCategorySelectArr.filter(
            (ecArr) => ecArr.lectureNo !== item.lectureNo));
        setEventCategoryRemoveArr((prevList) => [...prevList, {
            lectureNo:item.lectureNo,
            lectureInstitution:item.lectureInstitution,
            lectureTitle:item.lectureTitle,
            lectureTeacher:item.lectureTeacher,
            lectureEventType:item.lectureEventType
        }]);
    }

    const cancelCategoryRemoveHandler = (item:any):void => {
        setEventCategorySelectArr((prevList) => [...prevList, {
            lectureNo:item.lectureNo,
            lectureInstitution:item.lectureInstitution,
            lectureTitle:item.lectureTitle,
            lectureTeacher:item.lectureTeacher,
            lectureEventType:item.lectureEventType
        }])
        setEventCategoryRemoveArr(eventCategoryRemoveArr.filter(
            (erArr) => erArr.lectureNo !== item.lectureNo));
    }

    const insertCategoryEventHandler = ():void => {
        const eventData:object = {
            lectureEventType: "C",
            lectureEventList: eventCategorySelectArr,
            lectureEventRemoveList: eventCategoryRemoveArr
        }
        axios({
            method: "POST",
            url: "/lecture/insertMainEvent",
            data: JSON.stringify(eventData),
            headers: {'Content-type': 'application/json'}
        }).then((res):void => {
            window.location.reload();
        }).catch((err):void => {
            console.log(err.message);
        })
    }

    const addAndRemoveRecommendEventHandler = (checked:boolean, item:any):void => {
        if(checked) {
            if(eventRecommendSelectArr.length !== 4) {
                setEventRecommendSelectArr((prevList) => [...prevList, {
                    lectureNo:item.lectureNo,
                    lectureInstitution:item.lectureInstitution,
                    lectureTitle:item.lectureTitle,
                    lectureTeacher:item.lectureTeacher,
                    lectureEventType:item.lectureEventType
                }]);
            } else {
                alert('추가가 더이상 불가능합니다.');
            }
        } else {
            setEventRecommendSelectArr(eventRecommendSelectArr.filter(
                (elArr) => elArr.lectureNo !== item.lectureNo));
        }
    }

    const deleteRecommendEventHandler = (item:any):void => {
        setEventRecommendSelectArr(eventRecommendSelectArr.filter(
            (ecArr) => ecArr.lectureNo !== item.lectureNo));
        setEventRecommendRemoveArr((prevList) => [...prevList, {
            lectureNo:item.lectureNo,
            lectureInstitution:item.lectureInstitution,
            lectureTitle:item.lectureTitle,
            lectureTeacher:item.lectureTeacher,
            lectureEventType:item.lectureEventType
        }]);
    }

    const cancelRecommendRemoveHandler = (item:any):void => {
        setEventRecommendSelectArr((prevList) => [...prevList, {
            lectureNo:item.lectureNo,
            lectureInstitution:item.lectureInstitution,
            lectureTitle:item.lectureTitle,
            lectureTeacher:item.lectureTeacher,
            lectureEventType:item.lectureEventType
        }])
        setEventRecommendRemoveArr(eventRecommendRemoveArr.filter(
            (erArr) => erArr.lectureNo !== item.lectureNo));
    }

    const insertRecommendEventHandler = ():void => {
        const eventData:object = {
            lectureEventType: "R",
            lectureEventList: eventRecommendSelectArr,
            lectureEventRemoveList: eventRecommendRemoveArr
        }
        axios({
            method: "POST",
            url: "/lecture/insertMainEvent",
            data: JSON.stringify(eventData),
            headers: {'Content-type': 'application/json'}
        }).then((res):void => {
            window.location.reload();
        }).catch((err):void => {
            console.log(err.message);
        })
    }

    useEffect(() => {
        const dataList = async ():Promise<void> => {
            await axios({
                method: "GET",
                url: "/lecture/lectureMainCategoryList"
            }).then((res):void => {
                setLectureMainCategoryList(res.data.data);
                setMainCategoryNo(res.data.data[0].lectureMainCategoryNo + "");
            }).catch((err):void => {
                console.log(err.message);
            })
            const listData:object = {
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
            }).then((res):void => {
                setEventRecommendSelectArr(res.data.data.eventList);
            }).catch((err):void => {
                console.log(err.message);
            });
        }
        setTimeout(() => {dataList().then();}, 100);
    }, []);

    useEffect(() => {
        const subCategoryList = async ():Promise<void> => {
            await axios({
                method: "GET",
                url: "/lecture/lectureSubCategoryList",
                params: {mainCategoryNo: mainCategoryNo}
            }).then((res):void => {
                setLectureSubCategoryList(res.data.data);
                setSubCategoryNo(res.data.data[0].lectureSubCategoryNo + "");
            }).catch((err):void => {
                console.log(err.message);
            })
        }
        setTimeout(() => {subCategoryList().then();}, 200);
    }, [mainCategoryNo]);

    useEffect(() => {
        const listData:object = {
            listType: "A",
            pageNo: mainEventPageNo,
            sortType: "L",
            institutionNo: 0,
            mainCategoryNo: mainCategoryNo,
            subCategoryNo: subCategoryNo,
            searchText: "",
            searchDivision: [],
            searchState: []
        }
        const mainEventList = async () => {
            await axios({
                method: "POST",
                url: '/lecture/lectureEventType',
                data: JSON.stringify(listData),
                headers: {'Content-type': 'application/json'}
            }).then((res):void => {
                setMainEventList(res.data.data.eventList);
                setMainEventTotalPage(res.data.data.totalPage);
            }).catch((err):void => {
                console.log(err.message);
            });
        }
        setTimeout(() => {mainEventList().then();}, 300);
    }, [mainCategoryNo, subCategoryNo, mainEventPageNo]);

    useEffect(() => {
        const listData:object = {
            listType: "A",
            pageNo: mainEventPageNo,
            sortType: "C",
            institutionNo: 0,
            mainCategoryNo: mainCategoryNo,
            subCategoryNo: subCategoryNo,
            searchText: "",
            searchDivision: [],
            searchState: []
        }
        const mainEventList = async () => {
            await axios({
                method: "POST",
                url: '/lecture/lectureEventType',
                data: JSON.stringify(listData),
                headers: {'Content-type': 'application/json'}
            }).then((res):void => {
                setEventCategorySelectArr(res.data.data.eventList);
            }).catch((err):void => {
                console.log(err.message);
            });
        }
        setTimeout(() => {mainEventList().then();}, 300);
    }, [mainCategoryNo, subCategoryNo]);

    console.log(eventRecommendSelectArr)

    return (
        <div className="ew-sub-view">
            <div className="em-view">
                <div className="em-list-event-box">
                    <div className="em-select">
                        <select
                            value={mainCategoryNo}
                            onChange={(e) => setMainCategoryNo(e.target.value)}
                        >
                            {lectureMainCategoryList.map((option) => (
                                <option key={option.lectureMainCategoryNo} value={option.lectureMainCategoryNo}>
                                    {option.lectureMainCategoryName}
                                </option>
                            ))}
                        </select>
                        <select
                            value={subCategoryNo}
                            onChange={(e) => setSubCategoryNo(e.target.value)}
                        >
                            {lectureSubCategoryList.map((option) => (
                                <option key={option.lectureSubCategoryNo} value={option.lectureSubCategoryNo}>
                                    {option.lectureSubCategoryName}
                                </option>
                            ))}
                        </select>
                        <input type="text" placeholder={"검색어를 입력하세요"} />
                        <button>검색</button>
                    </div>
                    <div className="em-list-view">
                        {
                            mainEventList.length > 0 ?
                                <div className="em-list">
                                    <table>
                                        <thead>
                                        <tr>
                                            <td style={{width: "30px"}}>No.</td>
                                            <td style={{width: "80px"}}>추천 이벤트 선택</td>
                                            <td style={{width: "100px"}}>카테고리 이벤트 선택</td>
                                            <td style={{width: "60px"}}>강의번호</td>
                                            <td style={{width: "100px"}}>기관명</td>
                                            <td style={{width: "200px"}}>강의제목</td>
                                            <td style={{width: "50px"}}>강사명</td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {mainEventList.map((item, idx) => {
                                            return (
                                                <tr key={item.lectureNo}>
                                                    <td>{(idx+1) + (mainEventPageNo*10)}</td>
                                                    <td>
                                                        <input type="checkbox" checked={eventRecommendSelectArr.findIndex(
                                                            (res) => res.lectureNo === item.lectureNo) > -1 ? true : false}
                                                               onChange={({ target: { checked } }) =>
                                                                   addAndRemoveRecommendEventHandler(checked, item)}/>
                                                    </td>
                                                    <td>
                                                        <input type="checkbox" checked={eventCategorySelectArr.findIndex(
                                                            (res) => res.lectureNo === item.lectureNo) > -1 ? true : false}
                                                               onChange={({ target: { checked } }) =>
                                                                   addAndRemoveCategoryEventHandler(checked, item)}/>
                                                    </td>
                                                    <td>{item.lectureNo}</td>
                                                    <td>{item.lectureInstitution}</td>
                                                    <td style={{cursor: "pointer"}}
                                                        onClick={() => navigate("/lectureDetail/" + item.lectureNo,
                                                            { state: {lectureNo: item.lectureNo}})}>{item.lectureTitle}</td>
                                                    <td>{item.lectureTeacher}</td>
                                                </tr>
                                            )
                                        })}
                                        </tbody>
                                    </table>
                                    <div className="paging-view">
                                        <ul>
                                            {mainEventListPagination()}
                                        </ul>
                                    </div>
                                </div>
                                :
                                <div/>
                        }
                    </div>
                </div>
                <div className="em-category-event-box">
                    <div className="box-insert-list">
                        <div className="em-section-title">
                            카테고리 이벤트 추가 목록
                        </div>
                        <div className="em-box-view">
                            {
                                eventCategorySelectArr.length > 0 ?
                                    <div className="em-box">
                                        <table>
                                            <thead>
                                            <tr>
                                                <td style={{width: "30px"}}>No.</td>
                                                <td style={{width: "80px"}}>추천 이벤트 선택</td>
                                                <td style={{width: "50px"}}>강의번호</td>
                                                <td style={{width: "110px"}}>기관명</td>
                                                <td style={{width: "200px"}}>강의제목</td>
                                                <td style={{width: "50px"}}>강사명</td>
                                                <td style={{width: "30px"}}>선택</td>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {eventCategorySelectArr.map((item, idx) => {
                                                return (
                                                    <tr key={item.lectureNo}>
                                                        <td>{(idx+1) + (mainEventPageNo*10)}</td>
                                                        <td>
                                                            <input type="checkbox" checked={eventRecommendSelectArr.findIndex(
                                                                (res) => res.lectureNo === item.lectureNo) > -1 ? true : false}
                                                                   onChange={({ target: { checked } }) =>
                                                                       addAndRemoveRecommendEventHandler(checked, item)}/>
                                                        </td>
                                                        <td>{item.lectureNo}</td>
                                                        <td>{item.lectureInstitution}</td>
                                                        <td style={{cursor: "pointer"}}
                                                            onClick={() => navigate("/lectureDetail/" + item.lectureNo,
                                                                { state: {lectureNo: item.lectureNo}})}>{item.lectureTitle}</td>
                                                        <td>{item.lectureTeacher}</td>
                                                        <td style={{cursor: "pointer"}}
                                                            onClick={() => deleteCategoryEventHandler(item)}>삭제</td>
                                                    </tr>
                                                )
                                            })}
                                            </tbody>
                                        </table>
                                    </div>
                                    :
                                    <div />
                            }
                        </div>
                    </div>
                    {
                        eventCategoryRemoveArr.length > 0 ?
                            <div className="box-delete-list">
                                <div className="em-section-title">
                                    카테고리 이벤트 삭제 목록
                                </div>
                                <div className="em-box-view">
                                    <div className="em-box">
                                        <table>
                                            <thead>
                                            <tr>
                                                <td style={{width: "40px"}}>No.</td>
                                                <td style={{width: "60px"}}>강의번호</td>
                                                <td style={{width: "100px"}}>기관명</td>
                                                <td style={{width: "200px"}}>강의제목</td>
                                                <td style={{width: "60px"}}>강사명</td>
                                                <td style={{width: "40px"}}>선택</td>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {eventCategoryRemoveArr.map((item, idx) => {
                                                return (
                                                    <tr key={item.lectureNo}>
                                                        <td>{(idx+1) + (mainEventPageNo*10)}</td>
                                                        <td>{item.lectureNo}</td>
                                                        <td>{item.lectureInstitution}</td>
                                                        <td style={{cursor: "pointer"}}
                                                            onClick={() => navigate("/lectureDetail/" + item.lectureNo,
                                                                { state: {lectureNo: item.lectureNo}})}>{item.lectureTitle}</td>
                                                        <td>{item.lectureTeacher}</td>
                                                        <td style={{cursor: "pointer"}}
                                                            onClick={() => cancelCategoryRemoveHandler(item)}>취소</td>
                                                    </tr>
                                                )
                                            })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            :
                            <div />
                    }
                    {
                        eventCategorySelectArr.length > 0 || eventCategoryRemoveArr.length > 0 ?
                            <div>
                                <button onClick={() => window.location.reload()}>취소</button>
                                <button onClick={() => insertCategoryEventHandler()}>등록</button>
                            </div>
                            :
                            <div />
                    }
                </div>

                <div className="em-recommend-event-box">
                    <div className="em-section-title">
                        추천 이벤트 목록
                    </div>
                    <div className="em-box-view">
                        {
                            eventRecommendSelectArr.length > 0 ?
                                <div className="em-box">
                                    <table>
                                        <thead>
                                        <tr>
                                            <td style={{width: "40px"}}>No.</td>
                                            <td style={{width: "60px"}}>강의번호</td>
                                            <td style={{width: "100px"}}>기관명</td>
                                            <td style={{width: "250px"}}>강의제목</td>
                                            <td style={{width: "60px"}}>강사명</td>
                                            <td style={{width: "40px"}}>선택</td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {eventRecommendSelectArr.map((item, idx) => {
                                            return (
                                                <tr key={item.lectureNo}>
                                                    <td>{(idx+1) + (mainEventPageNo*10)}</td>
                                                    <td>{item.lectureNo}</td>
                                                    <td>{item.lectureInstitution}</td>
                                                    <td style={{cursor: "pointer"}}
                                                        onClick={() => navigate("/lectureDetail/" + item.lectureNo,
                                                            { state: {lectureNo: item.lectureNo}})}>{item.lectureTitle}</td>
                                                    <td>{item.lectureTeacher}</td>
                                                    <td style={{cursor: "pointer"}}
                                                        onClick={() => deleteRecommendEventHandler(item)}>삭제</td>
                                                </tr>
                                            )
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                                :
                                <div />
                        }
                    </div>
                    {
                        eventRecommendRemoveArr.length > 0 ?
                            <div className="box-delete-list">
                                <div className="em-section-title">
                                    추천 이벤트 삭제 목록
                                </div>
                                <div className="em-box-view">
                                    <div className="em-box">
                                        <table>
                                            <thead>
                                            <tr>
                                                <td style={{width: "40px"}}>No.</td>
                                                <td style={{width: "60px"}}>강의번호</td>
                                                <td style={{width: "100px"}}>기관명</td>
                                                <td style={{width: "200px"}}>강의제목</td>
                                                <td style={{width: "60px"}}>강사명</td>
                                                <td style={{width: "40px"}}>선택</td>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {eventRecommendRemoveArr.map((item, idx) => {
                                                return (
                                                    <tr key={item.lectureNo}>
                                                        <td>{(idx+1) + (mainEventPageNo*10)}</td>
                                                        <td>{item.lectureNo}</td>
                                                        <td>{item.lectureInstitution}</td>
                                                        <td style={{cursor: "pointer"}}
                                                            onClick={() => navigate("/lectureDetail/" + item.lectureNo,
                                                                { state: {lectureNo: item.lectureNo}})}>{item.lectureTitle}</td>
                                                        <td>{item.lectureTeacher}</td>
                                                        <td style={{cursor: "pointer"}}
                                                            onClick={() => cancelRecommendRemoveHandler(item)}>취소</td>
                                                    </tr>
                                                )
                                            })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            :
                            <div />
                    }
                    {
                        eventRecommendSelectArr.length > 0 || eventRecommendRemoveArr.length > 0 ?
                            <div>
                                <button onClick={() => window.location.reload()}>취소</button>
                                <button onClick={() => insertRecommendEventHandler()}>등록</button>
                            </div>
                            :
                            <div />
                    }
                </div>
            </div>
        </div>
    )
}

export default LectureEventMain;