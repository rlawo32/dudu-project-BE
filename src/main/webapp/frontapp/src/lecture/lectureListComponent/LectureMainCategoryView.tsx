import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import styled from "styled-components";

const TabLectureMainCategory = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid darkgray;
  
  .mc-item {
    margin: auto;
    height: 100%;
    width: 100%;
    padding: 2% 5px 2% 5px;
    margin: 0 25px 0 25px;
    text-align: center;
    font-size: 25px;
    font-weight: 600;
    cursor: pointer;
  }

  .mcBtn-active {
    border-bottom: 3px solid ${({theme}) => theme.textColor};
  }
`;

const LectureMainCategoryView = (props: {setMainCategoryNo: React.Dispatch<React.SetStateAction<number>>;}) => {
    const mcBtn:any = useRef<any>([]);

    const [lectureMainCategoryData, setLectureMainCategoryData] = useState<{
        lectureMainCategoryNo:number;
        lectureMainCategoryName:string;
        lectureMainCategoryDesc:string;
    }[]>([{
        lectureMainCategoryNo: 0,
        lectureMainCategoryName: '',
        lectureMainCategoryDesc: ''
    }]);

    const tabMainCategory = ():any[] => {
        let result:any[] = [];

        for(let i:number=0; i<=lectureMainCategoryData.length; i++) {
            if(i === 0) {
                result.push(<div key={i} onClick={() => onClickMainCategory(i)}
                                 className="mc-item" ref={btn => (mcBtn.current[i] = btn)}>전체</div>);
            } else {
                result.push(<div key={i} onClick={() => onClickMainCategory(lectureMainCategoryData[i-1].lectureMainCategoryNo)}
                                 className="mc-item" ref={btn => (mcBtn.current[i] = btn)}>
                    {lectureMainCategoryData[i-1].lectureMainCategoryName}</div>);
            }
        }
        return result;
    }

    const onClickMainCategory = (idx:number):void => {
        props.setMainCategoryNo(idx);
        mcBtn.current[idx].className += ' mcBtn-active';

        for(let i:number=0; i<mcBtn.current.length; i++) {
            if(i !== idx) {
                mcBtn.current[i].className = mcBtn.current[i].className.replace(' mcBtn-active', '');
            }
        }
    }

    useEffect(() => {
        const lectureCategoryData = async ():Promise<void> => {
            await axios({
                method: "GET",
                url: "/lecture/lectureMainCategoryList"
            }).then((res):void => {
                setLectureMainCategoryData(res.data.data);
            }).catch((err):void => {
                console.log(err.message);
            })
        }
        lectureCategoryData().then();
        mcBtn.current[0].className += ' mcBtn-active';
    }, [])

    return (
        <TabLectureMainCategory>

            {tabMainCategory()}

        </TabLectureMainCategory>
    )
}

export default LectureMainCategoryView;