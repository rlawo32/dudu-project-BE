import {useRef, useState} from "react";
import {useDrag} from "react-use-gesture";
import React from "react";
import styled from "styled-components";
import axios from "axios";

import * as Modal from "./Modal.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope as emailIcon} from "@fortawesome/free-solid-svg-icons";

interface Props {
    setIsFindIdModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface modalPosition {
    x: number;
    y: number;
}

const FindIdModalView = styled.div<modalPosition>`
  position: absolute;
  top: ${(props) => props.y + "px"};
  left: ${(props) => props.x + "px"};
  height: 500px;
  width: 500px;
  border: 1px solid ${({theme}) => theme.textColor};
  border-radius: 15px;
  background-color: ${({theme}) => theme.bgColor};
`;

const FindIdModal = (props: Props) => {
    const modalRef:any = useRef<any>();

    const [logoPos, setLogoPos] = useState({x:0, y:0})
    const bindLogoPos = useDrag((params)=>{
        setLogoPos({
            x: params.offset[0],
            y: params.offset[1]
        })
    });
    
    const [findIdMemberName, setFindIdMemberName] = useState<string>("");
    const [findIdMemberEmail, setFindIdMemberEmail] = useState<string>("");
    const [isFindIdModalSection, setIsFindIdModalSection] = useState<boolean>(true);
    const [findMemberId, setFindMemberId] = useState<string>("");
    const [isFindMemberId, setIsFindMemberId] = useState<boolean>(true);

    const findIdHandler = ():void => {
        const findIdData:object = {
            memberName: findIdMemberName,
            memberEmail: findIdMemberEmail
        }

        axios({
            method: "POST",
            url: "/member/findMemberId",
            data: findIdData,
            headers: {'Content-type': 'application/json'}
        }).then((res) => {
            const responseData = res.data;
            console.log(responseData);
            if(responseData.result) {
                let encodeId:string = "";
                for(let i:number=0; i<responseData.data.length; i++) {
                    if(i < 2) {
                        encodeId += responseData.data.substring(i, i+1);
                    } else {
                        encodeId += "*";
                    }
                }
                setFindMemberId(encodeId);
                setIsFindMemberId(true);
            } else {
                setIsFindMemberId(false);
            }
            setIsFindIdModalSection(false);
        }).catch((err) => {
            console.log(err);
        })
    }

    const entireIdHandler = ():void => {
        const entireIdData:object = {
            memberName: findIdMemberName,
            memberEmail: findIdMemberEmail
        }

        axios({
            method: "POST",
            url: "/member/entireMemberId",
            data: entireIdData,
            headers: {'Content-type': 'application/json'}
        }).then(() => {
            alert('입력하신 이메일로 전송되었습니다.');
            props.setIsFindIdModal(false);
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <FindIdModalView ref={modalRef} x={logoPos.x} y={logoPos.y}>
            <Modal.ModalTabBar {...bindLogoPos()} className="chat-drag-design">
                <button onClick={() => props.setIsFindIdModal(false)}>X</button>
            </Modal.ModalTabBar>

            {
                isFindIdModalSection ?
                    <Modal.ModalFindView>
                        <div className="findIdView-box">
                            <p>
                                아이디 찾기
                            </p>
                            <p>
                                등록된 회원정보로 아이디를 찾으실 수 있습니다.
                            </p>
                        </div>
                        <span></span>
                        <div className="findIdView-box">
                            <div>
                                <div style={{marginTop: "25px"}}>이름</div>
                                <Modal.ModalInput type="text" onChange={(e) => setFindIdMemberName(e.target.value)} placeholder="이름을 입력해주세요." />
                            </div>
                            <div>
                                <div>이메일</div>
                                <Modal.ModalInput type="text" onChange={(e) => setFindIdMemberEmail(e.target.value)} placeholder="이메일을 입력해주세요." />
                            </div>

                            <div>
                                <Modal.ModalButton onClick={() => props.setIsFindIdModal(false)}>취소</Modal.ModalButton>
                                <Modal.ModalButton onClick={() => findIdHandler()}>다음</Modal.ModalButton>
                            </div>
                        </div>
                    </Modal.ModalFindView>
                    :
                    isFindMemberId ?
                        <Modal.ModalFindView>
                            <div className="findIdView-box">
                                <p>
                                    아이디 찾기
                                </p>
                                <p>
                                    입력하신 정보와 일치하는 아이디 정보입니다.
                                </p>
                            </div>
                            <span></span>
                            <div className="findIdView-text">아이디 찾기 결과</div>
                            <div className="findIdView-box">
                                <div style={{marginTop: "45px", textAlign: "center"}}>
                                    {findMemberId}
                                </div>
                                <div style={{marginTop: "25px", fontSize: "13px", color: "gray"}}>
                                    -개인정보보호를 위해 아이디 뒷자리는 *로 표시됩니다.
                                </div>
                            </div>
                            <span></span>
                            <div className="findIdView-text">아이디 전체 확인</div>
                            <div className="findIdView-box">
                                <Modal.ModalButton onClick={() => entireIdHandler()} style={{marginTop: "15px"}}>
                                    <FontAwesomeIcon icon={emailIcon} />
                                </Modal.ModalButton>
                            </div>
                        </Modal.ModalFindView>
                        :
                        <Modal.ModalFindView>
                            <div className="findIdView-box">
                                <p>
                                    입력하신 정보와 일치하는 <br />아이디 정보가 없습니다.
                                </p>
                            </div>
                            <span></span>
                            <div className="findIdView-box">

                            </div>
                        </Modal.ModalFindView>
            }
        </FindIdModalView>
    )
}

export default FindIdModal;