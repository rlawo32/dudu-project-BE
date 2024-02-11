package com.cac.duduproject.service.community;

import com.cac.duduproject.jpa.domain.community.Board;
import com.cac.duduproject.jpa.domain.community.BoardImage;
import com.cac.duduproject.jpa.repository.community.BoardImageRepository;
import com.cac.duduproject.jpa.repository.community.BoardRepository;
import com.cac.duduproject.web.dto.ImageInsertRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class BoardImageService {

    private final BoardRepository boardRepository;
    private final BoardImageRepository boardImageRepository;

    @Transactional
    public void boardImageInsert(Long boardNo, List<ImageInsertRequestDto> requestDto) {
        try {
            Board board = boardRepository.findById(boardNo)
                    .orElseThrow(() -> new IllegalArgumentException("해당 강의가 없습니다. No. : " + boardNo));

            for(int i=0; i<requestDto.size(); i++) {
                String boardImageType= requestDto.get(i).getImgType();
                String boardImageName = requestDto.get(i).getImgName();
                String boardImageUrl = requestDto.get(i).getImgUrl();
                Long boardImageSize = requestDto.get(i).getImgSize();
                String originName = boardImageName.substring(boardImageName.lastIndexOf("_")+1);
                String customName = boardImageName.substring(boardImageName.lastIndexOf("/")+1);
                String urlName = boardImageUrl;
                String extension = boardImageName.substring(boardImageName.lastIndexOf(".")+1);

                BoardImage boardImage = BoardImage.builder()
                        .boardImageType(boardImageType)
                        .board(board)
                        .boardImageOrigin(originName)
                        .boardImageCustom(customName)
                        .boardImageUrl(urlName)
                        .boardImageExtension(extension)
                        .boardImageSize(boardImageSize)
                        .build();

                boardImageRepository.save(boardImage);
            }
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

}
