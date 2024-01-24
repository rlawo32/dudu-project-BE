package com.cac.duduproject.jpa.domain.faq;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
@Getter
@Table(name = "Faq_Category")
public class FaqCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "faq_category_no")
    private Long faqCategoryNo;

    @Column(name = "faq_category_flag")
    @NotEmpty
    private String faqCategoryFlag;

    @Column(name = "faq_category_name")
    @NotEmpty
    private String faqCategoryName;

    @Column(name = "faq_category_desc")
    @NotBlank
    private String faqCategoryDesc;

    @Builder
    public FaqCategory(String faqCategoryFlag, String faqCategoryName, String faqCategoryDesc) {
        this.faqCategoryFlag = faqCategoryFlag;
        this.faqCategoryName = faqCategoryName;
        this.faqCategoryDesc = faqCategoryDesc;
    }
}
