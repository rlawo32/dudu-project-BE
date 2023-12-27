package com.cac.duduproject.web.dto.lecture;

import com.cac.duduproject.jpa.domain.lecture.Lecture;
import com.cac.duduproject.jpa.domain.lecture.LectureSubCategory;
import lombok.Data;

@Data
public class LectureListResponseDto {

    private Long lectureNo;
    private String lectureName;
    private String lectureDivision;
    private String lectureTeacherName;
    private String lectureTime;
    private Long lectureFee;
    //
    private String lectureState;
    private int lectureCount;

    public LectureListResponseDto(Lecture lecture) {
        this.lectureNo = lecture.getLectureNo();
        this.lectureName = lecture.getLectureName();
        this.lectureDivision = lecture.getLectureDivision();
        this.lectureTeacherName = lecture.getMember().getMemberName();
        this.lectureTime = lecture.getLectureTime();
        this.lectureFee = lecture.getLectureFee();
    }
}
