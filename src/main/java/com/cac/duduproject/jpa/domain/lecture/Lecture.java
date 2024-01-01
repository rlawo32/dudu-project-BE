package com.cac.duduproject.jpa.domain.lecture;

import com.cac.duduproject.jpa.domain.member.Member;
import com.cac.duduproject.util.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
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
@Table(name = "Lecture")
public class Lecture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lecture_no")
    private Long lectureNo;

    @Column(name = "lecture_title")
    @NotBlank
    private String lectureTitle;

    @Column(name = "lecture_period")
    @NotEmpty
    private String lecturePeriod;

    @Column(name = "lecture_time")
    @NotBlank
    private String lectureTime;

    @Column(name = "lecture_reception")
    @NotEmpty
    private String lectureReception;

    @Column(name = "lecture_capacity")
    @NotNull
    private int lectureCapacity;

    @Column(name = "lecture_current_person")
    @NotNull
    private int lectureCurrentPerson;

    @Column(name = "lecture_fee")
    @NotNull
    private Long lectureFee;

    @Column(name = "lecture_description", columnDefinition = "TEXT")
    @NotEmpty
    private String lectureDescription;

    @Column(name = "lecture_division")
    @NotBlank
    private String lectureDivision;

    @Column(name = "lecture_count")
    @NotNull
    private int lectureCount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_no")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "institution_no")
    private LectureInstitution lectureInstitution;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecture_room_no")
    private LectureRoom lectureRoom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecture_main_category_no")
    private LectureMainCategory lectureMainCategory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecture_sub_category_no")
    private LectureSubCategory lectureSubCategory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecture_state_no")
    private LectureState lectureState;

    @OneToMany(mappedBy = "lecture")
    @JsonIgnore
    private List<LectureImage> lectureImages = new ArrayList<>();

    @Column(name = "lecture_created_date")
    @NotBlank
    private String lectureCreatedDate;

    @PrePersist
    public void onPrePersist() {
        this.lectureCurrentPerson = 0;
        this.lectureCreatedDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd_HH:mm"));
    }

    public Lecture lectureCurrentPersonUpdate() {
        this.lectureCurrentPerson += 1;
        return this;
    }

    @Builder
    public Lecture(String lectureTitle, String lecturePeriod, String lectureTime, String lectureReception,
                   int lectureCapacity, Long lectureFee, String lectureDescription, String lectureDivision,
                   int lectureCount,
                   Member member, LectureInstitution lectureInstitution, LectureRoom lectureRoom,
                   LectureMainCategory lectureMainCategory, LectureSubCategory lectureSubCategory,
                   LectureState lectureState) {
        this.lectureTitle = lectureTitle;
        this.lecturePeriod = lecturePeriod;
        this.lectureTime = lectureTime;
        this.lectureReception = lectureReception;
        this.lectureCapacity = lectureCapacity;
        this.lectureFee = lectureFee;
        this.lectureDescription = lectureDescription;
        this.lectureDivision = lectureDivision;
        this.lectureCount = lectureCount;
        this.member = member;
        this.lectureInstitution = lectureInstitution;
        this.lectureRoom = lectureRoom;
        this.lectureMainCategory = lectureMainCategory;
        this.lectureSubCategory = lectureSubCategory;
        this.lectureState = lectureState;
    }
}
