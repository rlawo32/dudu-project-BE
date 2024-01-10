import styled from "styled-components";

export const LectureDetailView = styled.div`
  position: relative;
  box-sizing: border-box;
  word-break: keep-all;
  overflow-wrap: break-word;
  line-height: 1.75;
  font-family: NotoSans_Regular, '맑은 고딕';
  
  .lt-detail-main {
    display: flex;
    height: 100%;
    width: 1160px;
    padding: 0;
    margin: 5% auto 0;
    
    .lt-detail-content {
      width: calc(100% - 490px);
      margin-top: 30px;
      text-align: center;
      
      p {
        display: block;
        margin: 0;
      }
    }
    
    .lt-detail-info {
      width: 35%;
      background-color: black;
    }
  }
`;