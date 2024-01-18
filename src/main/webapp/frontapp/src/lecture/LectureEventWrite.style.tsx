import styled from "styled-components";

export const LectureEventWriteView = styled.div`
  box-sizing: border-box;
  
  .paging-view {
    width: fit-content;
    margin: 10px auto 0;
    
    ul {
      padding: 0;
      margin: 0;
      list-style: none;
      li {
        float: left;
        margin-right: 10px;
        cursor: pointer;
      }
    }
  }
  
  .ew-main-view {
    display: flex;
    height: 760px;
    width: fit-content;
    padding: 2%;
    margin: 5% auto 0;
    border-bottom: 1px solid ${({theme}) => theme.rgbaBold};
    
    .ew-thumbnail {
      width: 220px;
      margin-bottom: 20px;
    }
    
    .ew-lecture {
      margin-right: 40px;

      .ew-list-select {
        
      }

      .ew-list-view {
        width: 700px;

        .ew-list {
          width: 100%;

          table {
            table-layout: fixed;
            width: 100%;
            margin: 20px auto 0;
            text-align: center;
            color: ${({theme}) => theme.textColor};

            tbody tr td {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            tbody td:nth-child(4) {
              text-align: left;
              padding-left: 20px;
            }

            tbody tr:hover {
              background-color: rgba(80, 80, 80, 0.8);
              color: #fff;
            }
          }
        }
      }
      
      .ew-list-insert {
        margin: 50px auto 0;
        
        .insert-list-view {
          height: fit-content;
          max-height: 250px;
          width: 700px;
          margin: 30px auto 0;
          
          .insert-list {
            width: 100%;
            height: 200px;
            overflow: auto;

            table {
              table-layout: fixed;
              width: 100%;
              margin: 10px auto 0;
              text-align: center;
              color: ${({theme}) => theme.textColor};

              tbody tr td {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }

              tbody td:nth-child(4) {
                text-align: left;
                padding-left: 20px;
              }
            }
          }

          .insert-submit {
            width: fit-content;
            margin: 5px auto 0;
          }
        }
        
        .write-insert {
          width: fit-content;
          margin: 30px auto 0;
          
        }
      }
    }
    
    .ed-view {
      width: 700px;
      
      table {
        table-layout: fixed;
        width: 100%;
        text-align: center;
        color: ${({theme}) => theme.textColor};

        tbody tr td {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      
      .ed-list-view {
        height: fit-content;
        max-height: 250px;
        width: 700px;
        margin: auto ;
        overflow: auto;
      }
      
      .ed-catalog-box {
        height: fit-content;
        max-height: 400px;
        padding: 10px 10px 30px 10px;
        margin-top: 20px;
        border: 2px solid gray;
        overflow: auto;
      }
    }
  }
  
  .ew-sub-view {
    height: 760px;
    margin: 50px 0;

    table {
      width: 100%;
      table-layout: fixed;

      thead tr {
        height: 35px;
        border-bottom: 1px solid gray;
        font-size: 12px;
        font-weight: bold;
        text-align: center;
      }

      tbody tr td {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        border-bottom: 1px solid gray;
        font-size: 16px;
        text-align: center;
      }

      tbody tr:hover {
        background-color: rgba(80, 80, 80, 0.8);
        color: #fff;
      }
    }
    
    .em-view {
      display: flex;
      justify-content: left;
      flex-wrap: wrap;
      width: 1440px;
      margin: 0 auto;

      .box-delete-list {
        margin: 20px 0;
      }

      .em-list-event-box {
        width: 700px;
        margin-right: 40px;

        table {

          tbody td:nth-child(6) {
            text-align: left;
            padding-left: 20px;
          }
        }
      }

      .em-category-event-box {
        width: 700px;

        table {

          tbody td:nth-child(4) {
            text-align: left;
            padding-left: 20px;
          }
        }

        button {
          float: right;
          margin-top: 10px ;
        }

        .box-insert-list {

        }
      }

      .em-recommend-event-box {
        width: 700px;
        margin: 20px 0;
        
        button {
          float: right;
          margin-top: 10px ;
        }
      }
    }
  }
`;