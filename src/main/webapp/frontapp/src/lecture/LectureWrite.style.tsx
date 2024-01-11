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
  margin: 5% auto;
  
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
  
  .essential-mark {
    color: orangered;
    margin-left: 3px;
  }
  
  .lt-section-title {
    margin-top: 20px;
    margin-bottom: 3px;
    font-size: 18px;
    font-weight: bold;
  }
  
  .lt-write-detail {
    display: flex;
    justify-content: space-between;
    height: fit-content;
    @media all and (max-width: 1024px) {
      width: 700px;
    }
    @media all and (max-width: 740px) {
      width: 450px;
    }
    width: 1160px;
    
    .lt-write-content {
      width: 870px;
    }
    
    .lt-write-additional {

      .lt-write-schedule {
      }

      .lt-write-materials {

      }
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
  
  .lt-input-header {
    display: flex;
    
    .header-left-view {
      width: 870px;
      margin-right: 80px;
      
      .lt-section-select {
        display: flex;
        justify-content: space-between;

        .lt-select-title {
          color: orangered;
          margin-bottom: 3px;
        }
        
        .lt-category {
          display: inline-block;
          width: 300px;

          .lt-mainCategory {
            display: inline-block;
            margin-right: 10px;
          }

          .lt-subCategory {
            display: inline-block;
          }
        }
        
        .lt-position {
          display: inline-block;
          width: 450px;

          .lt-institution {
            display: inline-block;
            margin-right: 10px;
          }

          .lt-room {
            display: inline-block;
          }
        }
        
        .lt-teacher {
          display: inline-block;
          
          .lt-select-title {
            visibility: hidden;
          }
        }
      }
      
      .lt-name {
        
        input {
          width: calc(100% - 26px);
        }
      }
    }

    .header-right-view {

      .lt-thumbnail {
        
        input {
          display: none;
        }

        .attach-thumbnail {
          position: relative;
          height: 150px;
          width: 160px;
          border: ${({theme}) => theme.borderColor};
          border-radius: 10px;
          overflow: hidden;
          
          .thumbnail-image {
            height: 150px;
            width: 160px;
            object-fit: cover;
          }
          
          .thumbnail-image-delete {
            position: absolute;
            top: 5px;
            left: 140px;
            color: orangered;
            cursor: pointer;
          }
        }
        
        .attach-input {
          position: relative;
          height: 150px;
          width: 160px;
          border: ${({theme}) => theme.borderColor};
          border-radius: 10px;
          cursor: pointer;
          
          .icon-custom {
            position: relative;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 50px;
          }
        }
      }
    }
  }

  .header-left-view input, .lt-capacity input, .lt-fee input {
    border: ${({theme}) => theme.borderColor};
    border-radius: 10px;
    padding: 13px 10px 13px 10px;
    font-size: 20px;
    background-color: ${({theme}) => theme.boxBgColor};
    color: ${({theme}) => theme.textColor};
  }
  
  .input-title {
    display: block;
    height: 10px;
    @media all and (max-width: 860px) {
      width: 400px;
    }
    width: 688px;
  }
  
  .input-capacity {
    height: 10px;
    width: 50px;
  }
  
  .input-fee {
    height: 10px;
    width: 85px;
  }
  
  .lt-period {
    display: flex;
    justify-content: space-between;

    .reception-datePicker {
      display: inline-block;
      margin-right: 30px;
    }
    
    .period-datePicker {
      display: inline-block;
      margin-right: 30px;
    }
    
    .period-timeSelect {
      display: inline-block;
      margin-right: 30px;
    }

    .lt-capacity {
      display: inline-block;
    }
  }
  
  .lt-input-footer {
    display: flex;
    justify-content: space-between;

    .lt-fee {
      display: inline-block;
      margin-right: 30px;
    }

    .lt-write-submit {
      display: inline-block;
      position: relative;
      bottom: -30px;

      button {
        border: ${({theme}) => theme.borderColor};
        border-radius: 10px;
        padding: 13px 10px 11px 10px;
        background-color: ${({theme}) => theme.reverseBgColor};
        color: ${({theme}) => theme.reverseTextColor};
        @media all and (max-width: 740px) {
          width: 80px;
          font-size: 12px;
        }
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;

      }
    }
  }
`;