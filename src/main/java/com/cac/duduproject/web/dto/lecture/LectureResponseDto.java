package com.cac.duduproject.web.dto.lecture;

import com.cac.duduproject.jpa.domain.lecture.Lecture;
import lombok.Data;

@Data
public class LectureResponseDto {

    private Long lectureNo;
    private String lectureTime;
    private String lecturePeriod;
    private String lectureReception;
    private Long lectureStateNo;

    public LectureResponseDto(Lecture lecture) {
        this.lectureNo = lecture.getLectureNo();
        this.lectureTime = lecture.getLectureTime();
        this.lecturePeriod = lecture.getLecturePeriod();
        this.lectureReception = lecture.getLectureReception();
        this.lectureStateNo = lecture.getLectureState().getLectureStateNo();

    }
}
