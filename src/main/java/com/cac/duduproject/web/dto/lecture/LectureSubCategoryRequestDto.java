package com.cac.duduproject.web.dto.lecture;

import com.cac.duduproject.jpa.domain.lecture.LectureInstitution;
import com.cac.duduproject.jpa.domain.lecture.LectureMainCategory;
import com.cac.duduproject.jpa.domain.lecture.LectureRoom;
import com.cac.duduproject.jpa.domain.lecture.LectureSubCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LectureSubCategoryRequestDto {

    private Long lectureMainCategoryNo;
    private LectureMainCategory lectureMainCategory;
    private String lectureSubCategoryName;
    private String lectureSubCategoryDesc;

    public LectureSubCategory toLectureSubCategory() {
        return LectureSubCategory.builder()
                .lectureMainCategory(lectureMainCategory)
                .lectureMainCategoryName(lectureSubCategoryName)
                .lectureMainCategoryDesc(lectureSubCategoryDesc)
                .build();
    }
}
