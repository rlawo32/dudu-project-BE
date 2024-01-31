package com.cac.duduproject.jpa.domain.member;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@NoArgsConstructor
@Entity
@Getter
@Table(name = "Member_Withdraw")
public class MemberWithdraw {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "withdraw_no", nullable = false)
    private Long withdrawNo;

    @Column(name = "withdraw_member_no")
    @NotNull
    private Long withdrawMemberNo;

    @Column(name = "withdraw_member_id")
    @NotBlank
    private String withdrawMemberId;

    @Column(name = "withdraw_member_email")
    @NotBlank
    private String withdrawMemberEmail;

    @Column(name = "withdraw_member_name")
    @NotBlank
    private String withdrawMemberName;

    @Column(name = "withdraw_member_date")
    @NotBlank
    private String withdrawMemberDate;

    @PrePersist
    public void onPrePersist() {
        this.withdrawMemberDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd_HH:mm"));
    }

    @Builder
    public MemberWithdraw(Long memberNo, String memberId, String memberEmail, String memberName) {
        this.withdrawMemberNo = memberNo;
        this.withdrawMemberId = memberId;
        this.withdrawMemberEmail = memberEmail;
        this.withdrawMemberName = memberName;
    }
}
