package com.cac.duduproject.web.dto.faq;

import com.cac.duduproject.jpa.domain.faq.Faq;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FaqWriteRequestDto {

    private String faqCategory;
    private String faqTitle;
    private String faqContent;

    public Faq toFaq() {
        return Faq.builder()
                .faqCategory(faqCategory)
                .faqTitle(faqTitle)
                .faqContent(faqContent)
                .build();
    }
}
