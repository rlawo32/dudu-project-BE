package com.cac.duduproject.util;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.cac.duduproject.web.dto.CommonResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RequiredArgsConstructor
@Service
@Data
public class ImageUploadUtil {

    private final AmazonS3 s3Client;

    @Value("${application.bucket.name}")
    private String bucketName;

    public File convertMultiPartFileToFile(MultipartFile multipartFile) {
        File convertedFile = new File(multipartFile.getOriginalFilename());

        try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
            fos.write(multipartFile.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }

        return convertedFile;
    }

    @Transactional
    public CommonResponseDto<?> imageUploadS3(MultipartFile files, String type) {

        Map<String, Object> result = new HashMap<>();

        try {
            //동일한 사진을 업로드 하였을 때 사진이 덮어씌워지는 것을 방지하기 위함
            UUID uuid = UUID.randomUUID();
            String imageFileName = uuid + "_" + files.getOriginalFilename();
            String uploadDir = "";

            if(type.equals("T")) { // 강좌 대표 이미지 경로
                uploadDir = "/lectureThumbnailImage";
            } else if(type.equals("L")) { // 강좌 이미지 경로
                uploadDir = "/lectureContentImage";
            } else if(type.equals("C")) { // Sub 카테고리 이미지 경로
                uploadDir = "/lectureCategoryImage";
            } else if(type.equals("E")) { // 강좌이벤트 이미지 경로
                uploadDir = "/lectureEventImage";
            } else if(type.equals("B")) { // 게시판 이미지 경로
                uploadDir = "/boardContentImage";
            } else if(type.equals("I")) { // 지점 이미지 경로
                uploadDir = "/institutionImage";
            } else if(type.equals("R")) { // 리뷰 이미지 경로
                uploadDir = "/reviewImage";
            }

            File file = convertMultiPartFileToFile(files);

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

    public void ImageDeleteS3(HttpServletRequest request) {
        try {
            String type = request.getParameter("type");
            String deleteDir = "";

            if(type.equals("T")) {
                deleteDir = "/lectureThumbnailImage";
            } else if(type.equals("L")) {
                deleteDir = "/lectureContentImage";
            } else if(type.equals("C")) {
                deleteDir = "/lectureCategoryImage";
            } else if(type.equals("E")) {
                deleteDir = "/lectureEventImage";
            } else if(type.equals("B")) {
                deleteDir = "/boardContentImage";
            } else if(type.equals("I")) {
                deleteDir = "/institutionImage";
            } else if(type.equals("R")) {
                deleteDir = "/reviewImage";
            }

            String imageFileName = request.getParameter("imageFileName");
            s3Client.deleteObject(new DeleteObjectRequest(bucketName + deleteDir, imageFileName));
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

}
