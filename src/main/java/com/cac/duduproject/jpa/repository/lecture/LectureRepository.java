package com.cac.duduproject.jpa.repository.lecture;

import com.cac.duduproject.jpa.domain.lecture.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LectureRepository extends JpaRepository<Lecture, Long>, LectureRepositoryCustom {

    @Query("SELECT l.lectureNo, l.lectureReception FROM Lecture l")
    List<Lecture> findAllLectureNoAndLectureReception();
    List<Lecture> findAllByLectureEvent(LectureEvent lectureEvent);
}
