package com.cac.duduproject.jpa.repository.lecture;

import com.cac.duduproject.jpa.domain.lecture.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LectureRepository extends JpaRepository<Lecture, Long>, LectureRepositoryCustom {

    @Query("SELECT l.lectureNo, l.lectureReception FROM Lecture l")
    List<Lecture> findAllLectureNoAndLectureReception();
    Page<Lecture> findAllByLectureEvent(LectureEvent lectureEvent, Pageable pageable);
}
