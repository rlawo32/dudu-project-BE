package com.cac.duduproject.web.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class ImageInsertRequestDto {
    private String imgType;
    private String imgName;
    private String imgUrl;
    private Long imgSize;
}
