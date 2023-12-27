import React, {useState} from "react";

import useJoinProgressStore from "../../stores/useJoinProgressStore";
import MemberAuth from "../MemberAuth";
import * as Styled from "../SignUp.style";

const EmailAuth = ():any => {

    const [isMemberEmailCheck, setIsMemberEmailCheck] = useState<boolean>(false);
    const {setActiveProgressTab} = useJoinProgressStore();

    return (
        <Styled.EmailAuthView>
            <h1>이메일 인증</h1>
            <MemberAuth setIsMemberEmailCheck={setIsMemberEmailCheck} duplicationChk={true}/>

            <div className="emailAuth-button">
                <Styled.SignUpButton onClick={() => setActiveProgressTab("joinProgress1")}>뒤로가기</Styled.SignUpButton>
                <Styled.SignUpButton onClick={() => setActiveProgressTab("joinProgress3")}
                                     style={isMemberEmailCheck ? {display: 'inline'} : {display: 'none'}}>다음</Styled.SignUpButton>
            </div>
        </Styled.EmailAuthView>
    )
}

export default EmailAuth;