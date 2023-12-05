import useJoinProgressStore from "../../stores/useJoinProgressStore";
import {useState} from "react";

const EmailAuth = ():any => {

    const [memberEmail, setMemberEmail] = useState("");
    const [memberEmailMessage, setMemberEmailMessage] = useState("");
    const [isMemberEmailEffect, setIsMemberEmailEffect] = useState(true);

    const {setActiveProgressTab} = useJoinProgressStore();


    const memberEmailRegex = (data:string):void => {
        const regexChk:RegExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        const currentData:string = data;

        setMemberEmail(currentData);

        if(!regexChk.test(currentData)) {
            setMemberEmailMessage('이메일 주소를 다시 확인해주세요.');
            setIsMemberEmailEffect(false);
        } else {
            setMemberEmailMessage('');
            setIsMemberEmailEffect(true);
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
            </div>

            <button onClick={() => setActiveProgressTab("joinProgress1")}>뒤로 가기</button>
            <button onClick={() => setActiveProgressTab("joinProgress3")}>다음 단계</button>
        </>
    )
}

export default EmailAuth;