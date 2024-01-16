package com.cac.duduproject.jpa.repository.lecture;

import com.cac.duduproject.jpa.domain.lecture.LectureMainCategory;
import com.cac.duduproject.jpa.domain.lecture.LectureSubCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface LectureSubCategoryRepository extends JpaRepository<LectureSubCategory, Long> {

    List<LectureSubCategory> findAllByLectureMainCategory(LectureMainCategory lectureMainCategory);
}
