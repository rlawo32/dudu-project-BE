import styled from "styled-components";

export const LectureListView = styled.div<{$isShow:boolean}>`
  position: relative;
  padding-top: 4%;
  
  .lt-list-view {
    opacity: ${({$isShow}) => $isShow ? "0.5" : "1"};
  }
  
  .header-navigation {
    pointer-events: ${({$isShow}) => $isShow ? "none" : "auto"};
  }
  
  .span-line { // 수직 custom border 생성
    position: relative;
    &:after {
      content: '';
      height: 14px;
      width: 1px;
      position: absolute;
      right: 1px;
      top: 3px;
      background-color: ${({theme}) => theme.textColor};
    }
  }
  
  .lt-list-header {
    flex-direction: column;
    padding: 0 18% 0 18%;
    text-align: center;
    pointer-events: ${({$isShow}) => $isShow ? "none" : "auto"};
    
    .custom-selectBox {
      position: relative;
      height: fit-content;
      width: fit-content;
      margin: 0 auto 35px;
      outline: none;
      display: flex;
      justify-content: center;
      
      .select-btn {
        margin: 40px auto 0;
        height: fit-content;
        width: fit-content;
        color: ${({theme}) => theme.textColor};
        font-size: 35px;
        font-weight: bold;
        cursor: pointer;
      }

      .select-arrow {
        display: inline-block;
        margin-left: 15px;
        transition: all .4s linear;
      }

      ul.select-list {
        position: absolute;
        top: 105%;
        height: 0;
        width: 300px;
        margin: 10px auto 0;
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
      
      ul.select-list li {
        padding: 7px 10px 7px 10px;
        font-size: 20px;
        line-height: 1.4em;
        transition: all 0.3s ease-in;
      }
      
      // ul.select-list li:hover {
      //   padding: 5px;
      //   background: ${({theme}) => theme.boxBgColor};
      //   color: ${({theme}) => theme.textColor};
      // }

      .select-list.show-list {
        border: 1px solid ${({theme}) => theme.textColor};
        padding: 15px 5px 15px 5px;
        height: 210px;
      }

      .select-arrow.show-list {
        transform: rotate(180deg);
      }
      
      .si-active {
        font-weight: bold;
      }
    }
  }

  .lt-list-main {
    position: relative;
    margin: 3% auto;
    padding: 0 20% 0 20%;
    pointer-events: ${({$isShow}) => $isShow ? "none" : "auto"};
    
  }
`;
