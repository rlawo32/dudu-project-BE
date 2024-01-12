import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import {getCookie, removeCookie, setCookie} from "./Cookie";
import {ThemeProvider} from "styled-components";
import axios from "axios";

import MainHome from './MainHome';
// member
import SignIn from "./member/SignIn";
import SignUp from "./member/SignUp";
import TermsAgree from "./member/signUpComponent/TermsAgree";
import EmailAuth from "./member/signUpComponent/EmailAuth";
import EnterInfo from "./member/signUpComponent/EnterInfo";
import JoinComplete from "./member/signUpComponent/JoinComplete";
// lecture
import LectureWrite from "./lecture/LectureWrite";
import LectureList from "./lecture/LectureList";
import LectureDetailView from "./lecture/LectureDetail";
import LectureEventWrite from "./lecture/lectureWriteComponent/LectureEventWrite";
import LectureEventListView from "./lecture/lectureListComponent/LectureEventListView";

import {GlobalStyle} from "./styles/GlobalStyles";
import {darkTheme, lightTheme} from "./styles/theme";
import useThemeToggleStore from "./stores/useThemeToggleStore";
import reissue from "./reissue";


function App() {

    const {themeMode, setThemeMode} = useThemeToggleStore();

    useEffect(() => {
        const localTheme:string|null = window.localStorage.getItem("theme");

        if(localTheme) {
            setThemeMode(localTheme);
        }

        reissue().then();
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
                <Route path="/lectureList" element={<LectureList />} />
                <Route path="/lectureEventWrite" element={<LectureEventWrite />} />
                <Route path="/lectureEventList/:eventNo" element={<LectureEventListView />} />
                <Route path="/lectureDetail/:lectureNo" element={<LectureDetailView />} />
            </Routes>
        </ThemeProvider>
    </>
  );
}

export default App;