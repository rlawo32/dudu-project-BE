package com.cac.duduproject.jpa.repository.lecture;

import com.cac.duduproject.jpa.domain.lecture.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LectureRepository extends JpaRepository<Lecture, Long> {

    @Query("SELECT l.lectureNo, l.lectureReception FROM Lecture l")
    List<Lecture> findAllLectureNoAndLectureReception();
    List<Lecture> findAllByLectureInstitution(LectureInstitution lectureInstitution);
    List<Lecture> findAllByLectureEvent(LectureEvent lectureEvent);
    List<Lecture> findAllByLectureInstitutionAndLectureMainCategory
            (LectureInstitution lectureInstitution, LectureMainCategory lectureMainCategory);
    List<Lecture> findAllByLectureInstitutionAndLectureMainCategoryAndLectureSubCategory
            (LectureInstitution lectureInstitution, LectureMainCategory lectureMainCategory, LectureSubCategory lectureSubCategory);
}
