package com.cac.duduproject.jpa.repository.lecture;

import com.cac.duduproject.jpa.domain.lecture.Lecture;
import com.cac.duduproject.jpa.domain.lecture.LectureInstitution;
import com.cac.duduproject.web.dto.lecture.LectureListRequestDto;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.QueryFactory;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.List;

import static com.cac.duduproject.jpa.domain.lecture.QLecture.lecture;

public class LectureRepositoryImpl extends QuerydslRepositorySupport implements LectureRepositoryCustom {

    @Autowired
    private JPAQueryFactory queryFactory;

    public LectureRepositoryImpl() {
        super(Lecture.class);
    }

    @Override
    public List<Lecture> findBySearch(LectureInstitution lectureInstitution, String searchText, List<LectureListRequestDto.DivisionItemList> searchDivision) {
        return queryFactory
                .selectFrom(lecture)
                .where(lecture.lectureInstitution.eq(lectureInstitution),
                        lecture.lectureTitle.contains(searchText),
                        (eqDivision(searchDivision)))
                .fetch();
    }

    private BooleanBuilder eqDivision(List<LectureListRequestDto.DivisionItemList> searchDivision) {
        BooleanBuilder builder = new BooleanBuilder();
        for(int i=0; i<searchDivision.size(); i++) {
            builder.or(lecture.lectureDivision.eq(searchDivision.get(i).getDvItem()));
        }
        return builder;
    }
}
