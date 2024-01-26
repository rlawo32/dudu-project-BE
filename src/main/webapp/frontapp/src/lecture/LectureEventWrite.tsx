import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import HeaderNavigation from "../navigation/HeaderNavigation";
import LectureEventDelete from "./lectureEventWriteComponent/LectureEventDelete";
import LectureEventMain from "./lectureEventWriteComponent/LectureEventMain";

import * as Styled from "./LectureEventWrite.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark as attachDelete} from "@fortawesome/free-solid-svg-icons";

const LectureRoomWrite = () => {
    const navigate = useNavigate();

    const [institutionList, setInstitutionList] = useState<{
        institutionNo:number;
        institutionName:string;
        institutionContact:string;
    }[]>([]);
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
    const [lectureList, setLectureList] = useState<{
        lectureNo:number;
        lectureInstitution:string;
        lectureTitle:string;
        lectureTeacher:string;
    }[]>([]);
    const [eventList, setEventList] = useState<{
        lectureEventNo:number;
        lectureInstitutionNo:number;
        lectureEventType:string;
        lectureEventName:string;
        lectureEventDesc:string;
        lectureEventThumbnail:string;
        lectureEventImageName:string;
    }[]>([]);

    const [lecturePageNo, setLecturePageNo] = useState<number>(0);
    const [lectureTotalPage, setLectureTotalPage] = useState<number>(0);

    const [institutionNo, setInstitutionNo] = useState<string>("1");
    const [mainCategoryNo, setMainCategoryNo] = useState<string>("0");
    const [subCategoryNo, setSubCategoryNo] = useState<string>("0");

    const [lectureEventNo, setLectureEventNo] = useState<string>("0");
    const [lectureEventType, setLectureEventType] = useState<string>("");
    const [lectureEventName, setLectureEventName] = useState<string>("");
    const [lectureEventDesc, setLectureEventDesc] = useState<string>("");
    const [eventThumbnailName, setEventThumbnailName] = useState<string>("");
    const [eventThumbnailUrl, setEventThumbnailUrl] = useState<string>("");
    const [lectureEventThumbnail, setLectureEventThumbnail] = useState<{
        imgType:string;
        imgName:string;
        imgUrl:string;
        imgSize:number;
    }[]>([]);
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

    const selectEventTypeView = ():any[] => {
        const selectArr:{key:string;value:string;}[] = [{key:"", value:"이벤트선택"}, {key:"M", value:"메인이벤트"}, {key:"L", value:"강좌이벤트"}];
        let result:any[] = [];
        for (let i:number=0; i<selectArr.length; i++) {
            result.push(<option key={i} value={selectArr[i].key}>{selectArr[i].value}</option>);
        }
        return result;
    }

    const selectEventListView = ():any[] => {
        let result:any[] = [];
        for (let i:number=0; i<=eventList.length; i++) {
            if(i === 0) {
                result.push(<option key={i} value={"0"}>새로 생성</option>);
            } else {
                result.push(<option key={i} value={eventList[i-1].lectureEventNo}>{eventList[i-1].lectureEventName}</option>);
            }
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
                const imgFileType:string = "E";
                const imgFileName:string = res.data.data.imgName;
                const imgFileUrl:string = res.data.data.imgUrl;
                setEventThumbnailName(imgFileName);
                setEventThumbnailUrl(imgFileUrl);

                setLectureEventThumbnail([{
                    imgType: imgFileType,
                    imgName: imgFileName,
                    imgUrl: imgFileUrl,
                    imgSize: file[0].size
                }]);
            }).catch((err):void => {
                console.log(err.message);
            })
        }
    }

    const deleteEventThumbnailHandler = (thumbnailName:string, deleteType:string):void => {
        setEventThumbnailName("");
        setEventThumbnailUrl("");
        setLectureEventThumbnail([]);

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

    const insertLectureEventHandler = ():void => {
        const eventData:object = {
            lectureEventNo: lectureEventNo,
            institutionNo: institutionNo,
            lectureEventType: lectureEventType,
            lectureEventName: lectureEventName,
            lectureEventDesc: lectureEventDesc,
            lectureEventList: eventLectureSelectArr,
            lectureEventThumbnail: lectureEventThumbnail,
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
            }).catch((err):void => {
                console.log(err.message);
            })
            const listData:object = {
                pageNo: -1,
                sortType: "",
                institutionNo: 0,
                lectureEventNo: 0
            }
            await axios({
                method: "POST",
                url: '/lecture/lectureEventAll',
                data: JSON.stringify(listData),
                headers: {'Content-type': 'application/json'}
            }).then((res):void => {
                setEventList(res.data.data.eventList);
            }).catch((err):void => {
                console.log(err.message);
            })
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
            }).catch((err):void => {
                console.log(err.message);
            })
        }
        if(mainCategoryNo !== "0") {
            setTimeout(() => {subCategoryList().then();}, 100);
        } else {
            setSubCategoryNo("0");
            setLectureSubCategoryList([]);
        }
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
        <Styled.LectureEventWriteView>
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
                            onChange={(e) => setMainCategoryNo(e.target.value)}
                        >
                            <option key={"0"} value={"0"}>전체</option>
                            {lectureMainCategoryList.map((option) => (
                                <option key={option.lectureMainCategoryNo} value={option.lectureMainCategoryNo}>
                                    {option.lectureMainCategoryName}
                                </option>
                            ))}
                        </select>
                        <select
                            onChange={(e) => setSubCategoryNo(e.target.value)}
                        >
                            <option key={"0"} value={"0"}>전체</option>
                            {lectureSubCategoryList.map((option) => (
                                <option key={option.lectureSubCategoryNo} value={option.lectureSubCategoryNo}>
                                    {option.lectureSubCategoryName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="ew-list-view">
                        {
                            lectureList.length > 0 ?
                                <div className="ew-list">
                                    <table>
                                        <thead>
                                            <tr style={{height: "35px", fontWeight: "bold"}}>
                                                <td style={{width: "40px"}}>No.</td>
                                                <td style={{width: "40px"}}>선택</td>
                                                <td style={{width: "60px"}}>강의번호</td>
                                                <td style={{width: "100px"}}>기관명</td>
                                                <td style={{width: "150px"}}>강의제목</td>
                                                <td style={{width: "60px"}}>강사명</td>
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
                    </div>
                    <div className="ew-list-insert">
                        {
                            eventLectureSelectArr.length > 0 ?
                                <div className="insert-list-view">
                                    <div>- 등록할 강좌</div>
                                    <div className="insert-list">
                                        <table>
                                            <thead>
                                                <tr style={{height: "35px", fontWeight: "bold"}}>
                                                    <td style={{width: "40px"}}>No.</td>
                                                    <td style={{width: "60px"}}>강의번호</td>
                                                    <td style={{width: "100px"}}>기관명</td>
                                                    <td style={{width: "200px"}}>강의제목</td>
                                                    <td style={{width: "60px"}}>강사명</td>
                                                    <td style={{width: "40px"}}>선택</td>
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
                                    <div className="insert-submit">
                                        {
                                            lectureEventNo === '0' ?
                                                <div>이벤트 생성</div>
                                                :
                                                <div>기존 이벤트에 추가</div>
                                        }
                                        <select onChange={(e) => setLectureEventNo(e.target.value)}>
                                            {selectEventListView()}
                                        </select>
                                        {
                                            lectureEventNo === '0' ?
                                                <span>
                                                    <input type="text" onChange={(e) => setLectureEventName(e.target.value)} placeholder="이벤트이름" />
                                                    <input type="text" onChange={(e) => setLectureEventDesc(e.target.value)} placeholder="이벤트설명" />
                                                    <select onChange={(e) => setLectureEventType(e.target.value)}>
                                                        {selectEventTypeView()}
                                                    </select>
                                                </span>
                                                :
                                                <span />
                                        }
                                        <button style={{marginLeft: "10px"}} onClick={() => insertLectureEventHandler()}>이벤트 등록</button>
                                    </div>
                                </div>
                                :
                                <div />
                        }
                    </div>
                </div>
                <LectureEventDelete />
            </div>
            <LectureEventMain />

        </Styled.LectureEventWriteView>
    )
}

export default LectureRoomWrite;