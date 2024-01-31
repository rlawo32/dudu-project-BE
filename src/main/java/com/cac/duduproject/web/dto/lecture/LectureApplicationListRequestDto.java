package com.cac.duduproject.web.dto.lecture;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LectureApplicationListRequestDto {

    private int pageNo;
    private String sortType;
    private String searchText;
}
