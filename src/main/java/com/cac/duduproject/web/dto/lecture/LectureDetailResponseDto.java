package com.cac.duduproject.web.dto.lecture;

import com.cac.duduproject.jpa.domain.lecture.Lecture;
import lombok.Data;

@Data
public class LectureDetailResponseDto {

    private Long lectureNo;
    private String lectureState;
    private String lectureTitle;
    private String lectureInstitution;
    private String lectureDivision;
    private String lectureTeacher;
    private String lecturePeriod;
    private String lectureTime;
    private int lectureCount;
    private int lectureCapacity;
    private String lectureRoom;
    private Long lectureFee;
    private String lectureReception;
    private String lectureContact;
    private String lectureDescription;

    public LectureDetailResponseDto(Lecture lecture) {
        this.lectureNo = lecture.getLectureNo();
        this.lectureState = lecture.getLectureState().getLectureStateName();
        this.lectureTitle = lecture.getLectureTitle();
        this.lectureInstitution = lecture.getLectureInstitution().getInstitutionName();
        this.lectureDivision = lecture.getLectureDivision();
        this.lectureTeacher = lecture.getMember().getMemberName();
        this.lecturePeriod = lecture.getLecturePeriod();
        this.lectureTime = lecture.getLectureTime();
        this.lectureCount = lecture.getLectureCount();
        this.lectureCapacity = lecture.getLectureCapacity();
        this.lectureRoom = lecture.getLectureRoom().getLectureRoomName();
        this.lectureFee = lecture.getLectureFee();
        this.lectureReception = lecture.getLectureReception();
        this.lectureContact = lecture.getLectureInstitution().getInstitutionContact();
        this.lectureDescription = lecture.getLectureDescription();
    }
}
