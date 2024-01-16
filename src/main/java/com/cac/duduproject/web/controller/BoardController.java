package com.cac.duduproject.web.controller;

import com.cac.duduproject.service.board.BoardWriteService;
import com.cac.duduproject.web.dto.CommonResponseDto;
import com.cac.duduproject.web.dto.board.BoardWriteRequestDto;
import com.cac.duduproject.web.dto.lecture.LectureWriteRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/board")
public class BoardController {

    private final BoardWriteService boardWriteService;

    @PostMapping("/boardWrite")
    public CommonResponseDto<?> boardWrite(@RequestBody BoardWriteRequestDto requestDto) {
        return boardWriteService.boardWrite(requestDto);
    }
}
