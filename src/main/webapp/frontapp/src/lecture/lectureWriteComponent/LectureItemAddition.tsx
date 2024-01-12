import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {ko} from "date-fns/esm/locale";
import dayjs from "dayjs";
import 'dayjs/locale/ko';

import UseLectureDataStore from "../../stores/useLectureWriteDataStore";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus as plusIcon, faMinus as minusIcon} from "@fortawesome/free-solid-svg-icons";

const LectureItemAdditionStyle = styled.div`
  box-sizing: border-box;
  
  input {
    width: 250px;
    padding: 8px 10px;
    border: ${({theme}) => theme.borderColor};
    border-radius: 10px;
    background: ${({theme}) => theme.boxBgColor};
    color: ${({theme}) => theme.textColor};
    font-size: 18px;
  }
  
  button {
    height: 33px;
    width: 33px;
    margin-left: 3px;
    background: ${({theme}) => theme.bgColor};
    color: ${({theme}) => theme.textColor};
    border: ${({theme}) => theme.borderColor};
    border-radius: 10px;
    cursor: pointer;
    
    .icon-custom {
      font-size: 18px;
      text-align: center;
    }
    
    &:hover {
      background-color: ${({theme}) => theme.headerBgColor};
      color: ${({theme}) => theme.headerTextColor};
    }
  }
  
  .input-item {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    
    .mas-input {
      width: calc(250px - 36px);
    }
    
    .schedule-cnt {
      margin-right: 7px;
      font-size: 20px;
      font-weight: bold;
    }
  }
`;

const LectureItemAddition = (props : {type:string;}) => {
    dayjs.locale('ko');
    const inputId = useRef<number>(1);

    const [lectureCount, setLectureCount] = useState<number>(0);

    const {materialsAndSignificantData, setMaterialsAndSignificantData,
        onChangeMaterialsAndSignificant, removeMaterialsAndSignificantData,
        lectureScheduleData, setLectureScheduleData,
        onChangeLectureSchedule, removeLectureScheduleData, lectureTimeData, lecturePeriodData} = UseLectureDataStore();

    const onClickInputAdd = () => {
        if(props.type === 'M') {
            setMaterialsAndSignificantData(inputId.current, '');
        } else if(props.type === 'S') {
            setLectureScheduleData(inputId.current, '');
        }
        inputId.current += 1;
    }

    const onClickInputRemove = (idx:number) => {
        if(props.type === 'M') {
            removeMaterialsAndSignificantData(idx);
        } else if(props.type === 'S') {
            removeLectureScheduleData(idx);
        }
    }

    const onChangeInputContent = (e: React.ChangeEvent<HTMLInputElement>, idx:number) => {
        if(props.type === 'M') {
            const inputItemsCopy: {id:number, content:string}[] = JSON.parse(JSON.stringify(materialsAndSignificantData));
            inputItemsCopy[idx].content = e.target.value;
            onChangeMaterialsAndSignificant(inputItemsCopy);
        } else if(props.type === 'S') {
            const inputItemsCopy: {id:number, content:string}[] = JSON.parse(JSON.stringify(lectureScheduleData));
            inputItemsCopy[idx].content = e.target.value;
            onChangeLectureSchedule(inputItemsCopy);
        }
    }

    useEffect(() => {
        if(props.type === 'S') {
            onChangeLectureSchedule([{id:0, content:''}]);
            const startDate: dayjs.Dayjs = dayjs(lecturePeriodData.substring(0, lecturePeriodData.indexOf("~")));
            const endDate: dayjs.Dayjs = dayjs(lecturePeriodData.substring(lecturePeriodData.indexOf("~") + 1));
            const dow: string = lectureTimeData.substring(lectureTimeData.indexOf("(") + 1, lectureTimeData.indexOf("(") + 2);

            const dayDiff: number = endDate.diff(startDate, "d");

            for (let i:number = 1; i <= dayDiff; i++) {
                if(startDate.add(i, "day").get("day") + "" === dow) {
                    setLectureScheduleData(inputId.current, '');
                    inputId.current += 1;
                }
            }
        }
    }, [lecturePeriodData, lectureTimeData]);

    return (
        <LectureItemAdditionStyle>

            {
                props.type === 'M' ?
                    materialsAndSignificantData.map((item, idx) => (
                        <div key={idx} className={`input-item item${item.id}`}>
                            <input type="text" value={item.content}
                                   onChange={(e) => onChangeInputContent(e, idx)}
                                   className="mas-input"
                                   placeholder={'준비물 및 특이사항 입력'}/>
                            {
                                idx === 0 ?
                                    <button onClick={() => onClickInputAdd()}>
                                        <FontAwesomeIcon icon={plusIcon} className="icon-custom" />
                                    </button>
                                    :
                                    <button onClick={() => onClickInputRemove(item.id)}>
                                        <FontAwesomeIcon icon={minusIcon} className="icon-custom" />
                                    </button>
                            }
                        </div>
                    ))
                    :
                    props.type === 'S' ?
                        lectureScheduleData.map((item, idx) => (
                            <div key={idx} className={`input-item item${item.id}`}>
                                <input type="text" value={item.content}
                                       onChange={(e) => onChangeInputContent(e, idx)}
                                       className="sc-input"
                                       placeholder={`${idx+1}주차`}/>
                            </div>
                        ))
                        :
                        <div/>
            }
        </LectureItemAdditionStyle>
    )
}

export default LectureItemAddition;