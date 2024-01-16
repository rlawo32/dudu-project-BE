package com.cac.duduproject.web.dto.board;

import com.cac.duduproject.jpa.domain.board.Board;
import com.cac.duduproject.jpa.domain.lecture.LectureInstitution;
import com.cac.duduproject.web.dto.ImageInsertRequestDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardWriteRequestDto {

    private Long boardInstitution;
    private LectureInstitution lectureInstitution;
    private String boardCategory;
    private String boardTitle;
    private String boardContent;
    private List<ImageInsertRequestDto> boardImage;

    public Board toBoard() {
        return Board.builder()
                .lectureInstitution(lectureInstitution)
                .boardCategory(boardCategory)
                .boardTitle(boardTitle)
                .boardContent(boardContent)
                .build();
    }
}
