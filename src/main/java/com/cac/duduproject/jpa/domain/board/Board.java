package com.cac.duduproject.jpa.domain.board;

import com.cac.duduproject.jpa.domain.lecture.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@NoArgsConstructor
@Entity
@Getter
@Table(name = "Board")
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_no")
    private Long boardNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "institution_no")
    private LectureInstitution lectureInstitution;

    @Column(name = "board_category")
    @NotBlank
    private String boardCategory;

    @Column(name = "board_title")
    @NotBlank
    private String boardTitle;

    @Column(name = "board_content", columnDefinition = "TEXT")
    @NotEmpty
    private String boardContent;

    @Column(name = "board_created_date")
    @NotBlank
    private String boardCreatedDate;

    @PrePersist
    public void onPrePersist() {
        this.boardCreatedDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd_HH:mm"));
    }

    @Builder
    public Board(LectureInstitution lectureInstitution, String boardCategory, String boardTitle, String boardContent) {
        this.lectureInstitution = lectureInstitution;
        this.boardCategory = boardCategory;
        this.boardTitle = boardTitle;
        this.boardContent = boardContent;
    }
}
