import styled from "styled-components";

export const MainCategoryEventView = styled.div`

  .el-title {
    width: 1440px;
    margin: 5% auto;
    @media screen and (max-width: 1440px) {
      width: 1024px;
      margin: 10% auto;
    }
    @media screen and (max-width: 1024px) {
      width: fit-content;
      margin: 10% 0 5% 5%;
    }
    word-break: keep-all;
    overflow-wrap: break-word;

    .title-top {
      margin-bottom: 10px;
      font-size: 24px;
      font-weight: bold;
      line-height: 32px;
      letter-spacing: -.6px;
      @media screen and (max-width: 1024px) {
        margin-bottom: 5px;
        font-size: 18px;
        line-height: 26px;
      }
    }

    .title-bottom {
      font-size: 64px;
      font-weight: lighter;
      line-height: 80px;
      letter-spacing: -4.8px;
      @media screen and (max-width: 1024px) {
        font-size: 32px;
        line-height: 40px;
      }
    }
  }
  
  .el-wrapper {
    display: flex;
    @media screen and (max-width: 1024px) {
      display: block;
      padding-bottom: 50px;
      border-bottom: 1px solid gray;
    }
    overflow: hidden;
    
    .el-select {
      position: relative;
      display: inline-block;
      height: 100vh;
      width: 70%;
      border-radius: 0 12px 12px 0;
      @media screen and (max-width: 1440px) {
        width: 45%;
      }
      @media screen and (min-width: 1024px) {
        overflow: hidden;
      }
      @media screen and (max-width: 1024px) {
        height: 50px;
      }
      
      img {
        height: 100%;
        border-radius: 0 12px 12px 0;
        object-fit: cover;
        overflow: hidden;
        transition: border-radius 3s ease;

        @media screen and (max-width: 1024px) {
          display: none;
        }
      }

      .el-select-box {
        position: absolute;
        top: 120px;
        left: 217px;
        @media screen and (max-width: 1440px) {
          left: 117px;
        }
        @media screen and (max-width: 1024px) {
          top: 0;
          left: 15%;
        }
        width: 200px;
        z-index: 6;

        button {
          width: 100%;
          border: 2px solid #fff;
          border-radius: 25px;
          padding: 9px 22px 11px 20px;
          background: none;
          color: #fff;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          @media screen and (max-width: 1024px) {
            border: 2px solid ${({theme}) => theme.textColor};
            color: ${({theme}) => theme.textColor};
          }
        }

        .select-box {
          position: absolute;
          top: 57px;
          left: 0;
          height: 0;
          width: 100%;
          padding: 0;
          margin: 0;
          border: none;
          border-radius: 5px;
          background: ${({theme}) => theme.boxBgColor};
          text-align: center;
          transition: all 0.3s ease-in;
        }

        ul.select-list {
          height: 0;
          width: 90%;
          padding: 0;
          margin: 5px auto 0;
          border: none;
          overflow: auto;
          background: ${({theme}) => theme.boxBgColor};
          color: ${({theme}) => theme.textColor};
          text-align: left;
          cursor: pointer;
          user-select: none;
          list-style:none;
          transition: all 0.3s ease-in;

          &::-webkit-scrollbar {
            width: 5px;
          }

          &::-webkit-scrollbar-thumb {
            background: gray; /* 스크롤바의 색상 */
            border-radius: 15px;
          }

          &::-webkit-scrollbar-track {
            background: rgba(200, 200, 200, .1);
          }
        }

        ul.select-list li {
          padding: 6px 20px;
          font-size: 18px;
          font-weight: lighter;
          transition: all 0.3s ease-in;
        }

        ul.select-list li.item-mainCategory {
          padding: 6px 20px;
          margin: 10px 0 0;
          font-size: 13px;
          font-weight: normal;
        }

        .select-name {
          display: inline-block;
          float: left;
        }

        .select-arrow {
          display: inline-block;
          font-size: 21px;
          float: right;
          transition: all .4s linear;
        }

        .select-box.show-list {
          padding: 10px 0;
          height: 475px;
          width: 100%;
          border: 1px solid gray;
        }

        .select-list.show-list {
          padding: 0;
          height: 460px;
          width: 90%;
          border: none;
        }

        ul.select-list li.select-active {
          font-weight: bold;
        }

        .select-arrow.show-list {
          transform: rotate(180deg);
        }
      }

      .select-bottom {
        content: '';
        height: 1px;
        width: 100%;
      }
    }
    
    .el-list {
      position: relative;
      display: inline-block;
      width: calc(50% - 30px);
      padding: 100px;
      margin-left: 30px;
      @media screen and (max-width: 1440px) {
        padding: 40px;
      }
      @media screen and (max-width: 1024px) {
        width: 100%;
        padding: 0;
        margin: 0;
        flex-direction: column;
      }
      
      .el-list-view {
        
        .el-list-item {
          position: relative;
          display: flex;
          width: 100%;
          margin-top: 60px;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          @media screen and (max-width: 1024px) {
            margin-top: 30px;
          }
          
          .item-thumbnail {
            width: 45%;
            @media screen and (max-width: 1024px) {
              height: 250px;
              width: 35%;
            }
            overflow: hidden;

            img {
              height: 100%;
              width: 100%;
              border: none;
              object-fit: cover;
              vertical-align: top;

              transition: transform .4s ease;
            }
          }
          
          .item-info {
            width: 55%;
            padding: 56px 50px 62px;
            @media screen and (max-width: 1440px) {
              padding: 28px 25px 31px;
            }
            @media screen and (max-width: 1024px) {
              width: 65%;
            }
            background: ${({theme}) => theme.boxBgColor};
            
            .item-top {

              .item-state {
                display: inline-block;
                border: none;
                border-radius: 10px;
                margin-right: 6px;
                padding: 2px 15px;
                font-size: 13px;
              }
              .item-institution {
                display: inline-block;
                border: 1px solid gray;
                border-radius: 15px;
                margin-right: 6px;
                padding: 1px 15px;
                font-size: 13px;
              }
            }
            
            .item-title {
              min-height: 62px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: normal;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              margin-top: 8px;
              font-size: 24px;
              font-weight: bold;
            }
            
            .item-mid {
              margin-top: 10px;
              
              .item-division {
                position: relative;
                display: inline-block;
                padding-right: 6px;
                margin-right: 6px;
                
                &:after {
                  position: absolute;
                  top: 6px;
                  right: 0;
                  display: block;
                  content: '';
                  height: 14px;
                  width: 1px;
                  background: rgba(0,0,0, .3);
                }
              }
              .item-teacher {
                display: inline-block;
                padding-right: 6px;
                margin-right: 6px;
              }
            }
            
            .item-time {
              display: block;
              margin-top: 3px;
              font-size: 14px;
              font-weight: 500;
              opacity: 0.9;

              .icon-custom {
                margin-right: 4px;
              }

              span {
                margin-right: 4px;
              }
            }
            
            .item-fee {
              margin-top: 10px;
              font-size: 18px;
              font-weight: bold;
            }
          }

          &:hover img {
            transform: scale(1.1);
            transition: transform .4s ease;
          }
        }
      }
    }
  }
`;