package com.cac.duduproject.service.lecture;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.cac.duduproject.jpa.domain.lecture.Lecture;
import com.cac.duduproject.jpa.domain.lecture.LectureImage;
import com.cac.duduproject.jpa.repository.lecture.LectureImageRepository;
import com.cac.duduproject.jpa.repository.lecture.LectureRepository;
import com.cac.duduproject.util.ImageUploadUtil;
import com.cac.duduproject.web.dto.CommonResponseDto;
import com.cac.duduproject.web.dto.ImageInsertRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class LectureImageService {

    private final LectureRepository lectureRepository;
    private final LectureImageRepository lectureImageRepository;

    private final AmazonS3 s3Client;
    private final ImageUploadUtil imageUploadUtil;

    @Value("${application.bucket.name}")
    private String bucketName;

    @Transactional
    public CommonResponseDto<?> lectureImageUploadS3(MultipartFile files, String type) {

        Map<String, Object> result = new HashMap<>();

        try {
            //동일한 사진을 업로드 하였을 때 사진이 덮어씌워지는 것을 방지하기 위함
            UUID uuid = UUID.randomUUID();
            String imageFileName = uuid + "_" + files.getOriginalFilename();
            String uploadDir = "*";

            if(type.equals("T")) {
                uploadDir = "/lectureThumbnailImage";
            } else if(type.equals("L")) {
                uploadDir = "/lectureContentImage";
            } else if(type.equals("C")) {
                uploadDir = "/lectureCategoryImage";
            } else if(type.equals("E")) {
                uploadDir = "/lectureEventImage";
            }

            File file = imageUploadUtil.convertMultiPartFileToFile(files);

            s3Client.putObject(new PutObjectRequest(bucketName + uploadDir, imageFileName, file));
            file.delete();

            URL url = s3Client.getUrl(bucketName + uploadDir, imageFileName);
            String urlText = "" + url;

            result.put("imgName", imageFileName);
            result.put("imgUrl", urlText);

        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
        return CommonResponseDto.setSuccess("LectureImage Upload Success! ", result);
    }

    @Transactional
    public void lectureImageInsert(Long lectureNo, List<ImageInsertRequestDto> requestDto) {
        try {
            Lecture lecture = lectureRepository.findById(lectureNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 강의가 없습니다. lectureNo : " + lectureNo));

            for(int i=0; i<requestDto.size(); i++) {
                String lectureImageType= requestDto.get(i).getImgType();
                String lectureImageName = requestDto.get(i).getImgName();
                String lectureImageUrl = requestDto.get(i).getImgUrl();
                Long lectureImageSize = requestDto.get(i).getImgSize();
                String originName = lectureImageName.substring(lectureImageName.lastIndexOf("_")+1);
                String customName = lectureImageName.substring(lectureImageName.lastIndexOf("/")+1);
                String urlName = lectureImageUrl;
                String extension = lectureImageName.substring(lectureImageName.lastIndexOf(".")+1);

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
            }
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

}
