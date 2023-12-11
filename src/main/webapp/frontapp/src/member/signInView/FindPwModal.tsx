import {useRef, useState} from "react";
import styled from "styled-components";
import React from "react";

import MemberAuth from "../MemberAuth";
import axios from "axios";
import useJoinProgressStore from "../../stores/useJoinProgressStore";

const FindPwModalView = styled.div`
  position: relative;
  height: 400px;
  width: 400px;
  background-color: black;
`;

interface Props {
    setIsFindPwModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const FindPwModal = (props: Props) => {
    const modalRef:any = useRef<any>();

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
        <FindPwModalView ref={modalRef}>

            <button onClick={() => props.setIsFindPwModal(false)}>끄기</button>

            {
                isMemberEmailCheck ?
                    <div style={{color: "white"}}>
                        <h1>새 비밀번호</h1>
                        <input type="password" onChange={(e) => changePwRegex(e.target.value)} />
                        <input type="password" onChange={(e) => changePwChkRegex(e.target.value)} />
                        <button onClick={() => changePwHandler()}>변경하기</button>
                    </div>
                    :
                    <MemberAuth setIsMemberEmailCheck={setIsMemberEmailCheck} duplicationChk={false}/>
            }

        </FindPwModalView>
    )
}

export default FindPwModal;