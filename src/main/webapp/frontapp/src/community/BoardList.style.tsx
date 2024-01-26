import styled from "styled-components";

export const BoardListView = styled.div`
  position: relative;

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
  
  .bl-sub-view {
    height: 100%;
    width: 100%;
    background: rgba(216,201,201,0.5);

    .bl-sub {
      width: 1160px;
      @media screen and (max-width: 1280px) {
        width: 100%;
      }
      padding: 60px 0 80px;
      margin: 0 auto;
      text-align: center;

      .bl-sub-title {
        margin: 7% auto 0;
        font-size: 48px;
        @media screen and (max-width: 1024px) {
          font-size: 32px;
        }
      }
      
      .bl-sub-input {
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
  
  .bl-main-view {
    padding: 40px 0 200px;
    @media screen and (max-width: 1024px) {
      padding: 0 0 100px;
    }

    .bl-main {
      width: 1160px;
      @media screen and (max-width: 1280px) {
        box-sizing: border-box;
        width: 100%;
        padding: 30px;
      }
      margin: 0 auto;

      .bl-category {
        display: flex;
        width: 100%;
        font-size: 20px;
        text-align: center;
        cursor: pointer;
        @media screen and (max-width: 1024px) {
          font-size: 16px;
        }
        
        .bl-category-inform {
          width: 50%;
          padding: 20px 0;
          border-bottom: 1px solid ${({theme}) => theme.rgbaLight};
        }
        
        .bl-category-event {
          width: 50%;
          padding: 20px 0;
          border-bottom: 1px solid ${({theme}) => theme.rgbaLight};
        }
        
        .bl-category-inform.category-active, .bl-category-event.category-active {
          border-bottom: 2px solid ${({theme}) => theme.rgbaBold};
          font-weight: bold;
        }
      }
      
      .bl-list {
        
        .bl-list-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 68px;
          margin-top: 40px;
          
          .bl-total {
            font-size: 16px;
            @media screen and (max-width: 1024px) {
              font-size: 13px;
            }
          }
          
          .bl-sort {
            position: relative;

            button {
              border: none;
              background: none;
              color: ${({theme}) => theme.textColor};
              font-size: 16px;
              @media screen and (max-width: 1024px) {
                font-size: 13px;
              }
              font-weight: bold;
              cursor: pointer;
            }
            
            .sort-box {
              position: absolute;
              top: 105%;
              right: 0;
              height: 0;
              width: 0;
              padding: 0;
              margin: 5px auto 0;
              border: none;
              border-radius: 5px;
              background: ${({theme}) => theme.boxBgColor};
              text-align: center;
              z-index: 2;
              transition: all 0.3s ease-in;
            }
            
            ul.sort-list {
              height: 0;
              width: 0;
              padding: 0;
              margin: 5px auto 0;
              border: none;
              overflow: auto;
              background: ${({theme}) => theme.boxBgColor};
              color: ${({theme}) => theme.textColor};
              text-align: center;
              cursor: pointer;
              z-index: 3;
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

            ul.sort-list li {
              padding: 5px;
              font-size: 12px;
              line-height: 1.4em;
              opacity: 0.7;
              transition: all 0.3s ease-in;
            }

            .select-arrow {
              display: inline-block;
              margin-left: 7px;
              transition: all .4s linear;
            }

            .sort-box.show-list {
              border: 1px solid gray;
              padding: 5px;
              height: 150px;
              width: 130px;
            }

            .sort-list.show-list {
              border: none;
              padding: 5px;
              height: 135px;
              width: 120px;
            }

            ul.sort-list li.sort-active {
              opacity: 1;
              font-weight: bold;
            }

            .select-arrow.show-list {
              transform: rotate(180deg);
            }
          }
        }
        
        .bl-list-body {
          
          .bl-list-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            padding: 32px 0;
            border-bottom: 1px solid ${({theme}) => theme.rgbaLight};
            transition: border .3s ease;
            cursor: pointer;
            @media screen and (max-width: 1024px) {
              display: block;
              padding: 16px 0;
            }
            
            &:hover {
              border-bottom: 1px solid ${({theme}) => theme.rgbaMedium};
            }
            
            .bl-item-title {
              font-size: 20px;
              @media screen and (max-width: 1024px) {
                font-size: 16px;
              }
            }
            
            .bl-item-date {
              font-size: 13px;
              opacity: 0.5;
              @media screen and (max-width: 1024px) {
                margin-top: 15px;
                font-size: 11px;
              }
            }
          }
        }

        .db-list-empty {
          margin: 60px auto;
          text-align: center;
          color: grey;
          font-size: 25px;

          .icon-custom {
            margin: 15px 0 15px 0;
            font-size: 70px;
          }

          .empty-text {

            .search-text {
              color: ${({theme}) => theme.textColor};
              font-weight: bold;
            }

            .icon-custom {
              margin: 8px 3px 8px 3px;
              color: ${({theme}) => theme.textColor};
              font-size: 20px;
            }
          }

        }

        .db-more-btn {
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
    }
  }
`;