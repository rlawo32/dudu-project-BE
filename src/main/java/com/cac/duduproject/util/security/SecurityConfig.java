package com.cac.duduproject.util.security;


import com.cac.duduproject.jpa.repository.member.MemberLogRepository;
import com.cac.duduproject.jpa.repository.member.MemberRepository;
import com.cac.duduproject.jpa.repository.member.RefreshTokenRepository;
import com.cac.duduproject.util.jwt.JwtAccessDeniedHandler;
import com.cac.duduproject.util.jwt.JwtAuthenticationEntryPoint;
import com.cac.duduproject.util.jwt.JwtSecurityConfig;
import com.cac.duduproject.util.jwt.JwtTokenProvider;
import com.cac.duduproject.util.oauth.CustomOAuth2UserService;
import com.cac.duduproject.util.oauth.MyAuthenticationSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final CorsConfig corsConfig;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private final CustomOAuth2UserService customOAuth2UserService;

    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;
    private final MemberLogRepository memberLogRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .cors()
                .configurationSource(corsConfig.corsConfigurationSource())

                .and()
                .formLogin().disable()
                .csrf().disable() // rest api 사용시 disable / token을 사용하는 방식일 경우 disable
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)

                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) //

                .and()
                .authorizeHttpRequests()// HttpServletRequest를 사용하는 요청들에 대한 접근제한을 설정하겠다.
                .requestMatchers("/member/**").permitAll()
                .requestMatchers("/lecture/lectureList", "/lecture/lectureMainCategoryList",
                        "/lecture/lectureSubCategoryList", "/lecture/lectureInstitutionList",
                        "/lecture/lectureEventList", "/lecture/lectureEventOne", "/lecture/lectureStateList").permitAll()
                .requestMatchers("/favicon.ico").permitAll()
                .anyRequest().authenticated()

                .and()
                .apply(new JwtSecurityConfig(jwtTokenProvider))

                .and()
                .oauth2Login()
                .successHandler(new MyAuthenticationSuccessHandler(jwtTokenProvider, memberRepository, memberLogRepository, refreshTokenRepository))
                .userInfoEndpoint().userService(customOAuth2UserService);

        httpSecurity
                .logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/")
                .deleteCookies("JSESSIONID", "refreshToken");

        return httpSecurity.build();
    }

}
