package com.cac.duduproject.service.community;

import com.cac.duduproject.jpa.domain.community.Review;
import com.cac.duduproject.jpa.domain.member.Member;
import com.cac.duduproject.jpa.repository.community.ReviewRepository;
import com.cac.duduproject.jpa.repository.member.MemberRepository;
import com.cac.duduproject.util.security.SecurityUtil;
import com.cac.duduproject.web.dto.CommonResponseDto;
import com.cac.duduproject.web.dto.community.ReviewDetailResponseDto;
import com.cac.duduproject.web.dto.community.ReviewListRequestDto;
import com.cac.duduproject.web.dto.community.ReviewListResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ReviewListService {

    private final ReviewRepository reviewRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public CommonResponseDto<?> findAllReviewList(ReviewListRequestDto requestDto) {
        Map<String, Object> result = new HashMap<>();
        try {
            int pageNo = requestDto.getPageNo();
            String sortType= requestDto.getSortType();
            Long institutionNo = requestDto.getInstitutionNo();
            String searchText = requestDto.getSearchText();

            Sort sort = Sort.by("reviewCreatedDate").descending();

            if(sortType.equals("1")) { // 최신순
                sort = Sort.by("reviewCreatedDate").descending();
            } else if(sortType.equals("2")) { // 오래된순
                sort = Sort.by("reviewCreatedDate").ascending();
            } else if(sortType.equals("3")) { // 점수높은순
                sort = Sort.by("reviewScore").descending();
            } else if(sortType.equals("4")) { // 점수낮은순
                sort = Sort.by("reviewScore").ascending();
            }

            Page<Review> pageable = reviewRepository.findBySearch(institutionNo, searchText,
                    PageRequest.of(0, (10*pageNo), sort));
            Long totalPage = Long.valueOf(pageable.getTotalElements());

            List<ReviewListResponseDto> list = pageable.stream()
                    .map(ReviewListResponseDto::new)
                    .collect(Collectors.toList());

            result.put("reviewList", list);
            result.put("totalPage", totalPage);
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
        return CommonResponseDto.setSuccess("Review List", result);
    }

    @Transactional
    public CommonResponseDto<ReviewDetailResponseDto> findReviewDetail(HttpServletRequest request) {
        try {
            Long reviewNo = Long.valueOf(request.getParameter("reviewNo"));
            Review review = reviewRepository.findById(reviewNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + reviewNo));

            ReviewDetailResponseDto reviewDetailResponseDto = new ReviewDetailResponseDto(review);

            return CommonResponseDto.setSuccess("Review Detail", reviewDetailResponseDto);
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
    }
}
