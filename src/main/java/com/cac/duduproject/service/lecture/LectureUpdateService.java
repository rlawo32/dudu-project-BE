package com.cac.duduproject.service.lecture;

import com.cac.duduproject.jpa.domain.lecture.Lecture;
import com.cac.duduproject.jpa.domain.lecture.LectureBasket;
import com.cac.duduproject.jpa.domain.lecture.LectureState;
import com.cac.duduproject.jpa.repository.lecture.LectureBasketRepository;
import com.cac.duduproject.jpa.repository.lecture.LectureRepository;
import com.cac.duduproject.jpa.repository.lecture.LectureStateRepository;
import com.cac.duduproject.web.dto.CommonResponseDto;
import com.cac.duduproject.web.dto.lecture.LectureBasketDeleteRequestDto;
import com.cac.duduproject.web.dto.lecture.LectureResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class LectureUpdateService {

    private final LectureRepository lectureRepository;
    private final LectureBasketRepository lectureBasketRepository;
    private final LectureStateRepository lectureStateRepository;

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

    @Transactional
//    @Scheduled(cron = "0 0 0 * * ?") // 매일 24시
    @Scheduled(cron = "0 0 0/6 * * *") // 6시간마다
//    @Scheduled(cron = "0 0/1 * * * *") // 1분마다
    public void schedulerLectureStateUpdate() {
        try {
            LocalDate now = LocalDate.now();
            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy.MM.dd");
            int tempPosition = "0000.00.00~0000.00.00".indexOf("~");

            List<LectureResponseDto> list = lectureRepository.findAll().stream()
                    .map(LectureResponseDto::new)
                    .collect(Collectors.toList());
//            String[] temp = new String[7];
//            temp[0] = "2024.02.04~2024.02.06"; // 사이
//            temp[1] = "2024.02.01~2024.02.03"; // 마감
//            temp[2] = "2024.01.28~2024.01.28"; // 마감
//            temp[3] = "2024.02.05~2024.02.08"; // 사이
//            temp[4] = "2024.02.07~2024.02.11"; // 예정
//            temp[5] = "2024.02.05~2024.02.05"; // 마감
//            temp[6] = "2024.02.05~2024.02.06"; // 사이

            for(int i=0; i<list.size(); i++) {
                Long lectureNo = list.get(i).getLectureNo();
                String reception = list.get(i).getLectureReception();
                Long stateNo = list.get(i).getLectureStateNo(); // 1:접수예정, 2:접수중, 3:대기접수, 4:접수마감
                Lecture lecture = lectureRepository.findById(lectureNo)
                        .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + lectureNo));
                LocalDate startDate = LocalDate.parse(reception.substring(0, tempPosition), dtf);
                LocalDate endDate = LocalDate.parse(reception.substring(tempPosition+1), dtf).plusDays(1);

                if((!now.isBefore(startDate)) && (now.isBefore(endDate)) && (stateNo == 1)) { // 접수기간 사이
                    LectureState lectureState = lectureStateRepository.findById(2L)
                            .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다."));
                    lecture.lectureStateUpdate(lectureState);
                } else if(now.isBefore(startDate)) { // 접수기간 이전
                    LectureState lectureState = lectureStateRepository.findById(1L)
                            .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다."));
                    lecture.lectureStateUpdate(lectureState);
                } else if(now.isAfter(endDate.minusDays(1)) && (stateNo == 1 || stateNo == 2 || stateNo == 3)) { // 접수기간 이후
                    LectureState lectureState = lectureStateRepository.findById(4L)
                            .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다."));
                    lecture.lectureStateUpdate(lectureState);
                } else if(stateNo == 4) {
                    String period = list.get(i).getLecturePeriod();
                    LocalDate periodEndDate = LocalDate.parse(period.substring(tempPosition+1), dtf);
                    if(now.isAfter(periodEndDate)) {
                        LectureState lectureState = lectureStateRepository.findById(6L)
                                .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다."));
                        lecture.lectureStateUpdate(lectureState);
                    }
                }
            }
        } catch(Exception e) {
            e.printStackTrace();
        }
    }
}
