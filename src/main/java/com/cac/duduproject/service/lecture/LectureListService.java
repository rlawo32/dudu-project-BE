package com.cac.duduproject.service.lecture;

import com.cac.duduproject.jpa.domain.lecture.Lecture;
import com.cac.duduproject.jpa.domain.lecture.LectureMainCategory;
import com.cac.duduproject.jpa.domain.lecture.LectureSubCategory;
import com.cac.duduproject.jpa.domain.member.Member;
import com.cac.duduproject.jpa.repository.lecture.LectureMainCategoryRepository;
import com.cac.duduproject.jpa.repository.lecture.LectureRepository;
import com.cac.duduproject.jpa.repository.lecture.LectureSubCategoryRepository;
import com.cac.duduproject.web.dto.CommonResponseDto;
import com.cac.duduproject.web.dto.lecture.LectureInstitutionResponseDto;
import com.cac.duduproject.web.dto.lecture.LectureListResponseDto;
import com.cac.duduproject.web.dto.lecture.LectureMainCategoryResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class LectureListService {

    private final LectureRepository lectureRepository;
    private final LectureMainCategoryRepository lectureMainCategoryRepository;
    private final LectureSubCategoryRepository lectureSubCategoryRepository;

    @Transactional
    public CommonResponseDto<?> findAllLectureList(HttpServletRequest request) {
        List<LectureListResponseDto> list = new ArrayList<>();
        try {
            Long mainCategoryNo = Long.valueOf(request.getParameter("mainCategoryNo"));
            Long subCategoryNo = Long.valueOf(request.getParameter("subCategoryNo"));

            System.out.println("메인 : " + mainCategoryNo);
            System.out.println("서브 : " + subCategoryNo);

            List<Lecture> lecture = lectureRepository.findAll();

            if(mainCategoryNo < 1) {
                list = lectureRepository.findAll().stream()
                        .map(LectureListResponseDto::new)
                        .collect(Collectors.toList());
            } else {
                LectureMainCategory lectureMainCategory = lectureMainCategoryRepository.findById(mainCategoryNo)
                        .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. ID : " + mainCategoryNo));

                if(subCategoryNo < 1) {
                    list = lectureRepository.findAllByLectureMainCategory(lectureMainCategory).stream()
                            .map(LectureListResponseDto::new)
                            .collect(Collectors.toList());
                } else {
                    LectureSubCategory lectureSubCategory = lectureSubCategoryRepository.findById(subCategoryNo)
                            .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. ID : " + subCategoryNo));

                    list = lectureRepository.findAllByLectureMainCategoryAndLectureSubCategory(lectureMainCategory, lectureSubCategory).stream()
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
    @Scheduled(cron = "0 0 0 * * *")
    public CommonResponseDto<?> schedulerLectureStateUpdate() {
        try {
            LocalDate now = LocalDate.now();
            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy.MM.dd");

            List<Lecture> list = lectureRepository.findAllLectureNo();

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
