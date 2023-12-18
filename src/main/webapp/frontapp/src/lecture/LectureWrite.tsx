import {useEffect, useState} from "react";
import styled from 'styled-components';

import HeaderNavigation from "../navigation/HeaderNavigation";
import * as timeBox from "./writeComponent/TimeSelectBox";
import {lectureRegistration} from "./writeComponent/TimeSelectBox";

const LectureWriteView = styled.div`
  position: relative;
  height: 100%;
  width: 700px;
  margin: 10% auto;
  border: 1px solid black;
  
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

    useEffect(() => {
        setLectureTime(timeBox.lectureRegistration.lectureTime);
        console.log("write component : " + timeBox.lectureRegistration.lectureTime);
    }, [lectureTimeRegistration])

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


                <div>
                    <timeBox.default onClick={lectureTimeRegistration}/>
                    <button onClick={() => setLectureTimeRegistration(!lectureTimeRegistration)}>등록</button>
                </div>
            </div>


        </LectureWriteView>
    )
}

export default LectureWrite;