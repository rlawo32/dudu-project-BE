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
@Table(name = "Lecture_Sub_Category")
public class LectureSubCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lecture_sub_category_no")
    private Long lectureMainCategoryNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecture_main_category_no")
    private LectureMainCategory lectureMainCategory;

    @Column(name = "lecture_sub_category_name")
    @NotEmpty
    private String lectureMainCategoryName;

    @Column(name = "lecture_sub_category_desc")
    @NotBlank
    private String lectureMainCategoryDesc;

    @Builder
    public LectureSubCategory(LectureMainCategory lectureMainCategory, String lectureMainCategoryName, String lectureMainCategoryDesc) {
        this.lectureMainCategory = lectureMainCategory;
        this.lectureMainCategoryName = lectureMainCategoryName;
        this.lectureMainCategoryDesc = lectureMainCategoryDesc;
    }
}
