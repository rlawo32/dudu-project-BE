package com.cac.duduproject.jpa.repository.lecture;

import com.cac.duduproject.jpa.domain.lecture.Lecture;
import com.cac.duduproject.jpa.domain.lecture.LectureApplication;
import com.cac.duduproject.jpa.domain.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LectureApplicationRepository extends JpaRepository<LectureApplication, Long>, LectureApplicationRepositoryCustom {

    boolean existsByLectureAndMember(Lecture lecture, Member member);
}
