package com.cac.duduproject.jpa.repository.lecture;

import com.cac.duduproject.jpa.domain.lecture.LectureApplication;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface LectureApplicationRepositoryCustom {

    Page<LectureApplication> findBySearch(Long memberNo, String searchCategory,
                                          String searchText, String sortType, Pageable pageable);
}
