package com.cac.duduproject.jpa.repository.community;

import com.cac.duduproject.jpa.domain.community.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long>, BoardRepositoryCustom {

}
