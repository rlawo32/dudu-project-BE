import React, {useEffect, useRef, useState} from "react";
import axios from "axios";

import HeaderNavigation from "../navigation/HeaderNavigation";
import FooterNavigation from "../navigation/FooterNavigation";

import * as Styled from "./BoardList.style";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown as arrow} from "@fortawesome/free-solid-svg-icons";

const BoardList = () => {
    const navigate = useNavigate();
    const sortBox:any = useRef<any>();
    const sortList:any = useRef<any>();
    const sortBtn:any = useRef<any>([]);
    const selectArrow:any = useRef<any>();

    const [pageNo, setPageNo] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [isSortBoxShow, setIsSortBoxShow] = useState<boolean>(false);
    const [sortSelect, setSortSelect] = useState<number>(0);

    const [institutionList, setInstitutionList] = useState<{
        institutionNo:number;
        institutionName:string;
        institutionContact:string;
    }[]>([]);
    const [institutionNo, setInstitutionNo] = useState<number>(0);
    const [searchCategory, setSearchCategory] = useState<string>("BI");
    const [searchText, setSearchText] = useState<string>("");

    const [boardList, setBoardList] = useState<{
        boardNo:number;
        boardTitle:string;
        boardCreatedDate:string;
    }[]>([]);

    const sortItemList = ():any[] => {
        let result:any[] = [];

        for(let i:number=0; i<=institutionList.length; i++) {
            if(i === 0) {
                result.push(<li key={i}
                                ref={btn => (sortBtn.current[i] = btn)}
                                onClick={() => onClickSortSelectBox(i, 0)}>
                    전체</li>)
            } else {
                result.push(<li key={i}
                                ref={btn => (sortBtn.current[i] = btn)}
                                onClick={() => onClickSortSelectBox(i, institutionList[i-1].institutionNo)}>
                    {institutionList[i-1].institutionName}</li>)
            }
        }
        return result;
    }

    const onClickSortSelectBox = (idx:number, sortSelect:number):void => {
        setIsSortBoxShow(false);
        setSortSelect(idx);
        setInstitutionNo(sortSelect);
    }

    useEffect(() => {
        const selectDataList = async ():Promise<void> => {
            await axios({
                method: "GET",
                url: "/lecture/lectureInstitutionList"
            }).then((res):void => {
                setInstitutionList(res.data.data);
            }).catch((err):void => {
                console.log(err.message);
            })
        }
        setTimeout(() => {selectDataList().then();}, 100);
    }, [])

    useEffect(() => {
        const getListData:object = {
            pageNo: pageNo,
            institutionNo: institutionNo,
            searchCategory: searchCategory,
            searchText: searchText,
        }
        const boardList = async () => {
            await axios({
                method: "POST",
                url: '/board/boardList',
                data: JSON.stringify(getListData),
                headers: {'Content-type': 'application/json'}
            }).then((res):void => {
                setBoardList(res.data.data.boardList);
                setTotalPage(res.data.data.totalPage);
            }).catch((err):void => {
                console.log(err.message);
            });
        }
        setTimeout(() => {boardList().then();}, 0);
    }, [pageNo, institutionNo, searchCategory])

    useEffect(() => {
        if(isSortBoxShow) {
            sortBox.current.className += " show-list";
            sortList.current.className += " show-list";
            selectArrow.current.className += " show-list";
        } else {
            sortBox.current.className = sortBox.current.className.replace(' show-list', '');
            sortList.current.className = sortList.current.className.replace(' show-list', '');
            selectArrow.current.className = selectArrow.current.className.replace(' show-list', '');
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

    console.log(sortBtn)

    return (
        <Styled.BoardListView>
            <HeaderNavigation />

            <div className="bl-sub-view">
                <div className="bl-sub">
                    <div className="bl-sub-title">
                        공지사항/이벤트
                    </div>
                    <div className="bl-sub-input">
                        <input type="text" value={searchText}
                               onChange={(e) => setSearchText(e.target.value)}/>
                    </div>
                </div>
            </div>
            <div className="bl-main-view">
                <div className="bl-main">
                    <div className="bl-category">
                        <div className="bl-category-inform" onClick={() => setSearchCategory("BI")}>
                            공지사항
                        </div>
                        <div className="bl-category-event" onClick={() => setSearchCategory("BE")}>
                            이벤트
                        </div>
                    </div>
                    <div className="bl-list">
                        <div className="bl-list-head">
                            <div className="bl-total">
                                <span style={{opacity: 0.5, marginRight: "5px"}}>전체</span>
                                <span style={{fontWeight: "bold"}}>{totalPage}개</span>
                            </div>
                            <div className="bl-sort">
                                <button onClick={() => setIsSortBoxShow(!isSortBoxShow)}>
                                    {
                                        sortSelect === 0 ?
                                            "전체"
                                            :
                                            institutionList[sortSelect].institutionName
                                    }
                                    <div className="select-arrow" ref={selectArrow}>
                                        <FontAwesomeIcon icon={arrow} />
                                    </div>
                                </button>
                                <div className="sort-box" ref={sortBox}>
                                    <ul className="sort-list" ref={sortList}>
                                        {sortItemList()}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="bl-list-body">
                            {boardList.map((item, idx) => (
                                <div className="bl-list-item" key={idx}
                                     onClick={() => navigate("/boardDetail/" + item.boardNo,
                                    { state: {boardNo: item.boardNo}})}>
                                    <div className="bl-item-title">
                                        {item.boardTitle}
                                    </div>
                                    <div className="bl-item-date">
                                        {item.boardCreatedDate.substring(0, 10)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <FooterNavigation />
        </Styled.BoardListView>
    )
}

export default BoardList;