package com.cac.duduproject.web.dto.lecture;

import com.cac.duduproject.jpa.domain.lecture.Lecture;
import lombok.Data;

@Data
public class LectureListResponseDto {

    private Long lectureNo;
    private String lectureTitle;
    private String lectureDivision;
    private String lectureTeacher;
    private String lectureTime;
    private String lecturePeriod;
    private Long lectureFee;
    private String lectureInstitution;
    //
    private Long lectureStateNo;
    private int lectureCount;
    private String lectureEventType;
    private String lectureThumbnail;

    public LectureListResponseDto(Lecture lecture) {
        this.lectureNo = lecture.getLectureNo();
        this.lectureTitle = lecture.getLectureTitle();
        this.lectureDivision = lecture.getLectureDivision();
        this.lectureTeacher = lecture.getMember().getMemberName();
        this.lectureTime = lecture.getLectureTime();
        this.lecturePeriod = lecture.getLecturePeriod();
        this.lectureFee = lecture.getLectureFee();
        this.lectureInstitution = lecture.getLectureInstitution().getInstitutionName();
        this.lectureStateNo = lecture.getLectureState().getLectureStateNo();
        this.lectureCount = lecture.getLectureCount();
        this.lectureEventType = lecture.getLectureEventType();
        for(int i=0; i<lecture.getLectureImages().size(); i++) {
            if(lecture.getLectureImages().get(i).getLectureImageType().equals("T")) {
                this.lectureThumbnail = lecture.getLectureImages().get(i).getLectureImageUrl();
                break;
            }
        }
    }
}
