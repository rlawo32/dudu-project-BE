package com.cac.duduproject.web.dto.lecture;

import com.cac.duduproject.jpa.domain.lecture.LectureMainCategory;
import lombok.Getter;

@Getter
public class LectureMainCategoryResponseDto {

    private Long lectureMainCategoryNo;
    private String lectureMainCategoryName;
    private String lectureMainCategoryDesc;

    public LectureMainCategoryResponseDto(LectureMainCategory lectureMainCategory) {
        this.lectureMainCategoryNo = lectureMainCategory.getLectureMainCategoryNo();
        this.lectureMainCategoryName = lectureMainCategory.getLectureMainCategoryName();
        this.lectureMainCategoryDesc = lectureMainCategory.getLectureMainCategoryDesc();
    }
}
