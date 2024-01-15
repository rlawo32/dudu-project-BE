import styled from "styled-components";

export const LectureEventWriteView = styled.div`
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    li {
      float: left;
      margin-right: 5px;
    }
  }
  
  .ew-main-view {
    display: flex;
    
    .ew-thumbnail {
      margin-bottom: 20px;
    }
    
    .ew-lecture {

      .ew-list-select {
        
      }

      .ew-list-view {
        width: fit-content;

        .paging-view {
          width: fit-content;
          margin: 10px auto 0;
        }
      }
    }
  }
`;