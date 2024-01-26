import styled from "styled-components";

interface Props {
    $noticeBoxH:number;
}

export const LectureDetailView = styled.div<Props>`
  position: relative;
  box-sizing: border-box;
  margin-top: 8%;
  word-break: keep-all;
  overflow-wrap: break-word;
  line-height: 1.75;
  font-family: "Noto Sans KR", sans-serif;

  .lt-top-btn {
    position: fixed;
    bottom: 40px;
    @media screen and (max-width: 1280px) {
      bottom: 160px;
    }
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
  
  .footer-navigation {
    @media screen and (max-width: 1280px) {
      margin-bottom: 95px;
    }
  }
  
  .detail-responsive {
    @media screen and (min-width: 1280px) {
      display: none;
    }
    @media screen and (max-width: 1280px) {
      display: block;
    }
  }
  
  .lt-detail-top {
    @media screen and (max-width: 1280px) {
      height: 600px;
      width: fit-content;
      margin: 0 auto;
      overflow: hidden;

      img {
        height: 100%;
        width: 100%;
        border: none;
        border-radius: 10px;
        object-fit: cover;
        vertical-align: top;
      }
    }
  }
  
  .section-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 25px;
  }
  
  .detail-remote {
    position: sticky;
    top: 55px;
    @media screen and (max-width: 1280px) {
      display: flex;
    }
    width: 100%;
    background: ${({theme}) => theme.bgColor};
    font-size: 20px;
    text-align: center;
    cursor: pointer;
    z-index: 99;

    .remote-detail-info {
      width: 50%;
      padding: 10px;
      border-bottom: 1px solid ${({theme}) => theme.rgbaLight};
    }

    .remote-detail-content {
      width: 50%;
      padding: 10px;
      border-bottom: 1px solid ${({theme}) => theme.rgbaLight};
    }

    .remote-detail-info.remote-active, .remote-detail-content.remote-active {
      border-bottom: 2px solid ${({theme}) => theme.rgbaBold};
      font-weight: bold;
    }
  }
  
  .lt-detail-main {
    display: flex;
    height: 100%;
    width: 1160px;
    padding: 0;
    margin: 5% auto 5%;
    @media screen and (min-width: 1280px) {
      justify-content: space-between;
    }
    @media screen and (max-width: 1280px) {
      flex-direction: column-reverse;
      box-sizing: border-box;
      width: 100%;
      padding: 30px;
      margin: 0 auto 5%;
    }
    
    .lt-detail-content-box {
      width: calc(100% - 490px);
      @media screen and (max-width: 1280px) {
        width: 100%;
      }
      margin-top: 30px;
      
      img {
        max-height: 600px;
        max-width: 600px;
        @media screen and (max-width: 1280px) {
          width: 100%;
        }
        border: none;
        border-radius: 10px;
        object-fit: cover;
        vertical-align: top;
      }

      ul {
        padding: 0 20px;
        transition: all 0.5s ease-in;
        li {
          margin: 20px 0 0;
          transition: all 0.5s ease-in;
        }
      }
      
      .detail-section-title {
        padding: 110px 0 20px;
        font-size: 27px;
        font-weight: bold;
        @media screen and (min-width: 1280px) {
          pointer-events: none;
        }
        @media screen and (max-width: 1280px) {
          display: flex;
          justify-content: space-between;
          padding: 20px 0 0;
          font-size: 20px;
          cursor: pointer;
          
          .box-arrow {
            font-size: 18px;
          }
        }
      }

      .detail-section-item {

        @media screen and (min-width: 1280px) {

        }
        @media screen and (max-width: 1280px) {
          padding: 10px 0;
          border-bottom: 1px solid gray;
          ul {
            height: 0;
            width: 100%;
            padding: 0;
            margin: 0;
            border: none;
            border-radius: 15px;
            overflow: hidden;
            transition: all 0.5s ease-in;
            opacity: 0;
          }
        }
      }
      
      @media screen and (max-width: 1280px) {
        .box-arrow {
          transition: all .4s linear;
        }
        .detail-section-item.show-list {
          padding: 0 0 20px;
          ul {
            height: 100%;
            padding: 15px 5px;
            opacity: 1;
          }
        }
        .box-arrow.show-list {
          transform: rotate(180deg);
        }
      }
      
      .detail-content {
        @media screen and (max-width: 1280px) {
          padding: 20px 0 70px;
          margin-bottom: 30px;
          border-bottom: 1px solid gray;
        }

        * {
          text-align: center;
          padding: 0;
          margin: 0;
        }
      }
      
      .detail-schedule {
        ul {
          padding: 0;
          list-style: none;
          li {
            margin: 0;
          }
        }
        
        .schedule-item {
          margin: 20px 0 0;

          .schedule-date {
            font-size: 20px;
            font-weight: bold;
          }
        }
      }

      .detail-materialsAndSignificant {

      }

      .detail-notice {

      }
    }
    
    .lt-detail-info-box {
      @media screen and (min-width: 1280px) {
        width: calc(100% - 780px);
      }
      @media screen and (max-width: 1280px) {
        width: 100%;
      }
      
      .detail-info {
        @media screen and (min-width: 1280px) {
          position: sticky;
          top: 100px;
          right: 0;
          height: 600px;
          width: 420px;
          padding: 30px 20px 20px 30px;
          border: none;
          border-radius: 15px;
          background-color: ${({theme}) => theme.boxBgColor};
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
        }
        @media screen and (max-width: 1280px) {
          position: relative;
          width: 100%;
        }
        
        .info-main {
          @media screen and (min-width: 1280px) {
            height: 500px;
            overflow: auto;
          }
          @media screen and (max-width: 1280px) {
            width: 100%;
          }
          
          &::-webkit-scrollbar {
            width: 5px;
          }

          &::-webkit-scrollbar-thumb {
            background: gray; /* 스크롤바의 색상 */
            border-radius: 10px;
          }

          &::-webkit-scrollbar-track {
            background: rgba(200, 200, 200, .1);
          }
          
          .info-head {

            .head-top {

              .detail-state {
                display: inline-block;
                border: none;
                border-radius: 10px;
                margin-right: 6px;
                padding: 2px 15px;
                font-size: 13px;
              }

              .detail-division {
                display: inline-block;
                border: 1px solid gray;
                border-radius: 15px;
                margin-right: 6px;
                padding: 1px 15px;
                font-size: 13px;
              }
            }

            .head-bot {
              display: flex;
              padding: 20px 0;
              border-bottom: ${({theme}) => theme.borderBottomColor};

              .detail-thumbnail {
                @media screen and (min-width: 1280px) {
                  display: block;
                  height: 100px;
                  width: 100px;
                }
                @media screen and (max-width: 1280px) {
                  display: none;
                }

                img {
                  height: 100%;
                  width: 100%;
                  border: none;
                  border-radius: 10px;
                  object-fit: cover;
                  vertical-align: top;
                }
              }

              .detail-title {
                padding-left: 30px;
                width: calc(100% - 118px);
                font-size: 18px;
                font-weight: bold;
                @media screen and (max-width: 1280px) {
                  padding: 0;
                }
              }
            }
          }

          .info-body {
            padding: 0 0 20px 0;
            margin-top: 20px;
            font-size: 15px;
            line-height: 23px;

            .dl {
              display: flex;
              align-items: center;
              margin: 16px 0 0;

              .dt {
                width: 104px;
                margin-right: 40px;
                opacity: 0.8;
              }

              .dd {
                font-weight: 600;
              }
            }
          }
        }
        
        .info-foot {
          padding: 20px 40px 40px;
          margin-top: 20px;
          border-top: ${({theme}) => theme.borderBottomColor};
          @media screen and (max-width: 1280px) {
            position: fixed;
            bottom: 0;
            left: 0;
            box-sizing: border-box;
            width: 100%;
            padding: 20px;
            margin: 0 auto;
            background: ${({theme}) => theme.boxBgColor};
            z-index: 100;
          }
          
          button {
            width: 100%;
            padding: 16px 10px 17px;
            border: none;
            border-radius: 10px;
            background-color: ${({theme}) => theme.reverseBgColor};
            color: ${({theme}) => theme.reverseTextColor};
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
          }
        }
      }
    }
  }
`;