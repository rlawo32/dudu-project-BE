import React, {useEffect, useRef, useState} from "react";
import axios from "axios";

import HeaderNavigation from "../navigation/HeaderNavigation";
import FooterNavigation from "../navigation/FooterNavigation";
import LectureEventSwiperView from "./lectureListComponent/LectureEventSwiperView";
import LectureMainCategoryView from "./lectureListComponent/LectureMainCategoryView";
import LectureSubCategoryView from "./lectureListComponent/LectureSubCategoryView";
import LectureListMainView from "./lectureListComponent/LectureListMainView";
import LectureListToolView from "./lectureListComponent/LectureListToolView";
import LectureSearchBoxView from "./lectureListComponent/LectureSearchBoxView";

import useLectureSearchDataStore from "../stores/useLectureSearchDataStore";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown as arrow, faArrowUpLong as topIcon} from "@fortawesome/free-solid-svg-icons";
import * as Styled from "./LectureList.style";

const LectureList = () => {
    const selectBox:any = useRef<any>();
    const selectItem:any = useRef<any>([]);
    const selectArrow:any = useRef<any>();

    const [institutionList, setInstitutionList] = useState<{
        institutionNo:number;
        institutionName:string;
        institutionContact:string;
    }[]>([]);
    const [lectureList, setLectureList] = useState<{
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

    const [pageNo, setPageNo] = useState<number>(1);
    const [sortType, setSortType] = useState<string>("1");
    const [totalPage, setTotalPage] = useState<number>(0);

    const [institutionNo, setInstitutionNo] = useState<number>(1);
    const [mainCategoryNo, setMainCategoryNo] = useState<number>(0);
    const [subCategoryNo, setSubCategoryNo] = useState<number>(0);
    const [isSelectBoxShow, setIsSelectBoxShow] = useState<boolean>(false);
    const [isSearchBoxShow, setIsSearchBoxShow] = useState<boolean>(false);

    const {searchButton, searchText,
        ltDivisionArr, ltStateArr} = useLectureSearchDataStore();

    const customInstitutionSelectBox = ():any => {
        const result:any[] = [];

        for(let i:number=0; i<institutionList.length; i++) {
            result.push(<li key={institutionList[i].institutionNo} value={institutionList[i].institutionNo}
                            onClick={() => onClickInstitutionSelectBox(institutionList[i].institutionNo, i)}
                            ref={li => (selectItem.current[i] = li)}>
                {institutionList[i].institutionName}
            </li>)
        }
        return result;
    }

    const onClickInstitutionSelectBox = (idx:number, refIdx:number):void => {
        setIsSelectBoxShow(false);
        setInstitutionNo(idx);

        selectItem.current[refIdx].className = selectItem.current[refIdx].className.replace('si-active', '');
        selectItem.current[refIdx].className += 'si-active';

        for(let i:number=0; i<selectItem.current.length; i++) {
            if(i !== refIdx) {
                selectItem.current[i].className = selectItem.current[i].className.replace('si-active', '');
            }
        }
    }

    useEffect(() => {
        const institutionList = async ():Promise<void> => {
            await axios({
                method: "GET",
                url: "/lecture/lectureInstitutionList"
            }).then((res):void => {
                setInstitutionNo(res.data.data[1].institutionNo);
                setInstitutionList(res.data.data);
            }).catch((err):void => {
                console.log(err.message);
            })
        }
        setTimeout(() => {institutionList().then();}, 0);
    }, [])

    useEffect(() => {
        const getListData:object = {
            listType: "A",
            pageNo: pageNo,
            sortType: sortType,
            institutionNo: institutionNo,
            mainCategoryNo: mainCategoryNo,
            subCategoryNo: subCategoryNo,
            searchText: searchText,
            searchDivision: ltDivisionArr,
            searchState: ltStateArr
        }
        const lectureList = async () => {
           await axios({
               method: "POST",
               url: '/lecture/lectureList',
               data: JSON.stringify(getListData),
               headers: {'Content-type': 'application/json'}
           }).then((res):void => {
               setLectureList(res.data.data.lectureList);
               setTotalPage(res.data.data.totalPage);
           }).catch((err):void => {
               console.log(err.message);
           });
        }
        if(institutionNo > 0) {
            setTimeout(() => {lectureList().then();}, 0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [institutionNo, mainCategoryNo, subCategoryNo, searchButton, pageNo, sortType])

    useEffect(() => {
        setPageNo(1)
    }, [institutionNo, mainCategoryNo, subCategoryNo, searchButton, sortType])

    useEffect(() => {
        setMainCategoryNo(0);
        setSubCategoryNo(0);
        setSortType("");
    }, [institutionNo])

    useEffect(() => {
        if(isSelectBoxShow) {
            selectBox.current.className += " show-list";
            selectArrow.current.className += " show-list";
        } else {
            selectBox.current.className = selectBox.current.className.replace(' show-list', '');
            selectArrow.current.className = selectArrow.current.className.replace(' show-list', '');
        }
    }, [isSelectBoxShow])

    return (
        <Styled.LectureListView $isShow={isSearchBoxShow}>
            <LectureSearchBoxView isShow={isSearchBoxShow} setIsShow={setIsSearchBoxShow}/>
            <div className="lt-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <FontAwesomeIcon icon={topIcon} className="icon-custom" />
            </div>
            <div className="lt-list-view" onClick={() => {setIsSearchBoxShow(false)}}>
                <div className="header-navigation">
                    <HeaderNavigation />
                </div>

                <div className="lt-list-header">
                    <div className="custom-selectBox">
                        <div className="select-btn" onClick={() => setIsSelectBoxShow(!isSelectBoxShow)}>
                            {institutionList.length > 0 ? institutionList[institutionNo-1].institutionName : <div/>}
                            <div className="select-arrow" ref={selectArrow}>
                                <FontAwesomeIcon icon={arrow} />
                            </div>
                        </div>
                        <ul className="select-list" ref={selectBox}>
                            {customInstitutionSelectBox()}
                        </ul>
                    </div>
                    <LectureEventSwiperView institutionNo={institutionNo} />
                </div>

                <div className="lt-list-main">
                    <LectureMainCategoryView institutionNo={institutionNo} setMainCategoryNo={setMainCategoryNo}/>
                    {
                        mainCategoryNo !== 0 ?
                            <LectureSubCategoryView mainCategoryNo={mainCategoryNo} setSubCategoryNo={setSubCategoryNo}/>
                            :
                            <></>
                    }
                    <LectureListToolView ltType={"L"} ltCount={totalPage} isSetBoxShow={setIsSearchBoxShow}
                                         institutionNo={institutionNo} setSortType={setSortType}/>
                    <LectureListMainView ltCount={totalPage} lectureList={lectureList}/>
                    {
                        totalPage > lectureList.length ?
                            <div className="lt-more-btn" onClick={() => setPageNo(pageNo + 1)}>
                                강좌 더보기 <FontAwesomeIcon icon={arrow} />
                            </div>
                            :
                            <div />
                    }
                </div>
            </div>
            <FooterNavigation />
        </Styled.LectureListView>
    )
}

export default LectureList;