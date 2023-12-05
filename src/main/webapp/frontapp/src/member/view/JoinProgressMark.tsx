import styled from "styled-components";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCircleCheck as checked } from "@fortawesome/free-solid-svg-icons"
import { faCircleCheck as unChecked } from "@fortawesome/free-regular-svg-icons"
import useJoinProgressStore from "../../stores/useJoinProgressStore";

const ProgressMarkBox = styled.div`
  margin: 150px auto 0;
  border: 2px solid black;
  height: 50px;
  width: 600px;
  
  .iconCustom {
    font-size: 30px;
  }
`;

const JoinProgressMark = () => {

    const {activeProgressTab} = useJoinProgressStore();

    return (
        <ProgressMarkBox>
            <span>
                {
                    activeProgressTab === 'joinProgress2' ||
                    activeProgressTab === 'joinProgress3' ||
                    activeProgressTab === 'joinProgress4' ?
                        <FontAwesomeIcon icon={checked} className="iconCustom" />
                        :
                        <FontAwesomeIcon icon={unChecked} className="iconCustom" />
                }
                약관동의
            </span>
            <span>
                {
                    activeProgressTab === 'joinProgress3' ||
                    activeProgressTab === 'joinProgress4' ?
                        <FontAwesomeIcon icon={checked} className="iconCustom" />
                        :
                        <FontAwesomeIcon icon={unChecked} className="iconCustom" />
                }
                본인확인
            </span>
            <span>
                {
                    activeProgressTab === 'joinProgress4' ?
                        <FontAwesomeIcon icon={checked} className="iconCustom" />
                        :
                        <FontAwesomeIcon icon={unChecked} className="iconCustom" />
                }
                정보입력
            </span>
            <span>
                {
                    activeProgressTab === 'joinProgress4' ?
                        <FontAwesomeIcon icon={checked} className="iconCustom" />
                        :
                        <FontAwesomeIcon icon={unChecked} className="iconCustom" />
                }
                가입완료
            </span>

        </ProgressMarkBox>
    )
}

export default JoinProgressMark;