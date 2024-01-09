package com.cac.duduproject.web.dto.lecture;

import com.cac.duduproject.jpa.domain.lecture.LectureEvent;
import lombok.Getter;


@Getter
public class LectureEventListResponseDto {

    private Long lectureEventNo;
    private Long lectureInstitutionNo;
    private String lectureEventName;
    private String lectureEventDesc;
    private String lectureEventThumbnail;

    public LectureEventListResponseDto(LectureEvent lectureEvent) {
        this.lectureEventNo = lectureEvent.getLectureEventNo();
        this.lectureInstitutionNo = lectureEvent.getLectureInstitution().getInstitutionNo();
        this.lectureEventName = lectureEvent.getLectureEventName();
        this.lectureEventDesc = lectureEvent.getLectureEventDesc();
        this.lectureEventThumbnail = lectureEvent.getLectureEventThumbnail();
    }
}
