package com.cac.duduproject.jpa.repository.member;

import com.cac.duduproject.jpa.domain.member.MemberLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberLogRepository extends JpaRepository<MemberLog, Long> {

    @Query("SELECT l FROM MemberLog l WHERE l.member.memberNo = :memberNo")
    Page<MemberLog> findByAllMemberLog(@Param("memberNo") Long memberNo, Pageable pageable);
}
