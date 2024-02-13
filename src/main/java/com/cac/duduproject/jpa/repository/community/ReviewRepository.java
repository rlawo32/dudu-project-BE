package com.cac.duduproject.jpa.repository.community;

import com.cac.duduproject.jpa.domain.community.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ReviewRepository extends JpaRepository<Review, Long>, ReviewRepositoryCustom {

    @Query("SELECT r FROM Review r")
    Page<Review> findByReviewOftenList(Pageable pageable);
}
