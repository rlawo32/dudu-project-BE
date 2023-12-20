import React, {useState} from "react";
import axios from "axios";

import useJoinProgressStore from "../stores/useJoinProgressStore";
import * as Styled from "./SignUp.style";

interface Props {
    setIsMemberEmailCheck: React.Dispatch<React.SetStateAction<boolean>>;
    duplicationChk: boolean;
}

const MemberAuth = (props: Props):any => {

    const [memberEmail, setMemberEmail] = useState<string>("");
    const [memberEmailCode, setMemberEmailCode] = useState<string>("");
    const [memberEmailCodeChk, setMemberEmailCodeChk] = useState<string>("");

    const [isMemberEmailConfirm, setIsMemberEmailConfirm] = useState<boolean>(false);
    const [isMemberEmailCodeChkConfirm, setIsMemberEmailCodeChkConfirm] = useState<boolean>(false);

    const [memberEmailMessage, setMemberEmailMessage] = useState<string>("");
    const [memberEmailCodeChkMessage, setMemberEmailCodeChkMessage] = useState<string>("");
    const [isMemberEmailEffect, setIsMemberEmailEffect] = useState<boolean>(true);
    const [isMemberEmailCodeChkEffect, setIsMemberEmailCodeChkEffect] = useState<boolean>(true);
    const [isMemberEmailSend, setIsMemberEmailSend] = useState<boolean>(false);

    const {setInputMemberEmail} = useJoinProgressStore();

    const memberEmailRegex = (data:string):void => {
        // eslint-disable-next-line no-useless-escape
        const regexChk:RegExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        const currentData:string = data;

        setMemberEmail(currentData);

        if(!regexChk.test(currentData)) {
            setMemberEmailMessage('이메일 주소를 다시 확인해주세요.');
            setIsMemberEmailEffect(false);
            setIsMemberEmailConfirm(false);
        } else {
            setMemberEmailMessage('');
            setIsMemberEmailEffect(true);
            setIsMemberEmailConfirm(true);
        }
    }

    const memberEmailCodeChkRegex = (data:string):void => {
        const regexChk:RegExp = /^.{6}$/;
        const currentData:string = data;

        setMemberEmailCodeChk(currentData);

        if(!regexChk.test(currentData)) {
            setMemberEmailCodeChkMessage('인증번호를 다시 확인해주세요.');
            setIsMemberEmailCodeChkEffect(false);
            setIsMemberEmailCodeChkConfirm(false);
        } else {
            setMemberEmailCodeChkMessage('');
            setIsMemberEmailCodeChkEffect(true);
            setIsMemberEmailCodeChkConfirm(true);
        }
    }

    const emailAuthSendHandler = async():Promise<void> => {

        if(isMemberEmailConfirm) {
            if(props.duplicationChk) {
                await axios({
                    method: "GET",
                    url: "/member/memberEmailDuplicationChk",
                    params: {memberEmail: memberEmail}
                }).then((res):void => {
                    if(res.data) {
                        alert('이미 가입된 이메일입니다.');
                        setIsMemberEmailEffect(false);
                        setMemberEmailMessage('이미 가입된 이메일입니다.');
                    } else {
                        emailAuthSend();
                    }
                }).catch((err):void => {
                    console.log(err.message);
                })
            } else {
                emailAuthSend();
            }
        } else {
            alert('이메일을 확인해주세요.');
            setMemberEmailMessage('이메일 주소를 다시 확인해주세요.');
            setIsMemberEmailEffect(false);
            setIsMemberEmailConfirm(false);
        }
    }

    const emailAuthSend = ():void => {
        alert('인증코드를 발송했습니다. 이메일을 확인해주세요.');
        setIsMemberEmailEffect(true);
        setMemberEmailMessage('');
        setIsMemberEmailSend(true);

        axios({
            method: "GET",
            url: "/member/sendAuthCode",
            params: {memberEmail: memberEmail}
        }).then((res) => {
            console.log('authCode : ' + res.data.authCode);
            setMemberEmailCode(res.data.authCode);
        }).catch((err) => {
            alert('인증코드 발송에 실패했습니다.' + err);
        })
    }

    const emailAuthCheckHandler = async ():Promise<void> => {

        if(isMemberEmailCodeChkConfirm) {
            if(memberEmailCode === memberEmailCodeChk) {
                if(!props.duplicationChk) {
                    await axios({
                        method: "GET",
                        url: "/member/memberEmailDuplicationChk",
                        params: {memberEmail: memberEmail}
                    }).then((res):void => {
                        if(res.data) {
                            alert('인증에 성공하였습니다!');
                            props.setIsMemberEmailCheck(true);
                        } else {
                            alert('인증에 성공하였습니다!');
                            setMemberEmailMessage('가입된 사용자가 없습니다.');
                            setIsMemberEmailEffect(false);
                            setIsMemberEmailConfirm(false);
                            props.setIsMemberEmailCheck(false);
                        }
                    }).catch((err):void => {
                        console.log(err.message);
                    })
                } else {
                    alert('인증에 성공하였습니다!');
                    props.setIsMemberEmailCheck(true);
                    setInputMemberEmail(memberEmail);
                }
            } else {
                alert('인증번호가 일치하지 않습니다.');
                setMemberEmailCodeChkMessage('인증번호가 일치하지 않습니다.');
                setIsMemberEmailCodeChkEffect(false);
                setIsMemberEmailCodeChkConfirm(false);
            }
        } else {
            alert('인증번호를 확인해주세요.');
            setMemberEmailCodeChkMessage('인증번호를 다시 확인해주세요.');
            setIsMemberEmailCodeChkEffect(false);
            setIsMemberEmailCodeChkConfirm(false);
        }
    }

    return (
        <div>
            <div style={ {marginBottom: '25px'} }>
                <div>
                    <Styled.EmailAuthInput type="text" onChange={(data) => memberEmailRegex(data.target.value)} placeholder="이메일"
                                           style={ isMemberEmailEffect ? {} : {border: '2px solid red'} } />
                    <Styled.EmailAuthButton onClick={() => emailAuthSendHandler()}>전송하기</Styled.EmailAuthButton>
                </div>
                <div style={  isMemberEmailEffect ? {display:'none'} : {marginLeft:'5px', color:'red', fontSize:'11px'} }>
                    {memberEmailMessage}
                </div>
            </div>
            <div style={ {marginBottom: '25px'} }>
                <div style={ isMemberEmailSend ? {display:'block'} : {display:'none'} } >
                    <Styled.EmailAuthInput type="text" onChange={(e) => memberEmailCodeChkRegex(e.target.value)} placeholder="이메일 인증"
                                           style={ isMemberEmailCodeChkEffect ? {} : {border: '2px solid red'} } />
                    <Styled.EmailAuthButton onClick={() => emailAuthCheckHandler()}>인증하기</Styled.EmailAuthButton>
                </div>
                <div style={  isMemberEmailCodeChkEffect ? {display:'none'} : {marginLeft:'5px', color:'red', fontSize:'11px'} }>
                    {memberEmailCodeChkMessage}
                </div>
            </div>
        </div>
    )
}

export default MemberAuth;