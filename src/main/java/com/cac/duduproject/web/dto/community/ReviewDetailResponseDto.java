package com.cac.duduproject.web.dto.community;

import com.cac.duduproject.jpa.domain.community.Review;
import lombok.Data;

@Data
public class ReviewDetailResponseDto {

    private Long reviewNo;
    private String reviewTitle;
    private String reviewContent;
    private String reviewAuthor;
    private int reviewScore;
    private String reviewCreatedDate;

    private Long lectureNo;
    private Long lectureStateNo;
    private String institutionName;
    private String mainCategoryName;
    private String subCategoryName;
    private String lectureTitle;
    private String lectureDivision;
    private String lectureTeacher;
    private String lecturePeriod;
    private String lectureThumbnail;

    public ReviewDetailResponseDto(Review review) {
        this.reviewNo = review.getReviewNo();
        this.reviewTitle = review.getReviewTitle();
        this.reviewContent = review.getReviewContent();
        this.reviewAuthor = review.getReviewAuthor();
        this.reviewScore = review.getReviewScore();
        this.reviewCreatedDate = review.getReviewCreatedDate();
        this.lectureNo = review.getLecture().getLectureNo();
        this.lectureStateNo = review.getLecture().getLectureState().getLectureStateNo();
        this.institutionName = review.getLecture().getLectureInstitution().getInstitutionName();
        this.mainCategoryName = review.getLecture().getLectureMainCategory().getLectureMainCategoryName();
        this.subCategoryName = review.getLecture().getLectureSubCategory().getLectureSubCategoryName();
        this.lectureTitle = review.getLecture().getLectureTitle();
        this.lectureDivision = review.getLecture().getLectureDivision();
        this.lectureTeacher = review.getLecture().getLectureTeacher();
        this.lecturePeriod = review.getLecture().getLecturePeriod();
        for(int i=0; i<review.getLecture().getLectureImages().size(); i++) {
            if(review.getLecture().getLectureImages().get(i).getLectureImageType().equals("T")) {
                this.lectureThumbnail = review.getLecture().getLectureImages().get(i).getLectureImageUrl();
                break;
            }
        }
    }
}
