package com.cac.duduproject.web.dto.faq;

import com.cac.duduproject.jpa.domain.faq.FaqCategory;
import lombok.Getter;

@Getter
public class FaqCategoryResponseDto {

    private Long faqCategoryNo;
    private String faqCategoryFlag;
    private String faqCategoryName;
    private String faqCategoryDesc;

    public FaqCategoryResponseDto(FaqCategory faqCategory) {
        this.faqCategoryNo = faqCategory.getFaqCategoryNo();
        this.faqCategoryFlag = faqCategory.getFaqCategoryFlag();
        this.faqCategoryName = faqCategory.getFaqCategoryName();
        this.faqCategoryDesc = faqCategory.getFaqCategoryDesc();
    }
}
