import {useState} from "react";
import axios from "axios";

import useJoinProgressStore from "../../stores/useJoinProgressStore";

const EmailAuth = ():any => {

    const [memberEmail, setMemberEmail] = useState("");
    const [memberEmailCode, setMemberEmailCode] = useState("");
    const [memberEmailCodeChk, setMemberEmailCodeChk] = useState("");

    const [isMemberEmailConfirm, setIsMemberEmailConfirm] = useState(false);
    const [isMemberEmailCodeChkConfirm, setIsMemberEmailCodeChkConfirm] = useState(false);
    const [isMemberEmailCheck, setIsMemberEmailCheck] = useState(false);

    const [memberEmailMessage, setMemberEmailMessage] = useState("");
    const [memberEmailCodeChkMessage, setMemberEmailCodeChkMessage] = useState("");
    const [isMemberEmailEffect, setIsMemberEmailEffect] = useState(true);
    const [isMemberEmailCodeChkEffect, setIsMemberEmailCodeChkEffect] = useState(true);

    const {setActiveProgressTab, setInputMemberEmail} = useJoinProgressStore();


    const memberEmailRegex = (data:string):void => {
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
                    alert('인증코드를 발송했습니다. 이메일을 확인해주세요.');
                    setIsMemberEmailEffect(true);
                    setMemberEmailMessage('');

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
            })
        } else {
            alert('이메일을 확인해주세요.');
            setMemberEmailMessage('이메일 주소를 다시 확인해주세요.');
            setIsMemberEmailEffect(false);
            setIsMemberEmailConfirm(false);
        }
    }

    const emailAuthCheckHandler = ():void => {

        if(isMemberEmailCodeChkConfirm) {
            if(memberEmailCode === memberEmailCodeChk) {
                alert('인증에 성공하였습니다!');
                setIsMemberEmailCheck(true);
                setInputMemberEmail(memberEmail);
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
        <>
            <h1>이메일 인증</h1>
            <div>
                <input type="text" onChange={(data) => memberEmailRegex(data.target.value)} placeholder="이메일"
                       style={ isMemberEmailEffect ? {} : {border: '2px solid red'} } />
                <span style={  isMemberEmailEffect ? {display:'none'} : {display:'inline', color:'red', fontSize:'13px'} }>
                        {memberEmailMessage}
                </span>
                <button onClick={() => emailAuthSendHandler()}>전송하기</button>
                <input type="text" onChange={(e) => memberEmailCodeChkRegex(e.target.value)} placeholder="이메일 인증"
                       style={ isMemberEmailCodeChkEffect ? {} : {border: '2px solid red'} } />
                <span style={  isMemberEmailCodeChkEffect ? {display:'none'} : {display:'inline', color:'red', fontSize:'13px'} }>
                        {memberEmailCodeChkMessage}
                </span>
                <button onClick={() => emailAuthCheckHandler()}>확인하기</button>
            </div>

            <button onClick={() => setActiveProgressTab("joinProgress1")}>뒤로 가기</button>
            <button onClick={() => setActiveProgressTab("joinProgress3")}
                    style={isMemberEmailCheck ? {display: 'inline'} : {display: 'none'}}>다음 단계</button>
        </>
    )
}

export default EmailAuth;