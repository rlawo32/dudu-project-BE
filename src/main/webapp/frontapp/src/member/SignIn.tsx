import styled from "styled-components";
import {useState} from "react";
import axios from "axios";

import HeaderNavigation from "../navigation/HeaderNavigation";

import {setCookie} from "../Cookie";

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
            if(responseData.data) {
                const { grantType, accessToken, refreshToken, refreshTokenExpiresIn } = responseData.data;
                const expires:Date  = new Date(refreshTokenExpiresIn);

                axios.defaults.headers.common['Authorization'] = `${grantType} ${accessToken}`;

                setCookie('refreshToken', refreshToken, {
                    path: '/',
                    // httpOnly: true,
                    // expires
                });
            } else {
                alert('로그인에 실패했습니다.');
            }
        })
    }

    const jwtTest = ():void => {
        axios({
            method: "GET",
            url: "/test1"
        }).then((res) => {
            console.log('success !');
        }).catch((err) => {
            console.log(err)
            const errCode:string = err.message.substring(err.message.length-3);
            
            if(errCode === '401' || errCode === '403') { // 대부분 access token 만료로 인한 오류
                alert('새로고침을 한번 해주세요');
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
                        <button onClick={() => window.location.href=process.env.REACT_APP_BASE_URL + "/oauth2/authorization/kakao"}>카카오</button>
                    </div>
                    <div>
                        <button onClick={() => window.location.href=process.env.REACT_APP_BASE_URL + "/oauth2/authorization/naver"}>네이버</button>
                    </div>


                    <button onClick={() => jwtTest()} style={{marginTop: '200px'}}>test</button>
                </div>
            </div>
        </SignInMain>
    )

}

export default SignIn;