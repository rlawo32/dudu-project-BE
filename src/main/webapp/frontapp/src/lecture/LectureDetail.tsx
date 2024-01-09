import {useLocation} from "react-router-dom";

import * as Styled from "./LectureDetail.style";
import HeaderNavigation from "../navigation/HeaderNavigation";
import React from "react";

const LectureDetail = () => {
    const location = useLocation();
    const lectureNo:number = location.state.lectureNo;

    return (
        <Styled.LectureDetailView>
            <div className="header-navigation">
                <HeaderNavigation />
            </div>

            {lectureNo}

        </Styled.LectureDetailView>
    )
}

export default LectureDetail;