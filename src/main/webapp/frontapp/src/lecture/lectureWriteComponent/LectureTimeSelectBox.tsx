import {useEffect, useState} from "react";
import UseLectureDataStore from "../../stores/useLectureWriteDataStore";

import * as Styled from "./LectureTimeSelectBox.style";

const LectureTimeSelectBox = () => {

    // false : am , true : pm
    const [isFrontTimeSlot, setIsFrontTimeSlot] = useState<boolean>(false);
    const [isBackTimeSlot, setIsBackTimeSlot] = useState<boolean>(false);

    const [lectureStartTime, setLectureStartTime] = useState<string>("");
    const [lectureEndTime, setLectureEndTime] = useState<string>("");
    const [lectureDaysOfWeek, setLectureDaysOfWeek] = useState<string>("1");

    const {setLectureTimeData} = UseLectureDataStore();

    const frontTimeSelectBox = ():any[] => {
        const timeArr:any[] = [];
        let pm1:number = 0;
        let pm2:number = 0;

        if(isFrontTimeSlot) {
            pm1 = 6;
            pm2 = 11;
        }

        for(let i:number=6+pm1; i<12+pm2; i++) {
            if(i < 10) {
                timeArr.push(<option value={'0'+i+':00'} key={i}>0{i}:00</option>);
                timeArr.push(<option value={'0'+i+':30'} key={i+.5}>0{i}:30</option>);
            } else {
                timeArr.push(<option value={i+':00'} key={i}>{i}:00</option>);
                if(i !== ((12+pm2) - 1)) {
                    timeArr.push(<option value={i+':30'} key={i+.5}>{i}:30</option>);
                }
            }
        }
        return timeArr;
    }

    const backTimeSelectBox = ():any[] => {
        const timeArr:any[] = [];
        let pm1:number = 0;
        let pm2:number = 0;

        if(isBackTimeSlot) {
            pm1 = 6;
            pm2 = 11;
        }

        for(let i:number=6+pm1; i<12+pm2; i++) {
            if(i < 10) {
                timeArr.push(<option value={'0'+i+':00'} key={i}>0{i}:00</option>);
                timeArr.push(<option value={'0'+i+':30'} key={i+.5}>0{i}:30</option>);
            } else {
                timeArr.push(<option value={i+':00'} key={i}>{i}:00</option>);
                if(i !== ((12+pm2) - 1)) {
                    timeArr.push(<option value={i+':30'} key={i+.5}>{i}:30</option>);
                }
            }
        }
        return timeArr;
    }

    const customDowSelectBox = ():any[] => {
        const dowArr:any[] = [];
        const daysOfWeek:string[] = ['요일선택', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];

        for(let i:number=0; i<daysOfWeek.length; i++) {
            dowArr.push(<option value={i} key={i}>{daysOfWeek[i]}</option>);
        }

        return dowArr;
    }

    useEffect(() => {
        setLectureTimeData(lectureStartTime + "~" + lectureEndTime + " (" + lectureDaysOfWeek + ")")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lectureStartTime, lectureEndTime, lectureDaysOfWeek])

    useEffect(() => {
        setLectureStartTime(isFrontTimeSlot ? "12:00" : "00:00");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFrontTimeSlot])

    useEffect(() => {
        setLectureEndTime(isBackTimeSlot ? "12:00" : "00:00");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isBackTimeSlot])

    return (
        <Styled.LectureTimeSelectBoxView>
            <span>
                <button onClick={() => setIsFrontTimeSlot(!isFrontTimeSlot)}>
                    {
                        isFrontTimeSlot ? "PM" : "AM"
                    }
                </button>
            </span>
            <span>
                <select onChange={(e) => setLectureStartTime(e.target.value)}>
                    {frontTimeSelectBox()}
                </select>
            </span>
            <span className="wave-mark">
                ~
            </span>
            <span>
                <button onClick={() => setIsBackTimeSlot(!isBackTimeSlot)}>
                    {
                        isBackTimeSlot ? "PM" : "AM"
                    }
                </button>
            </span>
            <span>
                <select onChange={(e) => setLectureEndTime(e.target.value)}>
                    {backTimeSelectBox()}
                </select>
            </span>

            <span style={{marginLeft: "5px"}}>
                <select onChange={(e) => setLectureDaysOfWeek(e.target.value)}>
                    {customDowSelectBox()}
                </select>
            </span>
        </Styled.LectureTimeSelectBoxView>
    )
}

export default LectureTimeSelectBox;