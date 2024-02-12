package com.cac.duduproject.service.community;

import com.cac.duduproject.jpa.domain.lecture.Lecture;
import com.cac.duduproject.jpa.domain.member.Member;
import com.cac.duduproject.jpa.repository.community.ReviewRepository;
import com.cac.duduproject.jpa.repository.lecture.LectureRepository;
import com.cac.duduproject.jpa.repository.member.MemberRepository;
import com.cac.duduproject.util.security.SecurityUtil;
import com.cac.duduproject.web.dto.CommonResponseDto;
import com.cac.duduproject.web.dto.community.ReviewWriteRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class ReviewWriteService {

    private final ReviewRepository reviewRepository;
    private final LectureRepository lectureRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public CommonResponseDto<?> reviewWrite(ReviewWriteRequestDto requestDto) {
        try {
            Long lectureNo = requestDto.getLectureNo();
            Lecture lecture = lectureRepository.findById(lectureNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + lectureNo));
            Member member = memberRepository.findById(SecurityUtil.getCurrentMemberNo())
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + SecurityUtil.getCurrentMemberNo()));
            requestDto.setReviewAuthor(member.getMemberName());
            requestDto.setLecture(lecture);
            requestDto.setMember(member);
            requestDto.setLectureInstitution(lecture.getLectureInstitution());

            reviewRepository.save(requestDto.toReview());
        } catch (Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
        return CommonResponseDto.setSuccess("Board Write Success", null);
    }
}
