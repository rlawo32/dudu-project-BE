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
@Table(name = "Board_Image")
public class BoardImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_image_no")
    private Long boardImageNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_no")
    private Board board;

    @Column(name = "board_image_type")
    @NotBlank
    private String boardImageType;

    @Column(name = "board_image_origin")
    @NotBlank
    private String boardImageOrigin;

    @Column(name = "board_image_custom")
    @NotBlank
    private String boardImageCustom;

    @Column(name = "board_image_url")
    @NotBlank
    private String boardImageUrl;

    @Column(name = "board_image_size")
    @NotNull
    private Long boardImageSize;

    @Column(name = "board_image_extension")
    @NotBlank
    private String boardImageExtension;

    @Column(name = "board_image_date")
    @NotBlank
    private String boardImageCratedDate;

    @PrePersist
    public void onPrePersist() {
        this.boardImageCratedDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd_HH:mm"));
    }

    @Builder
    public BoardImage(Board board, String boardImageType, String boardImageOrigin,
                      String boardImageCustom, String boardImageUrl, Long boardImageSize,
                      String boardImageExtension) {
        this.board = board;
        this.boardImageType = boardImageType;
        this.boardImageOrigin = boardImageOrigin;
        this.boardImageCustom = boardImageCustom;
        this.boardImageUrl = boardImageUrl;
        this.boardImageSize = boardImageSize;
        this.boardImageExtension = boardImageExtension;
    }
}
