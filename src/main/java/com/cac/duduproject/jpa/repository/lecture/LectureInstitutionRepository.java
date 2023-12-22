package com.cac.duduproject.jpa.repository.lecture;

import com.cac.duduproject.jpa.domain.lecture.LectureInstitution;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LectureInstitutionRepository extends JpaRepository<LectureInstitution, Long> {

}
