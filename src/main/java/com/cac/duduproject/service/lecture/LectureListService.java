package com.cac.duduproject.service.lecture;

import com.cac.duduproject.jpa.domain.lecture.LectureMainCategory;
import com.cac.duduproject.jpa.domain.lecture.LectureSubCategory;
import com.cac.duduproject.jpa.repository.lecture.LectureMainCategoryRepository;
import com.cac.duduproject.jpa.repository.lecture.LectureRepository;
import com.cac.duduproject.jpa.repository.lecture.LectureSubCategoryRepository;
import com.cac.duduproject.web.dto.CommonResponseDto;
import com.cac.duduproject.web.dto.lecture.LectureInstitutionResponseDto;
import com.cac.duduproject.web.dto.lecture.LectureListResponseDto;
import com.cac.duduproject.web.dto.lecture.LectureMainCategoryResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

            LectureMainCategory lectureMainCategory = lectureMainCategoryRepository.findById(mainCategoryNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. ID : " + mainCategoryNo));

            LectureSubCategory lectureSubCategory = lectureSubCategoryRepository.findById(subCategoryNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. ID : " + subCategoryNo));

            if(mainCategoryNo == 0) {
                list = lectureRepository.findAll().stream()
                        .map(LectureListResponseDto::new)
                        .collect(Collectors.toList());
            } else {
                if(subCategoryNo == 0) {
                    list = lectureRepository.findAllByLectureMainCategory(lectureMainCategory).stream()
                            .map(LectureListResponseDto::new)
                            .collect(Collectors.toList());
                } else {
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
}
