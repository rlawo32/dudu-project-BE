package com.cac.duduproject.web.dto.lecture;

import com.cac.duduproject.jpa.domain.lecture.LectureInstitution;
import com.cac.duduproject.jpa.domain.lecture.LectureRoom;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LectureRoomRequestDto {

    private Long institutionNo;
    private LectureInstitution lectureInstitution;
    private String lectureRoomName;
    private String lectureRoomContact;

    public LectureRoom toLectureRoom() {
        return LectureRoom.builder()
                .lectureInstitution(lectureInstitution)
                .lectureRoomName(lectureRoomName)
                .lectureRoomContact(lectureRoomContact)
                .build();
    }
}
