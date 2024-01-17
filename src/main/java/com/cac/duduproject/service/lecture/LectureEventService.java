package com.cac.duduproject.service.lecture;

import com.cac.duduproject.jpa.domain.lecture.Lecture;
import com.cac.duduproject.jpa.domain.lecture.LectureEvent;
import com.cac.duduproject.jpa.domain.lecture.LectureInstitution;
import com.cac.duduproject.jpa.repository.lecture.LectureEventImageRepository;
import com.cac.duduproject.jpa.repository.lecture.LectureEventRepository;
import com.cac.duduproject.jpa.repository.lecture.LectureInstitutionRepository;
import com.cac.duduproject.jpa.repository.lecture.LectureRepository;
import com.cac.duduproject.util.ImageUploadUtil;
import com.cac.duduproject.web.dto.CommonResponseDto;
import com.cac.duduproject.web.dto.lecture.LectureEventListRequestDto;
import com.cac.duduproject.web.dto.lecture.LectureEventListResponseDto;
import com.cac.duduproject.web.dto.lecture.LectureListResponseDto;
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
public class LectureEventService {

    private final LectureRepository lectureRepository;
    private final LectureInstitutionRepository lectureInstitutionRepository;
    private final LectureEventRepository lectureEventRepository;
    private final LectureEventImageRepository lectureEventImageRepository;

    private final ImageUploadUtil imageUploadUtil;

    // lecture_event 테이블에서 event_no에 매핑되는 데이터, 이벤트 페이지 구성에 사용
    @Transactional
    public CommonResponseDto<?> findLectureEventDetail(HttpServletRequest request) {
        LectureEventListResponseDto lectureEventListResponseDto = null;
        try {
            Long lectureEventNo = Long.valueOf(request.getParameter("lectureEventNo"));

            LectureEvent lectureEvent = lectureEventRepository.findById(lectureEventNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. No. : " + lectureEventNo));
            lectureEventListResponseDto = new LectureEventListResponseDto(lectureEvent);
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
        return CommonResponseDto.setSuccess("LectureEvent One", lectureEventListResponseDto);
    }

    // lecture_event 테이블의 모든 데이터, 이벤트 수정 및 삭제에 사용
    @Transactional
    public CommonResponseDto<?> findAllLectureEvent(LectureEventListRequestDto requestDto) {
        try {
            Map<String, Object> result = new HashMap<>();
            int pageNo = requestDto.getPageNo();

            if(pageNo == -1) { // select box
                List<LectureEventListResponseDto> list = lectureEventRepository.findAll().stream()
                        .map(LectureEventListResponseDto::new)
                        .collect(Collectors.toList());
                result.put("eventList", list);
            } else { // list load
                Page<LectureEvent> pageable = lectureEventRepository.findAll(PageRequest.of(pageNo, 10));
                int totalPage = pageable.getTotalPages();

                List<LectureEventListResponseDto> list = pageable.stream()
                        .map(LectureEventListResponseDto::new)
                        .collect(Collectors.toList());
                result.put("eventList", list);
                result.put("totalPage", totalPage);
            }

            return CommonResponseDto.setSuccess("LectureEvent List", result);
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
    }

    // lecture 테이블에서 event_no에 매핑되는 데이터, 이벤트 리스트 출력에 사용
    @Transactional
    public CommonResponseDto<?> findLectureEventList(LectureEventListRequestDto requestDto) {
        try {
            Map<String, Object> result = new HashMap<>();

            int pageNo = requestDto.getPageNo();
            String sortType = requestDto.getSortType();
            Long institutionNo = requestDto.getInstitutionNo();
            Long lectureEventNo = requestDto.getLectureEventNo();

            Sort sort = Sort.by("lecturePeriod").ascending();

            if(sortType.equals("1")) {
                sort = Sort.by("lecturePeriod").ascending();
            } else if(sortType.equals("2")) {
                sort = Sort.by("lectureCapacity").descending();
            } else if(sortType.equals("3")) {
                sort = Sort.by("lectureReception").descending();
            } else if(sortType.equals("4")) {
                sort = Sort.by("lectureFee").ascending();
            } else if(sortType.equals("5")) {
                sort = Sort.by("lectureFee").descending();
            }

            if(lectureEventNo > 0) {
                LectureEvent lectureEvent = lectureEventRepository.findById(lectureEventNo)
                        .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + lectureEventNo));

                Page<Lecture> pageable = lectureRepository.findAllByLectureEvent(lectureEvent, PageRequest.of(0, (20*pageNo), sort));
                Long totalPage = pageable.getTotalElements();

                List<LectureListResponseDto> list = pageable.stream()
                        .map(LectureListResponseDto::new)
                        .collect(Collectors.toList());

                result.put("eventList", list);
                result.put("totalPage", totalPage);

                return CommonResponseDto.setSuccess("LectureEvent Item List", result);
            } else {
                LectureInstitution lectureInstitution = lectureInstitutionRepository.findById(institutionNo)
                        .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + institutionNo));

                List<LectureEventListResponseDto> list = lectureEventRepository.findAllByLectureInstitution(lectureInstitution).stream()
                        .map(LectureEventListResponseDto::new)
                        .collect(Collectors.toList());
                return CommonResponseDto.setSuccess("LectureEvent Swiper List", list);
            }
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
    }

    // lecture 테이블에서 event_no에 매핑되는 데이터, 이벤트 수정 및 삭제에 사용
    @Transactional
    public CommonResponseDto<?> findLectureEventCatalog(HttpServletRequest request) {
        try {
            Long lectureEventNo = Long.valueOf(request.getParameter("lectureEventNo"));

            LectureEvent lectureEvent = lectureEventRepository.findById(lectureEventNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + lectureEventNo));
            Page<Lecture> pageable = lectureRepository.findAllByLectureEvent(lectureEvent, PageRequest.of(0, 30));

            List<LectureListResponseDto> list = pageable.stream()
                    .map(LectureListResponseDto::new)
                    .collect(Collectors.toList());

            return CommonResponseDto.setSuccess("LectureEvent Catalog List", list);
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
    }

    // lecture_event 삭제 시 관련 정보들 삭제
    @Transactional
    public CommonResponseDto<?> lectureEventDelete(HttpServletRequest request) {
        try {
            Long lectureEventNo = Long.valueOf(request.getParameter("lectureEventNo"));

            LectureEvent lectureEvent = lectureEventRepository.findById(lectureEventNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + lectureEventNo));
            lectureRepository.updateByLectureEvent(lectureEvent);

            imageUploadUtil.ImageDeleteS3(request);
            lectureEventImageRepository.deleteByLectureEvent(lectureEvent);
            lectureEventRepository.delete(lectureEvent);
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
        return CommonResponseDto.setSuccess("DELETE SUCCESS!", null);
    }

    // lecture 에서 lecture_event 삭제 
    @Transactional
    public CommonResponseDto<?> lectureEventListDelete(HttpServletRequest request) {
        try {
            Long lectureNo = Long.valueOf(request.getParameter("lectureNo"));

            Lecture lecture = lectureRepository.findById(lectureNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + lectureNo));
            lecture.lectureEventUpdate(null);
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
        return CommonResponseDto.setSuccess("DELETE SUCCESS!", null);
    }
}
