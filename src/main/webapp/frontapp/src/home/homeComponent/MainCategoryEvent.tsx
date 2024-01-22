import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown as arrow} from "@fortawesome/free-solid-svg-icons";
import {faClock as clockIcon} from "@fortawesome/free-regular-svg-icons";
import {useNavigate} from "react-router-dom";

const MainCategoryEventView = styled.div<{$imageUrl:string}>`

  .el-title {
    width: 1440px;
    margin: 5% auto;
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
    display: flex;
    overflow: hidden;
    
    .el-select {
      position: relative;
      display: inline-block;
      height: 100vh;
      width: 70%;
      border-radius: 0 12px 12px 0;
      overflow: hidden;
      
      img {
        height: 100%;
        border-radius: 0 12px 12px 0;
        object-fit: cover;
        overflow: hidden;
        transition: border-radius 3s ease;
      }

      .el-select-box {
        position: absolute;
        top: 120px;
        left: 217px;
        width: 200px;
        z-index: 6;

        button {
          width: 100%;
          border: 2px solid #fff;
          border-radius: 25px;
          padding: 9px 22px 11px 20px;
          background: none;
          color: #fff;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
        }

        .select-box {
          position: absolute;
          top: 57px;
          left: 0;
          height: 0;
          width: 100%;
          padding: 0;
          margin: 0;
          border: none;
          border-radius: 5px;
          background: ${({theme}) => theme.boxBgColor};
          text-align: center;
          transition: all 0.3s ease-in;
        }

        ul.select-list {
          height: 0;
          width: 90%;
          padding: 0;
          margin: 5px auto 0;
          border: none;
          overflow: auto;
          background: ${({theme}) => theme.boxBgColor};
          color: ${({theme}) => theme.textColor};
          text-align: left;
          cursor: pointer;
          user-select: none;
          list-style:none;
          transition: all 0.3s ease-in;

          &::-webkit-scrollbar {
            width: 5px;
          }

          &::-webkit-scrollbar-thumb {
            background: gray; /* 스크롤바의 색상 */
            border-radius: 15px;
          }

          &::-webkit-scrollbar-track {
            background: rgba(200, 200, 200, .1);
          }
        }

        ul.select-list li {
          padding: 6px 20px;
          font-size: 18px;
          font-weight: lighter;
          transition: all 0.3s ease-in;
        }

        ul.select-list li.item-mainCategory {
          padding: 6px 20px;
          margin: 10px 0 0;
          font-size: 13px;
          font-weight: normal;
        }

        .select-name {
          display: inline-block;
          float: left;
        }

        .select-arrow {
          display: inline-block;
          font-size: 21px;
          float: right;
          transition: all .4s linear;
        }

        .select-box.show-list {
          padding: 10px 0;
          height: 475px;
          width: 100%;
          border: 1px solid gray;
        }

        .select-list.show-list {
          padding: 0;
          height: 460px;
          width: 90%;
          border: none;
        }

        ul.select-list li.select-active {
          font-weight: bold;
        }

        .select-arrow.show-list {
          transform: rotate(180deg);
        }
      }

      .select-bottom {
        content: '';
        height: 1px;
        width: 100%;
      }
    }
    
    .el-list {
      position: relative;
      display: inline-block;
      width: calc(50% - 30px);
      padding: 100px;
      margin-left: 30px;
      
      .el-list-view {
        
        .el-list-item {
          position: relative;
          display: flex;
          width: 100%;
          margin-top: 60px;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          
          .item-thumbnail {
            width: 45%;
            @media screen and (max-width: 1024px) {
              height: 100%;
              width: 35%;
            }
            overflow: hidden;

            img {
              height: 100%;
              width: 100%;
              border: none;
              object-fit: cover;
              vertical-align: top;

              transition: transform .4s ease;
            }
          }
          
          .item-info {
            width: 55%;
            padding: 56px 50px 62px;
            background: ${({theme}) => theme.boxBgColor};
            
            .item-top {

              .item-state {
                display: inline-block;
                border: none;
                border-radius: 10px;
                margin-right: 6px;
                padding: 2px 15px;
                font-size: 13px;
              }
              .item-institution {
                display: inline-block;
                border: 1px solid gray;
                border-radius: 15px;
                margin-right: 6px;
                padding: 1px 15px;
                font-size: 13px;
              }
            }
            
            .item-title {
              min-height: 62px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: normal;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              margin-top: 8px;
              font-size: 24px;
              font-weight: bold;
            }
            
            .item-mid {
              margin-top: 10px;
              
              .item-division {
                position: relative;
                display: inline-block;
                padding-right: 6px;
                margin-right: 6px;
                
                &:after {
                  position: absolute;
                  top: 6px;
                  right: 0;
                  display: block;
                  content: '';
                  height: 14px;
                  width: 1px;
                  background: rgba(0,0,0, .3);
                }
              }
              .item-teacher {
                display: inline-block;
                padding-right: 6px;
                margin-right: 6px;
              }
            }
            
            .item-time {
              display: block;
              margin-top: 3px;
              font-size: 14px;
              font-weight: 500;
              opacity: 0.9;

              .icon-custom {
                margin-right: 4px;
              }

              span {
                margin-right: 4px;
              }
            }
            
            .item-fee {
              margin-top: 10px;
              font-size: 18px;
              font-weight: bold;
            }
          }

          &:hover img {
            transform: scale(1.1);
            transition: transform .4s ease;
          }
        }
      }
    }
  }
`;
const MainCategoryEvent = () => {
    const navigate = useNavigate();
    const selectBox:any = useRef<any>();
    const selectList:any = useRef<any>();
    const selectBtn:any = useRef<any>([]);
    const selectArrow:any = useRef<any>();
    const selectBottom:any = useRef<any>();

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
    const [eventList, setEventList] = useState<{
        lectureNo:number;
        lectureTitle:string;
        lectureDivision:string;
        lectureTeacher:string;
        lectureTime:string;
        lectureFee:number;
        lectureInstitution:string;
        lectureStateNo:number;
        lectureCount:number;
        lectureEventType:string;
        lectureThumbnail:string;
    }[]>([]);

    const [selectCategory, setSelectCategory] = useState<number>(0);
    const [selectCategoryImage, setSelectCategoryImage] = useState<string>("");
    const [isSelectBoxShow, setIsSelectBoxShow] = useState<boolean>(false);
    const [selectIndex, setSelectIndex] = useState<number>(0);

    const mainCategoryEventSelectBox = ():any[] => {
        let result:any[] = [];
        for(let i:number=0; i<mainCategoryList.length; i++) {
            result.push(<li key={i+100} className="item-mainCategory">
                {mainCategoryList[i].lectureMainCategoryName}
            </li>)
            for(let j:number=0; j<subCategoryList.length; j++) {
                if(mainCategoryList[i].lectureMainCategoryNo === subCategoryList[j].lectureMainCategoryNo) {
                    result.push(<li key={j} value={subCategoryList[j].lectureSubCategoryNo}
                                    ref={btn => (selectBtn.current[j] = btn)}
                                    onClick={() => onClickSelectBoxItem(j, subCategoryList[j].lectureSubCategoryNo)}>
                        {subCategoryList[j].lectureSubCategoryName}
                    </li>)
                }
            }
        }
        return result;
    }

    const onClickSelectBoxItem = (idx:number, selectItem:number):void => {
        setIsSelectBoxShow(false);
        setSelectIndex(idx);
        setSelectCategory(selectItem);
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


        // const scrollEvent = () => {
        //     const box3OffsetTop = selectBottom.current.offsetTop;
        //     window.scrollY > box3OffsetTop ? console.log('도착') : console.log('아직');
        // };
        //
        // window.addEventListener('scroll', scrollEvent);
        // return () => window.removeEventListener('scroll', scrollEvent);
    }, []);

    useEffect(() => {
        const dataList = async ():Promise<void> => {
            await axios({
                method: "GET",
                url: "/lecture/eventCategoryList",
                params: {selectCategory: selectCategory}
            }).then((res):void => {
                console.log(res.data.data)
                setEventList(res.data.data);
                const imageUrl:{
                    lectureMainCategoryNo: number;
                    lectureSubCategoryNo: number;
                    lectureSubCategoryName: string;
                    lectureSubCategoryDesc: string;
                    lectureSubCategoryThumbnail: string;
                } | undefined = subCategoryList.find((item) =>
                    item.lectureSubCategoryNo === selectCategory)
                if(imageUrl !== undefined) {
                    setSelectCategoryImage(imageUrl.lectureSubCategoryThumbnail);
                }
            }).catch((err):void => {
                console.log(err.message);
            })
        }
        if(selectCategory !== 0) {
            setTimeout(() => {dataList().then();}, 200);
        }
    }, [selectCategory]);


    useEffect(() => {
        if(isSelectBoxShow) {
            selectBox.current.className += " show-list";
            selectList.current.className += " show-list";
            selectArrow.current.className += " show-list";
        } else {
            selectBox.current.className = selectBox.current.className.replace(' show-list', '');
            selectList.current.className = selectList.current.className.replace(' show-list', '');
            selectArrow.current.className = selectArrow.current.className.replace(' show-list', '');
        }
    }, [isSelectBoxShow])

    useEffect(() => {
        setTimeout(() => {
            if(selectBtn.current.length > 0) {
                selectBtn.current[selectIndex].className = selectBtn.current[selectIndex].className.replace('select-active', '');
                selectBtn.current[selectIndex].className += 'select-active';

                for(let i:number=0; i<selectBtn.current.length; i++) {
                    if(i !== selectIndex) {
                        selectBtn.current[i].className = selectBtn.current[i].className.replace('select-active', '');
                    }
                }
            }
        }, 300);
    }, [selectIndex])

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
                <div className="el-select" ref={selectBottom}>
                    <img src={selectCategoryImage} alt={"카테고리 이미지"} />
                    {/*<div className="select-bottom" ref={selectBottom} />*/}
                    <div className="el-select-box">
                        <button onClick={() => setIsSelectBoxShow(!isSelectBoxShow)}>
                            <div className="select-name">
                                {
                                    subCategoryList.find((item) =>
                                        item.lectureSubCategoryNo === selectCategory)?.lectureSubCategoryName
                                }
                            </div>
                            <div className="select-arrow" ref={selectArrow}>
                                <FontAwesomeIcon icon={arrow} />
                            </div>
                        </button>
                        <div className="select-box" ref={selectBox}>
                            <ul className="select-list" ref={selectList}>
                                {mainCategoryEventSelectBox()}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="el-list">
                    <div className="el-list-view">
                        {
                            eventList.length > 0 ?
                                eventList.map((item, idx) => (
                                    <div key={idx} className="el-list-item"
                                         onClick={() => navigate("/lectureDetail/" + item.lectureNo,
                                        { state: {lectureNo: item.lectureNo}})}>
                                        <div className="item-thumbnail">
                                            <img src={item.lectureThumbnail} alt={"강의 이미지"} />
                                        </div>
                                        <div className="item-info">
                                            <div className="item-top">
                                                <div className="item-state" style={
                                                    item.lectureStateNo === 1 ? {backgroundColor: "slategray", color: 'white'} :
                                                        item.lectureStateNo === 2 ? {backgroundColor: "greenyellow", color: 'black'} :
                                                            item.lectureStateNo === 3 ? {backgroundColor: "slategray", color: 'black'} :
                                                                item.lectureStateNo === 4 ? {backgroundColor: "black", color: 'white'} :
                                                                    item.lectureStateNo === 5 || 6 ? {backgroundColor: "red", color: 'black'} : {}}>
                                                    {
                                                        item.lectureStateNo === 1 ? '접수예정' :
                                                            item.lectureStateNo === 2 ? '접수중' :
                                                                item.lectureStateNo === 3 ? '대기접수' :
                                                                    item.lectureStateNo === 4 ? '접수마감' :
                                                                        item.lectureStateNo === 5 ? '접수불가' : '강의종료'
                                                    }
                                                </div>
                                                <div className="item-institution">
                                                    {item.lectureInstitution}
                                                </div>
                                            </div>
                                            <div className="item-title">
                                                {item.lectureTitle}
                                            </div>
                                            <div className="item-mid">
                                                <div className="item-division">
                                                    {item.lectureDivision}
                                                </div>
                                                <div className="item-teacher">
                                                    {item.lectureTeacher}
                                                </div>
                                            </div>
                                            <div className="item-time">
                                                <FontAwesomeIcon icon={clockIcon} className="icon-custom" />
                                                <span>
                                                    {
                                                        item.lectureTime.substring(13, 14) === '1' ? '월' :
                                                            item.lectureTime.substring(13, 14) === '2' ? '화' :
                                                                item.lectureTime.substring(13, 14) === '3' ? '수' :
                                                                    item.lectureTime.substring(13, 14) === '4' ? '목' :
                                                                        item.lectureTime.substring(13, 14) === '5' ? '금' :
                                                                            item.lectureTime.substring(13, 14) === '6' ? '토' : '일'
                                                    }
                                                </span>
                                                <span>
                                                    {item.lectureTime.substring(0, 11)},
                                                </span>
                                                <span>총 {item.lectureCount}회</span>
                                            </div>
                                            <div className="item-fee">
                                                {item.lectureFee.toLocaleString()}원
                                            </div>
                                        </div>
                                    </div>
                                ))
                                :
                                <div />
                        }
                    </div>
                </div>
            </div>
        </MainCategoryEventView>
    )
}

export default MainCategoryEvent;