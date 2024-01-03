package com.cac.duduproject.web.dto.lecture;

import com.cac.duduproject.jpa.domain.lecture.LectureEvent;
import com.cac.duduproject.jpa.domain.lecture.LectureInstitution;
import com.cac.duduproject.jpa.domain.lecture.LectureRoom;
import com.cac.duduproject.web.dto.ImageInsertRequestDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LectureEventRequestDto {

    private Long institutionNo;
    private LectureInstitution lectureInstitution;
    private String lectureEventName;
    private String lectureEventDesc;
    private List<LectureEventListRequestDto> lectureEventList;
    private String lectureEventThumbnail;

    public LectureEvent toLectureEvent() {
        return LectureEvent.builder()
                .lectureInstitution(lectureInstitution)
                .lectureEventName(lectureEventName)
                .lectureEventDesc(lectureEventDesc)
                .lectureEventThumbnail(lectureEventThumbnail)
                .build();
    }
}
