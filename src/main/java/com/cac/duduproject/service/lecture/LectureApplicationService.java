package com.cac.duduproject.service.lecture;

import com.cac.duduproject.jpa.domain.lecture.Lecture;
import com.cac.duduproject.jpa.domain.lecture.LectureApplication;
import com.cac.duduproject.jpa.domain.lecture.LectureBasket;
import com.cac.duduproject.jpa.domain.lecture.LectureState;
import com.cac.duduproject.jpa.domain.member.Member;
import com.cac.duduproject.jpa.repository.lecture.LectureApplicationRepository;
import com.cac.duduproject.jpa.repository.lecture.LectureBasketRepository;
import com.cac.duduproject.jpa.repository.lecture.LectureRepository;
import com.cac.duduproject.jpa.repository.lecture.LectureStateRepository;
import com.cac.duduproject.jpa.repository.member.MemberRepository;
import com.cac.duduproject.util.security.SecurityUtil;
import com.cac.duduproject.web.dto.CommonResponseDto;
import com.cac.duduproject.web.dto.lecture.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class LectureApplicationService {

    private final MemberRepository memberRepository;
    private final LectureRepository lectureRepository;
    private final LectureStateRepository lectureStateRepository;
    private final LectureApplicationRepository lectureApplicationRepository;
    private final LectureBasketRepository lectureBasketRepository;

    @Transactional
    public CommonResponseDto<?> lectureApplicationWrite(LectureApplicationWriteRequestDto requestDto) {
        try {
            Long memberNo = SecurityUtil.getCurrentMemberNo();
            Member member = memberRepository.findById(memberNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. No. : " + memberNo));
            requestDto.setMember(member);

            String[] lectureNoArr = requestDto.getOrderId().split("_");
            List<Lecture> entityList = new ArrayList<>();
            for(int i=1; i<lectureNoArr.length; i++) {
                Long lectureNo = Long.valueOf(lectureNoArr[i]);
                Lecture lecture = lectureRepository.findById(lectureNo)
                        .orElseThrow(() -> new IllegalArgumentException("해당 강의가 없습니다. No. : " + lectureNo));

                requestDto.setLecture(lecture);
                requestDto.setAmount(lecture.getLectureFee());

                if(lecture.getLectureCapacity() > lecture.getLectureCurrentPerson()) {
                    lectureApplicationRepository.save(requestDto.toLectureApplication());
                    lecture.lectureCurrentPersonUpdate("U");
                    if(lecture.getLectureCapacity() == lecture.getLectureCurrentPerson()) {
                        LectureState lectureState = lectureStateRepository.findById(3L)
                                .orElseThrow(() -> new IllegalArgumentException("해당 상태가 없습니다."));
                        lecture.lectureStateUpdate(lectureState);
                    }
                    entityList.add(lecture);
                    if(lectureBasketRepository.existsByLectureAndMember(lecture, member)) {
                        LectureBasket lectureBasket = lectureBasketRepository.findByLectureAndMember(lecture, member)
                                .orElseThrow(() -> new IllegalArgumentException("해당 데이터가 없습니다."));
                        lectureBasketRepository.delete(lectureBasket);
                    }
                } else {
                    return CommonResponseDto.setFailed("Lecture Capacity Over !!");
                }
            }
            List<LectureListResponseDto> list = entityList.stream()
                    .map(LectureListResponseDto::new)
                    .collect(Collectors.toList());
            return CommonResponseDto.setSuccess("Lecture Application Write Success", list);
        } catch (Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
    }

    @Transactional
    public CommonResponseDto<?> findAllLectureApplicationList(LectureApplicationListRequestDto requestDto) {
        try {
            Map<String, Object> result = new HashMap<>();

            Long memberNo = SecurityUtil.getCurrentMemberNo();
            int pageNo = requestDto.getPageNo();
            String searchCategory = requestDto.getSearchCategory();
            String sortType = requestDto.getSortType();
            String searchText = requestDto.getSearchText();

            Page<LectureApplication> pageable = lectureApplicationRepository.findBySearch(memberNo, searchCategory, searchText,
                    sortType, PageRequest.of(0, (2*pageNo), Sort.by("lectureApplicationCreatedDate").descending()));
            Long totalPage = pageable.getTotalElements();

            List<LectureApplicationListResponseDto> list = pageable.stream()
                    .map(LectureApplicationListResponseDto::new)
                    .collect(Collectors.toList());

            result.put("applicationList", list);
            result.put("totalPage", totalPage);
            return CommonResponseDto.setSuccess("LectureApplication List", result);
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
    }

    @Transactional
    public boolean lectureApplicationDuplicationChk(Long lectureNo) {
        Long memberNo = SecurityUtil.getCurrentMemberNo();
        Member member = memberRepository.findById(memberNo)
            .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. No. : " + memberNo));
        Lecture lecture = lectureRepository.findById(lectureNo)
                .orElseThrow(() -> new IllegalArgumentException("해당 강의가 없습니다. No. : " + lectureNo));

        return lectureApplicationRepository.existsByLectureAndMemberAndLectureApplicationCancelYn(lecture, member, "N");
    }

    @Transactional
    public CommonResponseDto<?> updateLectureApplicationCancel(LectureApplicationCancelRequestDto requestDto) {
        try {
            LectureApplication lectureApplication = lectureApplicationRepository.findById(requestDto.getLectureApplicationNo())
                    .orElseThrow(() -> new IllegalArgumentException("해당 강의가 없습니다. No. : " + requestDto.getLectureApplicationNo()));
            lectureApplication.lectureApplicationCancel(requestDto.getLectureApplicationCancelDesc());

            Long lectureNo = lectureApplication.getLecture().getLectureNo();
            Lecture lecture = lectureRepository.findById(lectureNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 강의가 없습니다. No. : " + lectureNo));
            lecture.lectureCurrentPersonUpdate("D");

            if(lecture.getLectureCapacity() > lecture.getLectureCurrentPerson()) {
                LectureState lectureState = lectureStateRepository.findById(2L)
                        .orElseThrow(() -> new IllegalArgumentException("해당 상태가 없습니다."));
                lecture.lectureStateUpdate(lectureState);
            }
            return CommonResponseDto.setSuccess("LectureApplication Cancel Success", null);
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
    }
}
