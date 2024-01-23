package com.cac.duduproject.jpa.repository.faq;

import com.cac.duduproject.jpa.domain.faq.Faq;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FaqRepository extends JpaRepository<Faq, Long>, FaqRepositoryCustom {

}
