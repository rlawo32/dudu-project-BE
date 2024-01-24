import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import dompurify from "dompurify";
import axios from "axios";

import * as Styled from "./BoardDetail.style";
import HeaderNavigation from "../navigation/HeaderNavigation";
import FooterNavigation from "../navigation/FooterNavigation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpLong as topIcon} from "@fortawesome/free-solid-svg-icons";

const BoardDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const boardNo:number = location.state.boardNo;

    const sanitizer = dompurify.sanitize;
    // 스크립트를 활용한 토큰 탈취 처럼 취약점을 노려서 javascript와 HTML로 악의적 코드를 웹 브라우저에 심어,
    // 사용자 접속시 그 악성코드가 실행되는 것을 크로스 사이드 스크립트, 보안을 위해 추가

    const [boardDetail, setBoardDetail] = useState<{
        boardNo:number; institutionName:string; boardCategory:string;
        boardTitle:string; boardContent:string; boardCreatedDate:string;
    }>();

    useEffect(() => {
        const boardDetail = async () => {
            await axios({
                method: "GET",
                url: '/board/boardDetail',
                params: {boardNo: boardNo}
            }).then((res):void => {
                setBoardDetail(res.data.data);
            }).catch((err):void => {
                console.log(err.message);
            });
        }
        setTimeout(() => {boardDetail().then();}, 100);
    }, [])

    console.log(boardDetail)

    return (
        <Styled.BoardDetailView>
            <HeaderNavigation />

            <div className="top-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <FontAwesomeIcon icon={topIcon} className="icon-custom" />
            </div>

            <div className="bd-main-view">
                <div className="bd-head">
                    <div className="head-top">
                        <div className="head-item bd-category">
                            {
                                boardDetail?.boardCategory === 'BI' ? "공지사항" : "이벤트"
                            }
                        </div>
                        <div className="head-item bd-institution">
                            {boardDetail?.institutionName}
                        </div>
                        <div className="head-item bd-date">
                            {boardDetail?.boardCreatedDate.substring(0, 10)}
                        </div>
                    </div>
                    <div className="head-bottom">
                        <div className="bd-title">
                            {boardDetail?.boardTitle}
                        </div>
                    </div>
                </div>
                <div className="bd-body">
                    <div className="bd-content"
                         dangerouslySetInnerHTML={{ __html : sanitizer(`${boardDetail?.boardContent}`) }} />
                </div>
                <div className="bd-foot">
                    <button onClick={() => navigate("/boardList")}>
                        목록으로
                    </button>
                </div>
            </div>

            <FooterNavigation />
        </Styled.BoardDetailView>
    )
}

export default BoardDetail;