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
@Table(name = "Lecture_Institution_Image")
public class LectureInstitutionImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "institution_image_no")
    private Long institutionImageNo;

    @Column(name = "institution_image_type")
    @NotBlank
    private String institutionImageType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "institution_no")
    private LectureInstitution lectureInstitution;

    @Column(name = "institution_image_origin")
    @NotBlank
    private String institutionImageOrigin;

    @Column(name = "institution_image_custom")
    @NotBlank
    private String institutionImageCustom;

    @Column(name = "institution_image_url")
    @NotBlank
    private String institutionImageUrl;

    @Column(name = "institution_image_size")
    @NotNull
    private Long institutionImageSize;

    @Column(name = "institution_image_extension")
    @NotBlank
    private String institutionImageExtension;

    @Column(name = "institution_image_date")
    @NotBlank
    private String institutionImageCratedDate;

    @PrePersist
    public void onPrePersist() {
        this.institutionImageCratedDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd_HH:mm"));
    }

    @Builder
    public LectureInstitutionImage(LectureInstitution lectureInstitution, String institutionImageOrigin,
                                   String institutionImageType, String institutionImageCustom,
                                   String institutionImageUrl, Long institutionImageSize,
                                   String institutionImageExtension) {
        this.institutionImageType = institutionImageType;
        this.lectureInstitution = lectureInstitution;
        this.institutionImageOrigin = institutionImageOrigin;
        this.institutionImageCustom = institutionImageCustom;
        this.institutionImageUrl = institutionImageUrl;
        this.institutionImageSize = institutionImageSize;
        this.institutionImageExtension = institutionImageExtension;
    }
}
