package com.cac.duduproject.jpa.repository.lecture;

import com.cac.duduproject.jpa.domain.lecture.*;
import com.cac.duduproject.jpa.domain.member.Member;
import com.cac.duduproject.jpa.repository.member.MemberRepository;
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

import static com.cac.duduproject.jpa.domain.lecture.QLectureApplication.lectureApplication;

public class LectureApplicationRepositoryImpl extends QuerydslRepositorySupport implements LectureApplicationRepositoryCustom {

    @Autowired
    private JPAQueryFactory queryFactory;
    @Autowired
    private MemberRepository memberRepository;

    public LectureApplicationRepositoryImpl() {
        super(Lecture.class);
    }

    @Override
    public Page<LectureApplication> findBySearch(Long memberNo, String searchText, String sortType,
                                      Pageable pageable) {
        JPAQuery<LectureApplication> query = queryFactory.selectFrom(lectureApplication)
                .where(eqMember(memberNo),
                        lectureApplication.lectureApplicationOrderId.contains(searchText)
                                .or(lectureApplication.lecture.lectureTitle.contains(searchText)),
                        lectureApplication.lectureApplicationCreatedDate.contains(sortType));
        List<LectureApplication> lectureApplications = this.getQuerydsl().applyPagination(pageable, query).fetch();
        return new PageImpl<LectureApplication>(lectureApplications, pageable, query.fetchCount());
    }

    private BooleanExpression eqMember(Long memberNo) {
        if(memberNo == 0) {
            return null;
        } else {
            Member member = memberRepository.findById(memberNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. No. : " + memberNo));
            return lectureApplication.member.eq(member);
        }
    }
}
