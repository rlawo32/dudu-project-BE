import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import useJoinProgressStore from "../../stores/useJoinProgressStore";


const EnterInfo = ():any => {

    const navigate = useNavigate();

    const [memberEmail, setMemberEmail] = useState("");
    const [memberId, setMemberId] = useState("");
    const [memberName, setMemberName] = useState("");
    const [memberPw, setMemberPw] = useState("");
    const [memberPwChk, setMemberPwChk] = useState("");
    const [memberGender, setMemberGender] = useState("");
    const [memberPhone, setMemberPhone] = useState("");

    // 경고 메시지
    const [memberEmailMessage, setMemberEmailMessage] = useState("");
    const [memberIdMessage, setMemberIdMessage] = useState("");
    const [memberNameMessage, setMemberNameMessage] = useState("");
    const [memberPwMessage, setMemberPwMessage] = useState("");
    const [memberPwChkMessage, setMemberPwChkMessage] = useState("");
    const [memberGenderMessage, setMemberGenderMessage] = useState("");
    const [memberPhoneMessage, setMemberPhoneMessage] = useState("");

    // 유효성 검사
    const [isMemberEmailEffect, setIsMemberEmailEffect] = useState(true);
    const [isMemberIdEffect, setIsMemberIdEffect] = useState(true);
    const [isMemberNameEffect, setIsMemberNameEffect] = useState(true);
    const [isMemberPwEffect, setIsMemberPwEffect] = useState(true);
    const [isMemberPwChkEffect, setIsMemberPwChkEffect] = useState(true);
    const [isMemberGenderEffect, setIsMemberGenderEffect] = useState(true);
    const [isMemberPhoneEffect, setIsMemberPhoneEffect] = useState(true);

    const {activeProgressTab, setActiveProgressTab} = useJoinProgressStore();

    const memberEmailRegex = (data:string):void => {
        const regexChk:RegExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        const currentData:string = data;

        // setMemberEmail(currentData);
        setActiveProgressTab(currentData);

        // if(!regexChk.test(currentData)) {
        //     setMemberEmailMessage('이메일 주소를 다시 확인해주세요.');
        //     setIsMemberEmailEffect(false);
        // } else {
        //     setMemberEmailMessage('');
        //     setIsMemberEmailEffect(true);
        // }
    }

    const memberIdRegex = (data:string):void => {
        const regexChk:RegExp = /^[a-zA-Z]?[0-9a-zA-Z]{4,50}$/i;
        const currentData:string = data;

        setMemberId(currentData);

        if(!regexChk.test(currentData)) {
            setMemberIdMessage('아이디를 다시 확인해주세요.');
            setIsMemberIdEffect(false);
        } else {
            setMemberIdMessage('');
            setIsMemberIdEffect(true);
        }
    }

    const memberNameRegex = (data:string):void => {
        const regexChk:RegExp = /^[ㄱ-ㅎ가-힣a-zA-Z]+$/i;
        const currentData:string = data;

        setMemberName(currentData);

        if(!regexChk.test(currentData)) {
            setMemberNameMessage('이름을 다시 확인해주세요.');
            setIsMemberNameEffect(false);
        } else {
            setMemberNameMessage('');
            setIsMemberNameEffect(true);
        }
    }

    const memberPwRegex = (data:string):void => {
        const regexChk:RegExp = /^(?=.*[a-zA-Z])(?=.*[!?@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
        const currentData:string = data;

        setMemberPw(currentData);

        if(!regexChk.test(currentData)) {
            setMemberPwMessage('비밀번호를 다시 확인해주세요.');
            setIsMemberPwEffect(false);
        } else {
            setMemberPwMessage('');
            setIsMemberPwEffect(true);
        }
    }

    const memberPwChkRegex = (data:string):void => {
        const currentData:string = data;

        setMemberPwChk(currentData);

        if(memberPw != currentData) {
            setMemberPwChkMessage('비밀번호를 다시 확인해주세요.');
            setIsMemberPwChkEffect(false);
        } else {
            setMemberPwChkMessage('');
            setIsMemberPwChkEffect(true);
        }
    }

    const memberPhoneRegex = (data:string):void => {
        const regexChk:RegExp = /^[0-9]{11}$/;
        const currentData:string = data;

        setMemberPhone(currentData);

        if(!regexChk.test(currentData)) {
            setMemberPhoneMessage('전화번호를 다시 확인해주세요.');
            setIsMemberPhoneEffect(false);
        } else {
            setMemberPhoneMessage('');
            setIsMemberPhoneEffect(true);
        }
    }

    const signUpHandler = ():void => {

        const memberData:{} = {
            memberEmail: memberEmail,
            memberId: memberId,
            memberName: memberName,
            memberPw: memberPw,
            memberGender: memberGender,
            memberPhone: memberPhone
        }

        console.log(memberData);
        navigate("/joinComplete");

        // axios({
        //     method: "POST",
        //     url: "/member/signUp",
        //     data: JSON.stringify(memberData),
        //     headers: {'Content-type': 'application/json'}
        // }).then((res) => {
        //     window.alert("회원가입 완료");
        //     navigate("/joinComplete");
        // })
    }

    return (
        <>
            <div style={{marginTop: '150px'}}>
                <div>
                    <input type="text" onChange={(data) => memberEmailRegex(data.target.value)} placeholder="이메일"
                           style={ isMemberEmailEffect ? {} : {border: '2px solid red'} } />
                    <span style={  isMemberEmailEffect ? {display:'none'} : {display:'inline', color:'red', fontSize:'13px'} }>
                        {memberEmailMessage}
                    </span>
                </div>
                <div>
                    <input type="text" onChange={(data) => memberIdRegex(data.target.value)} placeholder="아이디"
                           style={ isMemberIdEffect ? {} : {border: '2px solid red'} } />
                    <span style={  isMemberIdEffect ? {display:'none'} : {display:'inline', color:'red', fontSize:'13px'} }>
                        {memberIdMessage}
                    </span>
                </div>
                <div>
                    <input type="text" onChange={(data) => memberNameRegex(data.target.value)} placeholder="이름"
                           style={ isMemberNameEffect ? {} : {border: '2px solid red'} } />
                    <span style={  isMemberNameEffect ? {display:'none'} : {display:'inline', color:'red', fontSize:'13px'} }>
                        {memberNameMessage}
                    </span>
                </div>
                <div>
                    <input type="password" onChange={(e) => memberPwRegex(e.target.value)} placeholder="비밀번호"
                           style={ isMemberPwEffect ? {} : {border: '2px solid red'} } />
                    <span style={  isMemberPwEffect ? {display:'none'} : {display:'inline', color:'red', fontSize:'13px'} }>
                        {memberPwMessage}
                    </span>
                </div>
                <div>
                    <input type="password" onChange={(e) => memberPwChkRegex(e.target.value)} placeholder="비밀번호 확인"
                           style={ isMemberPwChkEffect ? {} : {border: '2px solid red'} } />
                    <span style={  isMemberPwChkEffect ? {display:'none'} : {display:'inline', color:'red', fontSize:'13px'} }>
                        {memberPwChkMessage}
                    </span>
                </div>
                <div>
                    <button onClick={() => setMemberGender("M")}>남자</button>
                    <button onClick={() => setMemberGender("F")}>여자</button>
                </div>
                <div>
                    <span>
                        <input type="text" onChange={(e) => memberPhoneRegex(e.target.value)} placeholder="전화번호"
                               style={ isMemberPhoneEffect ? {} : {border: '2px solid red'} } />
                    </span>
                    <span style={  isMemberPhoneEffect ? {display:'none'} : {display:'inline', color:'red', fontSize:'13px'} }>
                        {memberPhoneMessage}
                    </span>
                </div>
            </div>
            <div>
                <button onClick={() => signUpHandler()}>회원 가입</button>
            </div>
        </>
    )
}

export default EnterInfo;