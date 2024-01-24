import styled from "styled-components";

export const LectureListView = styled.div<{$isShow:boolean}>`
  position: relative;
  box-sizing: border-box;
  padding-top: 4%;
  font-family: "Noto Sans KR";
  
  .lt-list-view {
    margin: 0 auto 5%;
    @media screen and (max-width: 1024px) {
      margin: 5% auto 5%;
    }
    opacity: ${({$isShow}) => $isShow ? "0.5" : "1"};
  }
  
  .header-navigation {
    pointer-events: ${({$isShow}) => $isShow ? "none" : "auto"};
  }
  
  .lt-top-btn {
    position: fixed;
    bottom: 40px;
    right: 40px;
    height: 50px;
    width: 50px;
    border: 1px solid ${({theme}) => theme.boxBgColor};
    border-radius: 50%;
    background-color: ${({theme}) => theme.boxBgColor};
    color: ${({theme}) => theme.textColor};;
    text-align: center;
    z-index: 99;
    cursor: pointer;
    
    .icon-custom {
      position: relative;
      top: 12px;
      font-size: 25px;
    }
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
    width: 1250px;
    @media screen and (max-width: 1280px) {
      width: calc(100% - 48px);
    }
    @media screen and (max-width: 1024px) {
      margin: 0 2rem;
      width: calc(100% - 4rem);
    }
    margin: auto;
    flex-direction: column;
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
        @media screen and (max-width: 1024px) {
          font-size: 20px;
        }
        font-weight: 500;
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
        @media screen and (max-width: 1024px) {
          width: 200px;
        }
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
        @media screen and (max-width: 1024px) {
          font-size: 15px;
        }
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
        @media screen and (max-width: 1024px) {
          height: 170px;
        }
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
    width: 1140px;
    @media screen and (max-width: 1280px) {
      width: calc(100% - 48px);
    }
    @media screen and (max-width: 1024px) {
      margin: 0 2rem;
      width: calc(100% - 4rem);
    }
    margin: 3% auto 0;
    pointer-events: ${({$isShow}) => $isShow ? "none" : "auto"};
    
    .lt-more-btn {
      width: 25%;
      margin: 40px auto 0;
      padding: 10px 15px 10px 15px;
      border: 1px solid ${({theme}) => theme.textColor};
      border-radius: 10px;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
    }
  }
`;
