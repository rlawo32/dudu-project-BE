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
    private Long memberNo;
    private Member member;
    private String lecturePeriod;
    private String lectureTime;
    private String lectureReception;
    private Long lectureRoomNo;
    private LectureRoom lectureRoom;
    private int lectureCapacity;
    private String lectureDivision;
    private Long lectureFee;
    private String lectureDescription;
    private Long institutionNo;
    private LectureInstitution lectureInstitution;
    private Long mainCategoryNo;
    private LectureMainCategory lectureMainCategory;
    private Long subCategoryNo;
    private LectureSubCategory lectureSubCategory;

    public Lecture toLecture() {
        return Lecture.builder()
                .lectureName(lectureName)
                .member(member)
                .lecturePeriod(lecturePeriod)
                .lectureTime(lectureTime)
                .lectureReception(lectureReception)
                .lectureRoom(lectureRoom)
                .lectureCapacity(lectureCapacity)
                .lectureDivision(lectureDivision)
                .lectureFee(lectureFee)
                .lectureDescription(lectureDescription)
                .lectureInstitution(lectureInstitution)
                .lectureMainCategory(lectureMainCategory)
                .lectureSubCategory(lectureSubCategory)
                .build();
    }
}
