package com.cac.duduproject.web.dto.community;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewListRequestDto {

    private int pageNo;
    private String sortType;
    private Long institutionNo;
    private String searchText;
}

