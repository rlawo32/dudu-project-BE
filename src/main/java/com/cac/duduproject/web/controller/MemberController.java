package com.cac.duduproject.web.controller;

import com.cac.duduproject.service.member.MemberService;
import com.cac.duduproject.util.EmailUtil;
import com.cac.duduproject.util.jwt.dto.JwtTokenRequestDto;
import com.cac.duduproject.util.jwt.dto.JwtTokenResponseDto;
import com.cac.duduproject.util.security.SecurityUtil;
import com.cac.duduproject.web.dto.CommonResponseDto;
import com.cac.duduproject.web.dto.member.MemberSignInRequestDto;
import com.cac.duduproject.web.dto.member.MemberSignUpRequestDto;
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

    @GetMapping("/memberPwDuplicationChk")
    public boolean passwordDuplicationChk(HttpServletRequest request) {
        return memberService.passwordDuplicationChk(request.getParameter("passwordCheck"));
    }

    @PostMapping("/reissue")
    public CommonResponseDto<JwtTokenResponseDto> reissue(@RequestBody JwtTokenRequestDto requestDto, HttpServletRequest request) {
        requestDto.setAccessToken(request.getHeader("Authorization"));
        return memberService.reissue(requestDto);
    }

    @GetMapping("/findMemberInfo")
    public CommonResponseDto<?> findMemberInfo() {
        return memberService.findMemberInfo();
    }

    @PostMapping("/findMemberId")
    public CommonResponseDto<?> findMemberId(@RequestBody MemberSignUpRequestDto requestDto) {
        return memberService.findMemberId(requestDto);
    }

    // 아이디 전체 이메일 전송
    @PostMapping("/entireMemberId")
    public void entireMemberId(@RequestBody MemberSignUpRequestDto requestDto) {
        memberService.entireMemberId(requestDto);
    }

    @PostMapping("/findMemberPw")
    public CommonResponseDto<?> findMemberPw(@RequestBody MemberSignUpRequestDto requestDto) {
        return memberService.findMemberPw(requestDto);
    }

    // 회원 수정
    @PutMapping("/memberInfoUpdate")
    public CommonResponseDto<?> memberInfoUpdate(@RequestBody MemberSignUpRequestDto requestDto) {
        return memberService.memberInfoUpdate(requestDto);
    }

    // 비밀번호 확인
    @PutMapping("/passwordUpdate")
    public CommonResponseDto<?> passwordUpdate(HttpServletRequest request) {
        return memberService.passwordUpdate(request);
    }

    // 회원 탈퇴
    @PutMapping("/memberWithdraw")
    public CommonResponseDto<?> memberWithdraw(@RequestBody MemberSignInRequestDto requestDto) {
        return memberService.memberWithdraw(requestDto);
    }

    @GetMapping("/getRole")
    public String getRole() {
        return memberService.getRole();
    }

    @GetMapping("/getMemberNo")
    public Long getMemberNo() { return SecurityUtil.getCurrentMemberNo(); }
}
