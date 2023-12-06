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

    return (
        <SignInMain>
            <HeaderNavigation />
            <div className="signIn-view">
                <div>
                    <input type="text" />
                    <input type="password" />
                </div>
            </div>
        </SignInMain>
    )

}

export default SignIn;