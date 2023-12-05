import HeaderNavigation from "../navigation/HeaderNavigation";
import {useEffect} from "react";
import styled from "styled-components";

import JoinProgressMark from "./view/JoinProgressMark";
import TermsAgree from "./view/TermsAgree";
import EmailAuth from "./view/EmailAuth";
import EnterInfo from "./view/EnterInfo";
import JoinComplete from "./view/JoinComplete";
import useJoinProgressStore from "../stores/useJoinProgressStore";

const JoinProgressView = styled.div`
  position: relative;
  margin: 50px 250px auto;
  border: 2px solid black;
  height: 1000px;
`;

const SignUp = ():any => {

    const {activeProgressTab, setActiveProgressTab} = useJoinProgressStore();

    useEffect(() => {
        console.log(activeProgressTab);
    }, [setActiveProgressTab])

    return (
        <div style={{position: "relative", height: "100%", width: "100%"}}>
            <HeaderNavigation />
            <JoinProgressMark />

            <JoinProgressView style={ activeProgressTab === 'joinProgress1' ? {display: "block"} : {display: "none"}}>
                <TermsAgree />
            </JoinProgressView>
            <JoinProgressView style={ activeProgressTab === 'joinProgress2' ? {display: "block"} : {display: "none"}}>
                <EmailAuth />
            </JoinProgressView>
            <JoinProgressView style={ activeProgressTab === 'joinProgress3' ? {display: "block"} : {display: "none"}}>
                <EnterInfo />
            </JoinProgressView>
            <JoinProgressView style={ activeProgressTab === 'joinProgress4' ? {display: "block"} : {display: "none"}}>
                <JoinComplete />
            </JoinProgressView>
        </div>
    )

}

export default SignUp;