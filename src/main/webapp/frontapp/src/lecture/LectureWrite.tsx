import {useEffect, useState} from "react";
import axios from "axios";
import UseLectureDataStore from "../stores/useLectureDataStore";

import HeaderNavigation from "../navigation/HeaderNavigation";
import LectureRoomWrite from "./writeComponent/LectureRoomWrite";
import LectureSubCategoryWrite from "./writeComponent/LectureSubCategoryWrite";
import * as timeSelectBox from "./writeComponent/LectureTimeSelectBox";
import * as periodDatePicker from "./writeComponent/LecturePeriodDatePicker";

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

            <div className="input-section">
                <div className="lecture-teacher">
                    <select
                        value={lectureTeacher}
                        onChange={(e) => setLectureTeacher(e.target.value)}
                    >
                        {lectureTeacherList.map((option) => (
                            <option key={option.memberNo} value={option.memberNo}>
                                {option.memberName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="lecture-institution">
                    <select
                        value={lectureInstitution}
                        onChange={(e) => setLectureInstitution(e.target.value)}
                    >
                        {institutionList.map((option) => (
                            <option key={option.institutionNo} value={option.institutionNo}>
                                {option.institutionName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="lecture-room">
                    <select
                        value={lectureRoom}
                        onChange={(e) => setLectureRoom(e.target.value)}
                    >
                        {lectureRoomList.map((option) => (
                            <option key={option.lectureRoomNo} value={option.lectureRoomNo}>
                                {option.lectureRoomName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="lecture-mainCategory">
                    <select
                        value={lectureMainCategory}
                        onChange={(e) => setLectureMainCategory(e.target.value)}
                    >
                        {lectureMainCategoryList.map((option) => (
                            <option key={option.lectureMainCategoryNo} value={option.lectureMainCategoryNo}>
                                {option.lectureMainCategoryName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="lecture-subCategory">
                    <select
                        value={lectureSubCategory}
                        onChange={(e) => setLectureSubCategory(e.target.value)}
                    >
                        {lectureSubCategoryList.map((option) => (
                            <option key={option.lectureSubCategoryNo} value={option.lectureSubCategoryNo}>
                                {option.lectureSubCategoryName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="lecture-name">
                    <input type="text" onChange={(e) => setLectureName(e.target.value)} placeholder="강의명" />
                </div>
                <div className="lecture-capacity">
                    <input type="number" onChange={(e) => setLectureCapacity(e.target.valueAsNumber)} placeholder="모집정원" step={1} />
                </div>
                <div className="lecture-fee">
                    <input type="number" onChange={(e) => setLectureFee(e.target.valueAsNumber)} placeholder="강의료" step={1000} />
                </div>
                <div className="lecture-description">
                    <textarea onChange={(e) => setLectureDescription(e.target.value)} placeholder="강의세부내용" />
                </div>

                <div className="lecture-datePicker">
                    <periodDatePicker.default type={"period"} />
                </div>
                <div className="lecture-datePicker">
                    <periodDatePicker.default type={"reception"} />
                </div>
                <div className="lecture-timeSelect">
                    <timeSelectBox.default />
                </div>
                <button onClick={() => lectureWriteHandler()}>test</button>
            </div>

            {/*<LectureRoomWrite institutionNo={lectureInstitution} />*/}
            {/*<LectureSubCategoryWrite mainCategoryNo={lectureMainCategory}/>*/}
        </Styled.LectureWriteView>
    )
}

export default LectureWrite;