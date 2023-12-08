package com.cac.duduproject.web.dto.member;

import com.cac.duduproject.jpa.domain.member.Member;
import com.cac.duduproject.util.Role;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

@Data
@NoArgsConstructor
public class MemberSignUpRequestDto {

    private String memberEmail;
    private String memberId;
    private String memberName;
    private String memberPw;
    private String memberGender;
    private String memberPhone;

    public Member toMember(PasswordEncoder passwordEncoder) {
        return Member.builder()
                .memberEmail(memberEmail)
                .memberId(memberId)
                .memberName(memberName)
                .memberPw(passwordEncoder.encode(memberPw))
                .memberGender(memberGender)
                .memberPhone(memberPhone)
                .role(Role.MEMBER)
                .memberAttributeCode("-")
                .memberProvider("COMMON")
                .build();
    }

}
