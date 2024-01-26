package com.cac.duduproject.web.dto.lecture;

import com.cac.duduproject.jpa.domain.lecture.LectureInstitution;
import lombok.Getter;

@Getter
public class LectureInstitutionResponseDto {

    private Long institutionNo;
    private String institutionName;
    private String institutionPosition;
    private String institutionContact;

    public LectureInstitutionResponseDto(LectureInstitution lectureInstitution) {
        this.institutionNo = lectureInstitution.getInstitutionNo();
        this.institutionName = lectureInstitution.getInstitutionName();
        this.institutionPosition = lectureInstitution.getInstitutionPosition();
        this.institutionContact = lectureInstitution.getInstitutionContact();
    }
}
