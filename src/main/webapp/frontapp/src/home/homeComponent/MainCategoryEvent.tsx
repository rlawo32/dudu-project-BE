import React from "react";
import styled from "styled-components";

const MainCategoryEventView = styled.div`
  width: 1440px;
  margin: 5% auto;

  .el-title {
    word-break: keep-all;
    overflow-wrap: break-word;

    .title-top {
      margin-bottom: 10px;
      font-size: 24px;
      font-weight: bold;
      line-height: 32px;
      letter-spacing: -.6px;
    }

    .title-bottom {
      font-size: 64px;
      font-weight: lighter;
      line-height: 80px;
      letter-spacing: -4.8px;
    }
  }
`;
const MainCategoryEvent = () => {

    return (
        <MainCategoryEventView>
            <div className="el-title">
                <div className="title-top">
                    강좌 카테고리
                </div>
                <div className="title-bottom">
                    일상을 빛낼 취향을 <br />발견하세요!
                </div>
            </div>
            <div className="el-list">

            </div>
        </MainCategoryEventView>
    )
}

export default MainCategoryEvent;