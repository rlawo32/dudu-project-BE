import styled from "styled-components";

export const BoardListView = styled.div`
  position: relative;
  
  .bl-sub-view {
    padding: 60px 0 80px;
    margin: 5% auto 0;

    .bl-sub {
      width: 1160px;
      margin: 0 auto;
      text-align: center;

      .bl-sub-title {
        font-size: 48px;
      }
      
      .bl-sub-input {
        position: relative;
        width: 600px;
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
        }
      }
    }
  }
  
  .bl-main-view {
    padding: 40px 0 200px;

    .bl-main {
      width: 1160px;
      margin: 0 auto;

      .bl-category {
        display: flex;
        width: 100%;
        
        .bl-category-inform {
          width: 50%;
          padding: 20px 0;
          border-bottom: 1px solid ${({theme}) => theme.rgbaLight};
          font-size: 20px;
          text-align: center;
          cursor: pointer;
        }
        
        .bl-category-event {
          width: 50%;
          padding: 20px 0;
          border-bottom: 1px solid ${({theme}) => theme.rgbaLight};
          font-size: 20px;
          text-align: center;
          cursor: pointer;
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
            
          }
          
          .bl-sort {
            position: relative;

            button {
              border: none;
              background: none;
              color: ${({theme}) => theme.textColor};
              font-size: 16px;
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
              z-index: 2;
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
            
            &:hover {
              border-bottom: 1px solid ${({theme}) => theme.rgbaMedium};
            }
            
            .bl-item-title {
              font-size: 20px;
            }
            
            .bl-item-date {
              font-size: 13px;
              opacity: 0.5;
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