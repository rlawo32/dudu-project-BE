package com.cac.duduproject.service.member;

import com.cac.duduproject.jpa.domain.member.Member;
import com.cac.duduproject.jpa.domain.member.MemberLog;
import com.cac.duduproject.jpa.domain.member.RefreshToken;
import com.cac.duduproject.jpa.repository.member.MemberLogRepository;
import com.cac.duduproject.jpa.repository.member.MemberRepository;
import com.cac.duduproject.jpa.repository.member.RefreshTokenRepository;
import com.cac.duduproject.util.jwt.JwtTokenProvider;
import com.cac.duduproject.util.jwt.dto.JwtTokenResponseDto;
import com.cac.duduproject.web.dto.CommonResponseDto;
import com.cac.duduproject.web.dto.member.MemberSignInRequestDto;
import com.cac.duduproject.web.dto.member.MemberSignUpRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final MemberLogRepository memberLogRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public CommonResponseDto<?> signUp(MemberSignUpRequestDto requestDto) {
        try {
            memberRepository.save(requestDto.toMember(passwordEncoder));
        } catch (Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }

        return CommonResponseDto.setSuccess("Sign Up Success", null);
    }

    @Transactional
    public CommonResponseDto<JwtTokenResponseDto> signIn(MemberSignInRequestDto requestDto) {

        String memberId = requestDto.getMemberId();
        String memberPw = requestDto.getMemberPw();
        JwtTokenResponseDto tokenDto = new JwtTokenResponseDto();

        try {
            Member member = memberRepository.findByMemberId(memberId)
                    .orElseThrow(() -> new IllegalArgumentException("해당 사용자 아이디가 없습니다. ID : " + memberId));

            MemberLog memberLog;

            if(member.getMemberWithdrawYn().equals("Y")) {
                return CommonResponseDto.setFailed("This User Has Withdrawn!");
            } else {
                boolean matchPassword = passwordEncoder.matches(memberPw, member.getMemberPw());

                if(!matchPassword) {
                    memberLog = MemberLog.builder()
                            .member(member)
                            .memberLogType("COMMON")
                            .memberLogSuccessYn("N")
                            .memberLogIpAddress("")
                            .build();

                    memberLogRepository.save(memberLog);

                    return CommonResponseDto.setFailed("Sign In Information Does Not Match");
                } else {
                    // 1. Login ID/PW 를 기반으로 AuthenticationToken 생성
                    UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAuthentication();

                    // 2. 실제로 검증 (사용자 비밀번호 체크) 이 이루어지는 부분
                    //    authenticate 메서드가 실행이 될 때 CustomUserDetailsService 에서 만들었던 loadUserByUsername 메서드가 실행됨
                    Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

                    if(authentication.isAuthenticated()) {
                        memberLog = MemberLog.builder()
                                .member(member)
                                .memberLogType("COMMON")
                                .memberLogSuccessYn("Y")
                                .memberLogIpAddress("")
                                .build();

                        memberLogRepository.save(memberLog);

                        // 3. 인증 정보를 기반으로 JWT 토큰 생성
                        tokenDto = jwtTokenProvider.generateTokenDto(authentication, "COMMON");

                        // 4. RefreshToken 저장
                        RefreshToken refreshToken = RefreshToken.builder()
                                .key(authentication.getName())
                                .value(tokenDto.getRefreshToken())
                                .build();

                        refreshTokenRepository.save(refreshToken);
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return CommonResponseDto.setFailed("Data Base Error!");
        }

        return CommonResponseDto.setSuccess("Sign In Success", tokenDto);
    }

    public boolean memberEmailDuplicationChk(String memberEmail) {
        return memberRepository.existsByMemberEmail(memberEmail);
    }

    public boolean memberIdDuplicationChk(String memberId) {
        return memberRepository.existsByMemberId(memberId);
    }

}
