import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import MainHome from './MainHome';
import SignIn from "./member/SignIn";
import SignUp from "./member/SignUp";

function App() {
  return (
    <>
      <Routes>
          {/*<Route path="/" element={<MainHome />} />*/}
          {/*<Route path="/signIn" element={<SignIn />} />*/}
          {/*<Route path="/signUp" element={<SignUp />} />*/}
      </Routes>
    </>
  );
}

export default App;
