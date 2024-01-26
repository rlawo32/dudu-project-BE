import React, {useEffect, useRef, useState} from "react";
import axios from "axios";

import HeaderNavigation from "../navigation/HeaderNavigation";
import FooterNavigation from "../navigation/FooterNavigation";

import * as Styled from "./Faq.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowUpLong as topIcon,
    faChevronDown as arrow,
    faQ as qIcon,
    faSearch as searchIcon
} from "@fortawesome/free-solid-svg-icons"

import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const FaqList = () => {
    const categoryBtn:any = useRef<any>([]);
    const faqItemBox:any = useRef<any>([]);

    const [pageNo, setPageNo] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [categorySelect, setCategorySelect] = useState<number>(0);
    const [faqBoxIndex, setFaqBoxIndex] = useState<number>(0);
    const [faqBoxShow, setFaqBoxShow] = useState<boolean>(false);
    const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

    const [faqCategory, setFaqCategory] = useState<string>("");
    const [searchText, setSearchText] = useState<string>("");

    const [faqCategoryList, setFaqCategoryList] = useState<{
        faqCategoryNo:number;
        faqCategoryFlag:string;
        faqCategoryName:string;
        faqCategoryDesc:string;
    }[]>([]);
    const [faqList, setFaqList] = useState<{
        faqNo:number;
        faqCategory:string;
        faqTitle:string;
        faqContent:string;
    }[]>([]);
    const [faqOftenList, setFaqOftenList] = useState<{
        faqNo:number;
        faqCategory:string;
        faqTitle:string;
        faqContent:string;
    }[]>([]);

    const customFaqOftenSwiper = ():any[] => {
        let result:any[] = [];

        for(let i:number=0; i<faqOftenList.length; i++) {
            result.push(<SwiperSlide key={i} className="fos-item">
                <div className="item-title">
                    <FontAwesomeIcon icon={qIcon} className="icon-custom" />
                    <div>
                        {faqOftenList[i].faqTitle}
                    </div>
                </div>
                <div className="item-content">
                    {faqOftenList[i].faqContent}
                </div>
            </SwiperSlide>);
        }
        return result;
    }

    const customFaqCategorySelectBox = ():any => {
        const result:any[] = [];

        for(let i:number=0; i<=faqCategoryList.length; i++) {
            if(i === 0) {
                result.push(<div key={i} className="category-item"
                                 ref={btn => (categoryBtn.current[i] = btn)}
                                 onClick={() => {setFaqCategory("");
                                     setCategorySelect(i);}}>
                    전체
                </div>)
            } else {
                result.push(<div key={i} className="category-item"
                                 ref={btn => (categoryBtn.current[i] = btn)}
                                 onClick={() => {setFaqCategory(faqCategoryList[i-1].faqCategoryFlag);
                                     setCategorySelect(i);}}>
                    {faqCategoryList[i-1].faqCategoryName}
                </div>)
            }
        }
        return result;
    }

    const onClickFaqListItem = (idx:number, faqNo:number):void => {
        setFaqBoxIndex(idx+1);
        setFaqBoxShow(!faqBoxShow);
        axios({
            method: "PUT",
            url: "/faq/faqViewsUp",
            params: {faqNo: faqNo}
        }).then((res):void => {

        }).catch((err):void => {
            console.log(err.message);
        })
    }

    useEffect(() => {
        const faqListData = async ():Promise<void> => {
            await axios({
                method: "GET",
                url: "/faq/faqCategoryList"
            }).then((res):void => {
                setFaqCategoryList(res.data.data);
            }).catch((err):void => {
                console.log(err.message);
            })
            await axios({
                method: "GET",
                url: "/faq/faqOftenList"
            }).then((res):void => {
                console.log(res.data.data.faqList)
                setFaqOftenList(res.data.data.faqList);
            }).catch((err):void => {
                console.log(err.message);
            })
        }
        setTimeout(() => {faqListData().then();}, 0);
    }, [])

    useEffect(() => {
        const getListData:object = {
            pageNo: pageNo,
            faqCategory: faqCategory,
            searchText: searchText,
        }
        const faqList = async () => {
            await axios({
                method: "POST",
                url: '/faq/faqList',
                data: JSON.stringify(getListData),
                headers: {'Content-type': 'application/json'}
            }).then((res):void => {
                setFaqList(res.data.data.faqList);
                setTotalPage(res.data.data.totalPage);
            }).catch((err):void => {
                console.log(err.message);
            });
        }
        setTimeout(() => {faqList().then();}, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNo, faqCategory, isSearchActive])

    useEffect(() => {
        setFaqBoxIndex(0);
        categoryBtn.current[categorySelect].className = categoryBtn.current[categorySelect].className.replace(' active', '');
        categoryBtn.current[categorySelect].className += ' active';

        for(let i:number=0; i<categoryBtn.current.length; i++) {
            if(i !== categorySelect) {
                categoryBtn.current[i].className = categoryBtn.current[i].className.replace(' active', '');
            }
        }
        for(let i:number=0; i<faqList.length; i++) {
            faqItemBox.current[i].className = faqItemBox.current[i].className.replace(' show-box', '');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categorySelect])

    useEffect(() => {
        setFaqBoxShow(false);
    }, [faqBoxIndex])

    useEffect(() => {
        if(faqBoxIndex > 0) {
            if(faqBoxShow) {
                faqItemBox.current[faqBoxIndex-1].className = faqItemBox.current[faqBoxIndex-1].className.replace(' show-box', '');
            } else {
                faqItemBox.current[faqBoxIndex-1].className = faqItemBox.current[faqBoxIndex-1].className.replace(' show-box', '');
                faqItemBox.current[faqBoxIndex-1].className += ' show-box';
            }
            for(let i:number=0; i<faqList.length; i++) {
                if(i !== faqBoxIndex-1) {
                    faqItemBox.current[i].className = faqItemBox.current[i].className.replace(' show-box', '');
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [faqBoxShow])

    return (
        <Styled.FaqListView>
            <HeaderNavigation />

            <div className="top-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <FontAwesomeIcon icon={topIcon} className="icon-custom" />
            </div>

            <div className="faq-list-sub">
                <div className="faq-list-sub-view">
                    <div className="faq-sub-title">
                        자주하는 문의
                    </div>
                    <div className="faq-sub-input">
                        <input type="text" value={searchText} placeholder={"검색어를 입력해주세요"}
                               onChange={(e) => setSearchText(e.target.value)}/>
                        <FontAwesomeIcon icon={searchIcon} className="icon-custom"
                                         onClick={() => setIsSearchActive(!isSearchActive)}/>
                    </div>
                </div>
            </div>
            <div className="faq-list-main">
                <div className="faq-list-head">
                    <div className="section-title">
                        자주 묻는 질문
                    </div>
                    <Swiper className="fos-list"
                            modules={[Navigation, Pagination]}
                            speed={1000}
                            spaceBetween={25}
                            slidesPerView={3}
                            navigation
                            pagination={{ clickable: true }}
                            breakpoints={{
                                480: {
                                    slidesPerView: 1,
                                    spaceBetween: 25
                                },
                                880: {
                                    slidesPerView: 2,
                                    spaceBetween: 25
                                },
                                1280: {
                                    slidesPerView: 3,
                                    spaceBetween: 25
                                },
                            }}>
                        {customFaqOftenSwiper()}
                    </Swiper>
                </div>
                <div className="faq-list-body">
                    <div className="faq-list-category">
                        {customFaqCategorySelectBox()}
                    </div>
                    <div className="faq-list-view">
                        {faqList.map((item, idx) => (
                            <div key={idx} className="faq-list-item">
                                <div className="faq-item-title"
                                     onClick={() => onClickFaqListItem(idx, item.faqNo)}>
                                    <FontAwesomeIcon icon={qIcon} className="icon-custom" />
                                    {item.faqTitle}
                                </div>
                                <div className="faq-item-content"
                                     ref={items => (faqItemBox.current[idx] = items)}>
                                    {item.faqContent}
                                </div>
                            </div>
                        ))}
                    </div>
                    {
                        totalPage > faqList.length ?
                            <div className="faq-more-btn" onClick={() => setPageNo(pageNo + 1)}>
                                더보기 <FontAwesomeIcon icon={arrow} className="icon-custom" />
                            </div>
                            :
                            <div />
                    }
                </div>
                <div className="faq-list-foot">

                </div>
            </div>

            <FooterNavigation />
        </Styled.FaqListView>
    )
}

export default FaqList;