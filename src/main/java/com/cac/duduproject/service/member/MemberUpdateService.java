package com.cac.duduproject.service.member;

import com.cac.duduproject.jpa.domain.member.Member;
import com.cac.duduproject.jpa.domain.member.MemberWithdraw;
import com.cac.duduproject.jpa.domain.member.RefreshToken;
import com.cac.duduproject.jpa.repository.member.MemberRepository;
import com.cac.duduproject.jpa.repository.member.MemberWithdrawRepository;
import com.cac.duduproject.jpa.repository.member.RefreshTokenRepository;
import com.cac.duduproject.util.security.SecurityUtil;
import com.cac.duduproject.web.dto.CommonResponseDto;
import com.cac.duduproject.web.dto.member.MemberSignInRequestDto;
import com.cac.duduproject.web.dto.member.MemberSignUpRequestDto;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class MemberUpdateService {

    private final MemberRepository memberRepository;
    private final MemberWithdrawRepository memberWithdrawRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    private final PasswordEncoder passwordEncoder;

    // 회원 수정
    @Transactional
    public CommonResponseDto<?> memberInfoUpdate(MemberSignUpRequestDto requestDto) {
        try {
            Long memberNo = SecurityUtil.getCurrentMemberNo();
            Member member = memberRepository.findById(memberNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. No. : " + memberNo));

            member.infoUpdate(requestDto.getMemberName(), requestDto.getMemberEmail(),
                    requestDto.getMemberBirth(), requestDto.getMemberPhone(), requestDto.getMemberGender());
        } catch(Exception e) {
            return CommonResponseDto.setFailed("DataBase Error!!");
        }
        return CommonResponseDto.setSuccess("MemberInfo Update Success!!", null);
    }

    // 비밀번호 변경
    @Transactional
    public CommonResponseDto<?> passwordUpdate(HttpServletRequest request) {
        try {
            Member member = memberRepository.findById(SecurityUtil.getCurrentMemberNo())
                    .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다."));

            if(member.getMemberWithdrawYn().equals("Y")) {
                return CommonResponseDto.setFailed("This Withdraw Member!!");
            } else {
                member.passwordUpdate(passwordEncoder.encode(request.getParameter("changePassword")));
            }
        } catch(Exception e) {
            return CommonResponseDto.setFailed("DataBase Error!!");
        }
        return CommonResponseDto.setSuccess("Password Change Success!!", null);
    }

    // 회원 탈퇴
    @Transactional
    public CommonResponseDto<?> memberWithdraw(MemberSignInRequestDto requestDto) {
        try {
            String memberId = requestDto.getMemberId();
            String memberPassword = requestDto.getMemberPw();

            Member member = memberRepository.findByMemberId(memberId)
                    .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. Id : " + memberId));
            boolean matchPassword = passwordEncoder.matches(memberPassword, member.getMemberPw());

            if(matchPassword) {
                member.memberWithdrawUpdate("Y");

                MemberWithdraw memberWithdraw = MemberWithdraw.builder()
                        .memberNo(member.getMemberNo())
                        .memberId(member.getMemberId())
                        .memberEmail(member.getMemberEmail())
                        .memberName(member.getMemberName())
                        .build();
                memberWithdrawRepository.save(memberWithdraw);

                RefreshToken refreshToken = refreshTokenRepository.findByKey(String.valueOf(member.getMemberNo()))
                        .orElseThrow(() -> new RuntimeException("해당 사용자의 토큰이 존재하지 않습니다. id : " + member.getMemberNo()));
                refreshTokenRepository.delete(refreshToken);

                return CommonResponseDto.setSuccess("Secession Success!", null);
            } else {
                return CommonResponseDto.setFailed("Unmatched Password!");
            }
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
    }
}
