package com.cac.duduproject.web.controller;

import com.cac.duduproject.service.faq.FaqListService;
import com.cac.duduproject.service.faq.FaqWriteService;
import com.cac.duduproject.web.dto.CommonResponseDto;
import com.cac.duduproject.web.dto.faq.FaqListRequestDto;
import com.cac.duduproject.web.dto.faq.FaqWriteRequestDto;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/faq")
public class FaqController {

    private final FaqWriteService faqWriteService;
    private final FaqListService faqListService;

    @GetMapping("/faqCategoryList")
    public CommonResponseDto<?> faqCategoryList() {
        return faqListService.findAllFaqCategoryList();
    }

    @PostMapping("/faqWrite")
    public CommonResponseDto<?> faqWrite(@RequestBody FaqWriteRequestDto requestDto) {
        return faqWriteService.faqWrite(requestDto);
    }

    @GetMapping("/faqOftenList")
    public CommonResponseDto<?> faqOftenList() {
        return faqListService.findFaqOftenList();
    }

    @PostMapping("/faqList")
    public CommonResponseDto<?> faqList(@RequestBody FaqListRequestDto requestDto) {
        return faqListService.findAllFaqList(requestDto);
    }

    @PutMapping("/faqViewsUp")
    public CommonResponseDto<?> faqViewsUp(HttpServletRequest request) {
        return faqWriteService.faqViewsUp(request);
    }
}
