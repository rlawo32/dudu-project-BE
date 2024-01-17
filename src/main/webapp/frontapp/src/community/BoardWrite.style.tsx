import styled from "styled-components";

export const BoardWriteView = styled.div`
  position: relative;
  
  .item-title {
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .bw-view {
    width: 1160px;
    margin: 8% auto 5%;
    
    .bw-select {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      
      input {
        box-sizing: border-box;
        border: ${({theme}) => theme.borderColor};
        border-radius: 10px;
        padding: 10px;
        font-size: 16px;
        font-weight: bold;
        background-color: ${({theme}) => theme.boxBgColor};
        color: ${({theme}) => theme.textColor};
      }
      
      select {
        box-sizing: border-box;
        width: 100%;
        border: ${({theme}) => theme.borderColor};
        border-radius: 10px;
        padding: 10px;
        font-size: 16px;
        font-weight: bold;
        background-color: ${({theme}) => theme.boxBgColor};
        color: ${({theme}) => theme.textColor};
        cursor: pointer;
      }
      
      .sl-title {
        width: 65%;
        margin-right: 15px;

        input {
          width: 100%;
        }
      }
      
      .sl-category {
        width: 15%;
        margin-right: 15px;
      }

      .sl-institution {
        width: 20%;
      }
    }
    
    .bw-write {
      width: 100%;
      margin: 15px auto 0;
    }
    
    .bw-button {
      margin: 15px auto 0;
      text-align: right;
      
      button {
        border: ${({theme}) => theme.borderColor};
        border-radius: 10px;
        padding: 10px;
        background-color: ${({theme}) => theme.reverseBgColor};
        color: ${({theme}) => theme.reverseTextColor};
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
      }
    }
  }
`;