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
      cursor: pointer;

      .lt-list-image {
        border-radius: 10px;
        overflow: hidden;

        img {
          height: 250px;
          width: 100%;
          border: none;
          border-radius: 10px;
          object-fit: cover;
          vertical-align: top;

          transition: transform .4s ease;
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
        
        p {
          margin: 10px 0 0 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
          word-break: keep-all;
          line-height: 1.5;
          font-size: 17px;
          font-weight: 900;
          
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
      
      .lt-list-division {
        margin-top: 6px;
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
      
      &:hover img {
        transform: scale(1.1);
        transition: transform .4s ease;
      }
    }
  }
`;
