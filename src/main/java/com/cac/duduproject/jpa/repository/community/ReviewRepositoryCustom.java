package com.cac.duduproject.jpa.repository.community;


import com.cac.duduproject.jpa.domain.community.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ReviewRepositoryCustom {

    Page<Review> findBySearch(Long institutionNo, String searchText, Pageable pageable);
}
