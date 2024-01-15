import {useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {setCookie} from "./Cookie";
import axios from "axios";

import HeaderNavigation from "./navigation/HeaderNavigation";
import FooterNavigation from "./navigation/FooterNavigation";

const MainHome = ():any => {
    // else if(axios.defaults.headers.common["Authorization"]?.toString() === undefined) {
    //     alert('재로그인을 해주세요');
    // }

    // 간편로그인 성공 시 생성되는 토큰들을 헤더와 쿠키에 넣어주는 작업
    const [searchParams, setSearchParams] = useSearchParams();
    const [easyLoginState, setEasyLoginState] = useState(false);

    useEffect(() => {
        if(searchParams.get("bearer") === "Bearer") {
            axios.defaults.headers.common['Authorization'] = `${searchParams.get("bearer")} ${searchParams.get("accessToken")}`;
            const expires:Date = new Date(`${searchParams.get("expires")}`);

            setCookie('refreshToken', `${searchParams.get("refreshToken")}`, {
                path: '/',
                // // httpOnly: true,
                // expires
            });

            setEasyLoginState(!easyLoginState);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(easyLoginState) {
            setSearchParams("");
            setEasyLoginState(!easyLoginState);
            window.location.reload();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [easyLoginState])
    // 간편로그인 성공 시 생성되는 토큰들을 헤더와 쿠키에 넣어주는 작업

    return (
        <div>
            <HeaderNavigation />

            <FooterNavigation />
        </div>
    )
}

export default MainHome;