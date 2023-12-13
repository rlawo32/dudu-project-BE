import {useState} from "react";
import {setCookie} from "../Cookie";
import {Link} from "react-router-dom";
import axios from "axios";

import HeaderNavigation from "../navigation/HeaderNavigation";
import useJoinProgressStore from "../stores/useJoinProgressStore";
import FindIdModal from "./signInView/FindIdModal";
import FindPwModal from "./signInView/FindPwModal";

import * as Styled from "./SignIn.style";
import * as Modal from "./signInView/Modal.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser as idIcon, faLock as pwIcon, faComment as kakaoIcon} from "@fortawesome/free-solid-svg-icons";

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

    return (
        <Styled.SignInMain>
            <HeaderNavigation />
            <div className="signUp-view">
                <div className="signUp-box">
                    <p>
                        첫 방문이신가요?
                    </p>
                    <p>
                        수강신청 관련 서비스를 이용하시려면 회원가입을 해주세요.
                    </p>
                    <Link to="/signUp" onClick={() => setActiveProgressTab("joinProgress1")} className="link-custom">
                        회원가입 {'>'}
                    </Link>
                </div>
            </div>
            <div className="signIn-view">
                <div className="signIn-box">
                    <h1>로그인</h1>
                    <Styled.InputBox>
                        <FontAwesomeIcon icon={idIcon} className="icon-custom" />
                        <Styled.SignInInput type="text" onChange={(e) => setLoginMemberId(e.target.value)} />
                    </Styled.InputBox>
                    <Styled.InputBox>
                        <FontAwesomeIcon icon={pwIcon} className="icon-custom" />
                        <Styled.SignInInput type="password" onChange={(e) => setLoginMemberPw(e.target.value)} />
                    </Styled.InputBox>

                    <Styled.SignInButton onClick={() => signInHandler()}>로그인</Styled.SignInButton>

                    <Styled.FindButton>
                        <button onClick={() => setIsFindIdModal(true)}>아이디 찾기</button>
                        <span></span>
                        <button onClick={() => setIsFindPwModal(true)}>비밀번호 찾기</button>
                    </Styled.FindButton>

                    <Styled.LoginKakaoButton onClick={() => window.location.href=process.env.REACT_APP_BASE_URL + "/oauth2/authorization/kakao"}>
                        <FontAwesomeIcon icon={kakaoIcon} className="icon-custom"/>
                        <span>카카오</span>
                    </Styled.LoginKakaoButton>
                    <Styled.LoginNaverButton onClick={() => window.location.href=process.env.REACT_APP_BASE_URL + "/oauth2/authorization/naver"}>
                        <span className="icon-custom">N</span>
                        <span>네이버</span>
                    </Styled.LoginNaverButton>
                </div>
                {isFindIdModal ?
                    <Modal.ModalView>
                        <FindIdModal setIsFindIdModal={setIsFindIdModal} />
                    </Modal.ModalView>
                    : <div />}
                {isFindPwModal ?
                    <Modal.ModalView>
                        <FindPwModal setIsFindPwModal={setIsFindPwModal} />
                    </Modal.ModalView>
                    : <div />}
            </div>
        </Styled.SignInMain>
    )

}

export default SignIn;