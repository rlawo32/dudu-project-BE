package com.cac.duduproject.jpa.repository.faq;

import com.cac.duduproject.jpa.domain.faq.Faq;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.List;

import static com.cac.duduproject.jpa.domain.faq.QFaq.faq;

public class FaqRepositoryImpl extends QuerydslRepositorySupport implements FaqRepositoryCustom {

    @Autowired
    private JPAQueryFactory queryFactory;

    public FaqRepositoryImpl() {
        super(Faq.class);
    }

    @Override
    public Page<Faq> findByAllFaq(String faqCategory, String searchText, Pageable pageable) {
        JPAQuery<Faq> query = queryFactory.selectFrom(faq)
                .where(eqFaqCategory(faqCategory),
                        faq.faqTitle.contains(searchText).or(faq.faqContent.contains(searchText)));
        List<Faq> faqs = this.getQuerydsl().applyPagination(pageable, query).fetch();
        return new PageImpl<Faq>(faqs, pageable, query.fetchCount());
    }

    private BooleanExpression eqFaqCategory(String faqCategory) {
        if(faqCategory == "") {
            return null;
        } else {
            return faq.faqCategory.eq(faqCategory);
        }
    }
}
