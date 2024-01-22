import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import dompurify from "dompurify";

import * as Styled from "./MainInformEvent.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight as arrowIcon} from "@fortawesome/free-solid-svg-icons";

const MainInformEvent = () => {
    const navigate = useNavigate();

    const sanitizer = dompurify.sanitize;
    // 스크립트를 활용한 토큰 탈취 처럼 취약점을 노려서 javascript와 HTML로 악의적 코드를 웹 브라우저에 심어,
    // 사용자 접속시 그 악성코드가 실행되는 것을 크로스 사이드 스크립트, 보안을 위해 추가

    const [boardList, setBoardList] = useState<{
        boardNo:number;
        boardTitle:string;
        boardContent:string;
        boardCreatedDate:string;
    }[]>([]);

    useEffect(() => {
        const getListData:object = {
            pageNo: 0,
            institutionNo: 0,
            searchCategory: "BI",
            searchText: "",
        }
        const boardList = async () => {
            await axios({
                method: "POST",
                url: '/board/boardList',
                data: JSON.stringify(getListData),
                headers: {'Content-type': 'application/json'}
            }).then((res):void => {
                setBoardList(res.data.data.boardList);
            }).catch((err):void => {
                console.log(err.message);
            });
        }
        setTimeout(() => {boardList().then();}, 100);
    }, [])

    return (
        <Styled.MainInformEventView>
            <div className="el-title" onClick={() => navigate("/boardList")}>
                <div className="inform-title">공지사항</div>
                <FontAwesomeIcon icon={arrowIcon} className="icon-custom" />
            </div>
            <div className="el-list">
                {
                    boardList.map((item) => {
                        return (
                            <div key={item.boardNo} className="el-list-item"
                                 onClick={() => navigate("/boardDetail/" + item.boardNo,
                                     {state: {boardNo: item.boardNo}})}>
                                <div className="el-list-title">
                                    {item.boardTitle}
                                </div>
                                <div className="el-list-content"
                                     dangerouslySetInnerHTML={{ __html : sanitizer(item.boardContent.replace(/(<([^>]+)>)/gi, '')) }} />
                                <div className="el-list-date">
                                    {item.boardCreatedDate.substring(0, 10)}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="el-more" onClick={() => navigate("/boardList")}>
                이외의 다양한 소식을 확인해보세요! <FontAwesomeIcon icon={arrowIcon} className="icon-custom" />
            </div>
        </Styled.MainInformEventView>
    )
}

export default MainInformEvent;