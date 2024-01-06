import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import styled from "styled-components";

import useLectureSearchDataStore from "../../stores/useLectureSearchDataStore";


const LectureSearchBox = styled.div<{ $showBox:boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: ${({$showBox}) => $showBox ? "450px" : 0};
  border-left: 1px solid rgba(0,0,0,0.2);
  background-color: ${({theme}) => theme.boxBgColor};
  z-index: 3;
  transition: all 0.4s ease-in;

  .dvBtn-active {
    background-color: orangered;
  }

  .stBtn-active {
    background-color: green;
  }
`;

const LectureSearchBoxView = (props : { isShow: boolean; }) => {
    const dvBtn:any = useRef<any>([]);
    const stBtn:any = useRef<any>([]);

    const [lectureStateList, setLectureStateList] = useState<{
        lectureStateNo:number;
        lectureStateName:string;
        lectureStateDesc:string;
    }[]>([{
        lectureStateNo:0,
        lectureStateName:'',
        lectureStateDesc:'',
    }]);

    const {
        searchButton, setSearchButton, searchText, setSearchText,
        ltDivisionArr, setLtDivisionArr, removeLtDivisionArr,
        ltStateArr, setLtStateArr, removeLtStateArr
    } = useLectureSearchDataStore();

    const searchItemDivisionList = ():any[] => {
        const divisionArr:any[] = [{value:'정기'}, {value:'단기'}, {value:'특강'}];
        let result:any[] = [];

        for(let i:number=0; i<divisionArr.length; i++) {
            result.push(<button key={divisionArr[i].value}
                                ref={btn => (dvBtn.current[i] = btn)}
                                onClick={() => onClickDivisionBtn(i, divisionArr[i].value)}>
                {divisionArr[i].value}</button>)
        }
        return result;
    }

    const searchItemStateList = ():any[] => {
        let result:any[] = [];

        for(let i:number=0; i<lectureStateList.length; i++) {
            result.push(<button key={lectureStateList[i].lectureStateNo}
                                ref={btn => (stBtn.current[i] = btn)}
                                onClick={() => onClickStateBtn(i, lectureStateList[i].lectureStateNo, lectureStateList[i].lectureStateName)}>
                {lectureStateList[i].lectureStateName}</button>)
        }
        return result;
    }

    const onClickDivisionBtn = (idx:number, item:string):void => {
        if(dvBtn.current[idx].className === 'dvBtn-active') {
            dvBtn.current[idx].className = dvBtn.current[idx].className.replace('dvBtn-active', '');
            removeLtDivisionArr(item);
        } else {
            dvBtn.current[idx].className += 'dvBtn-active';
            setLtDivisionArr(idx, item);
        }
    }

    const onClickStateBtn = (idx:number, item:number, name:string):void => {
        if(stBtn.current[idx].className === 'stBtn-active') {
            stBtn.current[idx].className = stBtn.current[idx].className.replace('stBtn-active', '');
            removeLtStateArr(item);
        } else {
            stBtn.current[idx].className += 'stBtn-active';
            setLtStateArr(idx, item, name);
        }
    }

    useEffect(() => {
        const stateList = async ():Promise<void> => {
            await axios({
                method: "GET",
                url: "/lecture/lectureStateList"
            }).then((res):void => {
                setLectureStateList(res.data.data);
            }).catch((err):void => {
                console.log(err.message);
            })
        }
        stateList().then();
    }, [])

    useEffect(() => {
        for(let i:number=0; i<dvBtn.current.length; i++) {
            dvBtn.current[i].className = dvBtn.current[i].className.replace('dvBtn-active', '');
        }
        if(ltDivisionArr.length > 0) {
            for(let i:number=0; i<ltDivisionArr.length; i++) {
                dvBtn.current[ltDivisionArr[i].idx].className += 'dvBtn-active';
            }
        }
    }, [ltDivisionArr])

    useEffect(() => {
        for(let i:number=0; i<stBtn.current.length; i++) {
            stBtn.current[i].className = stBtn.current[i].className.replace('stBtn-active', '');
        }
        if(ltStateArr.length > 0) {
            for(let i:number=0; i<ltStateArr.length; i++) {
                stBtn.current[ltStateArr[i].idx].className += 'stBtn-active';
            }
        }
    }, [ltStateArr])

    return (
        <LectureSearchBox $showBox={props.isShow}>
            <div className="search-header">
                <div className="search-title">
                    상세검색
                </div>
                <div className="search-text">
                    <input type="text" value={searchText}
                           onChange={(e) => setSearchText(e.target.value)}/>
                </div>
            </div>
            <div className="search-body">
                <div className="search-division">
                    <div className="search-title">
                        강좌구분
                    </div>
                    <div className="search-item">
                        {searchItemDivisionList()}
                    </div>
                </div>
                <div className="search-state">
                    <div className="search-title">
                        강좌상태
                    </div>
                    <div className="search-item">
                        {searchItemStateList()}
                    </div>
                </div>
            </div>
            <div className="search-footer">
                <button onClick={() => setSearchButton(!searchButton)}>검색</button>
            </div>
        </LectureSearchBox>
    )
}

export default LectureSearchBoxView;