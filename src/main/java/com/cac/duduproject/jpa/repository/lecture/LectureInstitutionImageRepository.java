package com.cac.duduproject.jpa.repository.lecture;

import com.cac.duduproject.jpa.domain.lecture.LectureInstitution;
import com.cac.duduproject.jpa.domain.lecture.LectureInstitutionImage;
import com.cac.duduproject.web.dto.lecture.LectureInstitutionImageResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LectureInstitutionImageRepository extends JpaRepository<LectureInstitutionImage, Long> {

    List<LectureInstitutionImage> findByLectureInstitution(LectureInstitution lectureInstitution);
}
