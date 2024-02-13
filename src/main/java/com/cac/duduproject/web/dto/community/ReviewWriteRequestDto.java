package com.cac.duduproject.web.dto.community;

import com.cac.duduproject.jpa.domain.community.Review;
import com.cac.duduproject.jpa.domain.lecture.Lecture;
import com.cac.duduproject.jpa.domain.lecture.LectureApplication;
import com.cac.duduproject.jpa.domain.lecture.LectureInstitution;
import com.cac.duduproject.jpa.domain.member.Member;
import com.cac.duduproject.web.dto.ImageInsertRequestDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewWriteRequestDto {

    private Long lectureNo;
    private Long lectureApplicationNo;
    private String reviewTitle;
    private String reviewContent;
    private String reviewAuthor;
    private int reviewScore;
    private Lecture lecture;
    private LectureApplication lectureApplication;
    private Member member;
    private LectureInstitution lectureInstitution;
    private List<ImageInsertRequestDto> reviewImage;

    public Review toReview() {
        return Review.builder()
                .reviewTitle(reviewTitle)
                .reviewContent(reviewContent)
                .reviewAuthor(reviewAuthor)
                .reviewScore(reviewScore)
                .lecture(lecture)
                .lectureApplication(lectureApplication)
                .member(member)
                .lectureInstitution(lectureInstitution)
                .build();
    }
}
