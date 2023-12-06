import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";

import MainHome from './MainHome';
import SignIn from "./member/SignIn";
import SignUp from "./member/SignUp";
import TermsAgree from "./member/signUpView/TermsAgree";
import EmailAuth from "./member/signUpView/EmailAuth";
import EnterInfo from "./member/signUpView/EnterInfo";
import JoinComplete from "./member/signUpView/JoinComplete";


function App() {

  return (
    <>
      <Routes>
          <Route path="/" element={<MainHome />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />

          <Route path="/termsAgree" element={<TermsAgree />} />
          <Route path="/emailAuth" element={<EmailAuth />} />
          <Route path="/enterInfo" element={<EnterInfo />} />
          <Route path="/joinComplete" element={<JoinComplete />} />
      </Routes>
    </>
  );
}

export default App;