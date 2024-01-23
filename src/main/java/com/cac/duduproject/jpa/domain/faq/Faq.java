package com.cac.duduproject.jpa.domain.faq;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@NoArgsConstructor
@Entity
@Getter
@Table(name = "Faq")
public class Faq {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "faq_no")
    private Long faqNo;

    @Column(name = "faq_category")
    @NotBlank
    private String faqCategory; // QM : 회원가입, QA : 수강신청/취소 , QL : 강좌/강사, QI : 지점/홈페이지, QE : 기타

    @Column(name = "faq_title")
    @NotBlank
    private String faqTitle;

    @Column(name = "faq_content", columnDefinition = "TEXT")
    @NotEmpty
    private String faqContent;

    @Column(name = "faq_views")
    @NotNull
    private Long faqViews;

    @Column(name = "faq_created_date")
    @NotBlank
    private String faqCreatedDate;

    @PrePersist
    public void onPrePersist() {
        this.faqViews = 0L;
        this.faqCreatedDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd_HH:mm"));
    }

    public Faq faqViewsUpdate() {
        this.faqViews += 1;
        return this;
    }

    @Builder
    public Faq(String faqCategory, String faqTitle, String faqContent) {
        this.faqCategory = faqCategory;
        this.faqTitle = faqTitle;
        this.faqContent = faqContent;
    }
}
