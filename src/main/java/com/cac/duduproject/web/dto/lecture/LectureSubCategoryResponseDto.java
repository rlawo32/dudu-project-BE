package com.cac.duduproject.web.dto.lecture;

import com.cac.duduproject.jpa.domain.lecture.LectureMainCategory;
import com.cac.duduproject.jpa.domain.lecture.LectureSubCategory;
import lombok.Getter;

@Getter
public class LectureSubCategoryResponseDto {

    private Long lectureSubCategoryNo;
    private LectureMainCategory lectureMainCategory;
    private String lectureSubCategoryName;
    private String lectureSubCategoryDesc;

    public LectureSubCategoryResponseDto(LectureSubCategory lectureSubCategory) {
        this.lectureSubCategoryNo = lectureSubCategory.getLectureMainCategoryNo();
        this.lectureMainCategory = lectureSubCategory.getLectureMainCategory();
        this.lectureSubCategoryName = lectureSubCategory.getLectureMainCategoryName();
        this.lectureSubCategoryDesc = lectureSubCategory.getLectureMainCategoryDesc();
    }
}
