import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus as plusIcon, faMinus as minusIcon} from "@fortawesome/free-solid-svg-icons";
import UseLectureDataStore from "../../stores/useLectureWriteDataStore";

const LectureItemAdditionStyle = styled.div`
  box-sizing: border-box;
  
  input {
    width: 250px;
    padding: 8px 10px;
    border: 1px solid gray;
    border-radius: 10px;
    background: ${({theme}) => theme.boxBgColor};
    color: ${({theme}) => theme.textColor};
    font-size: 18px;
  }
  
  button {
    height: 30px;
    width: 30px;
    margin-left: 3px;
    background: ${({theme}) => theme.bgColor};
    color: ${({theme}) => theme.textColor};
    border: 1px solid gray;
    border-radius: 10px;
    cursor: pointer;
    
    .icon-custom {
      font-size: 18px;
    }
  }
  
  .input-item {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }
`;

const LectureItemAddition = (props : {type:string;}) => {
    const inputId = useRef<number>(1);

    const [inputItems, setInputItems] = useState<{
        id:number;
        content:string;
    }[]>([{
        id: 0,
        content: ''
    }]);

    const {setMaterialsAndSignificantData, setLectureScheduleData} = UseLectureDataStore();

    const onClickInputAdd = () => {
        setInputItems([...inputItems, {id: inputId.current, content: ''}]);
        inputId.current += 1;
    }

    const onClickInputRemove = (idx:number) => {
        setInputItems(inputItems.filter(item => item.id !== idx));
    }

    const onChangeInputContent = (e: React.ChangeEvent<HTMLInputElement>, idx:number) => {
        const inputItemsCopy: {id:number, content:string}[] = JSON.parse(JSON.stringify(inputItems));
        inputItemsCopy[idx].content = e.target.value;
        setInputItems(inputItemsCopy);
    }

    return (
        <LectureItemAdditionStyle>
            {inputItems.map((item, idx) => (
                <div key={idx} className={`input-item item${item.id}`}>
                    <input type="text" value={item.content}
                           onChange={(e) => onChangeInputContent(e, idx)}/>
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
            ))}
        </LectureItemAdditionStyle>
    )
}

export default LectureItemAddition;