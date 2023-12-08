package com.cac.duduproject.web.dto.member;

import com.cac.duduproject.jpa.domain.member.Member;
import com.cac.duduproject.jpa.domain.member.MemberTerms;
import com.cac.duduproject.util.Role;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

@Data
@NoArgsConstructor
public class MemberTermsAgreeRequestDto {

    private Member member;
    private boolean termsAgree1;
    private boolean termsAgree2;
    private boolean termsAgree3;

    public MemberTerms toMemberTerms() {
        return MemberTerms.builder()
                .member(member)
                .memberTermsAgree1(termsAgree1 ? "Y" : "N")
                .memberTermsAgree2(termsAgree2 ? "Y" : "N")
                .memberTermsAgree3(termsAgree3 ? "Y" : "N")
                .build();
    }
}
