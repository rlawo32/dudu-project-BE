package com.cac.duduproject.web.dto.faq;

import com.cac.duduproject.jpa.domain.board.Board;
import com.cac.duduproject.jpa.domain.faq.Faq;
import com.cac.duduproject.jpa.domain.lecture.LectureInstitution;
import com.cac.duduproject.web.dto.ImageInsertRequestDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

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
