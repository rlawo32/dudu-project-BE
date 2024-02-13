package com.cac.duduproject.jpa.domain.community;

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
@Table(name = "Review_Image")
public class ReviewImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_image_no")
    private Long reviewImageNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "review_no")
    private Review review;

    @Column(name = "review_image_type")
    @NotBlank
    private String reviewImageType;

    @Column(name = "review_image_origin")
    @NotBlank
    private String reviewImageOrigin;

    @Column(name = "review_image_custom")
    @NotBlank
    private String reviewImageCustom;

    @Column(name = "review_image_url")
    @NotBlank
    private String reviewImageUrl;

    @Column(name = "review_image_size")
    @NotNull
    private Long reviewImageSize;

    @Column(name = "review_image_extension")
    @NotBlank
    private String reviewImageExtension;

    @Column(name = "review_image_date")
    @NotBlank
    private String reviewImageCratedDate;

    @PrePersist
    public void onPrePersist() {
        this.reviewImageCratedDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd_HH:mm"));
    }

    @Builder
    public ReviewImage(Review review, String reviewImageType, String reviewImageOrigin,
                       String reviewImageCustom, String reviewImageUrl, Long reviewImageSize,
                       String reviewImageExtension) {
        this.review = review;
        this.reviewImageType = reviewImageType;
        this.reviewImageOrigin = reviewImageOrigin;
        this.reviewImageCustom = reviewImageCustom;
        this.reviewImageUrl = reviewImageUrl;
        this.reviewImageSize = reviewImageSize;
        this.reviewImageExtension = reviewImageExtension;
    }
}
