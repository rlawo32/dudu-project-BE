package com.cac.duduproject.jpa.domain.member;

import com.cac.duduproject.util.Role;
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
@Table(name = "Member")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_no")
    private Long memberNo;

    @Column(name = "member_email")
    @NotBlank
    private String memberEmail;

    @Column(name = "member_id")
    @NotBlank
    private String memberId;

    @Column(name = "member_name")
    @NotBlank
    private String memberName;

    @Column(name = "member_password")
    @NotBlank
    private String memberPw;

    @Column(name = "member_gender")
    @NotBlank
    private String memberGender;

    @Column(name = "member_phone")
    @NotBlank
    private String memberPhone;

    @Column(name = "member_join_date")
    @NotBlank
    private String memberJoinDate;

    @Column(name = "member_modify_date")
    @NotBlank
    private String memberModifyDate;

    @Column(name = "member_withdraw_yn")
    @NotBlank
    private String memberWithdrawYn; // Y : 탈퇴 O / N : 탙퇴 X / 기본값 N

    @Enumerated(EnumType.STRING)
    @Column(name = "member_role")
    @NotNull
    private Role role;

    @PrePersist
    public void onPrePersist() {
        this.memberWithdrawYn = "N";
        this.memberJoinDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd_HH:mm"));
        this.memberModifyDate = this.memberJoinDate;
    }

    @Builder
    public Member(String memberEmail, String memberId, String memberName, String memberPw,
                  String memberGender, String memberPhone, Role role) {
        this.memberEmail = memberEmail;
        this.memberId = memberId;
        this.memberName = memberName;
        this.memberPw = memberPw;
        this.memberGender = memberGender;
        this.memberPhone = memberPhone;
        this.role = role;
    }

    public String getRoleKey() {
        return this.role.getKey();
    }
}
