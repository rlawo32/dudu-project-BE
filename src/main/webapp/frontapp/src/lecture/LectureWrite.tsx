import {useEffect, useState} from "react";
import axios from "axios";
import styled from 'styled-components';
import UseLectureDataStore from "../stores/useLectureDataStore";

import HeaderNavigation from "../navigation/HeaderNavigation";
import * as timeSelectBox from "./writeComponent/LectureTimeSelectBox";
import * as periodDatePicker from "./writeComponent/LecturePeriodDataPicker";

const LectureWriteView = styled.div`
  position: relative;
  height: 100%;
  width: 700px;
  padding: 35px;
  margin: 10% auto;
  border: ${({theme}) => theme.borderColor};
  
  h1 {
    text-align: center;
  }

  .input-section {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
  }
`;

const LectureWrite = () => {

    const institutionArr:string[] = ['DuDu 문화센터', 'DuDu 복지회관', 'DuDu 청소년수련관', 'DuDu 문화의집', 'DuDu 문화회관'];
    const lectureRoomArr:string[] = ['LAB1', 'LAB2', 'LAB3', 'LAB4', 'LAB5', 'LAB6', '오픈스튜디오', '수영장', '농구장'];

    const [lectureName, setLectureName] = useState<string>("");
    const [lecturePeriod, setLecturePeriod] = useState<string>("");
    const [lectureTime, setLectureTime] = useState<string>("");
    const [lectureRoom, setLectureRoom] = useState<string>(lectureRoomArr[0]);
    const [lectureCapacity, setLectureCapacity] = useState<number>(0);
    const [lectureFee, setLectureFee] = useState<number>(0);
    const [lectureReceptionPeriod, setLectureReceptionPeriod] = useState<string>("");
    const [lectureDescription, setLectureDescription] = useState<string>("");
    const [lectureInstitution, setLectureInstitution] = useState<string>(institutionArr[0]);

    const {lecturePeriodData, lectureTimeData, lectureReceptionData} = UseLectureDataStore();

    const LECTUREROOM:string[] = Array.from({ length: lectureRoomArr.length}, (_, i) => lectureRoomArr[i]);
    const INSTITUTION:string[] = Array.from({ length: institutionArr.length }, (_, i) => institutionArr[i]);

    const lectureWriteHandler = ():void => {
        const lectureData:object = {
            lectureName: lectureName,
            lecturePeriod: lecturePeriod,
            lectureTime: lectureTime,
            lectureRoom: lectureRoom,
            lectureCapacity: lectureCapacity,
            lectureFee: lectureFee,
            lectureReception: lectureReceptionPeriod,
            lectureDescription: lectureDescription,
            lectureInstitution: lectureInstitution
        }

        console.log(lectureData);

        axios({
            method: "POST",
            url: "/lecture/write",
            data: JSON.stringify(lectureData),
            headers: {'Content-type': 'application/json'}
        }).then((res) => {
            console.log("작성 성공")
        }).catch((err):void => {
            console.log(err.message);
        })
    }

    useEffect(() => {
        setLecturePeriod(lecturePeriodData);
        setLectureTime(lectureTimeData);
        setLectureReceptionPeriod(lectureReceptionData);
    }, [lecturePeriodData, lectureTimeData, lectureReceptionData])

    return (
        <LectureWriteView>
            <HeaderNavigation />
            <h1>강의 작성</h1>

            <div className="input-section">
                <input type="text" onChange={(e) => setLectureName(e.target.value)} placeholder="강의명" />
                <div>
                    <select
                        value={lectureRoom}
                        onChange={(e) => setLectureRoom(e.target.value)}
                    >
                        {LECTUREROOM.map((option:string) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <input type="number" onChange={(e) => setLectureCapacity(e.target.valueAsNumber)} placeholder="모집정원" step={1} />
                <input type="number" onChange={(e) => setLectureFee(e.target.valueAsNumber)} placeholder="강의료" step={1000} />
                <textarea onChange={(e) => setLectureDescription(e.target.value)} placeholder="강의세부내용" />
                <div>
                    <select
                        value={lectureInstitution}
                        onChange={(e) => setLectureInstitution(e.target.value)}
                    >
                        {INSTITUTION.map((option:string) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="lecture-datePicker">
                    <periodDatePicker.default type={"period"} />
                </div>
                <div className="lecture-timeSelect">
                    <timeSelectBox.default />
                </div>
                <div className="lecture-datePicker">
                    <periodDatePicker.default type={"reception"} />
                </div>
                <button onClick={() => lectureWriteHandler()}>test</button>
            </div>


        </LectureWriteView>
    )
}

export default LectureWrite;