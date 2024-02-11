package com.cac.duduproject.web.dto.community;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardListRequestDto {

    private int pageNo;
    private Long institutionNo;
    private String searchCategory;
    private String searchText;
}

