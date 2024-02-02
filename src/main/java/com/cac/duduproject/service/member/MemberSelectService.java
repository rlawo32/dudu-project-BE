package com.cac.duduproject.service.member;

import com.cac.duduproject.jpa.domain.member.Member;
import com.cac.duduproject.jpa.domain.member.MemberLog;
import com.cac.duduproject.jpa.repository.member.MemberLogRepository;
import com.cac.duduproject.jpa.repository.member.MemberRepository;
import com.cac.duduproject.util.Role;
import com.cac.duduproject.util.security.SecurityUtil;
import com.cac.duduproject.web.dto.CommonResponseDto;
import com.cac.duduproject.web.dto.member.MemberInfoResponseDto;
import com.cac.duduproject.web.dto.member.MemberListResponseDto;
import com.cac.duduproject.web.dto.member.MemberLogResponseDto;
import com.cac.duduproject.web.dto.member.MemberSignUpRequestDto;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MemberSelectService {

    private final MemberRepository memberRepository;
    private final MemberLogRepository memberLogRepository;

    private final PasswordEncoder passwordEncoder;

    @Transactional
    public CommonResponseDto<?> findMemberId(MemberSignUpRequestDto requestDto) {
        try {
            Member member = memberRepository.findByMemberNameAndMemberEmail(requestDto.getMemberName(), requestDto.getMemberEmail())
                    .orElseThrow(() -> new IllegalArgumentException("해당 사용자 정보가 없습니다."));

            String memberId = member.getMemberId();
            return CommonResponseDto.setSuccess("Find MemberId Success", memberId);
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!!!");
        }
    }

    @Transactional
    public CommonResponseDto<?> findMemberPw(MemberSignUpRequestDto requestDto) {
        try {
            Member member = memberRepository.findByMemberEmail(requestDto.getMemberEmail())
                    .orElseThrow(() -> new IllegalArgumentException("해당 사용자 정보가 없습니다."));

            member.passwordUpdate(passwordEncoder.encode(requestDto.getMemberPw()));
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!!!");
        }
        
        return CommonResponseDto.setSuccess("Find MemberPw Success", null);
    }

    @Transactional
    public CommonResponseDto<?> findMemberInfo() {
        try {
            Member member = memberRepository.findById(SecurityUtil.getCurrentMemberNo())
                    .orElseThrow(() -> new IllegalArgumentException("해당 사용자 정보가 없습니다."));

            MemberInfoResponseDto memberInfoResponseDto = new MemberInfoResponseDto(member);
            return CommonResponseDto.setSuccess("Find MemberInfo Success", memberInfoResponseDto);
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!!!");
        }
    }

    // 모든 회원 조회
    @Transactional
    public CommonResponseDto<?> findAllMemberList(HttpServletRequest request) {
        List<MemberListResponseDto> list = new ArrayList<>();
        try {
            if(request.getParameter("role").equals("A")) {
                list = memberRepository.findByRole(Role.ADMIN).stream()
                        .map(MemberListResponseDto::new)
                        .collect(Collectors.toList());
            } else if(request.getParameter("role").equals("M")) {
                list = memberRepository.findByRole(Role.MEMBER).stream()
                        .map(MemberListResponseDto::new)
                        .collect(Collectors.toList());
            }
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!!!");
        }
        return CommonResponseDto.setSuccess("Find MemberList List", list);
    }

    @Transactional
    public CommonResponseDto<?> findAllMemberLog(HttpServletRequest request) {
        try {
            Long memberNo = SecurityUtil.getCurrentMemberNo();
            int pageNo = Integer.parseInt(request.getParameter("pageNo"));
            String sortType = request.getParameter("sortType");

            Page<MemberLog> pageable = null;
            if(sortType.equals("N")) {
                pageable = memberLogRepository.findByAllMemberLog(memberNo,
                        PageRequest.of(0, (10*pageNo), Sort.by("memberLogDate").descending()));
            } else {
                pageable = memberLogRepository.findByAllMemberLog(memberNo,
                        PageRequest.of(0, (10*pageNo), Sort.by("memberLogDate").ascending()));
            }
            Long totalPage = pageable.getTotalElements();

            List<MemberLogResponseDto> loginLogList = pageable.stream()
                    .map(MemberLogResponseDto::new)
                    .collect(Collectors.toList());

            Map<String, Object> result = new HashMap<>();
            result.put("loginLogList", loginLogList);
            result.put("totalPage", totalPage);

            return CommonResponseDto.setSuccess("Find MemberLog List", result);
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!!!");
        }
    }
}
