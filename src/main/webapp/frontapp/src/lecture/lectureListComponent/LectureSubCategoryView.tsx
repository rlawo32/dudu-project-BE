import React, {useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";

interface Props {
    mainCategoryNo:number;
    setSubCategoryNo: React.Dispatch<React.SetStateAction<number>>;
}

const TabLectureSubCategory = styled.div`
  border: 2px solid red;
`;

const LectureSubCategoryView = (props: Props) => {

    const [lectureSubCategoryData, setLectureSubCategoryData] = useState([{
        lectureSubCategoryNo: 0,
        lectureMainCategoryNo: 0,
        lectureSubCategoryName: '',
        lectureSubCategoryDesc: ''
    }]);

    const tabSubCategory = ():any[] => {
        let result:any[] = [];

        for(let i:number=0; i<=lectureSubCategoryData.length; i++) {
            if(i === 0) {
                result.push(<li key={i} onClick={() => props.setSubCategoryNo(i)}>전체</li>);
            } else {
                result.push(<li key={i} onClick={() => props.setSubCategoryNo(lectureSubCategoryData[i-1].lectureSubCategoryNo)}>
                    {lectureSubCategoryData[i-1].lectureSubCategoryName}
                </li>);
            }
        }
        return result;
    }

    useEffect(() => {
        if(props.mainCategoryNo > 0) {
            const lectureCategoryData = async ():Promise<void> => {
                await axios({
                    method: "GET",
                    url: "/lecture/lectureSubCategoryList",
                    params: {mainCategoryNo: props.mainCategoryNo}
                }).then((res):void => {
                    setLectureSubCategoryData(res.data.data);
                }).catch((err):void => {
                    console.log(err.message);
                })
            }
            lectureCategoryData().then();
        } else {
            setLectureSubCategoryData([]);
        }
    }, [props.mainCategoryNo])

    return (
        <TabLectureSubCategory>

            <ul>
                {tabSubCategory()}
            </ul>

        </TabLectureSubCategory>
    )
}

export default LectureSubCategoryView;