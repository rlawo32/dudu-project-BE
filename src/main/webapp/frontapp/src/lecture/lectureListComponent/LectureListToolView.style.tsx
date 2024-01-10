import styled from "styled-components";

export const LectureListTool = styled.div<{
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
    margin-top: 12px;
    
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
        font-size: 12px;
        font-weight: bold;
        cursor: pointer;
        
        .icon-custom {
          margin-right: 6px;
          font-size: 16px;
        }
      }

      .tool-search {
        display: inline-block;
        margin-right: 10px;
      }

      .tool-sort {
        display: inline-block;
        position: relative;
        outline: none;

        .icon-custom {
          rotate: 90deg;
        }
        
        ul.sort-list {
          position: absolute;
          top: 105%;
          height: 0;
          width: 100px;
          margin: 5px auto 0;
          padding: 0;
          border: none;
          border-radius: 15px;
          overflow: hidden;
          background: ${({theme}) => theme.boxBgColor};
          color: ${({theme}) => theme.textColor};
          text-align: center;
          cursor: pointer;
          z-index: 2;
          user-select: none;
          list-style:none;
          transition: all 0.3s ease-in;
        }
          
        ul.sort-list li {
          padding: 5px;
          font-size: 12px;
          line-height: 1.4em;
          opacity: 0.7;
          transition: all 0.3s ease-in;
        }
    
        .sort-list.show-list {
          border: 1px solid gray;
          padding: 5px;
          height: 135px;
        }

        ul.sort-list li.sort-active {
          opacity: 1;
          font-weight: bold;
        }
      }
    }
  }

  .lt-search-inventory {
    position: relative;
    height: ${({$isInventory}) => $isInventory ? "60px" : 0};
    width: 100%;
    box-sizing: border-box; // padding 값을 줄 때 부모 영역을 벗어나는 문제를 해결
    padding: ${({$isInventory}) => $isInventory ? "5px 10px" : 0};
    margin-top: 20px;
    border: none;
    border-radius: 15px;
    background-color: ${({theme}) => theme.boxBgColor};
    transition: all 0.5s ease-in-out;
    
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    
    .inventory-item {
      height: fit-content;
      width: fit-content;
      margin: 5px; 
      padding: 5px 10px;
      border: 1px solid grey;
      border-radius: 20px;
      background-color: ${({theme}) => theme.bgColor};
      font-size: 13px;
      font-weight: bold;
      
      .icon-custom {
        margin-left: 5px;
        cursor: pointer;
        opacity: 0.7;
      }
    }

    .inventory-item.item-reset {
      display: ${({$isInventory}) => $isInventory ? "block" : "none"};
      margin-right: 25px;
      padding: 0;
      border: none;
      background: none;
      font-size: 25px;
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