package com.cac.duduproject.web.dto.community;

import com.cac.duduproject.jpa.domain.community.Review;
import lombok.Data;

@Data
public class ReviewListResponseDto {

    private Long reviewNo;
    private String reviewTitle;
    private String reviewContent;
    private String reviewAuthor;
    private int reviewScore;
    private Long institutionNo;
    private String institutionName;
    private String reviewCreatedDate;

    private Long lectureNo;
    private String lectureTitle;
    private String lectureThumbnail;

    public ReviewListResponseDto(Review review) {
        this.reviewNo = review.getReviewNo();
        this.reviewTitle = review.getReviewTitle();
        this.reviewContent = review.getReviewContent();
        this.reviewAuthor = review.getReviewAuthor();
        this.reviewScore = review.getReviewScore();
        this.institutionNo = review.getLectureInstitution().getInstitutionNo();
        this.institutionName = review.getLectureInstitution().getInstitutionName();
        this.reviewCreatedDate = review.getReviewCreatedDate();
        this.lectureNo = review.getLecture().getLectureNo();
        this.lectureTitle = review.getLecture().getLectureTitle();
        for(int i=0; i<review.getLecture().getLectureImages().size(); i++) {
            if(review.getLecture().getLectureImages().get(i).getLectureImageType().equals("T")) {
                this.lectureThumbnail = review.getLecture().getLectureImages().get(i).getLectureImageUrl();
                break;
            }
        }
    }
}
