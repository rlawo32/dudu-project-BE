import React, {useEffect, useState} from "react";
import styled from "styled-components";

import useLectureSearchDataStore from "../../stores/useLectureSearchDataStore";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch as search, faXmark as deleteBtn, faArrowRightArrowLeft as sortBtn} from "@fortawesome/free-solid-svg-icons";

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
      
      button {
        border: none;
        background: none;
        color: ${({theme}) => theme.textColor};
        font-size: 15px;
        cursor: pointer;
        
        .icon-custom {
          margin-right: 5px;
        }
      }

      .tool-search {
        display: inline-block;
        margin-right: 10px;
      }

      .tool-sort {
        display: inline-block;

        .icon-custom {
          rotate: 90deg;
        }
      }
    }
  }

  .lt-search-inventory {
    height: ${({$isInventory}) => $isInventory ? "60px" : 0};
    width: 100%;
    box-sizing: border-box; // padding 값을 줄 때 부모 영역을 벗어나는 문제를 해결
    padding: ${({$isInventory}) => $isInventory ? "15px 20px" : 0};
    margin-top: 20px;
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

    const [isSearchInventory, setIsSearchInventory] = useState<boolean>(false);
    const [isSearchText, setIsSearchText] = useState<string>("");
    const [isSearchDivision, setIsSearchDivision] = useState<{
        idx:number;
        dvItem:string;
    }[]>([]);
    const [isSearchState, setIsSearchState] = useState<{
        idx:number;
        stItem:number;
        stName:string;
    }[]>([]);

    const {searchButton, setSearchButton, searchText, setSearchText,
        ltDivisionArr, setLtDivisionArr, removeLtDivisionArr,
        ltStateArr, setLtStateArr, removeLtStateArr} = useLectureSearchDataStore();

    useEffect(() => {
        setIsSearchText(searchText);
        setIsSearchDivision(ltDivisionArr);
        setIsSearchState(ltStateArr);
        if(searchText.length > 0 || ltDivisionArr.length > 0 || ltStateArr.length > 0) {
            setIsSearchInventory(true);
        } else {
            setIsSearchInventory(false);
        }
    }, [searchButton])

    useEffect(() => {
        if(isSearchText.length > 0 || isSearchDivision.length > 0 || isSearchState.length > 0) {
        } else {
            setIsSearchInventory(false);
        }
    }, [searchText, ltDivisionArr, ltStateArr])

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
                <div className="tool-right">
                    <div className="tool-search">
                        <button onClick={(e) => {
                            e.stopPropagation();
                            props.isSetBoxShow(true)}}>
                            <FontAwesomeIcon icon={search} className="icon-custom" />
                            상세검색
                        </button>
                    </div>
                    <div className="tool-sort">
                        <button>
                            <FontAwesomeIcon icon={sortBtn} className="icon-custom" />
                            정렬
                        </button>
                    </div>
                </div>
            </div>
            <div className="lt-search-inventory">
                <div className="inventory-item item-searchText">
                    <span>{isSearchText}</span>
                    <span>
                        <FontAwesomeIcon icon={deleteBtn} className="icon-custom"
                                         onClick={() => {setSearchText(""); setSearchButton(!searchButton)}}/>
                    </span>
                </div>
                {
                    isSearchDivision.map((item) => (
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
                    isSearchState.map((item) => (
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