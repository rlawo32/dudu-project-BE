import {useState} from "react";
import axios from "axios";

import useJoinProgressStore from "../../stores/useJoinProgressStore";


const EnterInfo = ():any => {

    // 회원가입 값
    const [memberId, setMemberId] = useState("");
    const [memberName, setMemberName] = useState("");
    const [memberPw, setMemberPw] = useState("");
    const [memberGender, setMemberGender] = useState("");
    const [memberPhone, setMemberPhone] = useState("");

    // 경고 메시지
    const [memberIdMessage, setMemberIdMessage] = useState("");
    const [memberNameMessage, setMemberNameMessage] = useState("");
    const [memberPwMessage, setMemberPwMessage] = useState("");
    const [memberPwChkMessage, setMemberPwChkMessage] = useState("");
    const [memberGenderMessage, setMemberGenderMessage] = useState("");
    const [memberPhoneMessage, setMemberPhoneMessage] = useState("");

    // 유효성 검사
    const [isMemberIdEffect, setIsMemberIdEffect] = useState(true);
    const [isMemberNameEffect, setIsMemberNameEffect] = useState(true);
    const [isMemberPwEffect, setIsMemberPwEffect] = useState(true);
    const [isMemberPwChkEffect, setIsMemberPwChkEffect] = useState(true);
    const [isMemberGenderEffect, setIsMemberGenderEffect] = useState(true);
    const [isMemberPhoneEffect, setIsMemberPhoneEffect] = useState(true);

    // 데이터 검사
    const [isMemberIdConfirm, setIsMemberIdConfirm] = useState(false);
    const [isMemberNameConfirm, setIsMemberNameConfirm] = useState(false);
    const [isMemberPwConfirm, setIsMemberPwConfirm] = useState(false);
    const [isMemberGenderConfirm, setIsMemberGenderConfirm] = useState(false);
    const [isMemberPhoneConfirm, setIsMemberPhoneConfirm] = useState(false);

    const {setActiveProgressTab, inputMemberEmail} = useJoinProgressStore();

    const memberIdRegex = (data:string):void => {
        const regexChk:RegExp = /^[a-zA-Z]?[0-9a-zA-Z]{5,50}$/i;
        const currentData:string = data;

        setMemberId(currentData);

        if(!regexChk.test(currentData)) {
            setMemberIdMessage('아이디를 다시 확인해주세요.');
            setIsMemberIdEffect(false);
            setIsMemberIdConfirm(false);
        } else {
            setMemberIdMessage('');
            setIsMemberIdEffect(true);
            setIsMemberIdConfirm(true);
        }
    }

    const memberIdDuplicationHandler = ():void => {

        if(isMemberIdConfirm) {
            axios({
                method: "GET",
                url: "/member/memberIdDuplicationChk",
                params: {memberId: memberId}
            }).then((res) => {
                if(res.data) {
                    alert('이미 가입된 아이디입니다.');
                    setIsMemberIdEffect(false);
                    setMemberIdMessage('이미 가입된 아이디입니다.');
                } else {
                    setIsMemberIdEffect(true);
                    setMemberIdMessage('');
                }
            })
        }
    }

    const memberNameRegex = (data:string):void => {
        const regexChk:RegExp = /^[ㄱ-ㅎ가-힣a-zA-Z]+$/i;
        const currentData:string = data;

        setMemberName(currentData);

        if(!regexChk.test(currentData)) {
            setMemberNameMessage('이름을 다시 확인해주세요.');
            setIsMemberNameEffect(false);
            setIsMemberNameConfirm(false);
        } else {
            setMemberNameMessage('');
            setIsMemberNameEffect(true);
            setIsMemberNameConfirm(true);
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

        if(memberPw != currentData) {
            setMemberPwChkMessage('비밀번호를 다시 확인해주세요.');
            setIsMemberPwChkEffect(false);
            setIsMemberPwConfirm(false);
        } else {
            setMemberPwChkMessage('');
            setIsMemberPwChkEffect(true);
            setIsMemberPwConfirm(true);
        }
    }

    const memberGenderRegex = (data:string):void => {
        const currentData:string = data;

        setMemberGender(currentData);
        setMemberGenderMessage('');
        setIsMemberGenderEffect(true);
        setIsMemberGenderConfirm(true);
    }

    const memberPhoneRegex = (data:string):void => {
        const regexChk:RegExp = /^[0-9]{11}$/;
        const currentData:string = data;

        setMemberPhone(currentData);

        if(!regexChk.test(currentData)) {
            setMemberPhoneMessage('전화번호를 다시 확인해주세요.');
            setIsMemberPhoneEffect(false);
            setIsMemberPhoneConfirm(false);
        } else {
            setMemberPhoneMessage('');
            setIsMemberPhoneEffect(true);
            setIsMemberPhoneConfirm(true);
        }
    }

    const signUpHandler = ():void => {

        const memberData:{} = {
            memberEmail: inputMemberEmail,
            memberId: memberId,
            memberName: memberName,
            memberPw: memberPw,
            memberGender: memberGender,
            memberPhone: memberPhone
        }

        if(!isMemberIdConfirm) { // memberId Check
            setMemberIdMessage('아이디를 다시 확인해주세요.');
            setIsMemberIdEffect(false);
            setIsMemberIdConfirm(false);
        } else if(!isMemberNameConfirm) { // memberName Check
            setMemberNameMessage('이름을 다시 확인해주세요.');
            setIsMemberNameEffect(false);
            setIsMemberNameConfirm(false);
        } else if(!isMemberPwConfirm) { // memberPw Check
            setMemberPwChkMessage('비밀번호를 다시 확인해주세요.');
            setIsMemberPwChkEffect(false);
            setIsMemberPwConfirm(false);
        } else if(!isMemberGenderConfirm) { // memberGender Check
            setMemberGenderMessage('성별을 선택해주세요.');
            setIsMemberGenderEffect(false);
            setIsMemberGenderConfirm(false);
        } else if(!isMemberPhoneConfirm) { // memberPhone Check
            setMemberPhoneMessage('전화번호를 다시 확인해주세요.');
            setIsMemberPhoneEffect(false);
            setIsMemberPhoneConfirm(false);
        } else {
            axios({
                method: "POST",
                url: "/member/signUp",
                data: JSON.stringify(memberData),
                headers: {'Content-type': 'application/json'}
            }).then((res) => {
                window.alert("회원가입 완료");
                setActiveProgressTab("joinProgress4");
            })
        }
    }

    return (
        <>
            <div>
                <div>
                    <input type="text" value={inputMemberEmail} readOnly={true}/>
                </div>
                <div>
                    <input type="text" onChange={(data) => memberIdRegex(data.target.value)} placeholder="아이디"
                           style={ isMemberIdEffect ? {} : {border: '2px solid red'} } onBlur={memberIdDuplicationHandler} />
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
                    <span style={ isMemberGenderEffect ? {} : {border: '2px solid red'} } >
                        <button onClick={() => memberGenderRegex("M")}>남자</button>
                        <button onClick={() => memberGenderRegex("F")}>여자</button>
                    </span>
                    <span style={  isMemberGenderEffect ? {display:'none'} : {display:'inline', color:'red', fontSize:'13px'} }>
                        {memberGenderMessage}
                    </span>
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
                <button onClick={() => setActiveProgressTab("joinProgress2")}>뒤로 가기</button>
                <button onClick={() => signUpHandler()}>회원 가입</button>
            </div>
        </>
    )
}

export default EnterInfo;