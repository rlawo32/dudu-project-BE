package com.cac.duduproject.jpa.repository.board;

import com.cac.duduproject.jpa.domain.board.Board;
import com.cac.duduproject.jpa.domain.lecture.LectureInstitution;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BoardRepositoryCustom {

    Page<Board> findBySearch(Long institutionNo, String searchCategory,
                             String searchText, Pageable pageable);
}
