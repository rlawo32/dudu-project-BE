package com.cac.duduproject.jpa.repository.lecture;

import com.cac.duduproject.jpa.domain.lecture.Lecture;
import com.cac.duduproject.jpa.domain.lecture.LectureInstitution;
import com.cac.duduproject.web.dto.lecture.LectureListRequestDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface LectureRepositoryCustom {

    Page<Lecture> findBySearch(Long institutionNo, String searchText,
                               Long mainCategoryNo, Long subCategoryNo, String listType,
                               List<LectureListRequestDto.DivisionItemList> searchDivision,
                               List<LectureListRequestDto.StateItemList> searchState,
                               Pageable pageable);
}
