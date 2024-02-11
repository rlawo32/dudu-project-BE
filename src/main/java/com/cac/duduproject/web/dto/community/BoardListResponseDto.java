package com.cac.duduproject.web.dto.community;

import com.cac.duduproject.jpa.domain.community.Board;
import lombok.Data;

@Data
public class BoardListResponseDto {

    private Long boardNo;
    private String boardTitle;
    private String boardContent;
    private String boardCreatedDate;

    public BoardListResponseDto(Board board) {
        this.boardNo = board.getBoardNo();
        this.boardTitle = board.getBoardTitle();
        this.boardContent = board.getBoardContent();
        this.boardCreatedDate = board.getBoardCreatedDate();
    }
}
