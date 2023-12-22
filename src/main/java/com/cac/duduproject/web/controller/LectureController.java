package com.cac.duduproject.web.controller;

import com.cac.duduproject.service.lecture.LectureService;
import com.cac.duduproject.service.member.MemberService;
import com.cac.duduproject.web.dto.CommonResponseDto;
import com.cac.duduproject.web.dto.lecture.LectureRoomRequestDto;
import com.cac.duduproject.web.dto.lecture.LectureSubCategoryRequestDto;
import com.cac.duduproject.web.dto.lecture.LectureWriteRequestDto;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/lecture")
public class LectureController {

    private final LectureService lectureService;
    private final MemberService memberService;

    @PostMapping("/write")
    public CommonResponseDto<?> lectureWrite(@RequestBody LectureWriteRequestDto requestDto) {
        return lectureService.lectureWrite(requestDto);
    }

    @GetMapping("/lectureInstitutionList")
    public CommonResponseDto<?> lectureInstitutionList() {
        return lectureService.findAllLectureInstitution();
    }

    @PostMapping("/insertLectureRoom")
    public CommonResponseDto<?> insertLectureRoom(@RequestBody LectureRoomRequestDto requestDto) {
        return lectureService.insertLectureRoom(requestDto);
    }

    @GetMapping("/lectureRoomList")
    public CommonResponseDto<?> lectureRoomList(HttpServletRequest request) {
        return lectureService.findAllLectureRoom(request);
    }

    @GetMapping("/lectureMainCategoryList")
    public CommonResponseDto<?> lectureMainCategoryList() {
        return lectureService.findAllLectureMainCategory();
    }

    @PostMapping("/insertLectureSubCategory")
    public CommonResponseDto<?> insertLectureSubCategory(@RequestBody LectureSubCategoryRequestDto requestDto) {
        return lectureService.insertLectureSubCategory(requestDto);
    }

    @GetMapping("/lectureSubCategoryList")
    public CommonResponseDto<?> lectureSubCategoryList(HttpServletRequest request) {
        return lectureService.findAllLectureSubCategory(request);
    }

    @GetMapping("/lectureTeacherList")
    public CommonResponseDto<?> lectureTeacherList(HttpServletRequest request) {
        return memberService.findAllMemberList(request);
    }
}
