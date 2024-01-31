package com.cac.duduproject.web.controller;

import com.cac.duduproject.service.member.MemberAuthService;
import com.cac.duduproject.service.member.MemberSelectService;
import com.cac.duduproject.service.member.MemberUpdateService;
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

    private final MemberAuthService memberAuthService;
    private final MemberUpdateService memberUpdateService;
    private final MemberSelectService memberSelectService;

    @GetMapping("/sendAuthCode")
    public Map<String, Object> sendAuthCode(HttpServletRequest request) {
        return EmailUtil.sendAuthCode(request.getParameter("memberEmail"));
    }

    @PostMapping("/signUp")
    public CommonResponseDto<?> signUp(@RequestBody MemberSignUpRequestDto requestDto) {
        return memberAuthService.signUp(requestDto);
    }

    @PostMapping("/signIn")
    public CommonResponseDto<JwtTokenResponseDto> signIn(@RequestBody MemberSignInRequestDto requestDto) {
        return memberAuthService.signIn(requestDto);
    }

    @GetMapping("/memberIdDuplicationChk")
    public boolean memberIdDuplicationChk(HttpServletRequest request) {
        return memberAuthService.memberIdDuplicationChk(request.getParameter("memberId"));
    }

    @GetMapping("/memberEmailDuplicationChk")
    public boolean memberEmailDuplicationChk(HttpServletRequest request) {
        return memberAuthService.memberEmailDuplicationChk(request.getParameter("memberEmail"));
    }

    @GetMapping("/memberPwDuplicationChk")
    public boolean passwordDuplicationChk(HttpServletRequest request) {
        return memberAuthService.passwordDuplicationChk(request.getParameter("passwordCheck"));
    }

    @PostMapping("/reissue")
    public CommonResponseDto<JwtTokenResponseDto> reissue(@RequestBody JwtTokenRequestDto requestDto, HttpServletRequest request) {
        requestDto.setAccessToken(request.getHeader("Authorization"));
        return memberAuthService.reissue(requestDto);
    }

    @GetMapping("/findMemberInfo")
    public CommonResponseDto<?> findMemberInfo() {
        return memberSelectService.findMemberInfo();
    }

    @PostMapping("/findMemberId")
    public CommonResponseDto<?> findMemberId(@RequestBody MemberSignUpRequestDto requestDto) {
        return memberSelectService.findMemberId(requestDto);
    }

    @PostMapping("/findMemberPw")
    public CommonResponseDto<?> findMemberPw(@RequestBody MemberSignUpRequestDto requestDto) {
        return memberSelectService.findMemberPw(requestDto);
    }

    // 아이디 전체 이메일 전송
    @PostMapping("/entireMemberId")
    public void entireMemberId(@RequestBody MemberSignUpRequestDto requestDto) {
        memberAuthService.entireMemberId(requestDto);
    }

    // 회원 수정
    @PutMapping("/memberInfoUpdate")
    public CommonResponseDto<?> memberInfoUpdate(@RequestBody MemberSignUpRequestDto requestDto) {
        return memberUpdateService.memberInfoUpdate(requestDto);
    }

    // 비밀번호 확인
    @PutMapping("/passwordUpdate")
    public CommonResponseDto<?> passwordUpdate(HttpServletRequest request) {
        return memberUpdateService.passwordUpdate(request);
    }

    // 회원 탈퇴
    @PutMapping("/memberWithdraw")
    public CommonResponseDto<?> memberWithdraw(@RequestBody MemberSignInRequestDto requestDto) {
        return memberUpdateService.memberWithdraw(requestDto);
    }

    // 회원 로그 조회
    @GetMapping("/findAllMemberLog")
    public CommonResponseDto<?> findAllMemberLog(HttpServletRequest request) {
        return memberSelectService.findAllMemberLog(request);
    }

    @GetMapping("/getRole")
    public String getRole() {
        return memberAuthService.getRole();
    }

    @GetMapping("/getMemberNo")
    public Long getMemberNo() { return SecurityUtil.getCurrentMemberNo(); }
}
