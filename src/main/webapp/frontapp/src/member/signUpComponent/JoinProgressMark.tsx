import styled from "styled-components";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCircleCheck as checked } from "@fortawesome/free-solid-svg-icons"
import { faCircleCheck as unChecked } from "@fortawesome/free-regular-svg-icons"

import useJoinProgressStore from "../../stores/useJoinProgressStore";

const ProgressMarkBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 50px;
  width: 680px;
  margin: 120px auto 0;
  border: 2px solid ${({theme}) => theme.textColor};
  border-radius: 20px;
  font-size: 20px;
  @media screen and (max-width: 750px) {
    height: 100px;
    width: 380px;
  }
  
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    display: inline;
    margin: 0 15px 0 15px;
  }
  
  .icon-custom1 {
    font-size: 25px;
    margin-right: 5px;
  }

  .icon-custom2 {
    font-size: 25px;
    margin-right: 5px;
    color: deepskyblue;
  }
  
  .line-custom {
    width: 30px;
    border-top: 1px solid ${({theme}) => theme.textColor};
  }
  
  .line-custom:nth-child(4) {
    @media screen and (max-width: 750px) {
      display: none;
    }
  }
`;

const JoinProgressMark = () => {

    const {activeProgressTab} = useJoinProgressStore();

    return (
        <ProgressMarkBox>
            <div>
                {
                    activeProgressTab === 'joinProgress2' ||
                    activeProgressTab === 'joinProgress3' ||
                    activeProgressTab === 'joinProgress4' ?
                        <FontAwesomeIcon icon={checked} className="icon-custom2" />
                        :
                        <FontAwesomeIcon icon={unChecked} className="icon-custom1" />
                }
                <span>약관동의</span>
            </div>
            <span className="line-custom" />
            <div>
                {
                    activeProgressTab === 'joinProgress3' ||
                    activeProgressTab === 'joinProgress4' ?
                        <FontAwesomeIcon icon={checked} className="icon-custom2" />
                        :
                        <FontAwesomeIcon icon={unChecked} className="icon-custom1" />
                }
                <span>본인확인</span>
            </div>
            <span className="line-custom" />
            <div>
                {
                    activeProgressTab === 'joinProgress4' ?
                        <FontAwesomeIcon icon={checked} className="icon-custom2" />
                        :
                        <FontAwesomeIcon icon={unChecked} className="icon-custom1" />
                }
                <span>정보입력</span>
            </div>
            <span className="line-custom" />
            <div>
                {
                    activeProgressTab === 'joinProgress4' ?
                        <FontAwesomeIcon icon={checked} className="icon-custom2" />
                        :
                        <FontAwesomeIcon icon={unChecked} className="icon-custom1" />
                }
                <span>가입완료</span>
            </div>
        </ProgressMarkBox>
    )
}

export default JoinProgressMark;