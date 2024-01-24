package com.cac.duduproject.jpa.repository.faq;

import com.cac.duduproject.jpa.domain.faq.Faq;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FaqRepository extends JpaRepository<Faq, Long>, FaqRepositoryCustom {

    @Query("SELECT f FROM Faq f")
    Page<Faq> findByFaqOftenList(Pageable pageable);
}
