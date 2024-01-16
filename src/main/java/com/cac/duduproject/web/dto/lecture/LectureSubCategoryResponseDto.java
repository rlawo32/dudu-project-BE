package com.cac.duduproject.web.dto.lecture;

import com.cac.duduproject.jpa.domain.lecture.LectureSubCategory;
import lombok.Getter;

@Getter
public class LectureSubCategoryResponseDto {

    private Long lectureSubCategoryNo;
    private Long lectureMainCategoryNo;
    private String lectureSubCategoryName;
    private String lectureSubCategoryDesc;
    private String lectureSubCategoryThumbnail;

    public LectureSubCategoryResponseDto(LectureSubCategory lectureSubCategory) {
        this.lectureSubCategoryNo = lectureSubCategory.getLectureSubCategoryNo();
        this.lectureMainCategoryNo = lectureSubCategory.getLectureMainCategory().getLectureMainCategoryNo();
        this.lectureSubCategoryName = lectureSubCategory.getLectureSubCategoryName();
        this.lectureSubCategoryDesc = lectureSubCategory.getLectureSubCategoryDesc();
        this.lectureSubCategoryThumbnail = lectureSubCategory.getLectureSubCategoryThumbnail();
    }
}
