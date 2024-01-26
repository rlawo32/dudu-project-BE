package com.cac.duduproject.web.dto.lecture;

import com.cac.duduproject.jpa.domain.lecture.LectureInstitutionImage;
import lombok.Getter;

@Getter
public class LectureInstitutionImageResponseDto {

    private Long institutionImageNo;
    private String institutionImageCustom;
    private String institutionImageUrl;

    public LectureInstitutionImageResponseDto(LectureInstitutionImage lectureInstitutionImage) {
        this.institutionImageNo = lectureInstitutionImage.getInstitutionImageNo();
        this.institutionImageCustom = lectureInstitutionImage.getInstitutionImageCustom();
        this.institutionImageUrl = lectureInstitutionImage.getInstitutionImageUrl();
    }
}
