import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import {getCookie, removeCookie, setCookie} from "./Cookie";
import {ThemeProvider} from "styled-components";
import axios from "axios";

import MainHome from './MainHome';
// member
import SignIn from "./member/SignIn";
import SignUp from "./member/SignUp";
import TermsAgree from "./member/signUpView/TermsAgree";
import EmailAuth from "./member/signUpView/EmailAuth";
import EnterInfo from "./member/signUpView/EnterInfo";
import JoinComplete from "./member/signUpView/JoinComplete";
// lecture
import LectureWrite from "./lecture/LectureWrite";

import {GlobalStyle} from "./styles/GlobalStyles";
import {darkTheme, lightTheme} from "./styles/theme";
import useThemeToggleStore from "./stores/useThemeToggleStore";


function App() {

    const {themeMode, setThemeMode} = useThemeToggleStore();

    useEffect(() => {
        const localTheme:string|null = window.localStorage.getItem("theme");

        if(localTheme) {
            setThemeMode(localTheme);
        }

        if(getCookie('refreshToken')) {
            const token:object = {
                accessToken: axios.defaults.headers.common["Authorization"]?.toString(),
                refreshToken: getCookie('refreshToken')
            }

            axios({
                method: "POST",
                url: "/member/reissue",
                data: JSON.stringify(token),
                headers: {'Content-type': 'application/json'}
            }).then((res) => {
                const responseData = res.data;
                if(responseData.result) {
                    const { grantType, accessToken, refreshToken, accessTokenExpiresIn} = responseData.data;
                    const expires:Date = new Date(accessTokenExpiresIn);

                    axios.defaults.headers.common['Authorization'] = `${grantType} ${accessToken}`;

                    setCookie('refreshToken', refreshToken, {
                        path: '/',
                        // httpOnly: true,
                        // expires
                    });
                } else {
                    alert('재로그인을 해주세요');
                    removeCookie('refreshToken');
                }
            }).catch((err) => {
                const errCode:string = err.message.substring(err.message.length-3);

                if(errCode === '401' || errCode === '403') { // 대부분 refresh token 만료로 인한 오류
                    alert('재로그인을 해주세요');
                }
            })
        }
        // else if(axios.defaults.headers.common["Authorization"]?.toString() === undefined) {
        //     alert('재로그인을 해주세요');
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
    <>
        <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme } >
            <GlobalStyle />

            <Routes>
                <Route path="/" element={<MainHome />} />

                <Route path="/signIn" element={<SignIn />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/termsAgree" element={<TermsAgree />} />
                <Route path="/emailAuth" element={<EmailAuth />} />
                <Route path="/enterInfo" element={<EnterInfo />} />
                <Route path="/joinComplete" element={<JoinComplete />} />

                <Route path="/lectureWrite" element={<LectureWrite />} />
            </Routes>
        </ThemeProvider>
    </>
  );
}

export default App;