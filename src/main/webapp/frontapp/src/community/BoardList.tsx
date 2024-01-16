import React, {useEffect, useState} from "react";
import axios from "axios";

import HeaderNavigation from "../navigation/HeaderNavigation";
import FooterNavigation from "../navigation/FooterNavigation";

import * as Styled from "./BoardList.style";
import {useNavigate} from "react-router-dom";

const BoardList = () => {
    const navigate = useNavigate();

    const [pageNo, setPageNo] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(0);

    const [institutionNo, setInstitutionNo] = useState<number>(0);
    const [searchCategory, setSearchCategory] = useState<string>("BI");
    const [searchText, setSearchText] = useState<string>("");

    const [boardList, setBoardList] = useState<{
        boardNo:number;
        boardTitle:string;
        boardCreatedDate:string;
    }[]>([]);

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
                console.log(res.data.data)
                setBoardList(res.data.data.boardList);
                setTotalPage(res.data.data.totalPage);
            }).catch((err):void => {
                console.log(err.message);
            });
        }
        setTimeout(() => {boardList().then();}, 0);
    }, [pageNo, institutionNo, searchCategory])


    return (
        <Styled.BoardListView>
            <HeaderNavigation />

            <div className="bl-view">
                <div className="bl-sub">
                    <div className="bl-sub-title">

                    </div>
                    <div className="bl-sub-input">
                        <input type="text" value={searchText}
                               onChange={(e) => setSearchText(e.target.value)}/>
                    </div>
                </div>
                <div className="bl-main">
                    <div className="bl-category">
                        <div className="bl-category-inform" onClick={() => setSearchCategory("BI")}>

                        </div>
                        <div className="bl-category-event" onClick={() => setSearchCategory("BE")}>

                        </div>
                    </div>
                    <div className="bl-list">
                        <div className="bl-list-head">
                            <div className="bl-total">
                                전체{totalPage}개
                            </div>
                            <div className="bl-sort">

                            </div>
                        </div>
                        <div className="bl-list-body">
                            {boardList.map((item, idx) => (
                                <div className="bl-list-item" key={idx}>
                                    <div className="bl-item-title"
                                         onClick={() => navigate("/boardDetail/" + item.boardNo,
                                             { state: {boardNo: item.boardNo}})}>
                                        {item.boardTitle}
                                    </div>
                                    <div className="bl-item-date">
                                        {item.boardCreatedDate}
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