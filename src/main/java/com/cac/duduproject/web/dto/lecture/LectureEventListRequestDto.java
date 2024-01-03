package com.cac.duduproject.web.dto.lecture;

import com.cac.duduproject.jpa.domain.lecture.LectureEvent;
import com.cac.duduproject.jpa.domain.lecture.LectureInstitution;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LectureEventListRequestDto {

    private Long lectureNo;
    private String lectureInstitution;
    private String lectureTitle;
    private String lectureTeacher;
}
