import {useRef, useState} from "react";
import {useDrag} from "react-use-gesture";
import React from "react";
import styled from "styled-components";
import axios from "axios";

import MemberAuth from "../MemberAuth";
import useJoinProgressStore from "../../stores/useJoinProgressStore";

import * as Modal from "./Modal.style";

interface Props {
    setIsFindPwModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface modalPosition {
    x: number;
    y: number;
}

const FindPwModalView = styled.div<modalPosition>`
  position: absolute;
  top: ${(props) => props.y + "px"};
  left: ${(props) => props.x + "px"};
  height: 500px;
  width: 500px;
  border: 1px solid ${({theme}) => theme.textColor};
  border-radius: 15px;
  background-color: ${({theme}) => theme.bgColor};
`;

const FindPwModal = (props: Props) => {
    const modalRef:any = useRef<any>();

    const [logoPos, setLogoPos] = useState({x:0, y:0})
    const bindLogoPos = useDrag((params)=>{
        setLogoPos({
            x: params.offset[0],
            y: params.offset[1]
        })
    });

    const [isMemberEmailCheck, setIsMemberEmailCheck] = useState<boolean>(false);
    const [changePw, setChangePw] = useState<string>("");
    const [changePwMessage, setChangePwMessage] = useState<string>("");
    const [isChangePwEffect, setIsChangePwEffect] = useState<boolean>(true);
    const [isChangePwConfirm, setIsChangePwConfirm] = useState<boolean>(false);

    const {inputMemberEmail} = useJoinProgressStore();

    const changePwRegex = (data:string):void => {
        const regexChk:RegExp = /^(?=.*[a-zA-Z])(?=.*[!?@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
        const currentData:string = data;

        setChangePw(currentData);

        if(!regexChk.test(currentData)) {
            setChangePwMessage('비밀번호를 다시 확인해주세요.');
            setIsChangePwEffect(false);
        } else {
            setChangePwMessage('');
            setIsChangePwEffect(true);
        }
    }

    const changePwChkRegex = (data:string):void => {
        const currentData:string = data;

        if(changePw !== currentData) {
            setChangePwMessage('비밀번호를 다시 확인해주세요.');
            setIsChangePwEffect(false);
            setIsChangePwConfirm(false);
        } else {
            setChangePwMessage('');
            setIsChangePwEffect(true);
            setIsChangePwConfirm(true);
        }
    }

    const changePwHandler = ():void => {
        const changePwData:object = {
            memberEmail: inputMemberEmail,
            memberPw: changePw
        }

        if(isChangePwConfirm) {
            axios({
                method: "POST",
                url: "/member/findMemberPw",
                data: changePwData,
                headers: {'Content-type': 'application/json'}
            }).then((res) => {
                alert('변경완료');
            }).catch((err) => {
                console.log(err);
            })
        } else {
            alert('비밀번호를 다시 확인해주세요.');
        }
    }

    return (
        <FindPwModalView ref={modalRef} x={logoPos.x} y={logoPos.y}>
            <Modal.ModalTabBar {...bindLogoPos()} className="chat-drag-design">
                <button onClick={() => props.setIsFindPwModal(false)}>X</button>
            </Modal.ModalTabBar>

            {
                isMemberEmailCheck ?
                    <Modal.ModalFindView>
                        <div className="findIdView-box">
                            <p>
                                비밀번호 찾기
                            </p>
                            <p>
                                비밀번호를 새롭게 설정하실 수 있습니다.
                            </p>
                        </div>
                        <span></span>
                        <div className="findIdView-box">
                            <div>
                                <div style={{marginTop: "25px"}}>비밀번호 입력</div>
                                <Modal.ModalInput type="password" onChange={(e) => changePwRegex(e.target.value)}
                                                  placeholder="비밀번호를 입력해주세요." />
                            </div>
                            <div>
                                <div>비밀번호 확인</div>
                                <Modal.ModalInput type="password" onChange={(e) => changePwChkRegex(e.target.value)}
                                                  placeholder="비밀번호 확인을 해주세요." />
                            </div>
                            <div>
                                <Modal.ModalButton onClick={() => props.setIsFindPwModal(false)}>취소</Modal.ModalButton>
                                <Modal.ModalButton onClick={() => changePwHandler()}>변경</Modal.ModalButton>
                            </div>
                        </div>
                    </Modal.ModalFindView>
                    :
                    <Modal.ModalFindView>
                        <div className="findIdView-box">
                            <p>
                                비밀번호 찾기
                            </p>
                            <p>
                                이메일 인증 후 비밀번호를 다시 설정하실 수 있습니다.
                            </p>
                        </div>
                        <span></span>
                        <div className="findIdView-box" style={{marginTop: "25px"}}>
                            <h3>이메일 인증</h3>
                            <MemberAuth setIsMemberEmailCheck={setIsMemberEmailCheck} duplicationChk={false}/>
                        </div>
                    </Modal.ModalFindView>
            }

        </FindPwModalView>
    )
}

export default FindPwModal;