package com.cac.duduproject.web.dto.lecture;

import com.cac.duduproject.web.dto.ImageInsertRequestDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LectureInstitutionRequestDto {

    private Long institutionNo;
    private String institutionName;
    private String institutionPosition;
    private String institutionContact;
    private List<ImageInsertRequestDto> institutionImage;

}
