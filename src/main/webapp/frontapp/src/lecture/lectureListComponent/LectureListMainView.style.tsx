import styled from "styled-components";

export const LectureListMain = styled.div<{
    $lectureList:{}[];
}>`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  //margin: ${({$lectureList}) => $lectureList.length > 0 ? 0 : "auto"};
  padding: 0;
  margin: 0;
  
  .lt-list-item {
    height: 100%;
    width: 272px;
    @media screen and (max-width: 1280px) {
      width: calc((100% - 48px) / 3);
    }
    @media screen and (max-width: 1024px) {
      display: flex;
      flex-direction: row;
      width: 100%;
      border-bottom: 1px solid gray;
    }
    margin: 30px 3px 0 0;
    padding: 5px;
    cursor: pointer;

    .lt-list-image {
      height: 250px;
      @media screen and (max-width: 1024px) {
        height: 200px;
        width: 35%;
      }
      border-radius: 10px;
      overflow: hidden;
 
      img {
        height: 100%;
        width: 100%;
        border: none;
        border-radius: 10px;
        object-fit: cover;
        vertical-align: top;

        transition: transform .4s ease;
      }
    }
    
    .lt-list-info {
      @media screen and (max-width: 1024px) {
        height: 100%;
        width: calc(65% - 16px);
        margin-left: 16px;
        padding: 0 0 25px;
      }

      .lt-list-state {
        height: 100%;
        margin-top: 10px;

        .span-ltState {
          border: none;
          border-radius: 10px;
          margin-right: 6px;
          padding: 3px 7px 3px 7px;
          font-size: 11px;
          font-weight: bold;
        }

        .span-ltInstitution {
          border: none;
          border-radius: 10px;
          padding: 3px 7px 3px 7px;
          font-size: 11px;
          font-weight: bold;
          background-color: lightgray;
          color: black;
        }
      }

      .lt-list-title {
        min-height: 50px;

        p {
          margin: 10px 0 0 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
          word-break: keep-all;
          line-height: 1.5;
          font-size: 16px;
          font-weight: bold;

          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }

      .lt-list-division {
        margin-top: 6px;
        font-size: 14px;
        font-weight: 500;
        opacity: 0.9;
      }

      .lt-list-time {
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

      .lt-list-fee {
        margin-top: 3px;
        font-size: 14px;
        font-weight: bold;
      }
    }

    &:hover img {
      transform: scale(1.1);
      transition: transform .4s ease;
    }
  }
  
  .lt-list-empty {
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
`;