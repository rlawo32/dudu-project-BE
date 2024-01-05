package com.cac.duduproject.jpa.repository.lecture;

import com.cac.duduproject.jpa.domain.lecture.Lecture;
import com.cac.duduproject.jpa.domain.lecture.LectureInstitution;
import com.cac.duduproject.web.dto.lecture.LectureListRequestDto;

import java.util.List;

public interface LectureRepositoryCustom {

    List<Lecture> findBySearch(LectureInstitution lectureInstitution, String searchText, List<LectureListRequestDto.DivisionItemList> searchDivision);
}
