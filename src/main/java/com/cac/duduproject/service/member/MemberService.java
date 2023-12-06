package com.cac.duduproject.service.member;

import com.cac.duduproject.jpa.repository.MemberRepository;
import com.cac.duduproject.web.dto.CommonResponseDto;
import com.cac.duduproject.web.dto.member.MemberSignUpRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    private final PasswordEncoder passwordEncoder;

    @Transactional
    public CommonResponseDto<?> signUp(MemberSignUpRequestDto requestDto) {
        try {
            memberRepository.save(requestDto.toMember(passwordEncoder));
        } catch (Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }

        return CommonResponseDto.setSuccess("Sign Up Success", null);
    }

    public boolean memberEmailDuplicationChk(String memberEmail) {
        return memberRepository.existsByMemberEmail(memberEmail);
    }

    public boolean memberIdDuplicationChk(String memberId) {
        return memberRepository.existsByMemberId(memberId);
    }

}
