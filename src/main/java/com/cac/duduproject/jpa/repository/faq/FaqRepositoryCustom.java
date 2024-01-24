package com.cac.duduproject.jpa.repository.faq;

import com.cac.duduproject.jpa.domain.faq.Faq;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface FaqRepositoryCustom {

    Page<Faq> findByAllFaq(String searchCategory, String searchText, Pageable pageable);
}
