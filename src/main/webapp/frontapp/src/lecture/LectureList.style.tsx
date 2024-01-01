import styled from "styled-components";

export const LectureListView = styled.div`
  position: relative;
  margin: 10% auto;
  padding: 0 20% 0 20%;
  
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
  
  .lt-list-box {
    display: flex;
    flex-wrap: wrap;
    width: fit-content;
    
    .lt-list-item {
      height: fit-content;
      width: 272px;
      margin: 30px 3px 0 0;
      padding: 5px;

      .lt-list-image {
        overflow: hidden;

        img {
          height: 250px;
          width: 100%;
          border: none;
          border-radius: 10px;
          object-fit: cover;
          vertical-align: top;
        }
      }   
      
      .lt-list-state {
        margin-top: 10px;
        font-size: 12px;
        
        .span-ltState {
          border: none;
          border-radius: 10px;
          margin-right: 6px;
          padding: 3px 7px 3px 7px;
          font-size: 13px;
          font-weight: bold;
        }
        
        .span-ltInstitution {
          border: none;
          border-radius: 10px;
          padding: 3px 7px 3px 7px;
          font-size: 13px;
          font-weight: bold;
          background-color: lightgray;
          color: black;
        }
      }
      
      .lt-list-title {
        min-height: 42px;
        margin-top: 5px;
        font-size: 17px;
        font-weight: 900;
      }
      
      .lt-list-division {
        margin-top: 5px;
        font-size: 14px;
        font-weight: 700;
      }
      
      .lt-list-time {
        margin-top: 3px;
        font-size: 14px;
        font-weight: 500;
        
        .icon-custom {
          margin-right: 4px;
        }
        
        span {
          margin-right: 4px;
        }
      }
      
      .lt-list-fee {
        margin-top: 3px;
        font-size: 14px;
        font-weight: 700;
      }
    }
  }
`;
