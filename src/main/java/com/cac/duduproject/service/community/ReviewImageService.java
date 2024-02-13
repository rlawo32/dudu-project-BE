package com.cac.duduproject.service.community;

import com.cac.duduproject.jpa.domain.community.Review;
import com.cac.duduproject.jpa.domain.community.ReviewImage;
import com.cac.duduproject.jpa.repository.community.ReviewImageRepository;
import com.cac.duduproject.jpa.repository.community.ReviewRepository;
import com.cac.duduproject.web.dto.ImageInsertRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ReviewImageService {

    private final ReviewRepository reviewRepository;
    private final ReviewImageRepository reviewImageRepository;

    @Transactional
    public void reviewImageInsert(Long reviewNo, List<ImageInsertRequestDto> requestDto) {
        try {
            Review review = reviewRepository.findById(reviewNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 리뷰가 없습니다. No. : " + reviewNo));

            for(int i=0; i<requestDto.size(); i++) {
                String boardImageType= requestDto.get(i).getImgType();
                String boardImageName = requestDto.get(i).getImgName();
                String boardImageUrl = requestDto.get(i).getImgUrl();
                Long boardImageSize = requestDto.get(i).getImgSize();
                String originName = boardImageName.substring(boardImageName.lastIndexOf("_")+1);
                String customName = boardImageName.substring(boardImageName.lastIndexOf("/")+1);
                String urlName = boardImageUrl;
                String extension = boardImageName.substring(boardImageName.lastIndexOf(".")+1);

                ReviewImage reviewImage = ReviewImage.builder()
                        .reviewImageType(boardImageType)
                        .review(review)
                        .reviewImageOrigin(originName)
                        .reviewImageCustom(customName)
                        .reviewImageUrl(urlName)
                        .reviewImageExtension(extension)
                        .reviewImageSize(boardImageSize)
                        .build();

                reviewImageRepository.save(reviewImage);
            }
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

}
