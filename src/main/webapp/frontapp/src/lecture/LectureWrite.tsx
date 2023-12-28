import {useEffect, useState} from "react";
import axios from "axios";
import UseLectureDataStore from "../stores/useLectureDataStore";

import HeaderNavigation from "../navigation/HeaderNavigation";
import LectureRoomWrite from "./lectureWriteComponent/LectureRoomWrite";
import LectureSubCategoryWrite from "./lectureWriteComponent/LectureSubCategoryWrite";
import LectureQuillEditor from "./lectureWriteComponent/LectureQuillEditor";
import * as timeSelectBox from "./lectureWriteComponent/LectureTimeSelectBox";
import * as periodDatePicker from "./lectureWriteComponent/LecturePeriodDatePicker";

import * as Styled from "./LectureWrite.style";

const LectureWrite = () => {

    const [lectureTeacherList, setLectureTeacherList] = useState([{
        memberNo: '',
        memberName: '',
        memberPhone: ''
    }]);
    const [institutionList, setInstitutionList] = useState([{
        institutionNo: '',
        institutionName: '',
        institutionContact: ''
    }]);
    const [lectureRoomList, setLectureRoomList] = useState([{
        lectureRoomNo: '',
        lectureInstitutionNo: '',
        lectureRoomName: '',
        lectureRoomContact: ''
    }]);
    const [lectureMainCategoryList, setLectureMainCategoryList] = useState([{
        lectureMainCategoryNo: '',
        lectureMainCategoryName: '',
        lectureMainCategoryDesc: ''
    }]);
    const [lectureSubCategoryList, setLectureSubCategoryList] = useState([{
        lectureSubCategoryNo: '',
        lectureMainCategoryNo: '',
        lectureSubCategoryName: '',
        lectureSubCategoryDesc: ''
    }]);

    const [lectureTeacher, setLectureTeacher] = useState<string>("");
    const [lectureName, setLectureName] = useState<string>("");
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

    const {lecturePeriodData, lectureTimeData, lectureReceptionData} = UseLectureDataStore();

    const lectureWriteHandler = ():void => {
        const lectureData:object = {
            memberNo: lectureTeacher,
            lectureName: lectureName,
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
        }
        axios({
            method: "POST",
            url: "/lecture/write",
            data: JSON.stringify(lectureData),
            headers: {'Content-type': 'application/json'}
        }).then((res):void => {
            console.log("작성 성공")
        }).catch((err):void => {
            console.log(err.message);
        })
    }

    // lectureWriteDataList
    useEffect(() => {
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
        selectDataList().then();
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
        selectLectureRoomList().then();
    }, [lectureInstitution])

    // subCategoryList useEffect
    useEffect(() => {
        const selectLectureRoomList = async ():Promise<void> => {
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
        selectLectureRoomList().then();
    }, [lectureMainCategory])

    // datePicker useEffect
    useEffect(() => {
        setLecturePeriod(lecturePeriodData);
        setLectureTime(lectureTimeData);
        setLectureReceptionPeriod(lectureReceptionData);
    }, [lecturePeriodData, lectureTimeData, lectureReceptionData])

    return (
        <Styled.LectureWriteView>
            <HeaderNavigation />
            <h1>강의 작성</h1>

            <div className="input-view">
                <div className="lt-section-select">
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
                </div>

                <div className="lt-write-main">
                    <div className="write-main-header">
                        <div className="lt-name">
                            <div className="lt-section-title">
                                강좌명
                            </div>
                            <input type="text" onChange={(e) => setLectureName(e.target.value)}
                                   className="input-name" placeholder="강좌명" />
                        </div>
                        <div className="lt-teacher">
                            <div className="lt-section-title">
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
                        <div className="lt-capacity">
                            <div className="lt-section-title">
                                인원
                            </div>
                            <input type="number" onChange={(e) => setLectureCapacity(e.target.valueAsNumber)}
                                   className="input-capacity" value={lectureCapacity} step={1} />
                        </div>
                    </div>
                    <div className="write-main-body">
                        <div className="lt-section-title">
                            세부 내용 작성
                        </div>
                        <div className="lt-description">
                            <LectureQuillEditor content={lectureDescription} setContent={setLectureDescription} />
                        </div>
                    </div>
                </div>

                <div className="lt-period">
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
                </div>

                <div className="lt-reception">
                    <span>
                        <div className="reception-datePicker">
                            <div className="lt-section-title">
                                접수기간 설정
                            </div>
                            <periodDatePicker.default type={"reception"} />
                        </div>
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
                    </span>
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