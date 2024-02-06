package com.cac.duduproject.jpa.repository.lecture;

import com.cac.duduproject.jpa.domain.lecture.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LectureRepository extends JpaRepository<Lecture, Long>, LectureRepositoryCustom {

    @Query("SELECT l.lectureNo, l.lectureEvent, l.lectureReception FROM Lecture l")
    List<Lecture> findAllCustom();
    Page<Lecture> findAllByLectureEvent(LectureEvent lectureEvent, Pageable pageable);
    List<Lecture> findAllByLectureEventTypeContaining(String eventType);
    List<Lecture> findAllByLectureEventTypeContainingAndLectureSubCategory(String eventType, LectureSubCategory lectureSubCategory);
    Page<Lecture> findAllByLectureMainCategoryAndLectureSubCategoryAndLectureEventTypeContaining
            (LectureMainCategory lectureMainCategory, LectureSubCategory lectureSubCategory,
             String eventType, Pageable pageable);
    @Modifying
    @Query("UPDATE Lecture l SET l.lectureEvent = null WHERE l.lectureEvent = :lectureEvent")
    void updateByLectureEvent(@Param("lectureEvent") LectureEvent lectureEvent);

}
