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
    width: 1440px;
    
    .ew-thumbnail {
      width: 220px;
      margin-bottom: 20px;
    }
    
    .ew-lecture {
      margin-right: 40px;

      .ew-list-select {
        
      }

      .ew-list-view {
        width: 800px;

        table {
          width: 100%;
          margin: 20px auto 0;
          text-align: center;
          color: ${({theme}) => theme.textColor};

          tbody tr {
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
      
      .ew-list-write {
        margin: 50px auto 0;
        
        .write-list {
          height: fit-content;
          max-height: 250px;
          width: 800px;
          margin: 30px auto 0;
          overflow: auto;
          
          table {
            width: 100%;
            margin: 20px auto 0;
            text-align: center;
            color: ${({theme}) => theme.textColor};

            tbody tr {
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
        
        .write-insert {
          width: fit-content;
          margin: 30px auto 0;
          
        }
      }
    }
    
    .ew-event {
      width: 800px;
      
      table {
        width: 100%;
        text-align: center;
        color: ${({theme}) => theme.textColor};

        tbody tr {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      
      .ew-list-view {
        height: fit-content;
        max-height: 250px;
        width: 700px;
        margin: auto ;
        overflow: auto;
      }
      
      .ew-catalog-box {
        margin-top: 20px;
        border: 2px solid gray;
      }
    }
  }
`;