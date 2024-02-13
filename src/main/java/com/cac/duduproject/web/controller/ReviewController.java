package com.cac.duduproject.web.controller;

import com.cac.duduproject.service.community.ReviewListService;
import com.cac.duduproject.service.community.ReviewWriteService;
import com.cac.duduproject.web.dto.CommonResponseDto;
import com.cac.duduproject.web.dto.community.ReviewListRequestDto;
import com.cac.duduproject.web.dto.community.ReviewWriteRequestDto;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/review")
public class ReviewController {

    private final ReviewWriteService reviewWriteService;
    private final ReviewListService reviewListService;

    @PostMapping("/reviewWrite")
    public CommonResponseDto<?> reviewWrite(@RequestBody ReviewWriteRequestDto requestDto) {
        return reviewWriteService.reviewWrite(requestDto);
    }

    @PostMapping("/reviewList")
    public CommonResponseDto<?> reviewList(@RequestBody ReviewListRequestDto requestDto) {
        return reviewListService.findAllReviewList(requestDto);
    }

    @GetMapping("/reviewOftenList")
    public CommonResponseDto<?> reviewOftenList() {
        return reviewListService.findReviewOftenList();
    }

    @GetMapping("/reviewDetail")
    public CommonResponseDto<?> reviewDetail(HttpServletRequest request) {
        return reviewListService.findReviewDetail(request);
    }

    @PutMapping("/reviewViewsUp")
    public CommonResponseDto<?> reviewViewsUp(HttpServletRequest request) {
        return reviewWriteService.reviewViewsUp(request);
    }
}
