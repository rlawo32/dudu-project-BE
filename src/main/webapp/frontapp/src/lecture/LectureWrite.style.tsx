import styled from "styled-components";

export const LectureWriteView = styled.div`
  position: relative;
  height: 100%;
  width: 1500px;
  padding: 35px;
  margin: 10% auto;
  border: ${({theme}) => theme.borderColor};
  
  h1 {
    text-align: center;
  }

  .input-section {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
  }
  
  .lt-section-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 3px;
  }
  
  .lt-write-main {
    height: fit-content;
    width: 1100px;
    
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
      width: 1100px;
    }
  }
  
  select {
    border: 2px solid ${({theme}) => theme.textColor};
    border-radius: 10px;
    padding: 7px 4px 5px 4px;
    background-color: ${({theme}) => theme.boxBgColor};
    color: ${({theme}) => theme.textColor};
    font-size: 18px;
    font-weight: bold;
  }
  
  .lt-select-title {
    margin-bottom: 3px;
  }
  
  .lt-position {

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

  .lt-write-main input, .lt-section-select input, .lt-fee input {
    border: 2px solid ${({theme}) => theme.textColor};
    border-radius: 10px;
    padding: 13px 10px 13px 10px;
    font-size: 20px;
    background-color: ${({theme}) => theme.boxBgColor};
    color: ${({theme}) => theme.textColor};
  }
  
  .input-name {
    display: block;
    height: 10px;
    width: 600px;
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
      margin-right: 10px;
    }
    
    .period-timeSelect {
      display: inline-block;
    }
  }

  .lt-reception {
    
    .reception-datePicker {
      display: inline-block;
      margin-right: 10px;
    }
    
    .lt-fee {
      display: inline-block;
    }
  }
`;