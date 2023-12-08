package com.cac.duduproject.jpa.repository.member;

import com.cac.duduproject.jpa.domain.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByMemberId(String memberId);

    Optional<Member> findByMemberAttributeCode(String attributeCode);

    boolean existsByMemberEmail(String memberEmail);

    boolean existsByMemberId(String memberId);

}
