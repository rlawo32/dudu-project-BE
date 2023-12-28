import styled from "styled-components";

export const LectureTimeSelectBoxView = styled.div`
  display: inline-block;
  width: fit-content;

  button {
    border: 2px solid ${({theme}) => theme.textColor};
    border-radius: 10px;
    padding: 9px 4px 6px 4px;
    font-size: 16px;
    font-weight: bold;
    background-color: ${({theme}) => theme.boxBgColor};
    color: ${({theme}) => theme.textColor};
    cursor: pointer;
  }
`;