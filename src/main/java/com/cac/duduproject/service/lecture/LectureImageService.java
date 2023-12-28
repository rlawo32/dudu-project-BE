package com.cac.duduproject.service.lecture;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.cac.duduproject.util.ImageUploadUtil;
import com.cac.duduproject.web.dto.CommonResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class LectureImageService {

    private final AmazonS3 s3Client;
    private final ImageUploadUtil imageUploadUtil;

    @Value("${application.bucket.name}")
    private String bucketName;

    @Transactional
    public CommonResponseDto<?> lectureImageUploadS3(MultipartFile files) {

        Map<String, Object> result = new HashMap<>();

        try {
            //동일한 사진을 업로드 하였을 때 사진이 덮어씌워지는 것을 방지하기 위함
            UUID uuid = UUID.randomUUID();
            String imageFileName = uuid + "_" + files.getOriginalFilename();

            File file = imageUploadUtil.convertMultiPartFileToFile(files);

            s3Client.putObject(new PutObjectRequest(bucketName + "/previewImage", imageFileName, file));
            file.delete();

            URL url = s3Client.getUrl(bucketName + "/previewImage", imageFileName);
            String urlText = "" + url;

            result.put("imgName", imageFileName);
            result.put("imgUrl", urlText);

        } catch(Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
        return CommonResponseDto.setSuccess("LectureImage Upload Success! ", result);
    }
}
