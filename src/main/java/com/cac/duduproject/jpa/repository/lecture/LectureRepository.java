package com.cac.duduproject.jpa.repository.lecture;

import com.cac.duduproject.jpa.domain.lecture.Lecture;
import com.cac.duduproject.jpa.domain.lecture.LectureMainCategory;
import com.cac.duduproject.jpa.domain.lecture.LectureSubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LectureRepository extends JpaRepository<Lecture, Long> {

    @Query("SELECT l.lectureNo, l.lectureReception FROM Lecture l")
    List<Lecture> findAllLectureNo();
    List<Lecture> findAllByLectureMainCategory(LectureMainCategory lectureMainCategory);
    List<Lecture> findAllByLectureMainCategoryAndLectureSubCategory(LectureMainCategory lectureMainCategory, LectureSubCategory lectureSubCategory);
}
