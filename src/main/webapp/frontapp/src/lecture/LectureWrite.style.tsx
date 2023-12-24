import styled from "styled-components";

export const LectureWriteView = styled.div`
  position: relative;
  height: 100%;
  width: 700px;
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
`;