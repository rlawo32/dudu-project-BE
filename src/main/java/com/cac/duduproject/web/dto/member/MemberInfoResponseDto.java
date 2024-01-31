package com.cac.duduproject.web.dto.member;

import com.cac.duduproject.jpa.domain.member.Member;
import lombok.Getter;

@Getter
public class MemberInfoResponseDto {

    private Long memberNo;
    private String memberEmail;
    private String memberId;
    private String memberName;
    private String memberGender;
    private String memberBirth;
    private String memberPhone;

    public MemberInfoResponseDto(Member member) {
        this.memberNo = member.getMemberNo();
        this.memberEmail = member.getMemberEmail();
        this.memberId = member.getMemberId();
        this.memberName = member.getMemberName();
        this.memberGender = member.getMemberGender();
        this.memberBirth = member.getMemberBirth();
        this.memberPhone = member.getMemberPhone();
    }
}
