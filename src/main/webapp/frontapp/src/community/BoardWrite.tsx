import React, {useEffect, useState} from "react";

import LectureQuillEditor from "../lecture/lectureWriteComponent/LectureQuillEditor";
import HeaderNavigation from "../navigation/HeaderNavigation";
import FooterNavigation from "../navigation/FooterNavigation";

import * as Styled from "./BoardWrite.style";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const BoardWrite = () => {
    const navigate = useNavigate();

    const [institutionList, setInstitutionList] = useState<{
        institutionNo:string;
        institutionName:string;
        institutionContact:string;
    }[]>([]);

    const [boardCategory, setBoardCategory] = useState<string>("BI");
    const [boardInstitution, setBoardInstitution] = useState<string>("");
    const [boardTitle, setBoardTitle] = useState<string>("");
    const [boardContent, setBoardContent] = useState<string>("");
    const [boardImageArr, setBoardImageArr] = useState<{
        imgType:string;
        imgName:string;
        imgUrl:string;
        imgSize:number;
    }[]>([]);

    const boardWriteHandler = ():boolean => {
        const boardData:object = {
            boardCategory: boardCategory,
            boardInstitution: boardInstitution,
            boardTitle: boardTitle,
            boardContent: boardContent,
            boardImage: boardImageArr
        }
        if(boardTitle.length < 1) {
            alert('제목을 작성해주세요.');
            return false;
        } else if(boardContent.length < 1) {
            alert('내용을 작성해주세요.');
            return false;
        } else {
            if(window.confirm("작성하시겠습니까?") == true) {
                axios({
                    method: "POST",
                    url: "/board/boardWrite",
                    data: JSON.stringify(boardData),
                    headers: {'Content-type': 'application/json'}
                }).then((res):void => {
                    alert("작성이 완료되었습니다.");
                    navigate("/");
                }).catch((err):void => {
                    console.log(err.message);
                })
                return true;
            } else {
                return false;
            }
        }
    }

    useEffect(() => {
        const selectDataList = async ():Promise<void> => {
            await axios({
                method: "GET",
                url: "/lecture/lectureInstitutionList"
            }).then((res):void => {
                setInstitutionList(res.data.data);
                setBoardInstitution(res.data.data[0].institutionNo + "");
            }).catch((err):void => {
                console.log(err.message);
            })
        }
        setTimeout(() => {selectDataList().then();}, 100);
    }, [])

    return (
        <Styled.BoardWriteView>
            <HeaderNavigation />

            <div className="bw-view">
                <div className="bw-select">
                    <div className="sl-title">
                        <div className="item-title">제목 작성</div>
                        <input type="text" value={boardTitle}
                               onChange={(e) => setBoardTitle(e.target.value)}/>
                    </div>
                    <div className="sl-category">
                        <div className="item-title">게시판 선택</div>
                        <select value={boardCategory}
                                onChange={(e) => setBoardCategory(e.target.value)}>
                            <option value="BI">공지사항</option>
                            <option value="BE">이벤트</option>
                        </select>
                    </div>
                    <div className="sl-institution">
                        <div className="item-title">지점 선택</div>
                        <select value={boardInstitution}
                                onChange={(e) => setBoardInstitution(e.target.value)}>
                            {institutionList.map((option) => (
                                <option key={option.institutionNo} value={option.institutionNo}>
                                    {option.institutionName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="bw-write">
                    <div className="wr-content">
                        <div className="item-title">내용 작성</div>
                        <LectureQuillEditor useType={"B"} content={boardContent} setContent={setBoardContent}
                                            Image={boardImageArr} setImage={setBoardImageArr}/>
                    </div>
                </div>
                <div className="bw-button">
                    <button onClick={() => boardWriteHandler()}>작성하기</button>
                </div>
            </div>

            <FooterNavigation />
        </Styled.BoardWriteView>
    )
}

export default BoardWrite;