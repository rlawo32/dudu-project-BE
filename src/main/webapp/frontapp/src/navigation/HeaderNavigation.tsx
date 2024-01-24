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
  
  div {
    display: flex;
    align-items: center;
    height: 60px;
  }
`;

const LinkBox = styled.div`
  color: ${({theme}) => theme.headerTextColor};
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  
  div {
    display: flex;
    align-items: center;
    height: 60px;
  }
`;

const StyledHeaderNavigation = styled.div<{$getRole:string}>`
  position: relative;
  
  .header-parent {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    top: 0;
    left: 0;
    width: 100%;
    height: 7%;
    background: ${({theme}) => theme.headerBgColor};
    z-index: 99;
    
    .header-left {
      display: flex;
      align-items: center;
      width: ${({$getRole}) => $getRole === "" ? 0 : "173px"};
      margin-left: 50px;
    }

    .header-center {
      @media screen and (max-width: 720px) {
        display: none;
      }
      display: flex;
      align-items: center;
      font-size: 16px;
    }

    .header-right {
      display: flex;
      align-items: center;

      margin-right: 50px;
    }
  }
  
  .header-child {
    position: fixed;
    top: 7%;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 0;
    width: 100%;
    background: ${({theme}) => theme.headerBgColor};
    overflow: hidden;
    z-index: 99;
    transition: height 0.3s ease-in;
    cursor: default;
  }

  .header-child.active {
    height: 50px;
  }
`;

const HeaderNavigation = ():any => {
    const navigate = useNavigate();

    const [memberRole, setMemberRole] = useState<string>("");

    const [isLectureSubHovering, setIsLectureSubHovering] = useState<boolean>(false);
    const [isInformationUseHovering, setIsInformationUseHovering] = useState<boolean>(false);
    const [isCommunityHovering, setIsCommunityHovering] = useState<boolean>(false);
    const [isAdminPageHovering, setIsAdminPageHovering] = useState<boolean>(false);

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
        <div style={{height: "fit-content"}} onMouseOut={() => {
            setIsLectureSubHovering(false); setIsInformationUseHovering(false);
            setIsCommunityHovering(false); setIsAdminPageHovering(false);
        }}>
            <StyledHeaderNavigation $getRole={memberRole}>
                <div className="header-parent">
                    <div className="header-left">
                        <StyledLink to="/">
                            Home
                        </StyledLink>
                    </div>
                    <div className="header-center">
                        <StyledLink to="/lectureList" style={{marginLeft: '30px'}}>
                            <div className="parent-lectureSub"
                                 onMouseOver={() => setIsLectureSubHovering(true)}>
                                수강신청
                            </div>
                            {/*<div className={isLectureSubHovering ? "header-child active" : "header-child"}*/}
                            {/*     onMouseOver={() => setIsLectureSubHovering(true)}>*/}
                            {/*</div>*/}
                        </StyledLink>
                        <LinkBox style={{marginLeft: '30px'}}>
                            <div className="parent-informationUse"
                                 onMouseOver={() => setIsInformationUseHovering(true)}>
                                이용안내
                            </div>
                            <div className={isInformationUseHovering ? "header-child active" : "header-child"}
                                 onMouseOver={() => setIsInformationUseHovering(true)}>
                                <StyledLink to="/branchInfoList" style={{marginLeft: '30px'}}>
                                    지점안내
                                </StyledLink>
                                <StyledLink to="/faqList" style={{marginLeft: '30px'}}>
                                    자주하는 문의
                                </StyledLink>
                            </div>
                        </LinkBox>
                        <LinkBox style={{marginLeft: '30px'}}>
                            <div className="parent-community"
                                 onMouseOver={() => setIsCommunityHovering(true)}>
                                커뮤니티
                            </div>
                            <div className={isCommunityHovering ? "header-child active" : "header-child"}
                                 onMouseOver={() => setIsCommunityHovering(true)}>
                                <StyledLink to="/boardList" style={{marginLeft: '30px'}}>
                                    공지사항/이벤트
                                </StyledLink>
                                <StyledLink to="/" style={{marginLeft: '30px'}}>
                                    수강후기
                                </StyledLink>
                            </div>
                        </LinkBox>
                        {
                            memberRole === 'ROLE_ADMIN' ?
                                <LinkBox style={{marginLeft: '30px'}}>
                                    <div className="parent-adminPage"
                                         onMouseOver={() => setIsAdminPageHovering(true)}>
                                        관리자페이지
                                    </div>
                                    <div className={isAdminPageHovering ? "header-child active" : "header-child"}
                                         onMouseOver={() => setIsAdminPageHovering(true)}>
                                        <StyledLink to="/lectureWrite" style={{marginLeft: '30px'}}>
                                            강좌개설
                                        </StyledLink>
                                        <StyledLink to="/lectureEventWrite" style={{marginLeft: '30px'}}>
                                            강좌이벤트개설
                                        </StyledLink>
                                        <StyledLink to="/boardWrite" style={{marginLeft: '30px'}}>
                                            게시글작성
                                        </StyledLink>
                                        <StyledLink to="/faqWrite" style={{marginLeft: '30px'}}>
                                            FAQ 작성
                                        </StyledLink>
                                        <StyledLink to="/branchInfoWrite" style={{marginLeft: '30px'}}>
                                            지점 등록
                                        </StyledLink>
                                    </div>
                                </LinkBox>: <></>
                        }
                    </div>
                    <div className="header-right">
                        <ThemeModeToggle />
                        {
                            memberRole.length > 0 ?
                                <>
                                    <StyledLink to="/" style={{marginLeft: '20px'}}>
                                        <FontAwesomeIcon icon={myPageIcon} className="icon-custom"/>
                                    </StyledLink>
                                    <StyledLink to="/" style={{marginLeft: '20px'}}>
                                        <FontAwesomeIcon icon={logoutIcon} onClick={() => logout()}
                                                         className="icon-custom"/>
                                    </StyledLink>
                                </>
                                :
                                <>
                                    <StyledLink to="/signIn" style={{marginLeft: '20px'}}>
                                        <FontAwesomeIcon icon={loginIcon} className="icon-custom"/>
                                    </StyledLink>
                                </>
                        }
                    </div>
                </div>
            </StyledHeaderNavigation>
        </div>
    )
}

export default HeaderNavigation;