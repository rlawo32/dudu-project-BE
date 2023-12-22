package com.cac.duduproject.jpa.domain.lecture;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
@Getter
@Table(name = "Lecture_Main_Category")
public class LectureMainCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lecture_main_category_no")
    private Long lectureMainCategoryNo;

    @Column(name = "lecture_main_category_name")
    @NotEmpty
    private String lectureMainCategoryName;

    @Column(name = "lecture_main_category_desc")
    @NotBlank
    private String lectureMainCategoryDesc;

    @Builder
    public LectureMainCategory(String lectureMainCategoryName, String lectureMainCategoryDesc) {
        this.lectureMainCategoryName = lectureMainCategoryName;
        this.lectureMainCategoryDesc = lectureMainCategoryDesc;
    }
}
