import styled from "styled-components";
import React from "react";

import ThemeModeToggle from "./ThemeModeToggle";
import {Link} from "react-router-dom";

const StyledLink:any = styled(Link)`
  text-decoration: none;
  color: ${({theme}) => theme.headerTextColor};
  font-size: 30px;
`;

const StyledHeaderNavigation = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0;
  left: 0;
  width: 100%;
  height: 8%;
  background: ${({theme}) => theme.headerBgColor};
`;

const HeaderNavigation = ():any => {

    return (
        <StyledHeaderNavigation>
            <StyledLink to="/" style={{marginLeft: '20px'}}>
                Home
            </StyledLink>
            <ThemeModeToggle />
            <div style={{marginRight: '20px'}}>
                <StyledLink to="/signIn" style={{marginRight: '20px'}}>
                    SignIn
                </StyledLink>
            </div>
        </StyledHeaderNavigation>
    )
}

export default HeaderNavigation;