package com.cac.duduproject.web.dto.lecture;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LectureEventListRequestDto {

    private int pageNo;
    private String sortType;
    private Long institutionNo;
    private Long lectureEventNo;
}
