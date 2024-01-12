import React, {useEffect, useRef, useState} from "react";
import axios from "axios";

import useLectureSearchDataStore from "../../stores/useLectureSearchDataStore";

import * as Styled from "./LectureSearchBoxView.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown as arrow, faSearch as searchIcon, faRotateRight as resetIcon} from "@fortawesome/free-solid-svg-icons";

const LectureSearchBoxView = (props : { isShow: boolean; setIsShow: React.Dispatch<React.SetStateAction<boolean>>; }) => {
    const dvBtn:any = useRef<any>([]);
    const stBtn:any = useRef<any>([]);
    const divisionBox:any = useRef<any>();
    const divisionArrow:any = useRef<any>();
    const stateBox:any = useRef<any>();
    const stateArrow:any = useRef<any>();

    const [isDivisionBoxShow, setIsDivisionBoxShow] = useState<boolean>(false);
    const [isStateBoxShow, setIsStateBoxShow] = useState<boolean>(false);

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
        ltDivisionArr, setLtDivisionArr,
        removeLtDivisionArr, removeAllLtDivisionArr,
        ltStateArr, setLtStateArr,
        removeLtStateArr, removeAllLtStateArr
    } = useLectureSearchDataStore();

    const onClickSearchReset = ():void => {
        setSearchText("");
        removeAllLtDivisionArr();
        removeAllLtStateArr();
    }

    const searchItemDivisionList = ():any[] => {
        const divisionArr:any[] = [{value:'정기'}, {value:'단기'}, {value:'특강'}];
        let result:any[] = [];

        for(let i:number=0; i<divisionArr.length; i++) {
            result.push(<li key={divisionArr[i].value}
                                ref={btn => (dvBtn.current[i] = btn)}
                                onClick={() => onClickDivisionBtn(i, divisionArr[i].value)}>
                {divisionArr[i].value}</li>)
        }
        return result;
    }

    const searchItemStateList = ():any[] => {
        let result:any[] = [];

        for(let i:number=0; i<lectureStateList.length; i++) {
            result.push(<li key={lectureStateList[i].lectureStateNo}
                                ref={btn => (stBtn.current[i] = btn)}
                                onClick={() => onClickStateBtn(i, lectureStateList[i].lectureStateNo, lectureStateList[i].lectureStateName)}>
                {lectureStateList[i].lectureStateName}</li>)
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
        setTimeout(() => {stateList().then();}, 100);
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
        if(isDivisionBoxShow) {
            divisionBox.current.className += " show-list";
            divisionArrow.current.className += " show-list";
        } else {
            divisionBox.current.className = divisionBox.current.className.replace(' show-list', '');
            divisionArrow.current.className = divisionArrow.current.className.replace(' show-list', '');
        }
    }, [isDivisionBoxShow])

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

    useEffect(() => {
        if(isStateBoxShow) {
            stateBox.current.className += " show-list";
            stateArrow.current.className += " show-list";
        } else {
            stateBox.current.className = stateBox.current.className.replace(' show-list', '');
            stateArrow.current.className = stateArrow.current.className.replace(' show-list', '');
        }
    }, [isStateBoxShow])

    useEffect(() => {
        if(!props.isShow) {
            setIsDivisionBoxShow(false);
            setIsStateBoxShow(false);
        }
    }, [props.isShow])

    return (
        <Styled.LectureSearchBox $showBox={props.isShow}>
            <div className="search-header">
                <div className="search-title">
                    상세검색
                </div>
                <div className="search-text">
                    <input type="text" value={searchText}
                           onChange={(e) => setSearchText(e.target.value)}
                           placeholder="강좌명 or 강사명으로 검색" />
                    <FontAwesomeIcon icon={searchIcon} className="icon-custom"
                                     onClick={() => (props.setIsShow(false), setSearchButton(!searchButton))}/>
                </div>
            </div>
            <div className="search-body">
                <div className="search-division">
                    <div className="search-title"
                         onClick={() => setIsDivisionBoxShow(!isDivisionBoxShow)}>
                        {
                            ltDivisionArr.length > 0 ?
                                <div>강좌구분
                                    <span className="count-view">
                                        {ltDivisionArr.length}
                                    </span>
                                </div>
                                :
                                <div>강좌구분</div>
                        }
                        <div className="division-arrow" ref={divisionArrow}>
                            <FontAwesomeIcon icon={arrow} />
                        </div>
                    </div>
                    <ul className="division-item-list" ref={divisionBox}>
                        {searchItemDivisionList()}
                    </ul>
                </div>
                <div className="search-state">
                    <div className="search-title"
                         onClick={() => setIsStateBoxShow(!isStateBoxShow)}>
                        {
                            ltStateArr.length > 0 ?
                                <div>강좌상태
                                    <span className="count-view">
                                        {ltStateArr.length}
                                    </span>
                                </div>
                                :
                                <div>강좌상태</div>
                        }
                        <div className="state-arrow" ref={stateArrow}>
                            <FontAwesomeIcon icon={arrow} />
                        </div>
                    </div>
                    <ul className="state-item-list" ref={stateBox}>
                        {searchItemStateList()}
                    </ul>
                </div>
            </div>
            <div className="search-footer">
                <button onClick={() => onClickSearchReset()} className="reset-btn">
                    <FontAwesomeIcon icon={resetIcon} className="icon-custom" />
                    초기화
                </button>
                <button onClick={() => (props.setIsShow(false), setSearchButton(!searchButton))} className="search-btn">
                    강좌 검색
                </button>
            </div>
        </Styled.LectureSearchBox>
    )
}

export default LectureSearchBoxView;