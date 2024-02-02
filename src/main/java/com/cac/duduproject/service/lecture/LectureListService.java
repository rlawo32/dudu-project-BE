package com.cac.duduproject.service.lecture;

import com.cac.duduproject.jpa.domain.lecture.*;
import com.cac.duduproject.jpa.domain.member.Member;
import com.cac.duduproject.jpa.repository.lecture.*;
import com.cac.duduproject.jpa.repository.member.MemberRepository;
import com.cac.duduproject.util.security.SecurityUtil;
import com.cac.duduproject.web.dto.CommonResponseDto;
import com.cac.duduproject.web.dto.lecture.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class LectureListService {

    private final LectureRepository lectureRepository;
    private final LectureInstitutionRepository lectureInstitutionRepository;
    private final LectureRoomRepository lectureRoomRepository;
    private final LectureMainCategoryRepository lectureMainCategoryRepository;
    private final LectureSubCategoryRepository lectureSubCategoryRepository;
    private final LectureStateRepository lectureStateRepository;
    private final LectureBasketRepository lectureBasketRepository;

    private final MemberRepository memberRepository;

    @Transactional
    public CommonResponseDto<?> findAllLectureInstitution() {
        List<LectureInstitutionResponseDto> list = new ArrayList<>();
        try {
            list = lectureInstitutionRepository.findAll().stream()
                    .map(LectureInstitutionResponseDto::new)
                    .collect(Collectors.toList());
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
        return CommonResponseDto.setSuccess("LectureInstitution List", list);
    }

    @Transactional
    public CommonResponseDto<?> findLectureRoom(HttpServletRequest request) {
        List<LectureRoomResponseDto> list = new ArrayList<>();
        try {
            Long institutionNo = Long.valueOf(request.getParameter("institutionNo"));
            LectureInstitution lectureInstitution = lectureInstitutionRepository.findById(institutionNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + institutionNo));

            list = lectureRoomRepository.findAllByLectureInstitution(lectureInstitution).stream()
                    .map(LectureRoomResponseDto::new)
                    .collect(Collectors.toList());
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
        return CommonResponseDto.setSuccess("LectureRoom List", list);
    }

    @Transactional
    public CommonResponseDto<?> findAllLectureMainCategory() {
        List<LectureMainCategoryResponseDto> list = new ArrayList<>();
        try {
            list = lectureMainCategoryRepository.findAll().stream()
                    .map(LectureMainCategoryResponseDto::new)
                    .collect(Collectors.toList());
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
        return CommonResponseDto.setSuccess("LectureMainCategory List", list);
    }

    @Transactional
    public CommonResponseDto<?> findLectureSubCategory(HttpServletRequest request) {
        List<LectureSubCategoryResponseDto> list = new ArrayList<>();
        try {
            Long mainCategoryNo = Long.valueOf(request.getParameter("mainCategoryNo"));

            if(mainCategoryNo != 0) {
                LectureMainCategory lectureMainCategory = lectureMainCategoryRepository.findById(mainCategoryNo)
                        .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + mainCategoryNo));

                list = lectureSubCategoryRepository.findAllByLectureMainCategory(lectureMainCategory).stream()
                        .map(LectureSubCategoryResponseDto::new)
                        .collect(Collectors.toList());
            } else {
                list = lectureSubCategoryRepository.findAll().stream()
                        .map(LectureSubCategoryResponseDto::new)
                        .collect(Collectors.toList());
            }
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
        return CommonResponseDto.setSuccess("LectureSubCategory List", list);
    }

    @Transactional
    public CommonResponseDto<?> findAllLectureSubCategory() {
        List<LectureSubCategoryResponseDto> list = new ArrayList<>();
        try {
            list = lectureSubCategoryRepository.findAll().stream()
                    .map(LectureSubCategoryResponseDto::new)
                    .collect(Collectors.toList());
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
        return CommonResponseDto.setSuccess("LectureSubCategory List", list);
    }

    @Transactional
    public CommonResponseDto<?> findAllLectureList(LectureListRequestDto requestDto) {
        Map<String, Object> result = new HashMap<>();
        try {
            String listType = requestDto.getListType();
            int pageNo = requestDto.getPageNo();
            String sortType = requestDto.getSortType();
            Long institutionNo = requestDto.getInstitutionNo();
            Long mainCategoryNo = requestDto.getMainCategoryNo();
            Long subCategoryNo = requestDto.getSubCategoryNo();
            String searchText = requestDto.getSearchText();

            List<LectureListRequestDto.DivisionItemList> searchDivision = requestDto.getSearchDivision();
            List<LectureListRequestDto.StateItemList> searchState = requestDto.getSearchState();
            List<LectureListRequestDto.DowItemList> searchDow = requestDto.getSearchDow();
            List<LectureListRequestDto.FeeItemList> searchFee = requestDto.getSearchFee();

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

            Page<Lecture> pageable = null;
            Long totalPage = 0L;
            if(listType.equals("E")) { // event write load
                pageable = lectureRepository.findBySearch(institutionNo, searchText,
                        mainCategoryNo, subCategoryNo, listType,
                        searchDivision, searchState, searchDow, searchFee,
                        PageRequest.of(pageNo, 10, sort));
                totalPage = Long.valueOf(pageable.getTotalPages());
            } else if(listType.equals("A")) { // lecture list all load
                pageable = lectureRepository.findBySearch(institutionNo, searchText,
                        mainCategoryNo, subCategoryNo, listType,
                        searchDivision, searchState, searchDow, searchFee,
                        PageRequest.of(0, (20*pageNo), sort));
                totalPage = pageable.getTotalElements();
            } else if(listType.equals("M")) { // main recent event load
                pageable = lectureRepository.findBySearch(institutionNo, searchText,
                        mainCategoryNo, subCategoryNo, listType,
                        searchDivision, searchState, searchDow, searchFee,
                        PageRequest.of(0, 20, Sort.by("lectureCreatedDate").descending()));
                totalPage = pageable.getTotalElements();
            }

            List<LectureListResponseDto> list = pageable.stream()
                    .map(LectureListResponseDto::new)
                    .collect(Collectors.toList());

            if(SecurityUtil.getCurrentMemberNo() != null) {
                Long memberNo = SecurityUtil.getCurrentMemberNo();
                for(int i=0; i<list.size(); i++) {
                    Long lectureNo = list.get(i).getLectureNo();
                    Lecture lecture = lectureRepository.findById(lectureNo)
                            .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + lectureNo));
                    Member member = memberRepository.findById(memberNo)
                            .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + memberNo));
                    boolean answer = lectureBasketRepository.existsByLectureAndMember(lecture, member);
                    if(answer) {
                        list.get(i).setLectureBasketState("Y");
                    }
                }
            }

            result.put("lectureList", list);
            result.put("totalPage", totalPage);
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
        return CommonResponseDto.setSuccess("Lecture List", result);
    }

    @Transactional
    public CommonResponseDto<?> findAllLectureState() {
        try {
            List<LectureStateResponseDto> list = lectureStateRepository.findAll().stream()
                    .map(LectureStateResponseDto::new)
                    .collect(Collectors.toList());
            return CommonResponseDto.setSuccess("LectureEvent List", list);
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
    }

    @Transactional
    public CommonResponseDto<LectureDetailResponseDto> findLectureDetail(HttpServletRequest request) {
        try {
            Long lectureNo = Long.valueOf(request.getParameter("lectureNo"));
            Lecture lecture = lectureRepository.findById(lectureNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + lectureNo));

            LectureDetailResponseDto lectureDetailResponseDto = new LectureDetailResponseDto(lecture);

            return CommonResponseDto.setSuccess("Lecture Detail", lectureDetailResponseDto);
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
    }

    @Transactional
    public CommonResponseDto<?> findLectureEventType(LectureListRequestDto requestDto) {
        try {
            Map<String, Object> result = new HashMap<>();

            int pageNo = requestDto.getPageNo();
            String eventType = requestDto.getSortType();
            Long mainCategoryNo = requestDto.getMainCategoryNo();
            Long subCategoryNo = requestDto.getSubCategoryNo();

            if(mainCategoryNo == 0 && subCategoryNo == 0) {
                List<LectureListResponseDto> list = lectureRepository.findAllByLectureEventTypeContaining(eventType).stream()
                        .map(LectureListResponseDto::new)
                        .collect(Collectors.toList());

                result.put("eventList", list);
            } else {
                LectureMainCategory lectureMainCategory = lectureMainCategoryRepository.findById(mainCategoryNo)
                        .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + mainCategoryNo));

                LectureSubCategory lectureSubCategory = lectureSubCategoryRepository.findById(subCategoryNo)
                        .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + subCategoryNo));

                Page<Lecture> pageable = lectureRepository.findAllByLectureMainCategoryAndLectureSubCategoryAndLectureEventTypeContaining
                        (lectureMainCategory, lectureSubCategory, eventType, PageRequest.of(pageNo, 10));
                int totalPage = pageable.getTotalPages();

                List<LectureListResponseDto> list = pageable.stream()
                        .map(LectureListResponseDto::new)
                        .collect(Collectors.toList());

                result.put("eventList", list);
                result.put("totalPage", totalPage);
            }

            return CommonResponseDto.setSuccess("LectureEvent Type List", result);
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
    }

    @Transactional
    public CommonResponseDto<?> findEventCategoryList(HttpServletRequest request) {
        List<LectureListResponseDto> list = new ArrayList<>();
        try {
            Long selectCategory = Long.valueOf(request.getParameter("selectCategory"));

            LectureSubCategory lectureSubCategory = lectureSubCategoryRepository.findById(selectCategory)
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + selectCategory));

            list = lectureRepository.findAllByLectureEventTypeContainingAndLectureSubCategory("C", lectureSubCategory).stream()
                    .map(LectureListResponseDto::new)
                    .collect(Collectors.toList());
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
        return CommonResponseDto.setSuccess("LectureEvent CategoryList", list);
    }

    @Transactional
    public CommonResponseDto<?> findLectureBasketList(HttpServletRequest request) {
        try {
            Map<String, Object> result = new HashMap<>();

            Long memberNo = SecurityUtil.getCurrentMemberNo();
            int pageNo = Integer.valueOf(request.getParameter("pageNo"));

            Member member = memberRepository.findById(memberNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + memberNo));
            Page<LectureBasket> pageable = lectureBasketRepository.findByMember(member, PageRequest.of(0, (5*pageNo)));
            Long totalPage = pageable.getTotalElements();

            List<LectureBasketListResponseDto> list = pageable.stream()
                    .map(LectureBasketListResponseDto::new)
                    .collect(Collectors.toList());

            result.put("lectureBasketList", list);
            result.put("totalPage", totalPage);

            return CommonResponseDto.setSuccess("LectureBasket List", result);
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
    }

    @Transactional
    @Scheduled(cron = "0 0 0 * * *")
    public CommonResponseDto<?> schedulerLectureStateUpdate() {
        try {
            LocalDate now = LocalDate.now();
            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy.MM.dd");

            List<Lecture> list = lectureRepository.findAllLectureNoAndLectureReception();

            for(int i=0; i<list.size(); i++) {
                String reception = list.get(i).getLectureReception();
                LocalDate startDate = LocalDate.parse(reception.substring(0, reception.indexOf("~")-1), dtf);
                LocalDate endDate = LocalDate.parse(reception.substring(reception.indexOf("~")+2), dtf);
            }
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
        return CommonResponseDto.setSuccess("LectureInstitution List", null);
    }
}
