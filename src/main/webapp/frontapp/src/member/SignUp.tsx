import styled from "styled-components";

import HeaderNavigation from "../navigation/HeaderNavigation";
import JoinProgressMark from "./signUpComponent/JoinProgressMark";
import TermsAgree from "./signUpComponent/TermsAgree";
import EmailAuth from "./signUpComponent/EmailAuth";
import EnterInfo from "./signUpComponent/EnterInfo";
import JoinComplete from "./signUpComponent/JoinComplete";
import useJoinProgressStore from "../stores/useJoinProgressStore";

const JoinProgressView = styled.div`
  position: relative;
  height: 100%;
  width: fit-content;
  margin: 30px auto 50px;
  padding: 5px 10% 40px 10%;
  border: ${({theme}) => theme.borderColor};
  border-radius: 15px;
  background-color: ${({theme}) => theme.boxBgColor};
`;

const SignUp = ():any => {

    const {activeProgressTab} = useJoinProgressStore();

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