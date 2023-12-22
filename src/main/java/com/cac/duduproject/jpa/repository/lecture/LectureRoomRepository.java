package com.cac.duduproject.jpa.repository.lecture;

import com.cac.duduproject.jpa.domain.lecture.LectureInstitution;
import com.cac.duduproject.jpa.domain.lecture.LectureRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LectureRoomRepository extends JpaRepository<LectureRoom, Long> {

    List<LectureRoom> findAllByLectureInstitution(LectureInstitution lectureInstitution);
}
