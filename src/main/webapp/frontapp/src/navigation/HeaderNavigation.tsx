import styled from "styled-components";
import React from "react";
import * as Styled from '../CommonStyled';
import useJoinProgressStore from "../stores/useJoinProgressStore";

const StyledHeaderNavigation = styled.div`
      position: fixed;
      display: flex;
      align-items: center;
      justify-content: space-between;
      top: 0;
      left: 0;
      width: 100%;
      height: 8%;
      background: rgba(0,0,0, 0.8);
`;

const HeaderNavigation = ():any => {

    const {setActiveProgressTab} = useJoinProgressStore();

    return (
        <StyledHeaderNavigation>
            <Styled.styledLink to="/" style={{marginLeft: '20px'}}>
                Home
            </Styled.styledLink>
            <div style={{marginRight: '20px'}}>
                <Styled.styledLink to="/signIn" style={{marginRight: '20px'}}>
                    SignIn
                </Styled.styledLink>
                <Styled.styledLink to="/signUp" onClick={() => setActiveProgressTab("joinProgress1")}>
                    SignUp
                </Styled.styledLink>
            </div>
        </StyledHeaderNavigation>
    )
}

export default HeaderNavigation;