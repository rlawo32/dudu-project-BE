package com.cac.duduproject.service.board;

import com.cac.duduproject.jpa.domain.board.Board;
import com.cac.duduproject.jpa.repository.board.BoardRepository;
import com.cac.duduproject.web.dto.CommonResponseDto;
import com.cac.duduproject.web.dto.board.BoardDetailResponseDto;
import com.cac.duduproject.web.dto.board.BoardListRequestDto;
import com.cac.duduproject.web.dto.board.BoardListResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class BoardListService {

    private final BoardRepository boardRepository;

    @Transactional
    public CommonResponseDto<?> findAllBoardList(BoardListRequestDto requestDto) {
        Map<String, Object> result = new HashMap<>();
        try {
            int pageNo = requestDto.getPageNo();
            Long institutionNo = requestDto.getInstitutionNo();
            String searchCategory = requestDto.getSearchCategory();
            String searchText = requestDto.getSearchText();

            Page<Board> pageable = null;
            if(pageNo == 0) {
                pageable = boardRepository.findBySearch(institutionNo, searchCategory,
                        searchText, PageRequest.of(0, 4, Sort.by("boardCreatedDate").descending()));
            } else {
                pageable = boardRepository.findBySearch(institutionNo, searchCategory,
                        searchText, PageRequest.of(0, (10*pageNo), Sort.by("boardCreatedDate").descending()));
            }
            Long totalPage = Long.valueOf(pageable.getTotalElements());

            List<BoardListResponseDto> list = pageable.stream()
                    .map(BoardListResponseDto::new)
                    .collect(Collectors.toList());

            result.put("boardList", list);
            result.put("totalPage", totalPage);
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
        return CommonResponseDto.setSuccess("Board List", result);
    }

    @Transactional
    public CommonResponseDto<BoardDetailResponseDto> findBoardDetail(HttpServletRequest request) {
        try {
            Long boardNo = Long.valueOf(request.getParameter("boardNo"));
            Board board = boardRepository.findById(boardNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + boardNo));

            BoardDetailResponseDto boardDetailResponseDto = new BoardDetailResponseDto(board);

            return CommonResponseDto.setSuccess("Board Detail", boardDetailResponseDto);
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
    }
}
