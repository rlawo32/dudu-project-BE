package com.cac.duduproject.web.dto.member;

import com.cac.duduproject.jpa.domain.member.Member;
import lombok.Getter;

@Getter
public class MemberListResponseDto {

    private Long memberNo;
    private String memberName;
    private String memberPhone;

    public MemberListResponseDto(Member member) {
        this.memberNo = member.getMemberNo();
        this.memberName = member.getMemberName();
        this.memberPhone = member.getMemberPhone();
    }
}
