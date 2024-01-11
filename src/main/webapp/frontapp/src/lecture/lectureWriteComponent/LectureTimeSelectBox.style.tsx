import styled from "styled-components";

export const LectureTimeSelectBoxView = styled.div`
  display: inline-block;
  width: fit-content;

  button {
    border: ${({theme}) => theme.borderColor};
    border-radius: 10px;
    padding: 9px 4px 6px 4px;
    margin-right: 2px;
    font-size: 16px;
    font-weight: bold;
    background-color: ${({theme}) => theme.boxBgColor};
    color: ${({theme}) => theme.textColor};
    cursor: pointer;
    
    &:hover {
      color: ${({theme}) => theme.headerTextColor};
      background-color: ${({theme}) => theme.headerBgColor};
    }
  }
`;