package com.cac.duduproject.jpa.repository.lecture;

import com.cac.duduproject.jpa.domain.lecture.*;
import com.cac.duduproject.web.dto.lecture.LectureListRequestDto;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.List;

import static com.cac.duduproject.jpa.domain.lecture.QLecture.lecture;

public class LectureRepositoryImpl extends QuerydslRepositorySupport implements LectureRepositoryCustom {

    @Autowired
    private JPAQueryFactory queryFactory;
    @Autowired
    private LectureStateRepository lectureStateRepository;
    @Autowired
    private LectureMainCategoryRepository lectureMainCategoryRepository;
    @Autowired
    private LectureSubCategoryRepository lectureSubCategoryRepository;

    public LectureRepositoryImpl() {
        super(Lecture.class);
    }

    @Override
    public Page<Lecture> findBySearch(LectureInstitution lectureInstitution, String searchText,
                                      Long mainCategoryNo, Long subCategoryNo, String listType,
                                      List<LectureListRequestDto.DivisionItemList> searchDivision,
                                      List<LectureListRequestDto.StateItemList> searchState,
                                      Pageable pageable) {
        JPAQuery<Lecture> query = queryFactory.selectFrom(lecture)
                .where(lecture.lectureInstitution.eq(lectureInstitution),
                        lecture.lectureTitle.contains(searchText),
                        eqMainCategory(mainCategoryNo),
                        eqSubCategory(subCategoryNo),
                        eqListType(listType),
                        (eqDivision(searchDivision)),
                        (eqState(searchState)));
        List<Lecture> lectures = this.getQuerydsl().applyPagination(pageable, query).fetch();
        return new PageImpl<Lecture>(lectures, pageable, query.fetchCount());
    }

    private BooleanExpression eqMainCategory(Long mainCategoryNo) {
        if(mainCategoryNo == 0) {
            return null;
        } else {
            LectureMainCategory lectureMainCategory = lectureMainCategoryRepository.findById(mainCategoryNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + mainCategoryNo));
            return lecture.lectureMainCategory.eq(lectureMainCategory);
        }
    }

    private BooleanExpression eqSubCategory(Long subCategoryNo) {
        if(subCategoryNo == 0) {
            return null;
        } else {
            LectureSubCategory lectureSubCategory = lectureSubCategoryRepository.findById(subCategoryNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + subCategoryNo));
            return lecture.lectureSubCategory.eq(lectureSubCategory);
        }
    }

    private BooleanExpression eqListType(String listType) {
        if(listType.equals("E")) { // 이벤트 추가가 안된 데이터 출력
            return lecture.lectureEvent.isNull();
        } else if(listType.equals("A")) { // 모든 데이터 출력
            return null;
        } else {
            return null;
        }
    }

    private BooleanBuilder eqDivision(List<LectureListRequestDto.DivisionItemList> searchDivision) {
        BooleanBuilder builder = new BooleanBuilder();
        if(searchDivision.size() < 1) {
            return null;
        } else {
            for(int i=0; i<searchDivision.size(); i++) {
                builder.or(lecture.lectureDivision.eq(searchDivision.get(i).getDvItem()));
            }
            return builder;
        }
    }

    private BooleanBuilder eqState(List<LectureListRequestDto.StateItemList> searchState) {
        BooleanBuilder builder = new BooleanBuilder();
        if(searchState.size() < 1) {
            return null;
        } else {
            for(int i=0; i<searchState.size(); i++) {
                LectureState lectureState = lectureStateRepository.findById(searchState.get(i).getStItem())
                        .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + searchState));
                builder.or(lecture.lectureState.eq(lectureState));
            }
            return builder;
        }
    }
}
