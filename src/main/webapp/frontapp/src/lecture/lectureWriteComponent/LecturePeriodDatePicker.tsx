import {useEffect, useState} from "react";
import UseLectureDataStore from "../../stores/useLectureWriteDataStore";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleRight as buttonRight, faCircleLeft as buttonLeft} from "@fortawesome/free-solid-svg-icons";

import {ko} from "date-fns/esm/locale";
import { getMonth, getYear } from 'date-fns';
import dayjs from "dayjs";
import 'dayjs/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';

import * as Styled from "./LecturePeriodDatePicker.style";

const LecturePeriodDatePicker = (props:{type:string}) => {
    dayjs.locale('ko');

    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());

    const {setLecturePeriodData, setLectureReceptionData} = UseLectureDataStore();

    const YEARS:number[] = Array.from({ length: getYear(new Date()) + 1 - (getYear(new Date()) - 1) }, (_, i) => (getYear(new Date()) + 1) - i);
    const MONTHS:string[] = Array.from({ length: 12 }, (_, i) => (i + 1) + "월");

    useEffect(() => {
        if(props.type === 'period') {
            setLecturePeriodData(dayjs(startDate).format("YYYY.MM.DD") + "~" + dayjs(endDate).format("YYYY.MM.DD"));
        } else if(props.type === 'reception') {
            setLectureReceptionData(dayjs(startDate).format("YYYY.MM.DD") + "~" + dayjs(endDate).format("YYYY.MM.DD"));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endDate])

    return (
        <Styled.LectureDatePickerView>
            <Styled.DatePickerWrapperView
                locale={ko}
                dateFormat="yyyy.MM.dd (eee)"
                minDate={new Date()} // 오늘 날짜를 기준으로 과거 날짜 disable
                dayClassName={(date:Date) => (date.getDate() === startDate!.getDate() ? "selectedDay" : "unselectedDay")}
                selected={startDate}
                onChange={(date:any) => setStartDate(date)}
                renderCustomHeader={({
                    date, changeMonth, changeYear, decreaseMonth, increaseMonth,
                    prevMonthButtonDisabled, nextMonthButtonDisabled}) => (
                    <Styled.DatePickerHeaderView>
                        <div className="select-date">
                            <select
                                value={getYear(date)}
                                className="year"
                                onChange={(e) => changeYear(+e.target.value)}
                            >
                                {YEARS.map((option:number) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={MONTHS[getMonth(date)]}
                                className="month"
                                onChange={(e) => changeMonth(MONTHS.indexOf(e.target.value))}
                            >
                                {MONTHS.map((option:string) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="move-date">
                            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                <FontAwesomeIcon icon={buttonLeft} className="icon-custom" />
                            </button>
                            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                <FontAwesomeIcon icon={buttonRight} className="icon-custom" />
                            </button>
                        </div>
                    </Styled.DatePickerHeaderView>
                )}/>
            <span className="wave-mark">
                ~
            </span>
            <Styled.DatePickerWrapperView
                locale={ko}
                dateFormat="yyyy.MM.dd (eee)"
                minDate={startDate} // 오늘 날짜를 기준으로 과거 날짜 disable
                dayClassName={(date:Date) => (date.getDate() === endDate!.getDate() ? "selectedDay" : "unselectedDay")}
                selected={endDate}
                onChange={(date:any) => setEndDate(date)}
                renderCustomHeader={({
                                         date, changeMonth, changeYear, decreaseMonth, increaseMonth,
                                         prevMonthButtonDisabled, nextMonthButtonDisabled}) => (
                    <Styled.DatePickerHeaderView>
                        <div className="select-date">
                            <select
                                value={getYear(date)}
                                className="year"
                                onChange={(e) => changeYear(+e.target.value)}
                            >
                                {YEARS.map((year:number) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={MONTHS[getMonth(date)]}
                                className="month"
                                onChange={(e) => changeMonth(MONTHS.indexOf(e.target.value))}
                            >
                                {MONTHS.map((month:string) => (
                                    <option key={month} value={month}>
                                        {month}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="move-date">
                            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                <FontAwesomeIcon icon={buttonLeft} className="icon-custom" />
                            </button>
                            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                <FontAwesomeIcon icon={buttonRight} className="icon-custom" />
                            </button>
                        </div>
                    </Styled.DatePickerHeaderView>
                )}/>
        </Styled.LectureDatePickerView>
    )
}

export default LecturePeriodDatePicker;