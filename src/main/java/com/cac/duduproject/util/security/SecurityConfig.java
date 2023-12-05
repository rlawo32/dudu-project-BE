package com.cac.duduproject.util.security;


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

//                .exceptionHandling()
//                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
//                .accessDeniedHandler(jwtAccessDeniedHandler)
//                .and()

                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) //

                .and()
                .authorizeHttpRequests()// HttpServletRequest를 사용하는 요청들에 대한 접근제한을 설정하겠다.
                .requestMatchers("/member/**").permitAll()
                .requestMatchers("/favicon.ico").permitAll()
                .anyRequest().authenticated();

//                .and()
//                .apply(new JwtSecurityConfig(tokenProvider))

//                .and()
//                .oauth2Login()
//                .successHandler(new MyAuthenticationSuccessHandler(tokenProvider, memberRepository, memberLogRepository, refreshTokenRepository))
//                .userInfoEndpoint().userService(customOAuth2UserService);

        httpSecurity
                .logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/")
                .deleteCookies("JSESSIONID", "refreshToken");
        //.anyRequest().permitAll()
        //.requestMatchers("/api/v1/**").hasRole(Role.USER.name())

//                .and()
//                .logout()
//                .logoutSuccessUrl("/")
//
//
//                //.defaultSuccessUrl("/oauth/loginInfo", true)

        return httpSecurity.build();
    }

}
