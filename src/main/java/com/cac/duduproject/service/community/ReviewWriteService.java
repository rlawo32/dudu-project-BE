package com.cac.duduproject.service.community;

import com.cac.duduproject.jpa.domain.community.Review;
import com.cac.duduproject.jpa.domain.lecture.Lecture;
import com.cac.duduproject.jpa.domain.lecture.LectureApplication;
import com.cac.duduproject.jpa.domain.member.Member;
import com.cac.duduproject.jpa.repository.community.ReviewRepository;
import com.cac.duduproject.jpa.repository.lecture.LectureApplicationRepository;
import com.cac.duduproject.jpa.repository.lecture.LectureRepository;
import com.cac.duduproject.jpa.repository.member.MemberRepository;
import com.cac.duduproject.util.security.SecurityUtil;
import com.cac.duduproject.web.dto.CommonResponseDto;
import com.cac.duduproject.web.dto.community.ReviewWriteRequestDto;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class ReviewWriteService {

    private final ReviewRepository reviewRepository;
    private final LectureRepository lectureRepository;
    private final LectureApplicationRepository lectureApplicationRepository;
    private final MemberRepository memberRepository;

    private final ReviewImageService reviewImageService;

    @Transactional
    public CommonResponseDto<?> reviewWrite(ReviewWriteRequestDto requestDto) {
        try {
            Long lectureNo = requestDto.getLectureNo();
            Long lectureApplicationNo = requestDto.getLectureApplicationNo();
            Lecture lecture = lectureRepository.findById(lectureNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + lectureNo));
            LectureApplication lectureApplication = lectureApplicationRepository.findById(lectureApplicationNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + lectureApplicationNo));
            Member member = memberRepository.findById(SecurityUtil.getCurrentMemberNo())
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + SecurityUtil.getCurrentMemberNo()));
            requestDto.setReviewAuthor(member.getMemberName());
            requestDto.setLecture(lecture);
            requestDto.setLectureApplication(lectureApplication);
            requestDto.setMember(member);
            requestDto.setLectureInstitution(lecture.getLectureInstitution());

            Long reviewNo = reviewRepository.save(requestDto.toReview()).getReviewNo();

            reviewImageService.reviewImageInsert(reviewNo, requestDto.getReviewImage());
            lectureApplication.lectureApplicationReview();
        } catch (Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
        return CommonResponseDto.setSuccess("Board Write Success", null);
    }

    @Transactional
    public CommonResponseDto<?> reviewViewsUp(HttpServletRequest request) {
        try {
            Long reviewNo = Long.valueOf(request.getParameter("reviewNo"));

            Review review = reviewRepository.findById(reviewNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + reviewNo));
            review.reviewViewsUpdate();
        } catch (Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
        return CommonResponseDto.setSuccess("Review Views Update Success", null);
    }
}
