package com.cac.duduproject.web.dto.community;

import com.cac.duduproject.jpa.domain.community.Board;
import lombok.Data;

@Data
public class BoardDetailResponseDto {

    private Long boardNo;
    private String institutionName;
    private String boardCategory;
    private String boardTitle;
    private String boardContent;
    private String boardCreatedDate;

    public BoardDetailResponseDto(Board board) {
        this.boardNo = board.getBoardNo();
        this.institutionName = board.getLectureInstitution().getInstitutionName();
        this.boardCategory = board.getBoardCategory();
        this.boardTitle = board.getBoardTitle();
        this.boardContent = board.getBoardContent();
        this.boardCreatedDate = board.getBoardCreatedDate();
    }
}
