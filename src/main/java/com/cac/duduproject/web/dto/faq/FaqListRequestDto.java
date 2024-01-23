package com.cac.duduproject.web.dto.faq;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FaqListRequestDto {

    private int pageNo;
    private String faqCategory;
    private String searchText;
}

