package com.cac.duduproject.web.dto.lecture;

import com.cac.duduproject.jpa.domain.lecture.Lecture;
import com.cac.duduproject.jpa.domain.lecture.LectureImage;
import com.cac.duduproject.jpa.domain.lecture.LectureSubCategory;
import lombok.Data;

import java.util.List;

@Data
public class LectureListResponseDto {

    private Long lectureNo;
    private String lectureTitle;
    private String lectureDivision;
    private String lectureTeacher;
    private String lectureTime;
    private Long lectureFee;
    private String lectureInstitution;
    //
    private Long lectureStateNo;
    private int lectureCount;
    private String lectureThumbnail;

    public LectureListResponseDto(Lecture lecture) {
        this.lectureNo = lecture.getLectureNo();
        this.lectureTitle = lecture.getLectureTitle();
        this.lectureDivision = lecture.getLectureDivision();
        this.lectureTeacher = lecture.getMember().getMemberName();
        this.lectureTime = lecture.getLectureTime();
        this.lectureFee = lecture.getLectureFee();
        this.lectureInstitution = lecture.getLectureInstitution().getInstitutionName();
        this.lectureStateNo = lecture.getLectureState().getLectureStateNo();
        this.lectureCount = lecture.getLectureCount();
        for(int i=0; i<lecture.getLectureImages().size(); i++) {
            if(lecture.getLectureImages().get(i).getLectureImageType().equals("T")) {
                this.lectureThumbnail = lecture.getLectureImages().get(i).getLectureImageUrl();
                break;
            }
        }
    }
}
