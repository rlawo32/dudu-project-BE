package com.cac.duduproject.web.controller;

import com.cac.duduproject.service.member.MemberService;
import com.cac.duduproject.util.EmailUtil;
import com.cac.duduproject.util.jwt.dto.JwtTokenRequestDto;
import com.cac.duduproject.util.jwt.dto.JwtTokenResponseDto;
import com.cac.duduproject.web.dto.CommonResponseDto;
import com.cac.duduproject.web.dto.member.MemberSignInRequestDto;
import com.cac.duduproject.web.dto.member.MemberSignUpRequestDto;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/sendAuthCode")
    public Map<String, Object> sendAuthCode(HttpServletRequest request) {
        return EmailUtil.sendAuthCode(request.getParameter("memberEmail"));
    }

    @PostMapping("/signUp")
    public CommonResponseDto<?> signUp(@RequestBody MemberSignUpRequestDto requestDto) {
        return memberService.signUp(requestDto);
    }

    @PostMapping("/signIn")
    public CommonResponseDto<JwtTokenResponseDto> signIn(@RequestBody MemberSignInRequestDto requestDto) {
        return memberService.signIn(requestDto);
    }

    @GetMapping("/memberIdDuplicationChk")
    public boolean memberIdDuplicationChk(HttpServletRequest request) {
        return memberService.memberIdDuplicationChk(request.getParameter("memberId"));
    }

    @GetMapping("/memberEmailDuplicationChk")
    public boolean memberEmailDuplicationChk(HttpServletRequest request) {
        return memberService.memberEmailDuplicationChk(request.getParameter("memberEmail"));
    }

    @PostMapping("/reissue")
    public CommonResponseDto<JwtTokenResponseDto> reissue(@RequestBody JwtTokenRequestDto requestDto, HttpServletRequest request) {
        requestDto.setAccessToken(request.getHeader("Authorization"));

        return memberService.reissue(requestDto);
    }

    @GetMapping("/test1")
    public void test1(HttpServletRequest request) {

        Cookie[] ck = request.getCookies();
        for(int i = 0; ck != null && i < ck.length; i++) {
            System.out.println(ck[i].getName() + ": " + ck[i].getValue());
        }

        System.out.println("jwt token test !");
    }
}
