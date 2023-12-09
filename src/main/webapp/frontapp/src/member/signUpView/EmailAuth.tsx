import React, {useState} from "react";

import useJoinProgressStore from "../../stores/useJoinProgressStore";
import MemberAuth from "../MemberAuth";

const EmailAuth = ():any => {

    const [isMemberEmailCheck, setIsMemberEmailCheck] = useState<boolean>(false);
    const {setActiveProgressTab} = useJoinProgressStore();

    return (
        <>
            <h1>이메일 인증</h1>
            <MemberAuth setIsMemberEmailCheck={setIsMemberEmailCheck} duplicationChk={true}/>

            <button onClick={() => setActiveProgressTab("joinProgress1")}>뒤로 가기</button>
            <button onClick={() => setActiveProgressTab("joinProgress3")}
                    style={isMemberEmailCheck ? {display: 'inline'} : {display: 'none'}}>다음 단계</button>
        </>
    )
}

export default EmailAuth;