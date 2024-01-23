package com.cac.duduproject.web.dto.faq;

import com.cac.duduproject.jpa.domain.faq.Faq;
import lombok.Data;

@Data
public class FaqListResponseDto {

    private Long faqNo;
    private String faqCategory;
    private String faqTitle;
    private String faqContent;

    public FaqListResponseDto(Faq faq) {
        this.faqNo = faq.getFaqNo();
        this.faqCategory = faq.getFaqCategory();
        this.faqTitle = faq.getFaqTitle();
        this.faqContent = faq.getFaqContent();
    }
}
