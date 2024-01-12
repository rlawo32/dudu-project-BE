import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import styled from "styled-components";

import ThemeModeToggle from "./ThemeModeToggle";
import axios from "axios";
import {removeCookie, setCookie} from "../Cookie";
import useThemeToggleStore from "../stores/useThemeToggleStore";

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
  z-index: 2;
`;

const HeaderNavigation = ():any => {

    const [memberRole, setMemberRole] = useState<string>("");

    useEffect(() => {
        const localRole:string|null = window.localStorage.getItem("role");

        if(localRole) {
            setMemberRole(localRole);
        }
    }, [])

    const logout = ():void => {
        window.localStorage.removeItem("role");
        // window.location.reload();
        axios({
            method: "POST",
            url: "/logout"
        }).then((res) => {
        })
    }

    return (
        <StyledHeaderNavigation>
            <StyledLink to="/" style={{marginLeft: '20px'}}>
                Home
            </StyledLink>

            <ThemeModeToggle />

            {
                memberRole === 'ROLE_ADMIN' ?
                    <div style={{marginRight: '20px'}}>
                        <StyledLink to="/lectureEventWrite" style={{marginRight: '20px'}}>
                            LectureEventWrite
                        </StyledLink>
                        <StyledLink to="/lectureList" style={{marginRight: '20px'}}>
                            LectureList
                        </StyledLink>
                        <StyledLink to="/lectureWrite" style={{marginRight: '20px'}}>
                            LectureWrite
                        </StyledLink>
                        <StyledLink to="/" style={{marginRight: '20px'}}>
                            <span onClick={() => logout()}>Logout</span>
                        </StyledLink>
                    </div>
                    :
                    memberRole === 'ROLE_MEMBER' || memberRole === 'ROLE_SOCIAL' ?
                        <div style={{marginRight: '20px'}}>
                            <StyledLink to="/lectureList" style={{marginRight: '20px'}}>
                                LectureList
                            </StyledLink>
                            <StyledLink to="/" style={{marginRight: '20px'}}>
                                <span onClick={() => logout()}>Logout</span>
                            </StyledLink>
                        </div>
                        :
                        <div style={{marginRight: '20px'}}>
                            <StyledLink to="/lectureList" style={{marginRight: '20px'}}>
                                LectureList
                            </StyledLink>
                            <StyledLink to="/signIn" style={{marginRight: '20px'}}>
                                SignIn
                            </StyledLink>
                        </div>
            }


        </StyledHeaderNavigation>
    )
}

export default HeaderNavigation;