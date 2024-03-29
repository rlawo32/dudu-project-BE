package com.cac.duduproject.jpa.domain.community;

import com.cac.duduproject.jpa.domain.lecture.Lecture;
import com.cac.duduproject.jpa.domain.lecture.LectureApplication;
import com.cac.duduproject.jpa.domain.lecture.LectureInstitution;
import com.cac.duduproject.jpa.domain.member.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@NoArgsConstructor
@Entity
@Getter
@Table(name = "Review")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_no")
    private Long reviewNo;

    @Column(name = "review_title")
    @NotBlank
    private String reviewTitle;

    @Column(name = "review_content", columnDefinition = "TEXT")
    @NotEmpty
    private String reviewContent;

    @Column(name = "review_author")
    @NotBlank
    private String reviewAuthor;

    @Column(name = "review_score")
    @NotNull
    private int reviewScore;

    @Column(name = "review_views")
    @NotNull
    private Long reviewViews;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecture_no")
    private Lecture lecture;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecture_application_no")
    private LectureApplication lectureApplication;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_no")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "institution_no")
    private LectureInstitution lectureInstitution;

    @Column(name = "review_created_date")
    @NotBlank
    private String reviewCreatedDate;

    @PrePersist
    public void onPrePersist() {
        this.reviewViews = 0L;
        this.reviewCreatedDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd_HH:mm"));
    }

    public Review reviewViewsUpdate() {
        this.reviewViews += 1;
        return this;
    }

    @Builder
    public Review(String reviewTitle, String reviewContent, String reviewAuthor, int reviewScore,
                  Lecture lecture, LectureApplication lectureApplication, Member member,
                  LectureInstitution lectureInstitution) {
        this.reviewTitle = reviewTitle;
        this.reviewContent = reviewContent;
        this.reviewAuthor = reviewAuthor;
        this.reviewScore = reviewScore;
        this.lecture = lecture;
        this.lectureApplication = lectureApplication;
        this.member = member;
        this.lectureInstitution = lectureInstitution;
    }
}
