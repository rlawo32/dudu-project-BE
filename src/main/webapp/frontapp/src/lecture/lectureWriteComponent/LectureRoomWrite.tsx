import {useState} from "react";
import axios from "axios";

const LectureRoomWrite = (props:{institutionNo:string}) => {

    const [insertLectureRoomName, setInsertLectureRoomName] = useState<string>("");
    const [insertLectureRoomContact, setInsertLectureRoomContact] = useState<string>("");

    const insertLectureRoomHandler = ():void => {
        const roomData:object = {
            institutionNo: props.institutionNo,
            lectureRoomName: insertLectureRoomName,
            lectureRoomContact: insertLectureRoomContact
        }

        axios({
            method: "POST",
            url: "/lecture/insertLectureRoom",
            data: JSON.stringify(roomData),
            headers: {'Content-type': 'application/json'}
        }).then((res):void => {

        }).catch((err):void => {
            console.log(err.message);
        })
    }

    return (
        <div>
            <input type="text" onChange={(e) => setInsertLectureRoomName(e.target.value)} placeholder="강의실이름" />
            <input type="text" onChange={(e) => setInsertLectureRoomContact(e.target.value)} placeholder="강의실전화" />
            <button onClick={() => insertLectureRoomHandler()}>insert</button>
        </div>
    )
}

export default LectureRoomWrite;