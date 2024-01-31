package com.cac.duduproject.jpa.repository.lecture;

import com.cac.duduproject.jpa.domain.lecture.LectureApplication;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LectureApplicationRepository extends JpaRepository<LectureApplication, Long>, LectureApplicationRepositoryCustom {

}
