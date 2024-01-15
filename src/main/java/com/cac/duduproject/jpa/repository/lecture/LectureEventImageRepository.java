package com.cac.duduproject.jpa.repository.lecture;

import com.cac.duduproject.jpa.domain.lecture.LectureEvent;
import com.cac.duduproject.jpa.domain.lecture.LectureEventImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LectureEventImageRepository extends JpaRepository<LectureEventImage, Long> {

    @Modifying
    @Query("DELETE FROM LectureEventImage l WHERE l.lectureEvent = :lectureEvent")
    void deleteByLectureEvent(@Param("lectureEvent") LectureEvent lectureEvent);
}
