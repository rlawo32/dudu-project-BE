import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {removeCookie} from "../Cookie";
import styled from "styled-components";

import ThemeModeToggle from "./ThemeModeToggle";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightToBracket as loginIcon, faArrowRightFromBracket as logoutIcon,
    faUser as myPageIcon} from "@fortawesome/free-solid-svg-icons";

const StyledLink:any = styled(Link)`
  text-decoration: none;
  color: ${({theme}) => theme.headerTextColor};
  font-size: 16px;
  font-weight: bold;
  
  .icon-custom {
    font-size: 29px;
  }
`;

const StyledHeaderNavigation = styled.div<{$getRole:string}>`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0;
  left: 0;
  width: 100%;
  height: 7%;
  background: ${({theme}) => theme.headerBgColor};
  z-index: 2;

  .header-left {
    display: flex;
    align-items: center;
    width: ${({$getRole}) => $getRole === "" ? 0 : "173px"};
    margin-left: 50px;
  }

  .header-center {
    display: flex;
    align-items: center;
    font-size: 16px;
  }

  .header-right {
    display: flex;
    align-items: center;
    
    margin-right: 50px;
  }
`;

const HeaderNavigation = ():any => {
    const navigate = useNavigate();

    const [memberRole, setMemberRole] = useState<string>("");

    useEffect(() => {
        const localRole:string|null = window.localStorage.getItem("role");

        if(localRole) {
            setMemberRole(localRole);
        }
    }, [])

    const logout = ():void => {
        removeCookie("refreshToken");
        window.localStorage.removeItem("role");
        navigate("/");
        window.location.reload();
        // axios({
        //     method: "POST",
        //     url: "/logout"
        // }).then((res) => {
        // }).catch((err) => {
        //     console.log(err.message)
        // })
    }

    return (
        <>
            {
                memberRole === 'ROLE_ADMIN' ?
                    <StyledHeaderNavigation $getRole={memberRole}>

                        <div className="header-left">
                            <StyledLink to="/">
                                Home
                            </StyledLink>
                        </div>

                        <div className="header-center">
                            <StyledLink to="/lectureList" style={{marginLeft: '30px'}}>
                                수강신청
                            </StyledLink>
                            <StyledLink to="/" style={{marginLeft: '30px'}}>
                                이용안내
                            </StyledLink>
                            <StyledLink to="/" style={{marginLeft: '30px'}}>
                                커뮤니티
                            </StyledLink>
                            <StyledLink to="/lectureWrite" style={{marginLeft: '30px'}}>
                                강좌개설
                            </StyledLink>
                            <StyledLink to="/lectureEventWrite" style={{marginLeft: '30px'}}>
                                강좌이벤트개설
                            </StyledLink>
                            <StyledLink to="/boardWrite" style={{marginLeft: '30px'}}>
                                게시글작성
                            </StyledLink>
                        </div>

                        <div className="header-right">
                            <ThemeModeToggle />
                            <StyledLink to="/" style={{marginLeft: '30px'}}>
                                <FontAwesomeIcon icon={myPageIcon} className="icon-custom"/>
                            </StyledLink>
                            <StyledLink to="/" style={{marginLeft: '30px'}}>
                                <FontAwesomeIcon icon={logoutIcon} onClick={() => logout()}
                                                 className="icon-custom"/>
                            </StyledLink>
                        </div>
                    </StyledHeaderNavigation>
                    :
                    memberRole === 'ROLE_MEMBER' || memberRole === 'ROLE_SOCIAL' ?
                        <StyledHeaderNavigation $getRole={memberRole}>

                            <div className="header-left">
                                <StyledLink to="/">
                                    Home
                                </StyledLink>
                            </div>

                            <div className="header-center">
                                <StyledLink to="/lectureList" style={{marginLeft: '20px'}}>
                                    수강신청
                                </StyledLink>
                                <StyledLink to="/" style={{marginLeft: '30px'}}>
                                    이용안내
                                </StyledLink>
                                <StyledLink to="/" style={{marginLeft: '30px'}}>
                                    커뮤니티
                                </StyledLink>
                            </div>

                            <div className="header-right">
                                <ThemeModeToggle />
                                <StyledLink to="/" style={{marginLeft: '20px'}}>
                                    <FontAwesomeIcon icon={myPageIcon} className="icon-custom"/>
                                </StyledLink>
                                <StyledLink to="/" style={{marginLeft: '20px'}}>
                                    <FontAwesomeIcon icon={logoutIcon} onClick={() => logout()}
                                                     className="icon-custom"/>
                                </StyledLink>
                            </div>
                        </StyledHeaderNavigation>
                        :
                        <StyledHeaderNavigation $getRole={memberRole}>

                            <div className="header-left">
                                <StyledLink to="/">
                                    Home
                                </StyledLink>
                            </div>

                            <div className="header-center">
                                <StyledLink to="/lectureList" style={{marginLeft: '20px'}}>
                                    수강신청
                                </StyledLink>
                                <StyledLink to="/" style={{marginLeft: '30px'}}>
                                    이용안내
                                </StyledLink>
                                <StyledLink to="/" style={{marginLeft: '30px'}}>
                                    커뮤니티
                                </StyledLink>
                            </div>

                            <div className="header-right">
                                <ThemeModeToggle />
                                <StyledLink to="/signIn" style={{marginLeft: '20px'}}>
                                    <FontAwesomeIcon icon={loginIcon} className="icon-custom"/>
                                </StyledLink>
                            </div>
                        </StyledHeaderNavigation>
            }
        </>
    )
}

export default HeaderNavigation;