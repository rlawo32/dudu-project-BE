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
@Table(name = "Lecture_Event_Image")
public class LectureEventImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lecture_event_image_no")
    private Long lectureEventImageNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_no")
    private LectureEvent lectureEvent;

    @Column(name = "lecture_event_image_type")
    @NotBlank
    private String lectureEventImageType; // thumbnail or detail

    @Column(name = "lecture_event_image_origin")
    @NotBlank
    private String lectureEventImageOrigin;

    @Column(name = "lecture_event_image_custom")
    @NotBlank
    private String lectureEventImageCustom;

    @Column(name = "lecture_event_image_url")
    @NotBlank
    private String lectureEventImageUrl;

    @Column(name = "lecture_event_image_size")
    @NotNull
    private Long lectureEventImageSize;

    @Column(name = "lecture_event_image_extension")
    @NotBlank
    private String lectureEventImageExtension;

    @Column(name = "lecture_event_image_date")
    @NotBlank
    private String lectureEventImageCratedDate;

    @PrePersist
    public void onPrePersist() {
        this.lectureEventImageCratedDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd_HH:mm"));
    }

    @Builder
    public LectureEventImage(LectureEvent lectureEvent, String lectureImageType, String lectureImageOrigin,
                             String lectureImageCustom, String lectureImageUrl, Long lectureImageSize,
                             String lectureImageExtension) {
        this.lectureEvent = lectureEvent;
        this.lectureEventImageType = lectureImageType;
        this.lectureEventImageOrigin = lectureImageOrigin;
        this.lectureEventImageCustom = lectureImageCustom;
        this.lectureEventImageUrl = lectureImageUrl;
        this.lectureEventImageSize = lectureImageSize;
        this.lectureEventImageExtension = lectureImageExtension;
    }
}
