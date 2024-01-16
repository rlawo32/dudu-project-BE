package com.cac.duduproject.service.board;

import com.cac.duduproject.jpa.domain.lecture.LectureInstitution;
import com.cac.duduproject.jpa.repository.board.BoardRepository;
import com.cac.duduproject.jpa.repository.lecture.LectureInstitutionRepository;
import com.cac.duduproject.web.dto.CommonResponseDto;
import com.cac.duduproject.web.dto.board.BoardWriteRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class BoardWriteService {

    private final BoardRepository boardRepository;
    private final LectureInstitutionRepository lectureInstitutionRepository;

    private final BoardImageService boardImageService;

    @Transactional
    public CommonResponseDto<?> boardWrite(BoardWriteRequestDto requestDto) {
        try {
            LectureInstitution lectureInstitution = lectureInstitutionRepository.findById(requestDto.getBoardInstitution())
                    .orElseThrow(() -> new IllegalArgumentException("해당 번호가 없습니다. ID : " + requestDto.getBoardInstitution()));
            requestDto.setLectureInstitution(lectureInstitution);

            Long boardNo = boardRepository.save(requestDto.toBoard()).getBoardNo();

            boardImageService.boardImageInsert(boardNo, requestDto.getBoardImage());
        } catch (Exception e) {
            return CommonResponseDto.setFailed("Data Base Error!");
        }
        return CommonResponseDto.setSuccess("Lecture Write Success", null);
    }
}
