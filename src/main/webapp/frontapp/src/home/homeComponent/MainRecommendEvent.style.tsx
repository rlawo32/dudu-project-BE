import styled from "styled-components";

export const MainRecommendEventView = styled.div`
  width: 1440px;
  margin: 10% auto;
  @media screen and (max-width: 1440px) {
    width: 1024px;
    margin: 20% auto 10%;
  }
  @media screen and (max-width: 1024px) {
    width: fit-content;
  }

  .el-title {
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

  .el-list {
    display: flex;
    width: 100%;
    margin: 54px auto 0;
    @media screen and (max-width: 1024px) {
      margin: 24px auto 0;
      flex-direction: column;
      border-bottom: 1px solid gray;
    }

    .el-list-item {
      height: 100%;
      width: calc((100% - 48px) / 4);
      margin-right: 32px;
      padding: 5px;
      cursor: pointer;
      @media screen and (max-width: 1024px) {
        display: flex;
        flex-direction: row;
        width: 100%;
        margin: 0;
        border-bottom: 1px solid gray;
      }

      .el-list-image {
        height: 350px;
        @media screen and (max-width: 1440px) {
          height: 200px;
        }
        @media screen and (max-width: 1024px) {
          height: 250px;
          width: 30%;
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

      .el-list-info {
        @media screen and (max-width: 1024px) {
          height: 100%;
          width: calc(70% - 16px);
          margin-left: 16px;
          padding: 0 0 25px;
        }

        .el-list-state {
          height: 100%;
          margin-top: 10px;

          .span-elState {
            border: none;
            border-radius: 10px;
            margin-right: 6px;
            padding: 3px 7px 3px 7px;
            font-size: 14px;
            font-weight: bold;
          }

          .span-elInstitution {
            border: none;
            border-radius: 10px;
            padding: 3px 7px 3px 7px;
            font-size: 14px;
            font-weight: bold;
            background-color: lightgray;
            color: black;
          }
        }

        .el-list-title {
          min-height: 50px;

          p {
            margin: 10px 0 0 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
            word-break: keep-all;
            line-height: 1.5;
            font-size: 22px;
            font-weight: bold;

            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }

        .el-list-division {
          margin-top: 6px;
          font-size: 16px;
          font-weight: 500;
          opacity: 0.9;
        }

        .el-list-time {
          margin-top: 3px;
          font-size: 16px;
          font-weight: 500;
          opacity: 0.9;

          .icon-custom {
            margin-right: 4px;
          }

          span {
            margin-right: 4px;
          }
        }

        .el-list-fee {
          margin-top: 13px;
          font-size: 15px;
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