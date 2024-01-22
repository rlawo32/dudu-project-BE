import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import dompurify from "dompurify";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight as arrowIcon} from "@fortawesome/free-solid-svg-icons";

const MainInformEventView = styled.div`
  width: 1440px;
  margin: 160px auto;
  
  .el-list {
    display: flex;
    
    .el-list-item {
      position: relative;
      min-height: 150px;
      width: calc((100% - 126px) / 4);
      padding: 40px 40px 85px 40px;
      margin: 0 16px;
      border: 1px solid #d8c9c9;
      border-radius: 8px;
      cursor: pointer;
      
      .el-list-title {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        padding: 0;
        margin-bottom: 8px;
        font-size: 20px;
        font-weight: bold;
        line-height: 32px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
      }
      
      .el-list-content {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        padding: 0;
        margin: 0;
        font-size: 16px;
        font-weight: normal;
        line-height: 26px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
      }
      
      .el-list-date {
        position: absolute;
        bottom: 30px;
        left: 40px;
        padding: 0;
        margin: 0;
        font-size: 14px;
        line-height: 22px;
      }
    }
  }
  
  .el-more {
    position: relative;
    padding-right: 40px;
    margin-top: 40px;
    font-size: 24px;
    font-weight: bold;
    line-height: 32px;
    cursor: pointer;
    
    .icon-custom {
      margin-left: 20px;
      font-size: 20px;
    }
  }
`;

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
        <MainInformEventView>
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
        </MainInformEventView>
    )
}

export default MainInformEvent;