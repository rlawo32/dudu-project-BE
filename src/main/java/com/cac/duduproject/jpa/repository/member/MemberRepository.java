package com.cac.duduproject.jpa.repository.member;

import com.cac.duduproject.jpa.domain.member.Member;
import com.cac.duduproject.util.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByMemberId(String memberId);

    Optional<Member> findByMemberEmail(String memberEmail);

    Optional<Member> findByMemberAttributeCode(String attributeCode);

    Optional<Member> findByMemberNameAndMemberEmail(String memberName, String memberEmail);

    List<Member> findByRole(Role role);

    boolean existsByMemberEmail(String memberEmail);

    boolean existsByMemberId(String memberId);

}
