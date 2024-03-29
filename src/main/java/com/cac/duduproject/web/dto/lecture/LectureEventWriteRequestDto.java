package com.cac.duduproject.web.dto.lecture;

import com.cac.duduproject.jpa.domain.lecture.LectureEvent;
import com.cac.duduproject.jpa.domain.lecture.LectureInstitution;
import com.cac.duduproject.web.dto.ImageInsertRequestDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LectureEventWriteRequestDto {

    private Long lectureEventNo;
    private Long institutionNo;
    private LectureInstitution lectureInstitution;
    private String lectureEventType;
    private String lectureEventName;
    private String lectureEventDesc;
    private List<lectureEventItemList> lectureEventList;
    private List<lectureEventItemList> lectureEventRemoveList;
    private List<ImageInsertRequestDto> lectureEventThumbnail;

    @Data
    public static class lectureEventItemList {
        private Long lectureNo;
        private String lectureInstitution;
        private String lectureTitle;
        private String lectureTeacher;
        private String lectureEventType;
    }

    public LectureEvent toLectureEvent() {
        return LectureEvent.builder()
                .lectureInstitution(lectureInstitution)
                .lectureEventType(lectureEventType)
                .lectureEventName(lectureEventName)
                .lectureEventDesc(lectureEventDesc)
                .lectureEventThumbnail(lectureEventThumbnail.get(0).getImgUrl())
                .build();
    }
}
