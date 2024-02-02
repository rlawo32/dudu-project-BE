package com.cac.duduproject.web.dto.lecture;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LectureListRequestDto {

    private String listType;
    private int pageNo;
    private String sortType;
    private Long institutionNo;
    private Long mainCategoryNo;
    private Long subCategoryNo;
    private String searchText;
    private List<DivisionItemList> searchDivision;
    private List<StateItemList> searchState;
    private List<DowItemList> searchDow;
    private List<FeeItemList> searchFee;

    @Data
    public static class DivisionItemList {
        private String dvItem;
    }

    @Data
    public static class StateItemList {
        private Long stItem;
        private String stName;
    }

    @Data
    public static class DowItemList {
        private Long dwItem;
        private String dwName;
    }

    @Data
    public static class FeeItemList {
        private Long feItem;
        private String feKey;
        private String feValue;
        private String feName;
    }
}

