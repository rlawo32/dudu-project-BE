import styled from "styled-components";

export const BoardDetailView = styled.div`
  position: relative;
  padding-top: 60px;

  .top-btn {
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
  
  .bd-main-view {
    width: 1160px;
    @media screen and (max-width: 1280px) {
      box-sizing: border-box;
      width: 100%;
      padding: 20px;
    }
    padding: 60px 0 200px;
    margin: 0 auto;
    
    .bd-head {
      padding-bottom: 40px;
      border-bottom: 1px solid ${({theme}) => theme.rgbaMedium};
      
      .head-top {
        display: flex;
        align-items: center;
        font-size: 13px;
        line-height: 19px;
        opacity: 0.5;
        
        .head-item {
          position: relative;
          float: left;
          padding-right: 8px;
          margin-right: 8px;
          word-break: break-all;
          
          &:after {
            display: block;
            content: '';
            position: absolute;
            top: 5px;
            right: 0;
            width: 1px;
            height: 10px;
            background-color: #dfd9d5;
          }
        }
        
        .bd-category {
          
        }
        
        .bd-institution {
          
        }
        
        .bd-date {
          
        }
      }
      
      .head-bottom {
        
        .bd-title {
          margin-top: 10px;
          font-size: 32px;
          font-weight: bold;
          line-height: 40px;
        }
      }
    }
    
    .bd-body {
      
      .bd-content {
        padding: 80px 68px 100px;
        border-bottom: 1px solid ${({theme}) => theme.rgbaMedium};
        text-align: center;
      }
    }
    
    .bd-foot {
      display: flex;
      justify-content: center;
      margin: 40px 0;

      button {
        display: inline-block;
        padding: 16px 10px 17px;
        min-height: 60px;
        min-width: 160px;
        border-radius: 8px;
        background-color: ${({theme}) => theme.reverseBgColor};
        color: ${({theme}) => theme.reverseTextColor};
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        line-height: 24px;
        letter-spacing: -.75px;
        cursor: pointer;
      }
    }
  }
`;
