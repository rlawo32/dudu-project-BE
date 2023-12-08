package com.cac.duduproject.util.oauth.dto;

import com.cac.duduproject.jpa.domain.member.Member;
import com.cac.duduproject.util.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OAuth2RequestDto {

    private String attributeCode;
    private String name;
    private String provider;

    public Member toOAuth2() {
        return Member.builder()
                .memberEmail("-")
                .memberId("-")
                .memberName(name)
                .memberPw("-")
                .memberGender("-")
                .memberPhone("-")
                .role(Role.SOCIAL)
                .memberAttributeCode(attributeCode)
                .memberProvider(provider)
                .build();
    }
}
