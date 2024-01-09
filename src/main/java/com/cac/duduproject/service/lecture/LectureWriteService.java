package com.cac.duduproject.service.lecture;

import com.cac.duduproject.jpa.domain.lecture.*;
import com.cac.duduproject.jpa.domain.member.Member;
import com.cac.duduproject.jpa.repository.lecture.*;
import com.cac.duduproject.jpa.repository.member.MemberRepository;
import com.cac.duduproject.web.dto.CommonResponseDto;
import com.cac.duduproject.web.dto.lecture.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@RequiredArgsConstructor
@Service
public class LectureWriteService {

    private final MemberRepository memberRepository;
    private final LectureRepository lectureRepository;
    private final LectureInstitutionRepository lectureInstitutionRepository;
    private final LectureRoomRepository lectureRoomRepository;
    private final LectureMainCategoryRepository lectureMainCategoryRepository;
    private final LectureSubCategoryRepository lectureSubCategoryRepository;
    private final LectureStateRepository lectureStateRepository;
    private final LectureEventRepository lectureEventRepository;

    private final LectureImageService lectureImageService;

    @Transactional
    public CommonResponseDto<?> lectureWrite(LectureWriteRequestDto requestDto) {
        try {
            Member member = memberRepository.findById(requestDto.getMemberNo())
                    .orElseThrow(() -> new IllegalArgumentException("해당 사용자 아이디가 없습니다. ID : " + requestDto.getMemberNo()));

            LectureInstitution lectureInstitution = lectureInstitutionRepository.findById(requestDto.getInstitutionNo())
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. ID : " + requestDto.getInstitutionNo()));

            LectureRoom lectureRoom = lectureRoomRepository.findById(requestDto.getLectureRoomNo())
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. ID : " + requestDto.getLectureRoomNo()));

            LectureMainCategory lectureMainCategory = lectureMainCategoryRepository.findById(requestDto.getMainCategoryNo())
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. ID : " + requestDto.getMainCategoryNo()));

            LectureSubCategory lectureSubCategory = lectureSubCategoryRepository.findById(requestDto.getSubCategoryNo())
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. ID : " + requestDto.getSubCategoryNo()));

            requestDto.setMember(member);
            requestDto.setLectureInstitution(lectureInstitution);
            requestDto.setLectureRoom(lectureRoom);
            requestDto.setLectureMainCategory(lectureMainCategory);
            requestDto.setLectureSubCategory(lectureSubCategory);

            String period = requestDto.getLecturePeriod();
            String time = requestDto.getLectureTime();
            String reception = requestDto.getLectureReception();
            // 1=월, 2=화, 3=수, 4=목, 5=금, 6=토, 7=일
            int dow = Integer.parseInt(time.substring(time.indexOf("(")+1, time.indexOf("(")+2));

            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy.MM.dd");

            LocalDate now = LocalDate.now();
            LocalDate periodStartDate = LocalDate.parse(period.substring(0, period.indexOf("~")), dtf);
            LocalDate periodEndDate = LocalDate.parse(period.substring(period.indexOf("~")+1), dtf);
            LocalDate receptionStartDate = LocalDate.parse(reception.substring(0, reception.indexOf("~")), dtf);
            LocalDate receptionEndDate = LocalDate.parse(reception.substring(reception.indexOf("~")+1), dtf);

            int lectureCount = 0;

            while(periodStartDate.compareTo(periodEndDate) < 1) {
                DayOfWeek dayOfWeek = periodStartDate.getDayOfWeek();

                if(dayOfWeek.getValue() == dow) {
                    lectureCount++;
                }
                periodStartDate = periodStartDate.plusDays(1);
            }

            if(lectureCount == 1) {
                requestDto.setLectureDivision("특강");
            } else if(lectureCount > 1 && lectureCount < 8) {
                requestDto.setLectureDivision("단기");
            } else {
                requestDto.setLectureDivision("정기");
            }
            requestDto.setLectureCount(lectureCount);

            if(now.compareTo(receptionStartDate) < 0) {
                LectureState lectureState = lectureStateRepository.findById(1L)
                        .orElseThrow(() -> new IllegalArgumentException("해당 상태가 없습니다."));
                requestDto.setLectureState(lectureState);
            } else if(now.compareTo(receptionStartDate) >= 0 && now.compareTo(receptionEndDate) <= 0) {
                LectureState lectureState = lectureStateRepository.findById(2L)
                        .orElseThrow(() -> new IllegalArgumentException("해당 상태가 없습니다."));
                requestDto.setLectureState(lectureState);
            }

            Long lectureNo = lectureRepository.save(requestDto.toLecture()).getLectureNo();

            lectureImageService.lectureImageInsert(lectureNo, requestDto.getLectureImage());
            lectureImageService.lectureImageInsert(lectureNo, requestDto.getLectureThumbnail());
        } catch (Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
        return CommonResponseDto.setSuccess("Lecture Write Success", null);
    }

    @Transactional
    public CommonResponseDto<?> insertLectureRoom(LectureRoomRequestDto requestDto) {

        try {
            LectureInstitution lectureInstitution = lectureInstitutionRepository.findById(requestDto.getInstitutionNo())
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. ID : " + requestDto.getInstitutionNo()));

            requestDto.setLectureInstitution(lectureInstitution);

            lectureRoomRepository.save(requestDto.toLectureRoom());
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
        return CommonResponseDto.setSuccess("Insert Success", null);
    }

    @Transactional
    public CommonResponseDto<?> insertLectureSubCategory(LectureSubCategoryRequestDto requestDto) {

        try {
            LectureMainCategory lectureMainCategory = lectureMainCategoryRepository.findById(requestDto.getLectureMainCategoryNo())
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. ID : " + requestDto.getLectureMainCategoryNo()));

            requestDto.setLectureMainCategory(lectureMainCategory);

            lectureSubCategoryRepository.save(requestDto.toLectureSubCategory());
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
        return CommonResponseDto.setSuccess("Insert Success", null);
    }

    @Transactional
    public CommonResponseDto<?> insertLectureEvent(LectureEventWriteRequestDto requestDto) {
        try {
            LectureInstitution lectureInstitution = lectureInstitutionRepository.findById(requestDto.getInstitutionNo())
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. ID : " + requestDto.getInstitutionNo()));
            requestDto.setLectureInstitution(lectureInstitution);

            Long lectureEventNo = lectureEventRepository.save(requestDto.toLectureEvent()).getLectureEventNo();

            LectureEvent lectureEvent = lectureEventRepository.findById(lectureEventNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. ID : " + lectureEventNo));

            for(int i=0; i<requestDto.getLectureEventList().size(); i++) {
                Long lectureNo = requestDto.getLectureEventList().get(i).getLectureNo();
                Lecture lecture = lectureRepository.findById(lectureNo)
                        .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. ID : " + lectureNo));

                lecture.lectureEventUpdate(lectureEvent);
            }
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
        return CommonResponseDto.setSuccess("Insert Success", null);
    }
}
