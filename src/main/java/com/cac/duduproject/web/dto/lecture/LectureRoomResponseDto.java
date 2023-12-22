package com.cac.duduproject.web.dto.lecture;

import com.cac.duduproject.jpa.domain.lecture.LectureInstitution;
import com.cac.duduproject.jpa.domain.lecture.LectureRoom;
import lombok.Getter;

@Getter
public class LectureRoomResponseDto {

    private Long lectureRoomNo;
    private LectureInstitution lectureInstitutionNo;
    private String lectureRoomName;
    private String lectureRoomContact;

    public LectureRoomResponseDto(LectureRoom lectureRoom) {
        this.lectureRoomNo = lectureRoom.getLectureRoomNo();
        this.lectureInstitutionNo = lectureRoom.getLectureInstitution();
        this.lectureRoomName = lectureRoom.getLectureRoomName();
        this.lectureRoomContact = lectureRoom.getLectureRoomContact();
    }
}
