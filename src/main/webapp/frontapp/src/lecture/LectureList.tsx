import HeaderNavigation from "../navigation/HeaderNavigation";
import styled from "styled-components";

import LectureMainCategoryView from "./lectureListComponent/LectureMainCategoryView";
import LectureSubCategoryView from "./lectureListComponent/LectureSubCategoryView";
import {useEffect, useState} from "react";
import axios from "axios";

const LectureListView = styled.div`
  position: relative;
  height: 100%;
  width: 700px;
  padding: 35px;
  margin: 10% auto;
  border: ${({theme}) => theme.borderColor};
`;

const LectureList = () => {

    const [lectureList, setLectureList] = useState<{
        lectureNo:number;
        lectureName:string;
        lectureDivision:string;
        lectureTeacher:string;
        lectureTime:string;
        lectureFee:number;
        lectureState:string;
        lectureCount:number;
        lectureThumbnail:string;
    }[]>([{
        lectureNo: 0,
        lectureName: '',
        lectureDivision: '',
        lectureTeacher: '',
        lectureTime: '',
        lectureFee: 0,
        lectureState: '',
        lectureCount: 0,
        lectureThumbnail: ''
    }]);

    const [mainCategoryNo, setMainCategoryNo] = useState<number>(0);
    const [subCategoryNo, setSubCategoryNo] = useState<number>(0);

    const paging:object = {
        mainCategoryNo: mainCategoryNo,
        subCategoryNo: subCategoryNo
    }

    useEffect(() => {
        const lectureList = async () => {
           await axios({
               method: "GET",
               url: '/lecture/lectureList',
               params: paging
           }).then((res):void => {
               console.log(res.data.data);
           }).catch((err):void => {
               console.log(err.message);
           });
        }

        lectureList().then();
    }, [mainCategoryNo, subCategoryNo])

    return (
        <LectureListView>
            <HeaderNavigation />

            <LectureMainCategoryView setMainCategoryNo={setMainCategoryNo}/>
            <LectureSubCategoryView mainCategoryNo={mainCategoryNo} setSubCategoryNo={setSubCategoryNo}/>

            <div>

            </div>

        </LectureListView>
    )
}

export default LectureList;