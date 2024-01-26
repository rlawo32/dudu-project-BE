import styled from "styled-components";

const StyledFooterNavigation = styled.div`
  box-sizing: border-box;
  position: relative;
  bottom: 0px;
  height: 150px;
  width: 100%;
  padding: 20px 0 20px 0;
  background-color: #382f2d;
  color: #fff;
  z-index: 50;
  
  .footer-view {
    width: fit-content;
    margin-left: 250px;
    @media screen and (max-width: 1440px) {
      margin-left: 150px;
    }
    @media screen and (max-width: 1024px) {
      margin-left: 50px;
    }
    
    .footer-top {
      font-size: 16px;
      
      .footer-tou {
        display: flex;
        margin-top: 5px;
        
        .tou-privacy {
          margin: 0 24px 0 0;
          font-weight: bold;
          cursor: pointer;
        }
        
        .tou-terms {
          margin: 0 24px 0 0;
          cursor: pointer;
          opacity: 0.5;
        }
      }
    }
    
    .footer-bottom {
      opacity: 0.5;
      font-size: 14px;
      font-weight: lighter;
      
      .footer-loc {
        margin-top: 30px;
      }
      
      .footer-cop {
        margin-top: 5px;
      }
    }
  }
`;

const FooterNavigation = () => {

    return (
        <StyledFooterNavigation>

            <div className="footer-view">
                <div className="footer-top">
                    <div className="footer-tou">
                        <div className="tou-privacy" onClick={() => alert('개인정보처리방침')}>
                            개인정보처리방침
                        </div>
                        <div className="tou-terms" onClick={() => alert('이용약관')}>
                            이용약관
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="footer-loc">
                        주소 : 인천광역시 부평구 부평동 / 대표이사 : 김성재
                    </div>
                    <div className="footer-cop">
                        COPYRIGHT © DUDUPROJECT.CO. ALL RIGHTS RESERVED
                    </div>
                </div>
            </div>

        </StyledFooterNavigation>
    )
}

export default FooterNavigation;