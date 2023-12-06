package com.cac.duduproject.jpa.repository;

import com.cac.duduproject.jpa.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {


    boolean existsByMemberEmail(String memberEmail);

    boolean existsByMemberId(String memberId);

}
