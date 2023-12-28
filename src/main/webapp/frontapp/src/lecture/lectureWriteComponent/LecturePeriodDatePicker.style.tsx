import styled from "styled-components";
import DatePicker from "react-datepicker";


export const LectureDatePickerView = styled.div`
  display: inline-block;
  width: fit-content;
  
  .react-datepicker__tab-loop {
    position: absolute;
  }
  
  .react-datepicker {
    background-color: ${({theme}) => theme.bgColor};

    .react-datepicker__header {
      background-color: ${({theme}) => theme.boxBgColor};
      
      .react-datepicker__day-name {
        color: ${({theme}) => theme.textColor};
        font-weight: bold;
        padding: 2px 1px 0 0;
      }

      .react-datepicker__day-name:nth-child(1) {
        color:red;
        font-weight: bold;
        padding: 2px 1px 0 0;
      }

      .react-datepicker__day-name:nth-child(7) {
        color: deepskyblue;
        font-weight: bold;
        padding: 2px 1px 0 0;
      }
    }

    .selectedDay,
    .unselectedDay {
      color: ${({theme}) => theme.textColor};
      padding: 2px 1px 0 0;
    }

    .selectedDay {
      background-color: ${({theme}) => theme.datePickerSelectColor};
      color: ${({theme}) => theme.textColor};
      border-radius: 50%;

      &:hover {
        border-radius: 50%;
      }
    }

    .unselectedDay {
      &:hover {
        border-radius: 50%;
        background-color: ${({theme}) => theme.datePickerSelectColor};
      }
    }

    .react-datepicker__day--outside-month { // 이전 달, 다음 달 날짜 숨기기
      cursor: default;
      visibility: hidden; 
    }
    
    .react-datepicker__day:nth-child(1){ // 일요일 색 변경
      color:red;
    }
    
    .react-datepicker__day:nth-child(7){ // 토요일 색 변경
      color: deepskyblue;  
    }
  }
`;

export const DatePickerWrapperView = styled(DatePicker)`
  display: inline-block;
  width: 122px;
  height: 20px;
  border: none;
  text-align: center;
  font-weight: bold;
  font-size: 15px;
  background-color: ${({theme}) => theme.reverseBgColor}; 
  color: ${({theme}) => theme.headerTextColor};
  cursor: pointer;
`;

export const DatePickerHeaderView = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({theme}) => theme.boxBgColor};
  height: 100%;
  margin: 3px 0 3px 0;
  padding: 0 12px 0 24px;
  
  .month {
    display: inline;
    background-color: ${({theme}) => theme.boxBgColor};
    color: ${({theme}) => theme.textColor};
    border: none;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }

  .year {
    display: inline;
    background-color: ${({theme}) => theme.boxBgColor};
    color: ${({theme}) => theme.textColor};
    border: none;
    padding-right: 3px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }

  button {
    width: 27px;
    height: 27px;
    padding: 5px;
    border: none;
    border-radius: 50%;
    cursor: pointer;

    + button {
      margin-left: 24px;
    }

    &:hover {
      background-color: ${({theme}) => theme.datePickerSelectColor};
    }

    &:disabled {
      cursor: default;
      background-color: ${({theme}) => theme.boxBgColor};
    }
    
    .icon-custom {
      position: relative;
      top: -4px;
      left: -4px;
      font-size: 25px;
    }
  }
`;