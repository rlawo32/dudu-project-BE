import styled from "styled-components";

export const LectureSearchBox = styled.div<{ $showBox:boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: ${({$showBox}) => $showBox ? "350px" : 0};
  @media screen and (max-width: 1024px) {
    width: ${({$showBox}) => $showBox ? "200px" : 0};
  }
  padding: ${({$showBox}) => $showBox ? "25px" : 0};
  border-left: 1px solid rgba(0,0,0,0.3);
  background-color: ${({theme}) => theme.boxBgColor};
  z-index: 3;
  transition: all 0.4s ease-in;
  
  .search-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 15px 0;
    font-size: 17px;
    font-weight: bold;
    cursor: pointer;
  }
  
  .search-header {
    margin-bottom: 25px;
    border-bottom: 1px solid lightsteelblue;

    .search-title { 
      cursor: auto;
    }
    
    .search-text {
      position: relative;

      input {
        width: 100%;
        box-sizing: border-box;
        outline: none;
        margin: 35px auto 15px;
        padding: 12px 45px 11px 15px;
        border: none;
        border-radius: 15px;
        font-size: 16px;
      }

      .icon-custom {
        width: 15%;
        position: absolute;
        top: 44px;
        right: 0;
        color: black;
        font-size: 23px;
        cursor: pointer;
      }
    }
  }

  .search-body {
    
    ul {
      position: relative;
      top: 105%;
      height: 0;
      width: 100%;
      padding: 0;
      margin: 0;
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
      
    ul li {
      float: left;
      padding: 5px 10px 5px 10px;
      margin: 10px 10px 0 0;
      border-radius: 7px;
      background-color: lightgray;
      color: black;
      font-size: 13px;
      line-height: 1.4em;
      transition: all 0.3s ease-in;
    }
    
    ul li.dvBtn-active {
      background-color: springgreen;
      font-weight: bold;
    }
    
    ul li.stBtn-active {
      background-color: springgreen;
      font-weight: bold;
    }
    
    .search-division {
      position: relative;
      margin: 0 auto 25px;
      border-bottom: 1px solid lightsteelblue;
      outline: none;
      
      .division-arrow {
        display: inline-block;
        margin-left: 15px;
        transition: all .4s linear;
      }

      .division-item-list.show-list {
        padding: 5px;
        height: 52px;
      }

      .division-arrow.show-list {
        transform: rotate(180deg);
      }
    }

    .search-state {
      position: relative;
      margin: 0 auto 25px;
      border-bottom: 1px solid lightsteelblue;
      outline: none;

      .state-arrow {
        display: inline-block;
        margin-left: 15px;
        transition: all .4s linear;
      }

      .state-item-list.show-list {
        padding: 5px;
        height: 92px;
        @media screen and (max-width: 1024px) {
          height: 127px;
        }
      }

      .state-arrow.show-list {
        transform: rotate(180deg);
      }
    }
    
    .count-view {
      display: inline-block;
      width: 17px;
      padding: 1px;
      margin-left: 5px;
      border: none;
      border-radius: 50%;
      background-color: ${({theme}) => theme.reverseBgColor};
      color: ${({theme}) => theme.reverseTextColor};
      text-align: center;
      font-size: 13px;
    }
  }
  
  .search-footer {
    display: flex;
    box-sizing: border-box;
    position: absolute;
    bottom: 70px;
    width: 100%;
    margin: auto;
    
    button {
      box-sizing: border-box;
      border: none;
      border-radius: 10px;
      padding: 10px 15px 10px 15px;
      cursor: pointer;
    }
    
    .reset-btn {
      margin-right: 12px;
      background: none;
      font-size: 17px;
      @media screen and (max-width: 1024px) {
        font-size: 12px;
      }
      
      .icon-custom {
        margin-right: 5px;
        font-size: 21px;
      }
    }
    
    .search-btn {
      width: 57%;
      background-color: ${({theme}) => theme.reverseBgColor};
      color: ${({theme}) => theme.reverseTextColor};
      font-size: 21px;
      @media screen and (max-width: 1024px) {
        width: 42%;
        font-size: 16px;
      }
      font-weight: bold;
    }
  }
`;