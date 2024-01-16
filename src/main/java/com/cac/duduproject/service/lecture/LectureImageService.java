package com.cac.duduproject.service.lecture;

import com.cac.duduproject.jpa.domain.lecture.Lecture;
import com.cac.duduproject.jpa.domain.lecture.LectureEvent;
import com.cac.duduproject.jpa.domain.lecture.LectureEventImage;
import com.cac.duduproject.jpa.domain.lecture.LectureImage;
import com.cac.duduproject.jpa.repository.lecture.LectureEventImageRepository;
import com.cac.duduproject.jpa.repository.lecture.LectureEventRepository;
import com.cac.duduproject.jpa.repository.lecture.LectureImageRepository;
import com.cac.duduproject.jpa.repository.lecture.LectureRepository;
import com.cac.duduproject.web.dto.ImageInsertRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class LectureImageService {

    private final LectureRepository lectureRepository;
    private final LectureImageRepository lectureImageRepository;
    private final LectureEventRepository lectureEventRepository;
    private final LectureEventImageRepository lectureEventImageRepository;

    @Transactional
    public void lectureImageInsert(Long typeNo, List<ImageInsertRequestDto> requestDto, String type) {
        try {
            for(int i=0; i<requestDto.size(); i++) {
                String lectureImageType= requestDto.get(i).getImgType();
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
                            .lectureImageType(lectureImageType)
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
                            .lectureImageType(lectureImageType)
                            .lectureEvent(lectureEvent)
                            .lectureImageOrigin(originName)
                            .lectureImageCustom(customName)
                            .lectureImageUrl(urlName)
                            .lectureImageExtension(extension)
                            .lectureImageSize(lectureImageSize)
                            .build();
                    lectureEventImageRepository.save(lectureEventImage);
                }
            }
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

}
