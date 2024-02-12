package com.cac.duduproject.web.dto.community;

import com.cac.duduproject.jpa.domain.community.Review;
import com.cac.duduproject.jpa.domain.lecture.Lecture;
import com.cac.duduproject.jpa.domain.lecture.LectureInstitution;
import com.cac.duduproject.jpa.domain.member.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewWriteRequestDto {

    private Long lectureNo;
    private String reviewTitle;
    private String reviewContent;
    private String reviewAuthor;
    private int reviewScore;
    private Lecture lecture;
    private Member member;
    private LectureInstitution lectureInstitution;

    public Review toReview() {
        return Review.builder()
                .reviewTitle(reviewTitle)
                .reviewContent(reviewContent)
                .reviewAuthor(reviewAuthor)
                .reviewScore(reviewScore)
                .lecture(lecture)
                .member(member)
                .lectureInstitution(lectureInstitution)
                .build();
    }
}
