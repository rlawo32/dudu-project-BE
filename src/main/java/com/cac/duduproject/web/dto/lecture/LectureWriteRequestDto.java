package com.cac.duduproject.web.dto.lecture;

import com.cac.duduproject.jpa.domain.lecture.*;
import com.cac.duduproject.jpa.domain.member.Member;
import com.cac.duduproject.util.Role;
import com.cac.duduproject.web.dto.member.MemberTermsAgreeRequestDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LectureWriteRequestDto {

    private String lectureName;
    private String lecturePeriod;
    private String lectureTime;
    private String lectureReception;
    private int lectureCapacity;
    private Long lectureFee;
    private String lectureDescription;

    //
    private String lectureDivision;
    private String lectureState;
    private int lectureCount;

    //
    private Long memberNo;
    private Member member;
    private Long institutionNo;
    private LectureInstitution lectureInstitution;
    private Long lectureRoomNo;
    private LectureRoom lectureRoom;
    private Long mainCategoryNo;
    private LectureMainCategory lectureMainCategory;
    private Long subCategoryNo;
    private LectureSubCategory lectureSubCategory;

    public Lecture toLecture() {
        return Lecture.builder()
                .lectureName(lectureName)
                .lecturePeriod(lecturePeriod)
                .lectureTime(lectureTime)
                .lectureReception(lectureReception)
                .lectureCapacity(lectureCapacity)
                .lectureFee(lectureFee)
                .lectureDescription(lectureDescription)
                .lectureDivision(lectureDivision)
                .lectureState(lectureState)
                .lectureCount(lectureCount)
                .member(member)
                .lectureInstitution(lectureInstitution)
                .lectureRoom(lectureRoom)
                .lectureMainCategory(lectureMainCategory)
                .lectureSubCategory(lectureSubCategory)
                .build();
    }
}
