import styled from "styled-components";
import React, {useEffect} from "react";
import useLectureSearchDataStore from "../../stores/useLectureSearchDataStore";

interface Props {
    isShow: boolean;
    isAction: boolean;
    isSetAction: React.Dispatch<React.SetStateAction<boolean>>;
}

const LectureSearchBox = styled.div<{ $showBox:boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: ${({$showBox}) => $showBox ? "450px" : 0};
  border-left: 1px solid rgba(0,0,0,0.2);
  background-color: ${({theme}) => theme.boxBgColor};
  z-index: 3;
  transition: all 0.4s ease-in;

`;

const LectureSearchBoxView = (props : Props) => {

    const {searchText, setSearchText} = useLectureSearchDataStore();

    return (
        <LectureSearchBox $showBox={props.isShow}>
            <div className="search-header">
                <div className="search-title">
                    상세검색
                </div>
                <div className="search-text">
                    <input type="text" value={searchText}
                           onChange={(e) => setSearchText(e.target.value)}/>
                </div>
            </div>
            <div className="search-body">

            </div>
            <div className="search-footer">
                <button onClick={() => props.isSetAction(!props.isAction)}>검색</button>
            </div>
        </LectureSearchBox>
    )
}

export default LectureSearchBoxView;