package com.cac.duduproject.service.faq;

import com.cac.duduproject.jpa.domain.faq.Faq;
import com.cac.duduproject.jpa.repository.faq.FaqCategoryRepository;
import com.cac.duduproject.jpa.repository.faq.FaqRepository;
import com.cac.duduproject.web.dto.CommonResponseDto;
import com.cac.duduproject.web.dto.faq.FaqCategoryResponseDto;
import com.cac.duduproject.web.dto.faq.FaqListRequestDto;
import com.cac.duduproject.web.dto.faq.FaqListResponseDto;
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
public class FaqListService {

    private final FaqCategoryRepository faqCategoryRepository;
    private final FaqRepository faqRepository;

    @Transactional
    public CommonResponseDto<?> findAllFaqCategoryList() {
        try {
            List<FaqCategoryResponseDto> list = faqCategoryRepository.findAll().stream()
                    .map(FaqCategoryResponseDto::new)
                    .collect(Collectors.toList());
            return CommonResponseDto.setSuccess("FAQ Category List", list);
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
    }

    @Transactional
    public CommonResponseDto<?> findAllFaqList(FaqListRequestDto requestDto) {
        Map<String, Object> result = new HashMap<>();
        try {
            int pageNo = requestDto.getPageNo();
            String faqCategory = requestDto.getFaqCategory();
            String searchText = requestDto.getSearchText();

            Page<Faq> pageable = faqRepository.findByAllFaq(faqCategory,
                    searchText, PageRequest.of(0, (10*pageNo), Sort.by("faqCreatedDate").ascending()));
            Long totalPage = Long.valueOf(pageable.getTotalElements());

            List<FaqListResponseDto> list = pageable.stream()
                    .map(FaqListResponseDto::new)
                    .collect(Collectors.toList());

            result.put("faqList", list);
            result.put("totalPage", totalPage);
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
        return CommonResponseDto.setSuccess("Faq List", result);
    }

    @Transactional
    public CommonResponseDto<?> findFaqOftenList() {
        Map<String, Object> result = new HashMap<>();
        try {
            Page<Faq> pageable = faqRepository.findByFaqOftenList
                    (PageRequest.of(0, 5, Sort.by("faqViews").descending()));
            Long totalPage = Long.valueOf(pageable.getTotalElements());

            List<FaqListResponseDto> list = pageable.stream()
                    .map(FaqListResponseDto::new)
                    .collect(Collectors.toList());

            result.put("faqList", list);
            result.put("totalPage", totalPage);
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
        return CommonResponseDto.setSuccess("Faq List", result);
    }
}

