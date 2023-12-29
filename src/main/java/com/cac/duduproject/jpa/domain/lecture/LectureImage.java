package com.cac.duduproject.jpa.domain.lecture;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@NoArgsConstructor
@Entity
@Getter
@Table(name = "Lecture_Image")
public class LectureImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lecture_image_no")
    private Long lectureImageNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecture_no")
    private Lecture lecture;

    @Column(name = "lecture_image_type")
    @NotBlank
    private String lectureImageType; // thumbnail or detail

    @Column(name = "lecture_image_origin")
    @NotBlank
    private String lectureImageOrigin;

    @Column(name = "lecture_image_custom")
    @NotBlank
    private String lectureImageCustom;

    @Column(name = "lecture_image_url")
    @NotBlank
    private String lectureImageUrl;

    @Column(name = "lecture_image_size")
    @NotNull
    private Long lectureImageSize;

    @Column(name = "lecture_image_extension")
    @NotBlank
    private String lectureImageExtension;

    @Column(name = "lecture_image_date")
    @NotBlank
    private String lectureImageCratedDate;

    @PrePersist
    public void onPrePersist() {
        this.lectureImageCratedDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd_HH:mm"));
    }

    @Builder
    public LectureImage(Lecture lecture, String lectureImageType, String lectureImageOrigin,
                        String lectureImageCustom, String lectureImageUrl, Long lectureImageSize,
                        String lectureImageExtension) {
        this.lecture = lecture;
        this.lectureImageType = lectureImageType;
        this.lectureImageOrigin = lectureImageOrigin;
        this.lectureImageCustom = lectureImageCustom;
        this.lectureImageUrl = lectureImageUrl;
        this.lectureImageSize = lectureImageSize;
        this.lectureImageExtension = lectureImageExtension;
    }
}
