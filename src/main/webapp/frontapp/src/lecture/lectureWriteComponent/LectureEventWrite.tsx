import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import HeaderNavigation from "../../navigation/HeaderNavigation";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark as attachDelete} from "@fortawesome/free-solid-svg-icons";
import * as Styled from "./LectureEventWrite.style";

const LectureRoomWrite = () => {
    const navigate = useNavigate();

    const [institutionList, setInstitutionList] = useState<{
        institutionNo:number;
        institutionName:string;
        institutionContact:string;
    }[]>([{
        institutionNo: 0,
        institutionName: '',
        institutionContact: ''
    }]);
    const [lectureMainCategoryList, setLectureMainCategoryList] = useState<{
        lectureMainCategoryNo:number;
        lectureMainCategoryName:string;
        lectureMainCategoryDesc:string;
    }[]>([{
        lectureMainCategoryNo: 0,
        lectureMainCategoryName: '',
        lectureMainCategoryDesc: ''
    }]);
    const [lectureSubCategoryList, setLectureSubCategoryList] = useState<{
        lectureSubCategoryNo:number;
        lectureSubCategoryName:string;
        lectureSubCategoryDesc:string;
    }[]>([{
        lectureSubCategoryNo: 0,
        lectureSubCategoryName: '',
        lectureSubCategoryDesc: ''
    }]);
    const [lectureList, setLectureList] = useState<{
        lectureNo:number;
        lectureInstitution:string;
        lectureTitle:string;
        lectureTeacher:string;
    }[]>([{
        lectureNo: 0,
        lectureInstitution: '',
        lectureTitle: '',
        lectureTeacher: ''
    }]);
    const [eventList, setEventList] = useState<{
        lectureEventNo:number;
        lectureInstitutionNo:number;
        lectureEventType:string;
        lectureEventName:string;
        lectureEventDesc:string;
    }[]>([{
        lectureEventNo: 0,
        lectureInstitutionNo: 0,
        lectureEventType: '',
        lectureEventName: '',
        lectureEventDesc: ''
    }]);
    const [catalogList, setCatalogList] = useState<{
        lectureNo:number;
        lectureInstitution:string;
        lectureTitle:string;
        lectureTeacher:string;
    }[]>([]);

    const [lecturePageNo, setLecturePageNo] = useState<number>(0);
    const [eventPageNo, setEventPageNo] = useState<number>(0);
    const [lectureTotalPage, setLectureTotalPage] = useState<number>(0);
    const [eventTotalPage, setEventTotalPage] = useState<number>(0);

    const [institutionNo, setInstitutionNo] = useState<string>("1");
    const [mainCategoryNo, setMainCategoryNo] = useState<string>("0");
    const [subCategoryNo, setSubCategoryNo] = useState<string>("0");
    const [catalogTitle, setCatalogTitle] = useState<string>("");

    const [lectureEventType, setLectureEventType] = useState<string>("");
    const [lectureEventName, setLectureEventName] = useState<string>("");
    const [lectureEventDesc, setLectureEventDesc] = useState<string>("");
    const [eventThumbnailName, setEventThumbnailName] = useState<string>("");
    const [eventThumbnailUrl, setEventThumbnailUrl] = useState<string>("");
    const [eventLectureSelectArr, setEventLectureSelectArr] = useState<{
        lectureNo:number;
        lectureInstitution:string;
        lectureTitle:string;
        lectureTeacher:string;
    }[]>([]);

    const lectureListPagination = ():any[] => {
        let result:any[] = [];
        for (let i:number=0; i<lectureTotalPage; i++) {
            result.push(<li key={i} onClick={() => setLecturePageNo(i)}>{i+1}</li>);
        }
        return result;
    }

    const eventListPagination = ():any[] => {
        let result:any[] = [];
        for (let i:number=0; i<eventTotalPage; i++) {
            result.push(<li key={i} onClick={() => setEventPageNo(i)}>{i+1}</li>);
        }
        return result;
    }

    const selectEventTypeView = ():any[] => {
        const selectArr:{key:string;value:string;}[] = [{key:"", value:"이벤트선택"}, {key:"M", value:"메인이벤트"}, {key:"L", value:"강좌이벤트"}]
        let result:any[] = [];
        for (let i:number=0; i<selectArr.length; i++) {
            result.push(<option key={i} value={selectArr[i].key}>{selectArr[i].value}</option>);
        }
        return result;
    }

    const changeEventThumbnailHandler = async(file:FileList|null):Promise<void> => {
        if(file !== null) {
            const formData:FormData = new FormData();
            formData.append('files', file[0]);
            formData.append('type', 'E');

            await axios({
                method: "POST",
                url: "/lecture/lectureUploadImage",
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then((res):void => {
                const imgFileName:string = res.data.data.imgName;
                const imgFileUrl:string = res.data.data.imgUrl;
                setEventThumbnailName(imgFileName);
                setEventThumbnailUrl(imgFileUrl);
            }).catch((err):void => {
                console.log(err.message);
            })
        }
    }

    const deleteEventThumbnailHandler = (thumbnailName:string, deleteType:string):void => {
        setEventThumbnailName("");
        setEventThumbnailUrl("");

        const deleteObj:object = {
            imageFileName: thumbnailName,
            type: deleteType
        }
        axios({
            method: "DELETE",
            url: '/lecture/lectureDeleteImage',
            params: deleteObj
        }).then((res):void => {

        }).catch((err):void => {
            console.log(err.message);
        })
    }

    const addAndRemoveLectureHandler = (checked:boolean, lecture:any):void => {
        if(checked) {
            setEventLectureSelectArr((prevList) => [...prevList, {
                lectureNo:lecture.lectureNo,
                lectureInstitution:lecture.lectureInstitution,
                lectureTitle:lecture.lectureTitle,
                lectureTeacher:lecture.lectureTeacher
            }]);
        } else {
            setEventLectureSelectArr(eventLectureSelectArr.filter(
                (elArr) => elArr.lectureNo !== lecture.lectureNo));
        }
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

    const catalogEventDeleteHandler = (eventNo:number):boolean => {
        if(window.confirm("정말 삭제하시겠습니까??") == true) {
            axios({
                method: "DELETE",
                url: "/lecture/lectureDeleteEvent",
                params: {lectureEventNo: eventNo}
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
        if(window.confirm("정말 삭제하시겠습니까??") == true) {
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

    const insertLectureEventHandler = ():void => {
        const eventData:object = {
            institutionNo: institutionNo,
            lectureEventType: lectureEventType,
            lectureEventName: lectureEventName,
            lectureEventDesc: lectureEventDesc,
            lectureEventList: eventLectureSelectArr,
            lectureEventThumbnail: eventThumbnailUrl
        }
        axios({
            method: "POST",
            url: "/lecture/insertLectureEvent",
            data: JSON.stringify(eventData),
            headers: {'Content-type': 'application/json'}
        }).then((res):void => {
            navigate("/");
        }).catch((err):void => {
            console.log(err.message);
        })
    }

    useEffect(() => {
        const dataList = async ():Promise<void> => {
            await axios({
                method: "GET",
                url: "/lecture/lectureInstitutionList"
            }).then((res):void => {
                setInstitutionList(res.data.data);
                setInstitutionNo(res.data.data[0].institutionNo + "");
            }).catch((err):void => {
                console.log(err.message);
            })
            await axios({
                method: "GET",
                url: "/lecture/lectureMainCategoryList"
            }).then((res):void => {
                setLectureMainCategoryList(res.data.data);
                setLectureMainCategoryList((prevList) => [...prevList, {
                    lectureMainCategoryNo: 0,
                    lectureMainCategoryName: '전체',
                    lectureMainCategoryDesc: '*'
                }]);
                setMainCategoryNo(res.data.data[0].lectureMainCategoryNo + "");
            }).catch((err):void => {
                console.log(err.message);
            })
        }

        setTimeout(() => {dataList().then();}, 100);
    }, []);

    useEffect(() => {
        const listData:object = {
            pageNo: eventPageNo,
            sortType: "",
            institutionNo: institutionNo,
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

    useEffect(() => {
        const subCategoryList = async ():Promise<void> => {
            await axios({
                method: "GET",
                url: "/lecture/lectureSubCategoryList",
                params: {mainCategoryNo: mainCategoryNo}
            }).then((res):void => {
                if(mainCategoryNo !== "0") {
                    setLectureSubCategoryList(res.data.data);
                    setSubCategoryNo(res.data.data[0].lectureSubCategoryNo + "");
                } else {
                    setLectureSubCategoryList([]);
                    setSubCategoryNo("0");
                }
            }).catch((err):void => {
                console.log(err.message);
            })
        }
        setTimeout(() => {subCategoryList().then();}, 100);
    }, [mainCategoryNo]);

    useEffect(() => {
        const listData:object = {
            listType: "E",
            pageNo: lecturePageNo,
            sortType: "",
            institutionNo: institutionNo,
            mainCategoryNo: mainCategoryNo,
            subCategoryNo: subCategoryNo,
            searchText: "",
            searchDivision: [],
            searchState: []
        }
        const lectureList = async () => {
            await axios({
                method: "POST",
                url: '/lecture/lectureList',
                data: JSON.stringify(listData),
                headers: {'Content-type': 'application/json'}
            }).then((res):void => {
                setLectureList(res.data.data.lectureList);
                setLectureTotalPage(res.data.data.totalPage);
            }).catch((err):void => {
                console.log(err.message);
            });
        }
        setTimeout(() => {lectureList().then();}, 100);
    }, [institutionNo, mainCategoryNo, subCategoryNo, lecturePageNo]);

    return (
        <Styled.LectureEventWriteView style={{marginTop: "5%", marginLeft: "5%"}}>
            <HeaderNavigation />
            <div className="ew-main-view">
                <div className="ew-thumbnail">
                    <div>이벤트 메인 이미지 등록</div>
                    <input type="file" id="ew-attach-thumbnail" accept="image/jpg,image/png,image/jpeg"
                           onChange={(e) => changeEventThumbnailHandler(e.target.files)}/>
                    {
                        eventThumbnailUrl.length > 0 ?
                            <div style={{position: "relative", height: "150px", width: "150px"}}>
                                <img src={eventThumbnailUrl} alt="썸네일 이미지" style={{height: "150px", width: "150px"}} />
                                <FontAwesomeIcon icon={attachDelete} onClick={(e) =>
                                    deleteEventThumbnailHandler(eventThumbnailName, "E")}
                                                 style={{position: "absolute", top: "0", left: "150px", cursor: "pointer"}}/>
                            </div>
                            :
                            <div />
                    }
                </div>
                <div className="ew-lecture">
                    <div>강좌리스트</div>
                    <div className="ew-list-select">
                        <select
                            value={institutionNo}
                            onChange={(e) => setInstitutionNo(e.target.value)}
                        >
                            {institutionList.map((option) => (
                                <option key={option.institutionNo} value={option.institutionNo}>
                                    {option.institutionName}
                                </option>
                            ))}
                        </select>
                        <select
                            value={mainCategoryNo}
                            onChange={(e) => setMainCategoryNo(e.target.value)}
                        >
                            <option key={0} value={"0"}>
                                전체
                            </option>
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
                            <option key={0} value={"0"}>
                                전체
                            </option>
                            {lectureSubCategoryList.map((option) => (
                                <option key={option.lectureSubCategoryNo} value={option.lectureSubCategoryNo}>
                                    {option.lectureSubCategoryName}
                                </option>
                            ))}
                        </select>
                    </div>
                    {
                        lectureList.length > 0 ?
                            <div className="ew-list-view">
                                <table>
                                    <thead>
                                        <tr style={{height: "35px", fontWeight: "bold"}}>
                                            <td style={{width: "80px"}}>No.</td>
                                            <td style={{width: "80px"}}>선택</td>
                                            <td style={{width: "150px"}}>강의번호</td>
                                            <td style={{width: "150px"}}>기관명</td>
                                            <td style={{width: "350px"}}>강의제목</td>
                                            <td style={{width: "80px"}}>강사명</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {lectureList.map((lectures, idx) => {
                                        return (
                                            <tr key={lectures.lectureNo} style={{height: "30px"}}>
                                                <td>{(idx+1) + (lecturePageNo*10)}</td>
                                                <td>
                                                    <input type="checkbox" checked={eventLectureSelectArr.findIndex(
                                                        (item) => item.lectureNo === lectures.lectureNo) > -1 ? true : false}
                                                           onChange={({ target: { checked } }) =>
                                                               addAndRemoveLectureHandler(checked, lectures)}/>
                                                </td>
                                                <td>{lectures.lectureNo}</td>
                                                <td>{lectures.lectureInstitution}</td>
                                                <td style={{cursor: "pointer"}}
                                                    onClick={() => navigate("/lectureDetail/" + lectures.lectureNo,
                                                    { state: {lectureNo: lectures.lectureNo}})}>{lectures.lectureTitle}</td>
                                                <td>{lectures.lectureTeacher}</td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                                <div className="paging-view">
                                    <ul>
                                        {lectureListPagination()}
                                    </ul>
                                </div>
                            </div>
                            :
                            <div />
                    }
                    <div className="ew-list-write">
                        <div className="write-list">
                            {
                                eventLectureSelectArr.length > 0 ?
                                    <div>
                                        <div>- 등록할 강좌</div>
                                        <table>
                                            <thead>
                                                <tr style={{height: "35px", fontWeight: "bold"}}>
                                                    <td style={{width: "30px"}}>No.</td>
                                                    <td style={{width: "50px"}}>강의번호</td>
                                                    <td style={{width: "60px"}}>기관명</td>
                                                    <td style={{width: "200px"}}>강의제목</td>
                                                    <td style={{width: "50px"}}>강사명</td>
                                                    <td style={{width: "30px"}}>선택</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {eventLectureSelectArr.map((events, idx) => {
                                                    return (
                                                        <tr key={events.lectureNo} style={{height: "30px"}}>
                                                            <td>{idx+1}</td>
                                                            <td>{events.lectureNo}</td>
                                                            <td>{events.lectureInstitution}</td>
                                                            <td style={{cursor: "pointer"}}
                                                                onClick={() => navigate("/lectureDetail/" + events.lectureNo,
                                                                    { state: {lectureNo: events.lectureNo}})}>{events.lectureTitle}</td>
                                                            <td>{events.lectureTeacher}</td>
                                                            <td style={{cursor: "pointer"}}
                                                                onClick={() => setEventLectureSelectArr(eventLectureSelectArr.filter(
                                                                    (elArr) => elArr.lectureNo !== events.lectureNo))}>X</td>
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
                        <div className="write-insert">
                            <input type="text" onChange={(e) => setLectureEventName(e.target.value)} placeholder="이벤트이름" />
                            <input type="text" onChange={(e) => setLectureEventDesc(e.target.value)} placeholder="이벤트설명" />
                            <select onChange={(e) => setLectureEventType(e.target.value)}>
                                {selectEventTypeView()}
                            </select>
                            <button style={{marginLeft: "10px"}} onClick={() => insertLectureEventHandler()}>이벤트 등록</button>
                        </div>
                    </div>
                </div>
                <div className="ew-event">
                    <div>이벤트리스트</div>
                    {
                        eventList.length > 0 ?
                            <div className="ew-list-view">
                                <table>
                                    <thead>
                                        <tr style={{height: "35px", fontWeight: "bold"}}>
                                            <td style={{width: "80px"}}>No.</td>
                                            <td style={{width: "100px"}}>이벤트번호</td>
                                            <td style={{width: "100px"}}>이벤트타입</td>
                                            <td style={{width: "200px"}}>이벤트제목</td>
                                            <td style={{width: "200px"}}>이벤트설명</td>
                                            <td style={{width: "80px"}}>선택</td>
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
                                                              onClick={() => catalogEventDeleteHandler(events.lectureEventNo)}>
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
                    <div className="ew-catalog-box">
                        {catalogList.length > 0 ?
                            <div>
                                <div style={{margin: "10px 10px", fontWeight: "bold"}}>{catalogTitle}</div>
                                <table>
                                    <thead>
                                        <tr style={{height: "35px", fontWeight: "bold"}}>
                                            <td style={{width: "50px"}}>No.</td>
                                            <td style={{width: "70px"}}>강의번호</td>
                                            <td style={{width: "200px"}}>강의제목</td>
                                            <td style={{width: "80px"}}>강사명</td>
                                            <td style={{width: "50px"}}>선택</td>
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
                </div>
            </div>
            <div className="ew-sub-view">

            </div>
        </Styled.LectureEventWriteView>
    )
}

export default LectureRoomWrite;