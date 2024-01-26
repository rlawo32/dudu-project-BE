package com.cac.duduproject.service.lecture;

import com.cac.duduproject.jpa.domain.lecture.*;
import com.cac.duduproject.jpa.repository.lecture.*;
import com.cac.duduproject.web.dto.CommonResponseDto;
import com.cac.duduproject.web.dto.ImageInsertRequestDto;
import com.cac.duduproject.web.dto.lecture.LectureInstitutionImageResponseDto;
import com.cac.duduproject.web.dto.lecture.LectureInstitutionResponseDto;
import com.cac.duduproject.web.dto.lecture.LectureRoomResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class LectureImageService {

    private final LectureRepository lectureRepository;
    private final LectureImageRepository lectureImageRepository;
    private final LectureEventRepository lectureEventRepository;
    private final LectureEventImageRepository lectureEventImageRepository;
    private final LectureInstitutionRepository lectureInstitutionRepository;
    private final LectureInstitutionImageRepository lectureInstitutionImageRepository;

    @Transactional
    public void lectureImageInsert(Long typeNo, List<ImageInsertRequestDto> requestDto, String type) {
        try {
            for(int i=0; i<requestDto.size(); i++) {
                String imageType= requestDto.get(i).getImgType();
                String lectureImageName = requestDto.get(i).getImgName();
                String lectureImageUrl = requestDto.get(i).getImgUrl();
                Long lectureImageSize = requestDto.get(i).getImgSize();
                String originName = lectureImageName.substring(lectureImageName.lastIndexOf("_")+1);
                String customName = lectureImageName.substring(lectureImageName.lastIndexOf("/")+1);
                String urlName = lectureImageUrl;
                String extension = lectureImageName.substring(lectureImageName.lastIndexOf(".")+1);

                if(type.equals("L")) {
                    Lecture lecture = lectureRepository.findById(typeNo)
                            .orElseThrow(() -> new IllegalArgumentException("해당 강의가 없습니다. No. : " + typeNo));

                    LectureImage lectureImage = LectureImage.builder()
                            .lectureImageType(imageType)
                            .lecture(lecture)
                            .lectureImageOrigin(originName)
                            .lectureImageCustom(customName)
                            .lectureImageUrl(urlName)
                            .lectureImageExtension(extension)
                            .lectureImageSize(lectureImageSize)
                            .build();
                    lectureImageRepository.save(lectureImage);
                } else if(type.equals("E")) {
                    LectureEvent lectureEvent = lectureEventRepository.findById(typeNo)
                            .orElseThrow(() -> new IllegalArgumentException("해당 강의가 없습니다. No. : " + typeNo));

                    LectureEventImage lectureEventImage = LectureEventImage.builder()
                            .lectureImageType(imageType)
                            .lectureEvent(lectureEvent)
                            .lectureImageOrigin(originName)
                            .lectureImageCustom(customName)
                            .lectureImageUrl(urlName)
                            .lectureImageExtension(extension)
                            .lectureImageSize(lectureImageSize)
                            .build();
                    lectureEventImageRepository.save(lectureEventImage);
                } else if(type.equals("I")) {
                    LectureInstitution lectureInstitution = lectureInstitutionRepository.findById(typeNo)
                            .orElseThrow(() -> new IllegalArgumentException("해당 지점이 없습니다. No. : " + typeNo));

                    LectureInstitutionImage lectureInstitutionImage = LectureInstitutionImage.builder()
                            .institutionImageType(imageType)
                            .lectureInstitution(lectureInstitution)
                            .institutionImageOrigin(originName)
                            .institutionImageCustom(customName)
                            .institutionImageUrl(urlName)
                            .institutionImageExtension(extension)
                            .institutionImageSize(lectureImageSize)
                            .build();
                    lectureInstitutionImageRepository.save(lectureInstitutionImage);
                }
            }
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    @Transactional
    public CommonResponseDto<?> findLectureInstitutionImage(HttpServletRequest request) {
        try {
            Long institutionNo = Long.valueOf(request.getParameter("institutionNo"));
            LectureInstitution lectureInstitution = lectureInstitutionRepository.findById(institutionNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + institutionNo));

            List<LectureInstitutionImageResponseDto> list = lectureInstitutionImageRepository.findByLectureInstitution(lectureInstitution).stream()
                    .map(LectureInstitutionImageResponseDto::new)
                    .collect(Collectors.toList());

            return CommonResponseDto.setSuccess("LectureInstitutionImage List", list);
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
    }

    @Transactional
    public CommonResponseDto<?> deleteLectureInstitutionImage(HttpServletRequest request) {
        try {
            Long institutionImageNo = Long.valueOf(request.getParameter("institutionImageNo"));

            LectureInstitutionImage lectureInstitutionImage = lectureInstitutionImageRepository.findById(institutionImageNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. No. : " + institutionImageNo));
            lectureInstitutionImageRepository.delete(lectureInstitutionImage);
        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
        return CommonResponseDto.setSuccess("LectureInstitutionImage Delete", null);
    }
}
