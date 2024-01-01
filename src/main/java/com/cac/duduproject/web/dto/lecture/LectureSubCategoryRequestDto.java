package com.cac.duduproject.web.dto.lecture;

import com.cac.duduproject.jpa.domain.lecture.LectureInstitution;
import com.cac.duduproject.jpa.domain.lecture.LectureMainCategory;
import com.cac.duduproject.jpa.domain.lecture.LectureRoom;
import com.cac.duduproject.jpa.domain.lecture.LectureSubCategory;
import com.cac.duduproject.web.dto.ImageInsertRequestDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LectureSubCategoryRequestDto {

    private Long lectureMainCategoryNo;
    private LectureMainCategory lectureMainCategory;
    private String lectureSubCategoryName;
    private String lectureSubCategoryDesc;
    private String lectureSubCategoryThumbnail;

    public LectureSubCategory toLectureSubCategory() {
        return LectureSubCategory.builder()
                .lectureMainCategory(lectureMainCategory)
                .lectureSubCategoryName(lectureSubCategoryName)
                .lectureSubCategoryDesc(lectureSubCategoryDesc)
                .lectureSubCategoryThumbnail(lectureSubCategoryThumbnail)
                .build();
    }
}
