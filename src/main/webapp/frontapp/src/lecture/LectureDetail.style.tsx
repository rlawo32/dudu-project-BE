import styled from "styled-components";

export const LectureDetailView = styled.div`
  position: relative;
  box-sizing: border-box;
  margin-top: 8%;
  word-break: keep-all;
  overflow-wrap: break-word;
  line-height: 1.75;
  font-family: "Noto Sans KR", sans-serif;
  
  .lt-detail-main {
    display: flex;
    justify-content: space-between;
    height: 100%;
    width: 1160px;
    padding: 0;
    margin: 5% auto 0;
    
    .lt-detail-content-box {
      width: calc(100% - 490px);
      margin-top: 30px;
      
      img {
        height: 100%;
        width: 100%;
        border: none;
        border-radius: 10px;
        object-fit: cover;
        vertical-align: top;
      }
      
      p {
        text-align: center;
        display: block;
        margin: 0;
      }

      ul {
        padding: 0 20px;
        li {
          margin: 20px 0 0;
        }
      }
      
      .detail-section-title {
        padding: 110px 0 20px;
        font-size: 27px;
        font-weight: bold;
      }
      
      .detail-content {
        
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
          margin: 0 0 20px;

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
      width: calc(100% - 730px);
      
      .detail-info {
        position: fixed;
        height: 600px;
        width: 420px;
        padding: 30px 20px 20px 30px;
        border: none;
        border-radius: 15px;
        background-color: ${({theme}) => theme.boxBgColor};
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
        
        .info-main {
          height: 500px;
          overflow: auto;
          
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
                padding: 1px 8px;
                font-size: 13px;
              }

              .detail-division {
                display: inline-block;
                border: 1px solid gray;
                border-radius: 15px;
                margin-right: 6px;
                padding: 1px 8px;
                font-size: 13px;
              }
            }

            .head-bot {
              display: flex;
              padding: 20px 0;
              border-bottom: ${({theme}) => theme.borderBottomColor};

              .detail-thumbnail {
                height: 100px;
                width: 100px;

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