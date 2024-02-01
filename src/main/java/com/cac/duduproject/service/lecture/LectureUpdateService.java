package com.cac.duduproject.service.lecture;

import com.cac.duduproject.jpa.domain.lecture.LectureBasket;
import com.cac.duduproject.jpa.repository.lecture.LectureBasketRepository;
import com.cac.duduproject.web.dto.CommonResponseDto;
import com.cac.duduproject.web.dto.lecture.LectureBasketDeleteRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class LectureUpdateService {

    private final LectureBasketRepository lectureBasketRepository;

    @Transactional
    public CommonResponseDto<?> deleteLectureBasket(LectureBasketDeleteRequestDto requestDto) {
        try {
            if(requestDto.getLectureBasketDeleteList().size() > 0) {
                for(int i=0; i<requestDto.getLectureBasketDeleteList().size(); i++) {
                    Long lectureBasketNo = requestDto.getLectureBasketDeleteList().get(i).getLectureBasketNo();
                    LectureBasket lectureBasket = lectureBasketRepository.findById(lectureBasketNo)
                            .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + lectureBasketNo));

                    lectureBasketRepository.delete(lectureBasket);
                }
            } else {
                Long lectureBasketNo = requestDto.getDeleteLectureBasketNo();
                LectureBasket lectureBasket = lectureBasketRepository.findById(lectureBasketNo)
                        .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + lectureBasketNo));

                lectureBasketRepository.delete(lectureBasket);
            }
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
        return CommonResponseDto.setSuccess("Delete Success", null);
    }
}
