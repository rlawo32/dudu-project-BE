package com.cac.duduproject.service.lecture;

import com.cac.duduproject.jpa.domain.lecture.*;
import com.cac.duduproject.jpa.domain.member.Member;
import com.cac.duduproject.jpa.repository.lecture.*;
import com.cac.duduproject.jpa.repository.member.MemberRepository;
import com.cac.duduproject.util.security.SecurityUtil;
import com.cac.duduproject.web.dto.CommonResponseDto;
import com.cac.duduproject.web.dto.lecture.LectureApplicationRequestDto;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class LectureApplicationService {

    private final MemberRepository memberRepository;
    private final LectureRepository lectureRepository;
    private final LectureApplicationRepository lectureApplicationRepository;

    @Transactional
    public CommonResponseDto<?> lectureApplicationWrite(LectureApplicationRequestDto requestDto) {
        try {
            Long lectureNo = Long.valueOf(requestDto.getOrderId().substring(requestDto.getOrderId().indexOf("_")+1));
            Lecture lecture = lectureRepository.findById(lectureNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 강의가 없습니다. No. : " + lectureNo));

            System.out.println(SecurityUtil.getCurrentMemberNo());

            Long memberNo = SecurityUtil.getCurrentMemberNo();
            Member member = memberRepository.findById(memberNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. No. : " + memberNo));

            requestDto.setLecture(lecture);
            requestDto.setMember(member);

            lectureApplicationRepository.save(requestDto.toLectureApplication());
        } catch (Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
        return CommonResponseDto.setSuccess("Lecture Application Write Success", null);
    }
}
