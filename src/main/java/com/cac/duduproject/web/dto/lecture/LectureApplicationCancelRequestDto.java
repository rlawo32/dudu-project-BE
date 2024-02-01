package com.cac.duduproject.web.dto.lecture;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LectureApplicationCancelRequestDto {

    private Long lectureApplicationNo;
    private String lectureApplicationOrderId;
    private String lectureApplicationCancelDesc;

}
