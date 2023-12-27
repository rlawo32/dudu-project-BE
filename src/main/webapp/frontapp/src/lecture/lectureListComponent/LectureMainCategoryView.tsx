import React, {useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";

const TabLectureMainCategory = styled.div`
  border: 2px solid black;
`;

const LectureMainCategoryView = (props: {setMainCategoryNo: React.Dispatch<React.SetStateAction<number>>;}) => {

    const [lectureMainCategoryData, setLectureMainCategoryData] = useState([{
        lectureMainCategoryNo: 0,
        lectureMainCategoryName: '',
        lectureMainCategoryDesc: ''
    }]);

    const tabMainCategory = ():any[] => {
        let result:any[] = [];

        for(let i:number=0; i<=lectureMainCategoryData.length; i++) {
            if(i === 0) {
                result.push(<li key={i} onClick={() => props.setMainCategoryNo(i)}>전체</li>);
            } else {
                result.push(<li key={i} onClick={() => props.setMainCategoryNo(lectureMainCategoryData[i-1].lectureMainCategoryNo)}>
                    {lectureMainCategoryData[i-1].lectureMainCategoryName}
                </li>);
            }
        }
        return result;
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
    }, [])

    return (
        <TabLectureMainCategory>

            <ul>
                {tabMainCategory()}
            </ul>

        </TabLectureMainCategory>
    )
}

export default LectureMainCategoryView;