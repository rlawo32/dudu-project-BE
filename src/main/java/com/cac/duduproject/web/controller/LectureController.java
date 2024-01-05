package com.cac.duduproject.web.controller;

import com.cac.duduproject.service.lecture.LectureImageService;
import com.cac.duduproject.service.lecture.LectureListService;
import com.cac.duduproject.service.lecture.LectureWriteService;
import com.cac.duduproject.service.member.MemberService;
import com.cac.duduproject.util.ImageUploadUtil;
import com.cac.duduproject.web.dto.CommonResponseDto;
import com.cac.duduproject.web.dto.lecture.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@RequestMapping("/lecture")
public class LectureController {

    private final LectureWriteService lectureWriteService;
    private final LectureListService lectureListService;
    private final LectureImageService lectureImageService;
    private final MemberService memberService;
    private final ImageUploadUtil imageUploadUtil;

    @PostMapping("/write")
    public CommonResponseDto<?> lectureWrite(@RequestBody LectureWriteRequestDto requestDto) {
        return lectureWriteService.lectureWrite(requestDto);
    }

    @GetMapping("/lectureInstitutionList")
    public CommonResponseDto<?> lectureInstitutionList() {
        return lectureListService.findAllLectureInstitution();
    }

    @PostMapping("/insertLectureRoom")
    public CommonResponseDto<?> insertLectureRoom(@RequestBody LectureRoomRequestDto requestDto) {
        return lectureWriteService.insertLectureRoom(requestDto);
    }

    @GetMapping("/lectureRoomList")
    public CommonResponseDto<?> lectureRoomList(HttpServletRequest request) {
        return lectureListService.findAllLectureRoom(request);
    }

    @GetMapping("/lectureMainCategoryList")
    public CommonResponseDto<?> lectureMainCategoryList() {
        return lectureListService.findAllLectureMainCategory();
    }

    @PostMapping("/insertLectureSubCategory")
    public CommonResponseDto<?> insertLectureSubCategory(@RequestBody LectureSubCategoryRequestDto requestDto) {
        return lectureWriteService.insertLectureSubCategory(requestDto);
    }

    @GetMapping("/lectureSubCategoryList")
    public CommonResponseDto<?> lectureSubCategoryList(HttpServletRequest request) {
        return lectureListService.findAllLectureSubCategory(request);
    }

    @GetMapping("/lectureTeacherList")
    public CommonResponseDto<?> lectureTeacherList(HttpServletRequest request) {
        return memberService.findAllMemberList(request);
    }

    @PostMapping("/lectureList")
    public CommonResponseDto<?> lectureList(@RequestBody LectureListRequestDto requestDto) {
        return lectureListService.findAllLectureList(requestDto);
    }

    @PostMapping("/insertLectureEvent")
    public CommonResponseDto<?> insertLectureEvent(@RequestBody LectureEventRequestDto requestDto) {
        return lectureWriteService.insertLectureEvent(requestDto);
    }

    @GetMapping("/lectureEventOne")
    public CommonResponseDto<?> lectureEventOne(HttpServletRequest request) {
        return lectureListService.findLectureEvent(request);
    }

    @GetMapping("/lectureEventList")
    public CommonResponseDto<?> lectureEventList(HttpServletRequest request) {
        return lectureListService.findAllLectureEvent(request);
    }

    @GetMapping("/lectureStateList")
    public CommonResponseDto<?> lectureStateList() {
        return lectureListService.findAllLectureState();
    }

    @PostMapping("/lectureUploadImage")
    public CommonResponseDto<?> lectureUploadImage(@RequestPart("files") MultipartFile multipartFile, @RequestPart("type") String type) {
        return lectureImageService.lectureImageUploadS3(multipartFile, type);
    }

    @DeleteMapping("/lectureDeleteImage")
    public void lectureDeleteImage(HttpServletRequest request) {
        imageUploadUtil.ImageDeleteS3(request);
    }

}
