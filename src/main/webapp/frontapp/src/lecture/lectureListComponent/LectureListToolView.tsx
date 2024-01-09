import React, {useEffect, useRef, useState} from "react";

import useLectureSearchDataStore from "../../stores/useLectureSearchDataStore";

import * as Styled from "./LectureListToolView.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faSearch as search,
    faXmark as deleteBtn,
    faArrowRightArrowLeft as sortIcon,
    faRotateRight as resetIcon
} from "@fortawesome/free-solid-svg-icons";

interface Props {
    ltType: string;
    ltCount: number;
    isSetBoxShow: React.Dispatch<React.SetStateAction<boolean>>;
    institutionNo: number;
    setSortType: React.Dispatch<React.SetStateAction<string>>;
}

const LectureListToolView = (props : Props) => {
    const sortBox:any = useRef<any>();
    const sortBtn:any = useRef<any>([]);

    const [isSearchInventory, setIsSearchInventory] = useState<boolean>(false);
    const [isSearchText, setIsSearchText] = useState<string>("");
    const [isSearchDivision, setIsSearchDivision] = useState<{
        idx:number;
        dvItem:string;
    }[]>([]);
    const [isSearchState, setIsSearchState] = useState<{
        idx:number;
        stItem:number;
        stName:string;
    }[]>([]);

    const [isSortBoxShow, setIsSortBoxShow] = useState<boolean>(false);
    const [sortSelect, setSortSelect] = useState<number>(0);
    const sortArr:any[] = [
        {key:'1', value:'강의시작일순'},
        {key:'2', value:'접수인원순'},
        {key:'3', value:'마감임박순'},
        {key:'4', value:'낮은가격순'},
        {key:'5', value:'높은가격순'}
    ];

    const {searchButton, setSearchButton, searchText, setSearchText,
        ltDivisionArr, removeLtDivisionArr, removeAllLtDivisionArr,
        ltStateArr, removeLtStateArr, removeAllLtStateArr} = useLectureSearchDataStore();

    const sortItemList = ():any[] => {
        let result:any[] = [];

        for(let i:number=0; i<sortArr.length; i++) {
            result.push(<li key={sortArr[i].key}
                            ref={btn => (sortBtn.current[i] = btn)}
                            onClick={() => onClickSortSelectBox(i, sortArr[i].key)}>
                {sortArr[i].value}</li>)
        }
        return result;
    }

    const onClickSortSelectBox = (idx:number, sortType:string):void => {
        setIsSortBoxShow(false);
        setSortSelect(idx);
        props.setSortType(sortType);
    }

    const onClickSearchReset = ():void => {
        setSearchText("");
        removeAllLtDivisionArr();
        removeAllLtStateArr();
        setSearchButton(!searchButton);
    }

    useEffect(() => {
        setSortSelect(0);
    }, [props.institutionNo])

    useEffect(() => {
        setIsSearchText(searchText);
        setIsSearchDivision(ltDivisionArr);
        setIsSearchState(ltStateArr);
        if(searchText.length > 0 || ltDivisionArr.length > 0 || ltStateArr.length > 0) {
            setIsSearchInventory(true);
        } else {
            setIsSearchInventory(false);
        }
    }, [searchButton])

    useEffect(() => {
        if(isSearchText.length > 0 || isSearchDivision.length > 0 || isSearchState.length > 0) {
        } else {
            setIsSearchInventory(false);
        }
    }, [searchText, ltDivisionArr, ltStateArr])

    useEffect(() => {
        if(isSortBoxShow) {
            sortBox.current.className += " show-list";
        } else {
            sortBox.current.className = sortBox.current.className.replace(' show-list', '');
        }
    }, [isSortBoxShow])

    useEffect(() => {
        sortBtn.current[sortSelect].className = sortBtn.current[sortSelect].className.replace('sort-active', '');
        sortBtn.current[sortSelect].className += 'sort-active';

        for(let i:number=0; i<sortBtn.current.length; i++) {
            if(i !== sortSelect) {
                sortBtn.current[i].className = sortBtn.current[i].className.replace('sort-active', '');
            }
        }
    }, [sortSelect])

    return (
        <Styled.LectureListTool $isInventory={isSearchInventory} $searchText={searchText}
                                $searchDivision={ltDivisionArr} $searchState={ltStateArr}>
            <div className="lt-list-tool">
                <div className="tool-left">
                    <div className="tool-total">
                        <span style={{fontSize: "13px", fontWeight: "bold"}}>{props.ltCount}개</span>
                        <span style={{fontSize: "13px"}}>의강좌</span>
                    </div>
                </div>
                <div className="tool-right">
                    {
                        props.ltType === 'L' ?
                            <div className="tool-search">
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    props.isSetBoxShow(true)}}>
                                    <FontAwesomeIcon icon={search} className="icon-custom" />
                                    상세검색
                                </button>
                            </div>
                            :
                            <div />
                    }
                    <div className="tool-sort">
                        <button onClick={(e) => {
                            e.stopPropagation();
                            setIsSortBoxShow(!isSortBoxShow)}}>
                            <FontAwesomeIcon icon={sortIcon} className="icon-custom" />
                            {sortArr[sortSelect].value}
                        </button>
                        <ul className="sort-list" ref={sortBox}>
                            {sortItemList()}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="lt-search-inventory">
                <div className="inventory-item item-reset">
                    <FontAwesomeIcon icon={resetIcon} className="icon-custom" onClick={() => onClickSearchReset()} />
                </div>
                <div className="inventory-item item-searchText">
                    <span>{isSearchText}</span>
                    <span>
                        <FontAwesomeIcon icon={deleteBtn} className="icon-custom"
                                         onClick={() => {setSearchText(""); setSearchButton(!searchButton)}}/>
                    </span>
                </div>
                {
                    isSearchDivision.map((item) => (
                        <div key={item.dvItem} className="inventory-item item-searchDivision">
                            <span>{item.dvItem}</span>
                            <span>
                                <FontAwesomeIcon icon={deleteBtn} className="icon-custom"
                                                 onClick={() => {removeLtDivisionArr(item.dvItem); setSearchButton(!searchButton)}}/>
                            </span>
                        </div>
                    ))
                }
                {
                    isSearchState.map((item) => (
                        <div key={item.stItem} className="inventory-item item-searchState">
                            <span>{item.stName}</span>
                            <span>
                                <FontAwesomeIcon icon={deleteBtn} className="icon-custom"
                                                 onClick={() => {removeLtStateArr(item.stItem); setSearchButton(!searchButton)}}/>
                            </span>
                        </div>
                    ))
                }
            </div>
        </Styled.LectureListTool>
    )
}

export default LectureListToolView;