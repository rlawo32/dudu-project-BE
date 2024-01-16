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
@Table(name = "Member_Log")
public class MemberLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_log_no")
    private Long memberLogNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_no")
    private Member member;

    @Column(name = "member_log_date")
    @NotBlank
    private String memberLogDate;

    @Column(name = "member_log_type")
    @NotBlank
    private String memberLogType;

    @Column(name = "member_log_success_yn")
    @NotBlank
    private String memberLogSuccessYn;

    @Column(name = "member_log_ip_address")
//    @NotBlank
    private String memberLogIpAddress;

    @PrePersist
    public void onPrePersist() {
        this.memberLogDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd_HH:mm"));
    }

    @Builder
    public MemberLog(Member member, String memberLogType, String memberLogSuccessYn, String memberLogIpAddress) {
        this.member = member;
        this.memberLogType = memberLogType;
        this.memberLogSuccessYn = memberLogSuccessYn;
        this.memberLogIpAddress = memberLogIpAddress;
    }
}
