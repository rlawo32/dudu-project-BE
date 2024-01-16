package com.cac.duduproject.web.controller;

import com.cac.duduproject.service.board.BoardListService;
import com.cac.duduproject.service.board.BoardWriteService;
import com.cac.duduproject.web.dto.CommonResponseDto;
import com.cac.duduproject.web.dto.board.BoardListRequestDto;
import com.cac.duduproject.web.dto.board.BoardWriteRequestDto;
import com.cac.duduproject.web.dto.lecture.LectureListRequestDto;
import com.cac.duduproject.web.dto.lecture.LectureWriteRequestDto;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/board")
public class BoardController {

    private final BoardWriteService boardWriteService;
    private final BoardListService boardListService;

    @PostMapping("/boardWrite")
    public CommonResponseDto<?> boardWrite(@RequestBody BoardWriteRequestDto requestDto) {
        return boardWriteService.boardWrite(requestDto);
    }

    @PostMapping("/boardList")
    public CommonResponseDto<?> boardList(@RequestBody BoardListRequestDto requestDto) {
        return boardListService.findAllBoardList(requestDto);
    }

    @GetMapping("/boardDetail")
    public CommonResponseDto<?> boardDetail(HttpServletRequest request) {
        return boardListService.findBoardDetail(request);
    }
}
