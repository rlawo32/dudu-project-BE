package com.cac.duduproject.web.dto.lecture;

import com.cac.duduproject.jpa.domain.lecture.Lecture;
import com.cac.duduproject.jpa.domain.lecture.LectureBasket;
import com.cac.duduproject.jpa.domain.member.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LectureBasketRequestDto {

    private Long lectureNo;
    private Lecture lecture;
    private Member member;

    public LectureBasket toLectureBasket() {
        return LectureBasket.builder()
                .lecture(lecture)
                .member(member)
                .build();
    }
}
