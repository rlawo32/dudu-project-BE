package com.cac.duduproject.web.dto.lecture;

import com.cac.duduproject.jpa.domain.lecture.LectureApplication;
import lombok.Getter;


@Getter
public class LectureApplicationListResponseDto {

    private Long lectureApplicationNo;
    private String lectureApplicationOrderId;
    private Long lectureApplicationAmount;
    private String lectureApplicationCancelYn;
    private String lectureApplicationCancelDesc;
    private String lectureApplicationCreatedDate;
    private String lectureApplicationMemberName;

    private String lectureInstitutionName;
    private String lectureTitle;
    private String lectureTeacher;
    private String lecturePeriod;
    private String lectureTime;
    private int lectureCount;
    private Long lectureFee;

    public LectureApplicationListResponseDto(LectureApplication lectureApplication) {
        this.lectureApplicationNo = lectureApplication.getLectureApplicationNo();
        this.lectureApplicationOrderId = lectureApplication.getLectureApplicationOrderId();
        this.lectureApplicationAmount = lectureApplication.getLectureApplicationAmount();
        this.lectureApplicationCancelYn = lectureApplication.getLectureApplicationCancelYn();
        this.lectureApplicationCancelDesc = lectureApplication.getLectureApplicationCancelDesc();
        this.lectureApplicationCreatedDate = lectureApplication.getLectureApplicationCreatedDate();
        this.lectureApplicationMemberName = lectureApplication.getMember().getMemberName();
        this.lectureInstitutionName = lectureApplication.getLecture().getLectureInstitution().getInstitutionName();
        this.lectureTitle = lectureApplication.getLecture().getLectureTitle();
        this.lectureTeacher = lectureApplication.getLecture().getMember().getMemberName();
        this.lecturePeriod = lectureApplication.getLecture().getLecturePeriod();
        this.lectureTime = lectureApplication.getLecture().getLectureTime();
        this.lectureCount = lectureApplication.getLecture().getLectureCount();
        this.lectureFee = lectureApplication.getLecture().getLectureFee();
    }
}
