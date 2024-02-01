package com.cac.duduproject.jpa.repository.lecture;

import com.cac.duduproject.jpa.domain.lecture.Lecture;
import com.cac.duduproject.jpa.domain.lecture.LectureBasket;
import com.cac.duduproject.jpa.domain.member.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LectureBasketRepository extends JpaRepository<LectureBasket, Long> {

    boolean existsByLectureAndMember(Lecture lecture, Member member);

    Page<LectureBasket> findByMember(Member member, Pageable pageable);
}
