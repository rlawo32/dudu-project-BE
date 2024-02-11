package com.cac.duduproject.jpa.repository.community;

import com.cac.duduproject.jpa.domain.community.Board;
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

import static com.cac.duduproject.jpa.domain.community.QBoard.board;

public class BoardRepositoryImpl extends QuerydslRepositorySupport implements BoardRepositoryCustom {

    @Autowired
    private JPAQueryFactory queryFactory;
    @Autowired
    private LectureInstitutionRepository lectureInstitutionRepository;

    public BoardRepositoryImpl() {
        super(Board.class);
    }

    @Override
    public Page<Board> findBySearch(Long institutionNo, String searchCategory,
                                    String searchText, Pageable pageable) {
        JPAQuery<Board> query = queryFactory.selectFrom(board)
                .where(eqInstitutionNo(institutionNo), board.boardCategory.eq(searchCategory),
                        board.boardTitle.contains(searchText));
        List<Board> boards = this.getQuerydsl().applyPagination(pageable, query).fetch();
        return new PageImpl<Board>(boards, pageable, query.fetchCount());
    }

    private BooleanExpression eqInstitutionNo(Long institutionNo) {
        if(institutionNo == 0) {
            return null;
        } else {
            LectureInstitution lectureInstitution = lectureInstitutionRepository.findById(institutionNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + institutionNo));
            return board.lectureInstitution.eq(lectureInstitution);
        }
    }
}
