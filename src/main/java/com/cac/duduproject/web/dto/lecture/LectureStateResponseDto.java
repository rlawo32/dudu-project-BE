package com.cac.duduproject.web.dto.lecture;

import com.cac.duduproject.jpa.domain.lecture.LectureState;
import lombok.Getter;

@Getter
public class LectureStateResponseDto {

    private Long lectureStateNo;
    private String lectureStateName;
    private String lectureStateDesc;

    public LectureStateResponseDto(LectureState lectureState) {
        this.lectureStateNo = lectureState.getLectureStateNo();
        this.lectureStateName = lectureState.getLectureStateName();
        this.lectureStateDesc = lectureState.getLectureStateDesc();
    }
}
