import styled from "styled-components";

export const LectureWriteView = styled.div`
  position: relative;
  // border: ${({theme}) => theme.borderColor};
  // border-radius: 20px;
  height: 100%;
  width: fit-content;
  @media all and (max-width: 860px) {
    padding: 35px 10px 50px 10px;
  } 
  padding: 35px 10% 50px 10%;
  margin: 10% auto;
  
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  
  h1 {
    text-align: center;
    margin-bottom: 50px;
  }
  
  .wave-mark {
    font-size: 24px;
    font-weight: bold;
  }
  
  .lt-section-title {
    margin-top: 20px;
    margin-bottom: 3px;
    font-size: 18px;
    font-weight: bold;
  }
  
  .lt-write-main {
    height: fit-content;
    width: fit-content;
    
    .write-main-header {
      
      .lt-name {
        display: inline-block;
        margin-right: 10px;
      }
      
      .lt-teacher {
        display: inline-block;
        margin-right: 10px;
      }
      
      .lt-capacity {
        display: inline-block;
      }
    }
    
    .write-main-body {
      height: fit-content;
      width: 100%;
    }
  }
  
  select {
    border: ${({theme}) => theme.borderColor};
    border-radius: 10px;
    padding: 7px 4px 5px 4px;
    background-color: ${({theme}) => theme.boxBgColor};
    color: ${({theme}) => theme.textColor};
    font-size: 18px;
    font-weight: bold;
  }
  
  .lt-select-title {
    color: orangered;
    margin-bottom: 3px;
  }
  
  .lt-section-select {
    display: flex;
    
    .lt-position {
      margin-right: 95px;

      .lt-institution {
        display: inline-block;
        margin-right: 10px;
      }

      .lt-room {
        display: inline-block;
      }
    }

    .lt-category {

      .lt-mainCategory {
        display: inline-block;
        margin-right: 10px;
      }

      .lt-subCategory {
        display: inline-block;
      }
    }
  }

  .lt-write-main input, .lt-section-select input, .lt-fee input {
    border: ${({theme}) => theme.borderColor};
    border-radius: 10px;
    padding: 13px 10px 11px 10px;
    font-size: 20px;
    background-color: ${({theme}) => theme.boxBgColor};
    color: ${({theme}) => theme.textColor};
  }
  
  .input-name {
    display: block;
    height: 10px;
    @media all and (max-width: 860px) {
      width: 600px;
    }
    width: 700px;
  }
  
  .input-capacity {
    height: 10px;
    width: 40px;
  }
  
  .input-fee {
    height: 10px;
    width: 75px;
  }
  
  .lt-period {
    
    .period-datePicker {
      display: inline-block;
      margin-right: 50px;
    }
    
    .period-timeSelect {
      display: inline-block;
    }
  }

  .lt-reception {
    display: flex;
    justify-content: space-between;
    align-items: self-end;
    
    .reception-datePicker {
      display: inline-block;
      margin-right: 50px;
    }
    
    .lt-fee {
      display: inline-block;
    }

    .lt-write-submit {
      display: inline-block;
      
      button {
        border: ${({theme}) => theme.borderColor};
        border-radius: 10px;
        padding: 13px 10px 11px 10px;
        background-color: ${({theme}) => theme.reverseBgColor};
        color: ${({theme}) => theme.reverseTextColor};
        font-size: 20px;
        cursor: pointer;
        
      }
    }
  }
`;