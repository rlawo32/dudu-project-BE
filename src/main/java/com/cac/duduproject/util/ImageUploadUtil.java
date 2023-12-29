package com.cac.duduproject.util;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

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

    public void ImageDeleteS3(HttpServletRequest request) {
        try {
            s3Client.deleteObject(new DeleteObjectRequest(bucketName + "/previewImage", request.getParameter("imageFileName")));
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

}
