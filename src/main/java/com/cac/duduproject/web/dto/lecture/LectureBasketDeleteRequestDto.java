package com.cac.duduproject.web.dto.lecture;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LectureBasketDeleteRequestDto {

    private Long deleteLectureBasketNo;
    private List<deleteItemList> lectureBasketDeleteList;

    @Data
    public static class deleteItemList {
        private Long lectureBasketNo;
        private Long lectureFee;
    }
}
