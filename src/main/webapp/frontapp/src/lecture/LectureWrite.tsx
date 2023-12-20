import {useEffect, useState} from "react";
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

    const [lectureName, setLectureName] = useState<string>("");
    const [lecturePeriod, setLecturePeriod] = useState<string>("");
    const [lectureTime, setLectureTime] = useState<string>("");
    const [lectureDow, setLectureDow] = useState<string>("");
    const [lectureLocation, setLectureLocation] = useState<string>("");
    const [lectureCapacity, setLectureCapacity] = useState<number>(0);
    const [lectureDivision, setLectureDivision] = useState<string>("");
    const [lectureFee, setLectureFee] = useState<number>(0);
    const [lectureReceptionPeriod, setLectureReceptionPeriod] = useState<string>("");
    const [lectureDescription, setLectureDescription] = useState<string>("");
    const [lectureInstitution, setLectureInstitution] = useState<string>("");
    const [lectureContact, setLectureContact] = useState<string>("");

    const [lectureTimeRegistration, setLectureTimeRegistration] = useState<boolean>(false);

    const {lecturePeriodData, lectureTimeData} = UseLectureDataStore();

    useEffect(() => {
        setLecturePeriod(lecturePeriodData);
        setLectureTime(lectureTimeData);
    }, [lecturePeriodData, lectureTimeData])

    return (
        <LectureWriteView>
            <HeaderNavigation />
            <h1>강의 작성</h1>

            <div className="input-section">
                <input type="text" onChange={(e) => setLectureName(e.target.value)} placeholder="강의명" />
                <input type="text" onChange={(e) => setLectureLocation(e.target.value)} placeholder="강의장소" /> {/* selectBox */}
                <input type="number" onChange={(e) => setLectureCapacity(e.target.valueAsNumber)} placeholder="모집정원" />
                <input type="text" onChange={(e) => setLectureDivision(e.target.value)} placeholder="강의구분" /> {/* selectBox */}
                <input type="text" onChange={(e) => setLectureFee(e.target.valueAsNumber)} placeholder="강의료" />
                <textarea onChange={(e) => setLectureDescription(e.target.value)} placeholder="강의세부내용" />
                <input type="text" onChange={(e) => setLectureInstitution(e.target.value)} placeholder="교육기관" /> {/* selectBox */}
                <input type="text" onChange={(e) => setLectureContact(e.target.value)} placeholder="문의처" />

                <div className="lecture-datePicker">
                    <periodDatePicker.default />
                </div>
                <div className="lecture-timeSelect">
                    <timeSelectBox.default onClick={lectureTimeRegistration}/>
                    <button onClick={() => setLectureTimeRegistration(!lectureTimeRegistration)}>등록</button>
                </div>
                <button onClick={() => console.log(lectureTime + "/" + lecturePeriod)}>test</button>
            </div>


        </LectureWriteView>
    )
}

export default LectureWrite;