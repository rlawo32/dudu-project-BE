package com.cac.duduproject.jpa.repository.lecture;

import com.cac.duduproject.jpa.domain.lecture.LectureEvent;
import com.cac.duduproject.jpa.domain.lecture.LectureInstitution;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface LectureEventRepository extends JpaRepository<LectureEvent, Long> {

    List<LectureEvent> findAllByLectureInstitution(LectureInstitution lectureInstitution);
}
