package com.cac.duduproject.web.dto.lecture;

import com.cac.duduproject.jpa.domain.lecture.LectureBasket;
import lombok.Getter;


@Getter
public class LectureBasketListResponseDto {

    private Long lectureBasketNo;
    private String lectureBasketDate;

    private Long lectureNo;
    private String lectureTitle;
    private Long lectureStateNo;
    private String lectureInstitutionName;
    private Long lectureInstitutionNo;
    private String lectureTeacher;
    private String lecturePeriod;
    private String lectureTime;
    private int lectureCount;
    private Long lectureFee;

    public LectureBasketListResponseDto(LectureBasket lectureBasket) {
        this.lectureBasketNo = lectureBasket.getLectureBasketNo();
        this.lectureBasketDate = lectureBasket.getLectureBasketDate();
        this.lectureNo = lectureBasket.getLecture().getLectureNo();
        this.lectureTitle = lectureBasket.getLecture().getLectureTitle();
        this.lectureStateNo = lectureBasket.getLecture().getLectureState().getLectureStateNo();
        this.lectureInstitutionName = lectureBasket.getLecture().getLectureInstitution().getInstitutionName();
        this.lectureInstitutionNo = lectureBasket.getLecture().getLectureInstitution().getInstitutionNo();
        this.lectureTeacher = lectureBasket.getLecture().getLectureTeacher();
        this.lecturePeriod = lectureBasket.getLecture().getLecturePeriod();
        this.lectureTime = lectureBasket.getLecture().getLectureTime();
        this.lectureCount = lectureBasket.getLecture().getLectureCount();
        this.lectureFee = lectureBasket.getLecture().getLectureFee();
    }
}
