import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import dompurify from "dompurify";
import axios from "axios";

import * as Styled from "./BoardDetail.style";
import HeaderNavigation from "../navigation/HeaderNavigation";
import FooterNavigation from "../navigation/FooterNavigation";

const BoardDetail = () => {
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

            <div>

            </div>

            <FooterNavigation />
        </Styled.BoardDetailView>
    )
}

export default BoardDetail;