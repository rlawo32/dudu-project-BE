import styled from "styled-components";
import {useState} from "react";
import axios from "axios";

import HeaderNavigation from "../navigation/HeaderNavigation";

const SignInMain = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  
  .signIn-view {
    margin: 150px 250px auto;
    border: 2px solid black;
    height: 700px;
  }
`;

const SignIn = ():any => {

    const [loginMemberId, setLoginMemberId] = useState("");
    const [loginMemberPw, setLoginMemberPw] = useState("");

    const signInHandler = ():void => {
        const signInData:object = {
            memberId: loginMemberId,
            memberPw: loginMemberPw
        }

        axios({
            method: "POST",
            url: "/member/signIn",
            data: JSON.stringify(signInData),
            headers: {'Content-type': 'application/json'}
        }).then((res) => {
            const responseData = res.data;
            console.log(responseData);
            console.log(responseData.data);
            if(responseData.data) {

            } else {
                alert('로그인에 실패했습니다.');
            }
        })
    }

    return (
        <SignInMain>
            <HeaderNavigation />
            <div className="signIn-view">
                <div>
                    <div>
                        <input type="text" onChange={(e) => setLoginMemberId(e.target.value)} />
                    </div>
                    <div>
                        <input type="password" onChange={(e) => setLoginMemberPw(e.target.value)} />
                    </div>
                    <div>
                        <button onClick={() => signInHandler()}>로그인</button>
                    </div>
                </div>
                <div>
                    <div>
                        <button>카카오</button>
                    </div>
                    <div>
                        <button>네이버</button>
                    </div>
                </div>
            </div>
        </SignInMain>
    )

}

export default SignIn;