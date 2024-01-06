import React, {useEffect, useState} from "react";
import styled from "styled-components";

import useLectureSearchDataStore from "../../stores/useLectureSearchDataStore";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch as search, faXmark as deleteBtn} from "@fortawesome/free-solid-svg-icons";

interface Props {
    ltCount: number;
    isSetBoxShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const LectureListTool = styled.div<{
    $isInventory:boolean;
    $searchText:string;
    $searchDivision:{dvItem:string}[];
    $searchState:{stItem:number; stName:string}[];
}>`
  position: relative;
  
  .lt-list-tool {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;

    .tool-left {

      .tool-total {
        display: inline-block;
      }
    }

    .tool-right {

      .tool-search {
        display: inline-block;
      }

      .tool-sort {
        display: inline-block;
      }
    }
  }

  .lt-search-inventory {
    height: ${({$isInventory}) => $isInventory ? 
            ({$searchText}) => $searchText !== "" ? "60px" : 
                    ({$searchDivision}) => $searchDivision.length !== 0 ? "60px" :
                            ({$searchState}) => $searchState.length !== 0 ? "60px" : 0 : 0};
    width: 100%;
    box-sizing: border-box; // padding 값을 줄 때 부모 영역을 벗어나는 문제를 해결
    padding: ${({$isInventory}) => $isInventory ? 
            ({$searchText}) => $searchText !== "" ? "15px 20px" :
                    ({$searchDivision}) => $searchDivision.length !== 0 ? "15px 20px" :
                            ({$searchState}) => $searchState.length !== 0 ? "15px 20px" : 0 : 0};
    margin-top: 10px;
    border: none;
    border-radius: 15px;
    background-color: ${({theme}) => theme.boxBgColor};
    transition: all 0.5s ease-in-out;
    
    display: flex;
    align-items: center;
    
    .inventory-item {
      display: inline-block;
      height: fit-content;
      width: fit-content;
      padding: 5px 10px;
      border: 1px solid grey;
      border-radius: 20px;
      background-color: ${({theme}) => theme.bgColor};
      
      .icon-custom {
        margin-left: 5px;
        cursor: pointer;
        opacity: 0.7;
      }
    }
    
    .inventory-item.item-searchText {
      display: ${({$isInventory}) => $isInventory ? 
              ({$searchText}) => $searchText !== "" ? 
                      "block" : "none" : "none"};
    }
    .inventory-item.item-searchDivision {
      display: ${({$isInventory}) => $isInventory ?
              ({$searchDivision}) => $searchDivision.length !== 0 ?
                      "block" : "none" : "none"};
    }
    .inventory-item.item-searchState {
      display: ${({$isInventory}) => $isInventory ?
              ({$searchState}) => $searchState.length !== 0 ?
                      "block" : "none" : "none"};
    }
  }
`;

const LectureListToolView = (props : Props) => {

    const [isSearchInventory, setIsSearchInventory] = useState<boolean>(true);

    const {searchButton, setSearchButton, searchText, setSearchText,
        ltDivisionArr, setLtDivisionArr, removeLtDivisionArr,
        ltStateArr, setLtStateArr, removeLtStateArr} = useLectureSearchDataStore();

    useEffect(() => {
        setIsSearchInventory(true);
    }, [searchButton])

    return (
        <LectureListTool $isInventory={isSearchInventory} $searchText={searchText} $searchDivision={ltDivisionArr}
                         $searchState={ltStateArr}>
            <div className="lt-list-tool">
                <div className="tool-left">
                    <div className="tool-total">
                        <span style={{fontSize: "13px", fontWeight: "bold"}}>{props.ltCount}개</span>
                        <span style={{fontSize: "13px"}}>의강좌</span>
                    </div>
                </div>
                <div className="tool-rigth">
                    <div className="tool-search">
                        <button onClick={(e) => {
                            e.stopPropagation();
                            props.isSetBoxShow(true)}}>
                            <FontAwesomeIcon icon={search} className="icon-custom" />
                            상세검색
                        </button>
                    </div>
                    <div className="tool-sort">

                    </div>
                </div>
            </div>
            <div className="lt-search-inventory">
                <div className="inventory-item item-searchText">
                    <span>{searchText}</span>
                    <span>
                        <FontAwesomeIcon icon={deleteBtn} className="icon-custom"
                                         onClick={() => {setSearchText(""); setSearchButton(!searchButton)}}/>
                    </span>
                </div>
                {
                    ltDivisionArr.map((item) => (
                        <div key={item.dvItem} className="inventory-item item-searchDivision">
                            <span>{item.dvItem}</span>
                            <span>
                                <FontAwesomeIcon icon={deleteBtn} className="icon-custom"
                                                 onClick={() => {removeLtDivisionArr(item.dvItem); setSearchButton(!searchButton)}}/>
                            </span>
                        </div>
                    ))
                }
                {
                    ltStateArr.map((item) => (
                        <div key={item.stItem} className="inventory-item item-searchState">
                            <span>{item.stName}</span>
                            <span>
                                <FontAwesomeIcon icon={deleteBtn} className="icon-custom"
                                                 onClick={() => {removeLtStateArr(item.stItem); setSearchButton(!searchButton)}}/>
                            </span>
                        </div>
                    ))
                }
            </div>
        </LectureListTool>
    )
}

export default LectureListToolView;