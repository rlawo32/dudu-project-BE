import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {setCookie} from "./Cookie";
import axios from "axios";

import HeaderNavigation from "./navigation/HeaderNavigation";

const MainHome = ():any => {

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

    return (
        <div>
            <HeaderNavigation />
        </div>
    )
}

export default MainHome;