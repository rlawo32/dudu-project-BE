import {useEffect, useState} from "react";
import UseLectureDataStore from "../../stores/useLectureDataStore";

const LectureTimeSelectBox = () => {

    // false : am , true : pm
    const [isTimeSlot, setIsTimeSlot] = useState<boolean>(false);

    const [lectureStartTime, setLectureStartTime] = useState<string>("");
    const [lectureEndTime, setLectureEndTime] = useState<string>("");
    const [lectureDaysOfWeek, setLectureDaysOfWeek] = useState<string>("1");

    const {setLectureTimeData} = UseLectureDataStore();

    const customTimeSelectBox = ():any[] => {
        const timeArr:any[] = [];
        let ampm:number = 0;

        if(isTimeSlot) {
            ampm = 12;
        }

        for(let i:number=0+ampm; i<12+ampm; i++) {
            if(i < 10) {
                timeArr.push(<option value={'0'+i+':00'} key={i}>0{i}:00</option>);
                timeArr.push(<option value={'0'+i+':30'} key={i+.5}>0{i}:30</option>);
            } else {
                timeArr.push(<option value={i+':00'} key={i}>{i}:00</option>);
                timeArr.push(<option value={i+':30'} key={i+.5}>{i}:30</option>);
            }
        }

        return timeArr;
    }

    const customDowSelectBox = ():any[] => {
        const dowArr:any[] = [];
        const daysOfWeek:string[] = ['일', '월', '화', '수', '목', '금', '토'];

        for(let i:number=0; i<daysOfWeek.length; i++) {
            dowArr.push(<option value={i+1} key={i}>{daysOfWeek[i]}</option>);
        }

        return dowArr;
    }

    useEffect(() => {
        setLectureTimeData(lectureStartTime + " ~ " + lectureEndTime + " (" + lectureDaysOfWeek + ")")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lectureEndTime, lectureDaysOfWeek])

    useEffect(() => {
        setLectureStartTime(isTimeSlot ? "12:00" : "00:00");
        setLectureEndTime(isTimeSlot ? "12:00" : "00:00");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isTimeSlot])

    return (
        <span>
            <span><button onClick={() => setIsTimeSlot(!isTimeSlot)}>AM/PM</button></span>
            <span>
                <select onChange={(e) => setLectureStartTime(e.target.value)}>
                    {customTimeSelectBox()}
                </select>
            </span>
            ~
            <span>
                <select onChange={(e) => setLectureEndTime(e.target.value)}>
                    {customTimeSelectBox()}
                </select>
            </span>

            <span>
                <select onChange={(e) => setLectureDaysOfWeek(e.target.value)}>
                    {customDowSelectBox()}
                </select>
            </span>
        </span>
    )
}

export default LectureTimeSelectBox;