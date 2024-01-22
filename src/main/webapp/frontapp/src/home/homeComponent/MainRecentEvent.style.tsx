import styled from "styled-components";

export const MainRecentEventView = styled.div`
  width: 1440px;
  margin: 5% auto;
  @media screen and (max-width: 1440px) {
    width: 1024px;
    margin: 10% auto;
  }
  @media screen and (max-width: 1024px) {
    width: 100%;
    border-bottom: 1px solid gray;
  }

  .els-title {
    word-break: keep-all;
    overflow-wrap: break-word;
    @media screen and (max-width: 1024px) {
      width: fit-content;
      margin: 0 0 0 5%;
    }

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
  
  .els-list {
    position: relative;
    display: flex;
    box-sizing: content-box;
    height: 100%;
    width: 100%;
    margin: 64px auto 0;
    padding-bottom: 50px;
    z-index: 1;
    transition-property: transform;
    @media screen and (max-width: 1024px) {
      width: 90%;
      margin: 34px auto;
    }

    .els-list-item {
      position: relative;
      height: 100%;
      width: calc(100% / 4);
      @media screen and (max-width: 1024px) {
        width: calc(100% / 2);
      }
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;

      .els-list-image {
        height: 250px;
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
        
        .els-image-label {
          position: absolute;
          top: -14px;
          right: -40px;
          height: 48px;
          width: 98px;
          background-color: greenyellow;
          color: black;
          z-index: 2;
          transform: rotate(45deg);
          
          .label-text {
            position: absolute;
            bottom: 0;
            right: 32px;
            font-size: 15px;
            font-weight: bold;
          }
        }
      }

      .els-list-info {

        .els-list-state {
          height: 100%;
          margin-top: 10px;

          .span-elsState {
            border: none;
            border-radius: 10px;
            margin-right: 6px;
            padding: 3px 7px 3px 7px;
            font-size: 11px;
            font-weight: bold;
          }

          .span-elsInstitution {
            border: none;
            border-radius: 10px;
            padding: 3px 7px 3px 7px;
            font-size: 11px;
            font-weight: bold;
            background-color: lightgray;
            color: black;
          }
        }

        .els-list-title {
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

        .els-list-division {
          margin-top: 6px;
          font-size: 14px;
          font-weight: 500;
          opacity: 0.9;
        }

        .els-list-time {
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

        .els-list-fee {
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
  }
`;