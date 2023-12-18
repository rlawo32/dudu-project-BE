import {useEffect, useState} from "react";

export const lectureRegistration:{lectureTime:string} = {
    lectureTime: ""
};

const TimeSelectBox = (props:{onClick:boolean}) => {

    const [lectureStartTime, setLectureStartTime] = useState<string>("");
    const [lectureEndTime, setLectureEndTime] = useState<string>("");
    const [lectureDaysOfWeek, setLectureDaysOfWeek] = useState<string>("월");

    // false : am , true : pm
    const [isTimeSlot, setIsTimeSlot] = useState<boolean>(false);

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
        const daysOfWeek:string[] = ['월', '화', '수', '목', '금', '토', '일'];

        for(let i:number=0; i<daysOfWeek.length; i++) {
            dowArr.push(<option value={daysOfWeek[i]} key={i}>{daysOfWeek[i]}</option>);
        }

        return dowArr;
    }

    useEffect(() => {
        lectureRegistration.lectureTime = lectureStartTime + " ~ " + lectureEndTime + " " + "(" + lectureDaysOfWeek + ")";
        console.log("time component : " + lectureRegistration.lectureTime);
    }, [props.onClick])

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

export default TimeSelectBox;