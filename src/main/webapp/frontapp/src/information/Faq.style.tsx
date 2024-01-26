import styled from "styled-components";

export const FaqWriteView = styled.div`
  height: 100%;
  
  .faq-write-main {
    display: flex;
    flex-direction: column;
    width: 1440px;
    margin: 10% auto;
    
    .faq-write-top {
      display: flex;
      width: 720px;
      margin: 0 auto;
      
      .write-category {

        select {

          height: 30px;
        }
      }
      
      .write-title {
        width: 100%;

        input {
          width: 100%;
          height: 24px;
        }
      }
    }
    
    .faq-write-bot {
      width: 720px;
      height: 335px;
      margin: 20px auto 0;
      
      textarea {
        width: 100%;
        height: 100%;
        outline: none;
        resize: none;
      }
      
      .faq-submit {
        text-align: right;
        
        button {
          cursor: pointer;
        }
      }
    }
  }
`;

export const FaqListView = styled.div`

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
  
  .section-title {
    font-size: 24px;
    font-weight: bold;
    line-height: 32px;
    letter-spacing: -.6px;
  }
  
  .faq-list-sub {
    height: 100%;
    width: 100%;
    background: rgba(216,201,201,0.5);
    
    .faq-list-sub-view {
      width: 1160px;
      @media screen and (max-width: 1280px) {
        width: 100%;
      }
      padding: 60px 0 80px;
      margin: 0 auto;
      text-align: center;

      .faq-sub-title {
        margin: 7% auto 0;
        font-size: 48px;
        @media screen and (max-width: 1024px) {
          font-size: 32px;
        }
      }

      .faq-sub-input {
        position: relative;
        width: 600px;
        @media screen and (max-width: 1024px) {
          box-sizing: border-box;
          width: 100%;
          padding: 0 20px;
        }
        margin: 40px auto 0;

        input {
          box-sizing: border-box;
          height: 52px;
          width: 100%;
          padding: 0 80px 0 25px;
          background-color: ${({theme}) => theme.boxBgColor};
          color: ${({theme}) => theme.textColor};
          border: 1px solid ${({theme}) => theme.textColor};
          border-radius: 30px;
          font-size: 20px;
        }

        .icon-custom {
          position: absolute;
          top: 10px;
          right: 30px;
          font-size: 30px;
          cursor: pointer;
          @media screen and (max-width: 1024px) {
            right: 50px;
          }
        }
      }
    }
  }

  .faq-list-main {
    width: 1160px;
    margin: 5% auto 10%;
    @media screen and (max-width: 1280px) {
      box-sizing: border-box;
      width: 100%;
      padding: 0 20px;
      margin: 5% auto 10%;
    }
    
    .faq-list-head {
      
      .fos-list {
        height: auto;
        padding-bottom: 42px;
        margin-top: 32px;
        
        .fos-item {
          box-sizing: border-box;
          min-height: 275px;
          width: 370px;
          padding: 32px 32px 58px;
          border: 1px solid #d8c9c9;
          border-radius: 8px;
          word-break: keep-all;
          overflow-wrap: break-word;
          
          .item-title {
            padding-top: 12px;
            font-weight: bolder;
            
            .icon-custom {
              margin-bottom: 15px;
              font-size: 16px;
              opacity: 0.5;
            }
          }
          
          .item-content {
            max-height: 76px;
            margin-top: 24px;
            overflow: hidden;
          }
        }
      }
    }
    
    .faq-list-body {
      margin: 80px auto;
      
      .faq-list-category {
        display: flex;
        border-bottom: 1px solid ${({theme}) => theme.rgbaLight};
        @media screen and (max-width: 1280px) {
          justify-content: left;
          flex-wrap: wrap;
        }
        
        .category-item {
          width: auto;
          padding: 20px 32px;
          font-size: 16px;
          text-align: center;
          cursor: pointer;
        }
        .category-item.active {
          width: auto;
          padding: 20px 32px;
          border-bottom: 2px solid ${({theme}) => theme.rgbaBold};
          font-size: 16px;
          font-weight: bold;
          text-align: center;
          cursor: pointer;
        }
      }
      
      .faq-list-view {
        
        .faq-list-item {
          border-bottom: 1px solid ${({theme}) => theme.rgbaLight};
          transition: border .3s ease;
          cursor: pointer;
          
          .faq-item-title {
            position: relative;
            padding: 32px 30px 32px 3px;
            @media screen and (max-width: 1280px) {
              padding: 16px 30px 16px 3px;
            }
            color: ${({theme}) => theme.rgbaMedium};
            font-size: 16px;
            font-weight: 500;
            line-height: 26px;
            letter-spacing: -.4px;
            transition: color .3s ease;
            
            .icon-custom {
              margin-right: 7px;
            }
          }
          
          .faq-item-content {
            height: 0;
            padding: 0 30px 0 24px;
            font-size: 16px;
            line-height: 26px;
            letter-spacing: -.4px;
            overflow: hidden;
            word-break: keep-all;
            overflow-wrap: break-word;
            transition: all 0.3s ease-in;
          }

          .faq-item-content.show-box {
            height: 40px;
            @media screen and (max-width: 900px) {
              height: 100%;
            }
            padding: 10px 30px 25px 24px;
            transition: all 0.3s ease-in;
          }
          
          &:hover {
            border-bottom: 1px solid ${({theme}) => theme.rgbaMedium};
          }
        }
        
        .faq-list-item:has(.faq-item-content.show-box) .faq-item-title {
          color: ${({theme}) => theme.rgbaBold};
        }
      }
      
      .faq-more-btn {
        width: 300px;
        margin: 70px auto 0;
        padding: 10px 15px 10px 15px;
        border: 1px solid ${({theme}) => theme.textColor};
        border-radius: 10px;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        
        .icon-custom {
          margin-left: 5px;
        }
      }
    }
  }
`;
