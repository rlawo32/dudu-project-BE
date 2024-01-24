package com.cac.duduproject.service.faq;

import com.cac.duduproject.jpa.domain.faq.Faq;
import com.cac.duduproject.jpa.repository.faq.FaqRepository;
import com.cac.duduproject.web.dto.CommonResponseDto;
import com.cac.duduproject.web.dto.faq.FaqWriteRequestDto;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class FaqWriteService {

    private final FaqRepository faqRepository;

    @Transactional
    public CommonResponseDto<?> faqWrite(FaqWriteRequestDto requestDto) {
        try {
            faqRepository.save(requestDto.toFaq());
        } catch (Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
        return CommonResponseDto.setSuccess("Faq Write Success", null);
    }

    @Transactional
    public CommonResponseDto<?> faqViewsUp(HttpServletRequest request) {
        try {
            Long faqNo = Long.valueOf(request.getParameter("faqNo"));

            Faq faq = faqRepository.findById(faqNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + faqNo));
            faq.faqViewsUpdate();
        } catch (Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
        return CommonResponseDto.setSuccess("Faq Views Update Success", null);
    }
}
