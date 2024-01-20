import React, {useEffect, useState} from "react";
import styled from "styled-components";
import axios from "axios";

const MainCategoryEventView = styled.div<{$imageUrl:string}>`
  width: 1440px;
  margin: 5% auto;

  .el-title {
    word-break: keep-all;
    overflow-wrap: break-word;

    .title-top {
      margin-bottom: 10px;
      font-size: 24px;
      font-weight: bold;
      line-height: 32px;
      letter-spacing: -.6px;
    }

    .title-bottom {
      font-size: 64px;
      font-weight: lighter;
      line-height: 80px;
      letter-spacing: -4.8px;
    }
  }
  
  .el-wrapper {
    width: 100%;
    
    .el-select {
      height: 530px;
      background-image: url(${({$imageUrl}) => $imageUrl.length > 0 ? $imageUrl : ""});
    }
    
    .el-list {
      
    }
  }
`;
const MainCategoryEvent = () => {

    const [mainCategoryList, setMainCategoryList] = useState<{
        lectureMainCategoryNo:number;
        lectureMainCategoryName:string;
        lectureMainCategoryDesc:string;
    }[]>([]);
    const [subCategoryList, setSubCategoryList] = useState<{
        lectureMainCategoryNo:number;
        lectureSubCategoryNo:number;
        lectureSubCategoryName:string;
        lectureSubCategoryDesc:string;
        lectureSubCategoryThumbnail:string
    }[]>([]);

    const [selectCategory, setSelectCategory] = useState<number>(0);
    const [selectCategoryImage, setSelectCategoryImage] = useState<string>("");

    const mainCategoryEventSelectBox = ():any[] => {
        let result:any[] = [];
        for(let i:number=0; i<mainCategoryList.length; i++) {
            result.push(<option key={i+100}>
                {mainCategoryList[i].lectureMainCategoryName}
            </option>)
            for(let j:number=0; j<subCategoryList.length; j++) {
                if(mainCategoryList[i].lectureMainCategoryNo === subCategoryList[j].lectureMainCategoryNo) {
                    result.push(<option key={j} value={subCategoryList[j].lectureSubCategoryNo}>
                        {subCategoryList[j].lectureSubCategoryName}
                    </option>)
                }
            }
        }
        return result;
    }

    useEffect(() => {
        const dataList = async ():Promise<void> => {
            await axios({
                method: "GET",
                url: "/lecture/lectureMainCategoryList"
            }).then((res):void => {
                setMainCategoryList(res.data.data);
            }).catch((err):void => {
                console.log(err.message);
            })
            await axios({
                method: "GET",
                url: "/lecture/lectureSubCategoryList",
                params: {mainCategoryNo: 0}
            }).then((res):void => {
                setSelectCategory(res.data.data[0].lectureSubCategoryNo);
                setSubCategoryList(res.data.data);
            }).catch((err):void => {
                console.log(err.message);
            })
        }
        setTimeout(() => {dataList().then();}, 100);
    }, []);

    useEffect(() => {
        const imageUrl:any = subCategoryList.find((item) =>
            item.lectureSubCategoryNo === selectCategory);
        setSelectCategoryImage(imageUrl.lectureSubCategoryThumbnail);
        const dataList = async ():Promise<void> => {
            await axios({
                method: "GET",
                url: "/lecture/lectureEventCategoryList",
                params: {selectCategory: selectCategory}
            }).then((res):void => {

            }).catch((err):void => {
                console.log(err.message);
            })
        }
        // setTimeout(() => {dataList().then();}, 200);
    }, [selectCategory]);

    return (
        <MainCategoryEventView $imageUrl={selectCategoryImage}>
            <div className="el-title">
                <div className="title-top">
                    강좌 카테고리
                </div>
                <div className="title-bottom">
                    일상을 빛낼 취향을 <br />발견하세요!
                </div>
            </div>
            <div className="el-wrapper">
                <div className="el-select">
                    <select onChange={(e) => setSelectCategory(parseInt(e.target.value))}>
                        {mainCategoryEventSelectBox()}
                    </select>
                </div>
                <div className="el-list">

                </div>
            </div>
        </MainCategoryEventView>
    )
}

export default MainCategoryEvent;