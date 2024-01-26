import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import HeaderNavigation from "../navigation/HeaderNavigation";
import LectureRoomWrite from "./lectureWriteComponent/LectureRoomWrite";
import LectureSubCategoryWrite from "./lectureWriteComponent/LectureSubCategoryWrite";
import LectureQuillEditor from "./lectureWriteComponent/LectureQuillEditor";
import LectureItemAddition from "./lectureWriteComponent/LectureItemAddition";
import * as timeSelectBox from "./lectureWriteComponent/LectureTimeSelectBox";
import * as periodDatePicker from "./lectureWriteComponent/LecturePeriodDatePicker";

import UseLectureDataStore from "../stores/useLectureWriteDataStore";

import * as Styled from "./LectureWrite.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark as attachDelete, faPlus as imagePlus} from "@fortawesome/free-solid-svg-icons";

const LectureWrite = () => {
    const navigate = useNavigate();

    const [lectureTeacherList, setLectureTeacherList] = useState<{
        memberNo:string;
        memberName:string;
        memberPhone:string;
    }[]>([{
        memberNo: '',
        memberName: '',
        memberPhone: ''
    }]);
    const [institutionList, setInstitutionList] = useState<{
        institutionNo:string;
        institutionName:string;
        institutionContact:string;
    }[]>([{
        institutionNo: '',
        institutionName: '',
        institutionContact: ''
    }]);
    const [lectureRoomList, setLectureRoomList] = useState<{
        lectureRoomNo:string;
        lectureInstitutionNo:string;
        lectureRoomName:string;
        lectureRoomContact:string;
    }[]>([{
        lectureRoomNo: '',
        lectureInstitutionNo: '',
        lectureRoomName: '',
        lectureRoomContact: ''
    }]);
    const [lectureMainCategoryList, setLectureMainCategoryList] = useState<{
        lectureMainCategoryNo:string;
        lectureMainCategoryName:string;
        lectureMainCategoryDesc:string;
    }[]>([{
        lectureMainCategoryNo: '',
        lectureMainCategoryName: '',
        lectureMainCategoryDesc: ''
    }]);
    const [lectureSubCategoryList, setLectureSubCategoryList] = useState<{
        lectureSubCategoryNo:string;
        lectureMainCategoryNo:string;
        lectureSubCategoryName:string;
        lectureSubCategoryDesc:string;
        lectureSubCategoryThumbnail:string;
    }[]>([{
        lectureSubCategoryNo: '',
        lectureMainCategoryNo: '',
        lectureSubCategoryName: '',
        lectureSubCategoryDesc: '',
        lectureSubCategoryThumbnail: ''
    }]);

    const [lectureTeacher, setLectureTeacher] = useState<string>("");
    const [lectureTitle, setLectureTitle] = useState<string>("");
    const [lecturePeriod, setLecturePeriod] = useState<string>("");
    const [lectureTime, setLectureTime] = useState<string>("");
    const [lectureRoom, setLectureRoom] = useState<string>(institutionList[0].institutionNo);
    const [lectureCapacity, setLectureCapacity] = useState<number>(0);
    const [lectureFee, setLectureFee] = useState<number>(0);
    const [lectureReceptionPeriod, setLectureReceptionPeriod] = useState<string>("");
    const [lectureDescription, setLectureDescription] = useState<string>("");
    const [lectureInstitution, setLectureInstitution] = useState<string>("1");
    const [lectureMainCategory, setLectureMainCategory] = useState<string>("1");
    const [lectureSubCategory, setLectureSubCategory] = useState<string>("");

    const [thumbnailPreviewName, setThumbnailPreviewName] = useState<string>("");
    const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string>("");
    const [lectureThumbnail, setLectureThumbnail] = useState<{
        imgType:string;
        imgName:string;
        imgUrl:string;
        imgSize:number;
    }[]>([]);
    const [lectureImageArr, setLectureImageArr] = useState<{
        imgType:string;
        imgName:string;
        imgUrl:string;
        imgSize:number;
    }[]>([]);

    const {lecturePeriodData, lectureTimeData, lectureReceptionData,
        materialsAndSignificantData, lectureScheduleData,
        onChangeLectureSchedule, onChangeMaterialsAndSignificant} = UseLectureDataStore();

    const changeThumbnailHandler = async(file:FileList|null):Promise<void> => {
        if(file !== null) {
            const formData:FormData = new FormData();
            formData.append('files', file[0]);
            formData.append('type', 'T');

            await axios({
                method: "POST",
                url: "/lecture/lectureUploadImage",
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then((res):void => {
                const imgFileType:string = "T";
                const imgFileName:string = res.data.data.imgName;
                const imgFileUrl:string = res.data.data.imgUrl;

                setThumbnailPreviewName(imgFileName);
                setThumbnailPreviewUrl(imgFileUrl);

                setLectureThumbnail([{
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

    const deleteThumbnailHandler = (thumbnailName:string, deleteType:string):void => {
        setThumbnailPreviewName("");
        setThumbnailPreviewUrl("");
        setLectureThumbnail([]);

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

    const lectureWriteHandler = ():void => {
        let lectureSchedule:string = "";
        let materialsAndSignificant:string = "";
        for(let i:number=0; i<lectureScheduleData.length; i++) {
            if(i > 0) {
                lectureSchedule += "^*" + lectureScheduleData[i].content;
            } else {
                lectureSchedule += lectureScheduleData[i].content;
            }
        }
        for(let i:number=0; i<materialsAndSignificantData.length; i++) {
            if(i > 0) {
                materialsAndSignificant += "^*" + materialsAndSignificantData[i].content;
            } else {
                materialsAndSignificant += materialsAndSignificantData[i].content;
            }
        }
        const lectureData:object = {
            memberNo: lectureTeacher,
            lectureTitle: lectureTitle,
            lecturePeriod: lecturePeriod,
            lectureTime: lectureTime,
            lectureRoomNo: lectureRoom,
            lectureCapacity: lectureCapacity,
            lectureFee: lectureFee,
            lectureReception: lectureReceptionPeriod,
            lectureDescription: lectureDescription,
            institutionNo: lectureInstitution,
            mainCategoryNo: lectureMainCategory,
            subCategoryNo: lectureSubCategory,
            lectureImage: lectureImageArr,
            lectureThumbnail: lectureThumbnail,
            lectureSchedule: lectureSchedule,
            materialsAndSignificant: materialsAndSignificant,
        }
        axios({
            method: "POST",
            url: "/lecture/lectureWrite",
            data: JSON.stringify(lectureData),
            headers: {'Content-type': 'application/json'}
        }).then((res):void => {
            alert("작성이 완료되었습니다.");
            navigate("/");
        }).catch((err):void => {
            console.log(err.message);
        })
    }

    // lectureWriteDataList
    useEffect(() => {
        onChangeLectureSchedule([{id:0, content:''}]);
        onChangeMaterialsAndSignificant([{id:0, content:''}]);
        const selectDataList = async ():Promise<void> => {
            await axios({
                method: "GET",
                url: "/lecture/lectureTeacherList",
                params: {role:"A"}
            }).then((res):void => {
                setLectureTeacherList(res.data.data);
                setLectureTeacher(res.data.data[0].memberNo + "");
            }).catch((err):void => {
                console.log(err.message);
            })
            await axios({
                method: "GET",
                url: "/lecture/lectureInstitutionList"
            }).then((res):void => {
                setInstitutionList(res.data.data);
                setLectureInstitution(res.data.data[0].institutionNo + "");
            }).catch((err):void => {
                console.log(err.message);
            })
            await axios({
                method: "GET",
                url: "/lecture/lectureMainCategoryList"
            }).then((res):void => {
                setLectureMainCategoryList(res.data.data);
                setLectureMainCategory(res.data.data[0].lectureMainCategoryNo + "");
            }).catch((err):void => {
                console.log(err.message);
            })
        }
        setTimeout(() => {selectDataList().then();}, 100);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // lectureRoomList useEffect
    useEffect(() => {
        const selectLectureRoomList = async ():Promise<void> => {
            await axios({
                method: "GET",
                url: "/lecture/lectureRoomList",
                params: {institutionNo: lectureInstitution}
            }).then((res):void => {
                setLectureRoomList(res.data.data);
                setLectureRoom(res.data.data[0].lectureRoomNo + "");
            }).catch((err):void => {
                console.log(err.message);
            })
        }
        setTimeout(() => {selectLectureRoomList().then();}, 100);
    }, [lectureInstitution])

    // subCategoryList useEffect
    useEffect(() => {
        const selectLectureSubCategoryList = async ():Promise<void> => {
            await axios({
                method: "GET",
                url: "/lecture/lectureSubCategoryList",
                params: {mainCategoryNo: lectureMainCategory}
            }).then((res):void => {
                setLectureSubCategoryList(res.data.data);
                setLectureSubCategory(res.data.data[0].lectureSubCategoryNo + "");
            }).catch((err):void => {
                console.log(err.message);
            })
        }
        setTimeout(() => {selectLectureSubCategoryList().then();}, 100);
    }, [lectureMainCategory]);

    // datePicker useEffect
    useEffect(() => {
        setLecturePeriod(lecturePeriodData);
        setLectureTime(lectureTimeData);
        setLectureReceptionPeriod(lectureReceptionData);
    }, [lecturePeriodData, lectureTimeData, lectureReceptionData]);

    return (
        <Styled.LectureWriteView>
            <HeaderNavigation />

            <div className="input-view">
                <div className="lt-input-header">
                    <div className="header-left-view">
                        <div className="lt-section-select">
                            <div className="lt-category">
                                <div className="lt-section-title">
                                    카테고리 선택
                                </div>
                                <div className="lt-mainCategory">
                                    <div className="lt-select-title">
                                        연령구분
                                    </div>
                                    <select
                                        value={lectureMainCategory}
                                        onChange={(e) => setLectureMainCategory(e.target.value)}
                                        className="select-mainCategory"
                                    >
                                        {lectureMainCategoryList.map((option) => (
                                            <option key={option.lectureMainCategoryNo} value={option.lectureMainCategoryNo}>
                                                {option.lectureMainCategoryName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="lt-subCategory">
                                    <div className="lt-select-title">
                                        강좌구분
                                    </div>
                                    <select
                                        value={lectureSubCategory}
                                        onChange={(e) => setLectureSubCategory(e.target.value)}
                                        className="select-subCategory"
                                    >
                                        {lectureSubCategoryList.map((option) => (
                                            <option key={option.lectureSubCategoryNo} value={option.lectureSubCategoryNo}>
                                                {option.lectureSubCategoryName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="lt-position">
                                <div className="lt-section-title">
                                    장소 선택
                                </div>
                                <div className="lt-institution">
                                    <div className="lt-select-title">
                                        지점명
                                    </div>
                                    <select
                                        value={lectureInstitution}
                                        onChange={(e) => setLectureInstitution(e.target.value)}
                                        className="select-institution"
                                    >
                                        {institutionList.map((option) => (
                                            <option key={option.institutionNo} value={option.institutionNo}>
                                                {option.institutionName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="lt-room">
                                    <div className="lt-select-title">
                                        강의실
                                    </div>
                                    <select
                                        value={lectureRoom}
                                        onChange={(e) => setLectureRoom(e.target.value)}
                                        className="select-room"
                                    >
                                        {lectureRoomList.map((option) => (
                                            <option key={option.lectureRoomNo} value={option.lectureRoomNo}>
                                                {option.lectureRoomName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="lt-teacher">
                                <div className="lt-section-title">
                                    강사명
                                </div>
                                <div className="lt-select-title">
                                    강사명
                                </div>
                                <select
                                    value={lectureTeacher}
                                    onChange={(e) => setLectureTeacher(e.target.value)}
                                    className="select-teacher"
                                >
                                    {lectureTeacherList.map((option) => (
                                        <option key={option.memberNo} value={option.memberNo}>
                                            {option.memberName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="lt-name">
                            <div className="lt-section-title">
                                강좌명
                            </div>
                            <input type="text" onChange={(e) => setLectureTitle(e.target.value)}
                                   className="input-title" placeholder="강좌명" />
                        </div>
                    </div>
                    <div className="header-right-view">
                        <div className="lt-thumbnail">
                            <div className="lt-section-title">
                                대표 이미지 설정
                            </div>
                            <input type="file" id="attach-thumbnail" accept="image/jpg,image/png,image/jpeg"
                                   onChange={(e) => changeThumbnailHandler(e.target.files)}/>
                            {
                                thumbnailPreviewUrl.length > 0 ?
                                    <div className="attach-thumbnail">
                                        <img src={thumbnailPreviewUrl} alt="썸네일 이미지" className="thumbnail-image" />
                                        <FontAwesomeIcon icon={attachDelete} onClick={(e) =>
                                            deleteThumbnailHandler(thumbnailPreviewName, "T")} className="thumbnail-image-delete"/>
                                    </div>
                                    :
                                    <label htmlFor={"attach-thumbnail"}>
                                        <div className="attach-input">
                                            <FontAwesomeIcon icon={imagePlus} className="icon-custom" />
                                        </div>
                                    </label>
                            }
                        </div>
                    </div>
                </div>

                <div className="lt-period">
                    <div className="reception-datePicker">
                        <div className="lt-section-title">
                            접수기간 설정
                        </div>
                        <periodDatePicker.default type={"reception"} />
                    </div>
                    <div className="period-datePicker">
                        <div className="lt-section-title">
                            강의기간 설정
                        </div>
                        <periodDatePicker.default type={"period"} />
                    </div>
                    <div className="period-timeSelect">
                        <div className="lt-section-title">
                            강의시간 설정
                        </div>
                        <timeSelectBox.default />
                    </div>
                    <div className="lt-capacity">
                        <div className="lt-section-title">
                            인원
                        </div>
                        <input type="number" onChange={(e) => setLectureCapacity(e.target.valueAsNumber)}
                               className="input-capacity" value={lectureCapacity} step={1} />
                        <span style={{fontSize: "20px", fontWeight: "bold", marginLeft: "3px"}}>
                            명
                        </span>
                    </div>
                </div>

                <div className="lt-write-detail">
                    <div className="lt-write-content">
                        <div className="lt-section-title">
                            내용 작성
                        </div>
                        <div className="lt-description">
                            <LectureQuillEditor useType={"L"} content={lectureDescription} setContent={setLectureDescription}
                                                Image={lectureImageArr} setImage={setLectureImageArr}/>
                        </div>
                    </div>
                    <div className="lt-write-additional">
                        <div className="lt-write-schedule">
                            <div className="lt-section-title">
                                강의 일정 작성
                            </div>
                            <LectureItemAddition type={"S"} />
                        </div>

                        <div className="lt-write-materials">
                            <div className="lt-section-title">
                                준비물 및 특이사항 작성
                            </div>
                            <LectureItemAddition type={"M"} />
                        </div>
                    </div>
                </div>

                <div className="lt-input-footer">
                    <div className="lt-fee">
                        <div className="lt-section-title">
                            강의료
                        </div>
                        <input type="number" onChange={(e) => setLectureFee(e.target.valueAsNumber)}
                               className="input-fee" value={lectureFee} step={1000} />
                        <span style={{fontSize: "20px", fontWeight: "bold", marginLeft: "3px"}}>
                            원
                        </span>
                    </div>

                    <div className="lt-write-submit">
                        <button onClick={() => lectureWriteHandler()}>작성하기</button>
                    </div>
                </div>
            </div>
            {/*<LectureRoomWrite institutionNo={lectureInstitution} />*/}
            {/*<LectureSubCategoryWrite mainCategoryNo={lectureMainCategory}/>*/}
        </Styled.LectureWriteView>
    )
}

export default LectureWrite;