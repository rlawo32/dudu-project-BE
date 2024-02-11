package com.cac.duduproject.jpa.repository.community;

import com.cac.duduproject.jpa.domain.community.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long>, ReviewRepositoryCustom {

}
