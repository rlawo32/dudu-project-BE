package com.cac.duduproject.web.dto.lecture;

import com.cac.duduproject.jpa.domain.lecture.*;
import com.cac.duduproject.jpa.domain.member.Member;
import com.cac.duduproject.web.dto.ImageInsertRequestDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LectureApplicationRequestDto {

    private String paymentKey;
    private String orderId;
    private Long amount;
    private Lecture lecture;
    private Member member;

    public LectureApplication toLectureApplication() {
        return LectureApplication.builder()
                .lecture(lecture)
                .member(member)
                .build();
    }
}
