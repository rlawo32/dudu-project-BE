package com.cac.duduproject.util.oauth;

import com.cac.duduproject.jpa.domain.member.Member;
import com.cac.duduproject.jpa.domain.member.MemberLog;
import com.cac.duduproject.jpa.domain.member.RefreshToken;
import com.cac.duduproject.jpa.repository.member.MemberLogRepository;
import com.cac.duduproject.jpa.repository.member.MemberRepository;
import com.cac.duduproject.jpa.repository.member.RefreshTokenRepository;
import com.cac.duduproject.util.jwt.JwtTokenProvider;
import com.cac.duduproject.util.jwt.dto.JwtTokenResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.web.util.UriComponentsBuilder;

import java.nio.charset.StandardCharsets;
import java.sql.DriverManager;

@RequiredArgsConstructor
public class MyAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;
    private final MemberLogRepository memberLogRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {

         DefaultOAuth2User defaultOAuth2User = (DefaultOAuth2User) authentication.getPrincipal();
         Object memberNo = defaultOAuth2User.getAttributes().get("memberNo");

         if(defaultOAuth2User == null) {
             throw new NullPointerException("null cannot be cast to non-null type org.springframework.security.oauth2.core.user.OAuth2User");
         } else {
             try {
                 if(authentication.isAuthenticated()) {
                     Member member = memberRepository.findById((Long) memberNo)
                             .orElseThrow(() -> new IllegalArgumentException("해당 사용자 No가 없습니다. No : " + memberNo));

                     MemberLog memberLog = MemberLog.builder()
                             .member(member)
                             .memberLogType("SOCIAL")
                             .memberLogSuccessYn("Y")
                             .memberLogReason("소셜 로그인 인증 성공")
                             .memberLogIpAddress("")
                             .build();
                     memberLogRepository.save(memberLog);
                 }

                 JwtTokenResponseDto tokenDto = jwtTokenProvider.generateTokenDto(authentication, "SOCIAL");

                 // 4. RefreshToken 저장
                 RefreshToken refreshToken = RefreshToken.builder()
                         .key(String.valueOf(memberNo))
                         .value(tokenDto.getRefreshToken())
                         .build();

                 refreshTokenRepository.save(refreshToken);

                 DriverManager.println("SuccessHandler oAuth2User: " + defaultOAuth2User);
                 //https://dudu-project.netlify.app
                 //http://localhost:3000
                 response.sendRedirect(UriComponentsBuilder.fromUriString("https://dudu-project.netlify.app")
                         .queryParam("bearer", tokenDto.getGrantType())
                         .queryParam("accessToken", tokenDto.getAccessToken())
                         .queryParam("refreshToken", tokenDto.getRefreshToken())
                         .queryParam("expires", tokenDto.getRefreshTokenExpiresIn())
                         .build().encode(StandardCharsets.UTF_8)
                         .toUriString());

             } catch (Exception e) {
                 e.printStackTrace();
             }

         }
    }
}
