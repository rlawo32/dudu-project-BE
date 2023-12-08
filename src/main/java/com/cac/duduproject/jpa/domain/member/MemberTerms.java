package com.cac.duduproject.jpa.domain.member;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@NoArgsConstructor
@Entity
@Getter
@Table(name = "Member_Terms")
public class MemberTerms {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_terms_no")
    private Long memberTermsNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_no")
    private Member member;

    @Column(name = "member_terms_agree1")
    @NotBlank
    private String memberTermsAgree1;

    @Column(name = "member_terms_agree2")
    @NotBlank
    private String memberTermsAgree2;

    @Column(name = "member_terms_agree3")
    @NotBlank
    private String memberTermsAgree3;

    @Column(name = "member_terms_date")
    @NotBlank
    private String memberTermsDate;

    @PrePersist
    public void onPrePersist() {
        this.memberTermsDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd_HH:mm"));
    }

    @Builder
    public MemberTerms(Member member, String memberTermsAgree1, String memberTermsAgree2, String memberTermsAgree3) {
        this.member = member;
        this.memberTermsAgree1 = memberTermsAgree1;
        this.memberTermsAgree2 = memberTermsAgree2;
        this.memberTermsAgree3 = memberTermsAgree3;
    }
}
