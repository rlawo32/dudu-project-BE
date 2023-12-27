import {useEffect, useState} from "react";
import UseLectureDataStore from "../../stores/useLectureDataStore";

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
                if(i != ((12+pm2) - 1)) {
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
                if(i != ((12+pm2) - 1)) {
                    timeArr.push(<option value={i+':30'} key={i+.5}>{i}:30</option>);
                }
            }
        }
        return timeArr;
    }

    const customDowSelectBox = ():any[] => {
        const dowArr:any[] = [];
        const daysOfWeek:string[] = ['월', '화', '수', '목', '금', '토', '일'];

        for(let i:number=0; i<daysOfWeek.length; i++) {
            dowArr.push(<option value={i+1} key={i}>{daysOfWeek[i]}</option>);
        }

        return dowArr;
    }

    console.log(lectureStartTime)

    useEffect(() => {
        setLectureTimeData(lectureStartTime + " ~ " + lectureEndTime + " (" + lectureDaysOfWeek + ")")
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
        <span>
            <span><button onClick={() => setIsFrontTimeSlot(!isFrontTimeSlot)}>AM/PM</button></span>
            <span>
                <select onChange={(e) => setLectureStartTime(e.target.value)}>
                    {frontTimeSelectBox()}
                </select>
            </span>
            ~
            <span><button onClick={() => setIsBackTimeSlot(!isBackTimeSlot)}>AM/PM</button></span>
            <span>
                <select onChange={(e) => setLectureEndTime(e.target.value)}>
                    {backTimeSelectBox()}
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