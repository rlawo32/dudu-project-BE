package com.cac.duduproject.service.lecture;

import com.cac.duduproject.jpa.domain.lecture.*;
import com.cac.duduproject.jpa.repository.lecture.*;
import com.cac.duduproject.web.dto.CommonResponseDto;
import com.cac.duduproject.web.dto.lecture.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
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
    private final LectureStateRepository lectureStateRepository;

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
        List<LectureListResponseDto> list = new ArrayList<>();
        try {
            Long institutionNo = requestDto.getInstitutionNo();
            Long mainCategoryNo = requestDto.getMainCategoryNo();
            Long subCategoryNo = requestDto.getSubCategoryNo();
            String searchText = requestDto.getSearchText();

            String searchDivision = "";
            if(requestDto.getSearchDivision().size() > 0) {
                searchDivision = requestDto.getSearchDivision().get(0).getDvItem();
            }
            Long searchState = requestDto.getSearchState();

            System.out.println(searchText);
            System.out.println(searchDivision);
            System.out.println(searchState);

            LectureInstitution lectureInstitution = lectureInstitutionRepository.findById(institutionNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + institutionNo));

            if(mainCategoryNo < 1 && searchState < 1) { // Main=0 State=0 Sub=0
                list.addAll(lectureRepository.findAllBySearch(lectureInstitution, searchText, searchDivision).stream()
                        .map(LectureListResponseDto::new)
                        .collect(Collectors.toList()));
            } else {
                if(mainCategoryNo > 0 && searchState > 0) {
                    LectureMainCategory lectureMainCategory = lectureMainCategoryRepository.findById(mainCategoryNo)
                            .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + mainCategoryNo));
                    LectureState lectureState = lectureStateRepository.findById(searchState)
                            .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + searchState));

                    if(subCategoryNo < 1) { // Main=1 State=1 Sub=0
                        list.addAll(lectureRepository.findAllByMainCategoryAndLectureStateSearch
                                        (lectureInstitution, lectureMainCategory, lectureState, searchText, searchDivision).stream()
                                .map(LectureListResponseDto::new)
                                .collect(Collectors.toList()));
                    } else { // Main=1 State=1 Sub=1
                        LectureSubCategory lectureSubCategory = lectureSubCategoryRepository.findById(subCategoryNo)
                                .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + subCategoryNo));

                        list = lectureRepository.findAllByMainCategoryAndLectureStateAndSubCategorySearch
                                        (lectureInstitution, lectureMainCategory, lectureState, lectureSubCategory, searchText, searchDivision).stream()
                                .map(LectureListResponseDto::new)
                                .collect(Collectors.toList());
                    }
                } else if(mainCategoryNo > 0) {
                    LectureMainCategory lectureMainCategory = lectureMainCategoryRepository.findById(mainCategoryNo)
                            .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + mainCategoryNo));

                    if(subCategoryNo < 1) { // Main=1 State=0 Sub=0
                        list = lectureRepository.findAllByMainCategorySearch
                                        (lectureInstitution, lectureMainCategory, searchText, searchDivision).stream()
                                .map(LectureListResponseDto::new)
                                .collect(Collectors.toList());
                    } else { // Main=1 State=0 Sub=1
                        LectureSubCategory lectureSubCategory = lectureSubCategoryRepository.findById(subCategoryNo)
                                .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + subCategoryNo));

                        list = lectureRepository.findAllByMainCategoryAndSubCategorySearch
                                        (lectureInstitution, lectureMainCategory, lectureSubCategory, searchText, searchDivision).stream()
                                .map(LectureListResponseDto::new)
                                .collect(Collectors.toList());
                    }
                } else if(searchState > 0) { // Main=0 State=1 Sub=0
                    LectureState lectureState = lectureStateRepository.findById(searchState)
                            .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + searchState));

                    list = lectureRepository.findAllByLectureStateSearch
                                    (lectureInstitution, lectureState, searchText, searchDivision).stream()
                            .map(LectureListResponseDto::new)
                            .collect(Collectors.toList());
                }
            }
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
        return CommonResponseDto.setSuccess("LectureInstitution List", list);
    }

    @Transactional
    public CommonResponseDto<?> findLectureEvent(HttpServletRequest request) {
        LectureEventResponseDto lectureEventResponseDto = null;
        try {
            Long lectureEventNo = Long.valueOf(request.getParameter("lectureEventNo"));

            LectureEvent lectureEvent = lectureEventRepository.findById(lectureEventNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. No. : " + lectureEventNo));

            lectureEventResponseDto = new LectureEventResponseDto(lectureEvent);
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
        return CommonResponseDto.setSuccess("LectureEvent List", lectureEventResponseDto);
    }

    @Transactional
    public CommonResponseDto<?> findAllLectureEvent(HttpServletRequest request) {

        try {
            Long institutionNo = Long.valueOf(request.getParameter("institutionNo"));
            Long lectureEventNo = Long.valueOf(request.getParameter("lectureEventNo"));

            if(lectureEventNo > 0) {
                LectureEvent lectureEvent = lectureEventRepository.findById(lectureEventNo)
                        .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + lectureEventNo));

                List<LectureListResponseDto> list = lectureRepository.findAllByLectureEvent(lectureEvent).stream()
                        .map(LectureListResponseDto::new)
                        .collect(Collectors.toList());
                return CommonResponseDto.setSuccess("LectureEvent List", list);
            } else {
                LectureInstitution lectureInstitution = lectureInstitutionRepository.findById(institutionNo)
                        .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + institutionNo));

                List<LectureEventResponseDto> list = lectureEventRepository.findAllByLectureInstitution(lectureInstitution).stream()
                        .map(LectureEventResponseDto::new)
                        .collect(Collectors.toList());
                return CommonResponseDto.setSuccess("LectureEvent List", list);
            }
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
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
