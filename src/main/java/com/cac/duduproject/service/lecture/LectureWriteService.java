package com.cac.duduproject.service.lecture;

import com.cac.duduproject.jpa.domain.lecture.LectureInstitution;
import com.cac.duduproject.jpa.domain.lecture.LectureMainCategory;
import com.cac.duduproject.jpa.domain.lecture.LectureRoom;
import com.cac.duduproject.jpa.domain.lecture.LectureSubCategory;
import com.cac.duduproject.jpa.domain.member.Member;
import com.cac.duduproject.jpa.repository.lecture.*;
import com.cac.duduproject.jpa.repository.member.MemberRepository;
import com.cac.duduproject.web.dto.CommonResponseDto;
import com.cac.duduproject.web.dto.lecture.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class LectureWriteService {

    private final MemberRepository memberRepository;
    private final LectureRepository lectureRepository;
    private final LectureInstitutionRepository lectureInstitutionRepository;
    private final LectureRoomRepository lectureRoomRepository;
    private final LectureMainCategoryRepository lectureMainCategoryRepository;
    private final LectureSubCategoryRepository lectureSubCategoryRepository;

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
            // 1=일, 2=월, 3=화, 4=수, 5=목, 6=금, 7=토
            String dow = time.substring(time.indexOf("(")+1, time.indexOf("(")+2);

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy.MM.dd");
            Date periodStartDate = sdf.parse(period.substring(0, period.indexOf("~")-1));
            Date periodEndDate = sdf.parse(period.substring(period.indexOf("~")+2));
            Date receptionStartDate = sdf.parse(reception.substring(0, period.indexOf("~")-1));
            Date receptionEndDate = sdf.parse(reception.substring(period.indexOf("~")+2));

            Calendar periodCalStart = Calendar.getInstance();
            Calendar periodCalEnd = Calendar.getInstance();
            periodCalStart.setTime(periodStartDate);
            periodCalEnd.setTime(periodEndDate);

            int lectureCount = 0;

            while(periodCalStart.compareTo(periodCalEnd) < 1) {
                int calDow = periodCalStart.get(Calendar.DAY_OF_WEEK);
                System.out.println(calDow);

                if(calDow == Integer.parseInt(dow)) {
                    lectureCount++;
                }
                periodCalStart.add(Calendar.DATE, 1);
            }

            Date now = new Date();

            if(lectureCount == 1) {
                requestDto.setLectureDivision("특강");
            } else if(lectureCount > 1 && lectureCount < 8) {
                requestDto.setLectureDivision("단기");
            } else {
                requestDto.setLectureDivision("정기");
            }
            requestDto.setLectureCount(lectureCount);

            lectureRepository.save(requestDto.toLecture());
        } catch (Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
        return CommonResponseDto.setSuccess("Lecture Write Success", null);
    }

    @Transactional
    public CommonResponseDto<?> findAllLectureInstitution() {
        List<LectureInstitutionResponseDto> list = new ArrayList<>();
        try {
            list = lectureInstitutionRepository.findAll().stream()
                    .map(LectureInstitutionResponseDto::new)
                    .collect(Collectors.toList());
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
        return CommonResponseDto.setSuccess("LectureInstitution List", list);
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
    public CommonResponseDto<?> findAllLectureRoom(HttpServletRequest request) {
        List<LectureRoomResponseDto> list = new ArrayList<>();
        try {
            Long institutionNo = Long.valueOf(request.getParameter("institutionNo"));
            LectureInstitution lectureInstitution = lectureInstitutionRepository.findById(institutionNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. ID : " + institutionNo));

            list = lectureRoomRepository.findAllByLectureInstitution(lectureInstitution).stream()
                    .map(LectureRoomResponseDto::new)
                    .collect(Collectors.toList());
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
        return CommonResponseDto.setSuccess("LectureRoom List", list);
    }

    @Transactional
    public CommonResponseDto<?> findAllLectureMainCategory() {
        List<LectureMainCategoryResponseDto> list = new ArrayList<>();
        try {
            list = lectureMainCategoryRepository.findAll().stream()
                    .map(LectureMainCategoryResponseDto::new)
                    .collect(Collectors.toList());
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
        return CommonResponseDto.setSuccess("LectureMainCategory List", list);
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
    public CommonResponseDto<?> findAllLectureSubCategory(HttpServletRequest request) {
        List<LectureSubCategoryResponseDto> list = new ArrayList<>();
        try {
            Long mainCategoryNo = Long.valueOf(request.getParameter("mainCategoryNo"));
            LectureMainCategory lectureMainCategory = lectureMainCategoryRepository.findById(mainCategoryNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. ID : " + mainCategoryNo));

            list = lectureSubCategoryRepository.findAllByLectureMainCategory(lectureMainCategory).stream()
                    .map(LectureSubCategoryResponseDto::new)
                    .collect(Collectors.toList());
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
        return CommonResponseDto.setSuccess("LectureSubCategory List", list);
    }
}
