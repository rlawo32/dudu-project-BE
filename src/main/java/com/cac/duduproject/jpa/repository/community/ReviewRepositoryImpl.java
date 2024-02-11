package com.cac.duduproject.jpa.repository.community;

import com.cac.duduproject.jpa.domain.community.Review;
import com.cac.duduproject.jpa.domain.lecture.LectureInstitution;
import com.cac.duduproject.jpa.repository.lecture.LectureInstitutionRepository;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.List;

import static com.cac.duduproject.jpa.domain.community.QReview.review;

public class ReviewRepositoryImpl extends QuerydslRepositorySupport implements ReviewRepositoryCustom {

    @Autowired
    private JPAQueryFactory queryFactory;
    @Autowired
    private LectureInstitutionRepository lectureInstitutionRepository;

    public ReviewRepositoryImpl() {
        super(Review.class);
    }

    @Override
    public Page<Review> findBySearch(Long institutionNo, String searchText, Pageable pageable) {
        JPAQuery<Review> query = queryFactory.selectFrom(review)
                .where(review.reviewTitle.contains(searchText).or(review.reviewContent.contains(searchText)),
                        eqInstitutionNo(institutionNo));
        List<Review> reviews = this.getQuerydsl().applyPagination(pageable, query).fetch();
        return new PageImpl<Review>(reviews, pageable, query.fetchCount());
    }

    private BooleanExpression eqInstitutionNo(Long institutionNo) {
        if(institutionNo == 0) {
            return null;
        } else {
            LectureInstitution lectureInstitution = lectureInstitutionRepository.findById(institutionNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + institutionNo));
            return review.lectureInstitution.eq(lectureInstitution);
        }
    }
}
