package com.cac.duduproject.jpa.domain.lecture;

import com.cac.duduproject.jpa.domain.community.Review;
import com.cac.duduproject.jpa.domain.member.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Entity
@Getter
@Table(name = "Lecture_Application")
public class LectureApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lecture_application_no")
    private Long lectureApplicationNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecture_no")
    private Lecture lecture;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_no")
    private Member member;

    @Column(name = "lecture_application_order_id")
    @NotBlank
    private String lectureApplicationOrderId;

    @Column(name = "lecture_application_payment_key")
    @NotBlank
    private String lectureApplicationPaymentKey;

    @Column(name = "lecture_application_amount")
    @NotNull
    private Long lectureApplicationAmount;

    @Column(name = "lecture_application_cancel_yn")
    @NotBlank
    private String lectureApplicationCancelYn; // N : 결제완료, Y : 취소완료, R : 리뷰작성완료

    @Column(name = "lecture_application_cancel_desc")
    @NotBlank
    private String lectureApplicationCancelDesc;

    @Column(name = "lecture_application_created_date")
    @NotBlank
    private String lectureApplicationCreatedDate;

    @OneToOne(mappedBy = "lectureApplication")
    private Review review;

    @PrePersist
    public void onPrePersist() {
        this.lectureApplicationCancelYn = "N";
        this.lectureApplicationCancelDesc = "*";
        this.lectureApplicationCreatedDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd_HH:mm"));
    }

    @PreUpdate
    public void onPreUpdate() {
        this.lectureApplicationCreatedDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd_HH:mm"));
    }

    public LectureApplication lectureApplicationCancel(String desc) {
        this.lectureApplicationCancelYn = "Y";
        this.lectureApplicationCancelDesc = desc;
        return this;
    }

    public LectureApplication lectureApplicationReview() {
        this.lectureApplicationCancelYn = "R";
        return this;
    }

    @Builder
    public LectureApplication(Lecture lecture, Member member, String lectureApplicationOrderId,
                              String lectureApplicationPaymentKey, Long lectureApplicationAmount) {
        this.lecture = lecture;
        this.member = member;
        this.lectureApplicationOrderId = lectureApplicationOrderId;
        this.lectureApplicationPaymentKey = lectureApplicationPaymentKey;
        this.lectureApplicationAmount = lectureApplicationAmount;
    }
}
