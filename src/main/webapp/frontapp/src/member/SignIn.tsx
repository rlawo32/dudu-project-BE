import {useState} from "react";
import {setCookie} from "../Cookie";
import {Link} from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import HeaderNavigation from "../navigation/HeaderNavigation";
import useJoinProgressStore from "../stores/useJoinProgressStore";
import FindIdModal from "./signInView/FindIdModal";
import FindPwModal from "./signInView/FindPwModal";

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

    const [loginMemberId, setLoginMemberId] = useState<string>("");
    const [loginMemberPw, setLoginMemberPw] = useState<string>("");
    const [isFindIdModal, setIsFindIdModal] = useState<boolean>(false);
    const [isFindPwModal, setIsFindPwModal] = useState<boolean>(false);

    const {setActiveProgressTab} = useJoinProgressStore();

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
            console.log(responseData)
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
                alert(responseData.message);
            }
        }).catch((err) => {
            const errCode:string = err.message.substring(err.message.length-3);

            if(errCode === '401' || errCode === '403') { // 대부분 access token 만료로 인한 오류
                alert('새로고침을 한번 해주세요');
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
                    <button onClick={() => setIsFindIdModal(true)}>아이디 찾기</button>
                    <button onClick={() => setIsFindPwModal(true)}>비밀번호 찾기</button>
                    <Link to="/signUp" onClick={() => setActiveProgressTab("joinProgress1")}>회원가입</Link>
                </div>
                {isFindIdModal ? <FindIdModal setIsFindIdModal={setIsFindIdModal} /> : <div />}
                {isFindPwModal ? <FindPwModal setIsFindPwModal={setIsFindPwModal} /> : <div />}
            </div>
        </SignInMain>
    )

}

export default SignIn;