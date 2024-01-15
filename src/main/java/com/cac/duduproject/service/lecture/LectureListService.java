package com.cac.duduproject.service.lecture;

import com.cac.duduproject.jpa.domain.lecture.Lecture;
import com.cac.duduproject.jpa.domain.lecture.LectureEvent;
import com.cac.duduproject.jpa.domain.lecture.LectureInstitution;
import com.cac.duduproject.jpa.domain.lecture.LectureMainCategory;
import com.cac.duduproject.jpa.repository.lecture.*;
import com.cac.duduproject.util.ImageUploadUtil;
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
    private final LectureEventRepository lectureEventRepository;
    private final LectureEventImageRepository lectureEventImageRepository;
    private final LectureStateRepository lectureStateRepository;

    private final ImageUploadUtil imageUploadUtil;

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
    public CommonResponseDto<?> findAllLectureRoom(HttpServletRequest request) {
        List<LectureRoomResponseDto> list = new ArrayList<>();
        try {
            Long institutionNo = Long.valueOf(request.getParameter("institutionNo"));
            LectureInstitution lectureInstitution = lectureInstitutionRepository.findById(institutionNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. ID : " + institutionNo));

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
    public CommonResponseDto<?> findAllLectureSubCategory(HttpServletRequest request) {
        List<LectureSubCategoryResponseDto> list = new ArrayList<>();
        try {
            Long mainCategoryNo = Long.valueOf(request.getParameter("mainCategoryNo"));
            LectureMainCategory lectureMainCategory = lectureMainCategoryRepository.findById(mainCategoryNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. ID : " + mainCategoryNo));

            list = lectureSubCategoryRepository.findAllByLectureMainCategory(lectureMainCategory).stream()
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

            LectureInstitution lectureInstitution = lectureInstitutionRepository.findById(institutionNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + institutionNo));

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
            if(listType.equals("E")) {
                pageable = lectureRepository.findBySearch(lectureInstitution, searchText,
                        mainCategoryNo, subCategoryNo, listType,
                        searchDivision, searchState,
                        PageRequest.of(pageNo, (10), sort));
                totalPage = Long.valueOf(pageable.getTotalPages());
            } else if(listType.equals("L")) {
                pageable = lectureRepository.findBySearch(lectureInstitution, searchText,
                        mainCategoryNo, subCategoryNo, listType,
                        searchDivision, searchState,
                        PageRequest.of(0, (20*pageNo), sort));
                totalPage = pageable.getTotalElements();
            }

            List<LectureListResponseDto> list = pageable.stream()
                    .map(LectureListResponseDto::new)
                    .collect(Collectors.toList());

            result.put("lectureList", list);
            result.put("totalPage", totalPage);

        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
        return CommonResponseDto.setSuccess("Lecture List", result);
    }

    @Transactional
    public CommonResponseDto<?> findLectureEvent(HttpServletRequest request) {
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

    @Transactional
    public CommonResponseDto<?> findAllLectureEvent(LectureEventListRequestDto requestDto) {
        try {
            Map<String, Object> result = new HashMap<>();
            int pageNo = requestDto.getPageNo();
            String sortType = requestDto.getSortType();
            Long institutionNo = requestDto.getInstitutionNo();
            Long lectureEventNo = requestDto.getLectureEventNo();

            Page<LectureEvent> pageable = lectureEventRepository.findAll(PageRequest.of(pageNo, 10));
            int totalPage = pageable.getTotalPages();

            List<LectureEventListResponseDto> list = pageable.stream()
                    .map(LectureEventListResponseDto::new)
                    .collect(Collectors.toList());
            result.put("eventList", list);
            result.put("totalPage", totalPage);

            return CommonResponseDto.setSuccess("LectureEvent List", result);
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
    }

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

            return CommonResponseDto.setSuccess("LectureEvent List", lectureDetailResponseDto);
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
