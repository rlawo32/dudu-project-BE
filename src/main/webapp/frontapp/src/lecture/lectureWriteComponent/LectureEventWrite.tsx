import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import HeaderNavigation from "../../navigation/HeaderNavigation";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark as attachDelete} from "@fortawesome/free-solid-svg-icons";

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

    const [institutionNo, setInstitutionNo] = useState<string>("1");
    const [mainCategoryNo, setMainCategoryNo] = useState<string>("0");
    const [subCategoryNo, setSubCategoryNo] = useState<string>("0");

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

    const listData:object = {
        institutionNo: institutionNo,
        mainCategoryNo: mainCategoryNo,
        subCategoryNo: subCategoryNo
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

    const insertLectureEventHandler = ():void => {
        const eventData:object = {
            institutionNo: institutionNo,
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
        dataList().then();
    }, [])

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
        subCategoryList().then();
    }, [mainCategoryNo])

    useEffect(() => {
        const lectureList = async () => {
            await axios({
                method: "GET",
                url: '/lecture/lectureList',
                params: listData
            }).then((res):void => {
                setLectureList(res.data.data);
            }).catch((err):void => {
                console.log(err.message);
            });
        }
        lectureList().then();
    }, [institutionNo, mainCategoryNo, subCategoryNo])

    return (
        <div style={{marginTop: "5%", marginLeft: "5%"}}>
            <HeaderNavigation />
            <div className="sc-thumbnail" >
                <input type="file" id="sc-attach-thumbnail" accept="image/jpg,image/png,image/jpeg"
                       onChange={(e) => changeEventThumbnailHandler(e.target.files)}/>
                {
                    eventThumbnailUrl.length > 0 ?
                        <div style={{position: "relative", height: "150px", width: "150px"}}>
                            <img src={eventThumbnailUrl} alt="썸네일 이미지" style={{height: "150px", width: "150px"}} />
                            <FontAwesomeIcon icon={attachDelete} onClick={(e) =>
                                deleteEventThumbnailHandler(eventThumbnailName, "E")}
                                             style={{position: "absolute", top: "0", left: "150px"}}/>
                        </div>
                        :
                        <div />
                }
            </div>
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

            {
                lectureList.length > 0 ?
                    <table>
                        <thead className="table-header">
                            <tr style={{height: "35px", fontWeight: "bold"}}>
                                <td style={{width: "80px"}}>선택</td>
                                <td style={{width: "100px"}}>강의번호</td>
                                <td style={{width: "150px"}}>기관명</td>
                                <td style={{width: "450px"}}>강의제목</td>
                                <td style={{width: "80px"}}>강사명</td>
                            </tr>
                        </thead>
                        <tbody id="tbody" className="font-list">
                        {lectureList.map((lectures) => {
                            return (
                                <tr key={lectures.lectureNo} style={{height: "30px"}}>
                                    <td>
                                        <input type="checkbox" value={lectures.lectureNo}
                                               onClick={() => setEventLectureSelectArr((prevList) => [...prevList, {
                                                   lectureNo:lectures.lectureNo,
                                                   lectureInstitution:lectures.lectureInstitution,
                                                   lectureTitle:lectures.lectureTitle,
                                                   lectureTeacher:lectures.lectureTeacher
                                               }])}/>
                                    </td>
                                    <td>{lectures.lectureNo}</td>
                                    <td>{lectures.lectureInstitution}</td>
                                    <td>{lectures.lectureTitle}</td>
                                    <td>{lectures.lectureTeacher}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    :
                    <div />
            }
            <div style={{marginTop: "50px"}}>
                <input type="text" onChange={(e) => setLectureEventName(e.target.value)} placeholder="이벤트이름" />
                <input type="text" onChange={(e) => setLectureEventDesc(e.target.value)} placeholder="이벤트설명" />
                <button onClick={() => insertLectureEventHandler()}>insert</button>
            </div>
            <div>
                {
                    eventLectureSelectArr.length > 0 ?
                        <table>
                            <thead className="table-header">
                            <tr style={{height: "35px", fontWeight: "bold"}}>
                                <td style={{width: "100px"}}>강의번호</td>
                                <td style={{width: "150px"}}>기관명</td>
                                <td style={{width: "450px"}}>강의제목</td>
                                <td style={{width: "80px"}}>강사명</td>
                            </tr>
                            </thead>
                            <tbody id="tbody" className="font-list">
                            {eventLectureSelectArr.map((events) => {
                                return (
                                    <tr key={events.lectureNo} style={{height: "30px"}}>
                                        <td>{events.lectureNo}</td>
                                        <td>{events.lectureInstitution}</td>
                                        <td>{events.lectureTitle}</td>
                                        <td>{events.lectureTeacher}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                        :
                        <div />
                }
            </div>
        </div>
    )
}

export default LectureRoomWrite;