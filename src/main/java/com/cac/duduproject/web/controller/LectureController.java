package com.cac.duduproject.web.controller;

import com.cac.duduproject.service.lecture.*;
import com.cac.duduproject.service.member.MemberSelectService;
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
    private final LectureApplicationService lectureApplicationService;
    private final LectureListService lectureListService;
    private final LectureEventService lectureEventService;
    private final LectureImageService lectureImageService;
    private final MemberSelectService memberSelectService;

    private final ImageUploadUtil imageUploadUtil;

    @PostMapping("/lectureWrite")
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
        return lectureListService.findLectureRoom(request);
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
        return lectureListService.findLectureSubCategory(request);
    }

    @GetMapping("/lectureSubCategoryListAll")
    public CommonResponseDto<?> lectureSubCategoryListAll() {
        return lectureListService.findAllLectureSubCategory();
    }

    @GetMapping("/lectureTeacherList")
    public CommonResponseDto<?> lectureTeacherList(HttpServletRequest request) {
        return memberSelectService.findAllMemberList(request);
    }

    @PostMapping("/lectureList")
    public CommonResponseDto<?> lectureList(@RequestBody LectureListRequestDto requestDto) {
        return lectureListService.findAllLectureList(requestDto);
    }

    @PostMapping("/insertLectureEvent")
    public CommonResponseDto<?> insertLectureEvent(@RequestBody LectureEventWriteRequestDto requestDto) {
        return lectureWriteService.insertLectureEvent(requestDto);
    }

    @GetMapping("/lectureEventDetail")
    public CommonResponseDto<?> lectureEventDetail(HttpServletRequest request) {
        return lectureEventService.findLectureEventDetail(request);
    }

    @PostMapping("/lectureEventAll")
    public CommonResponseDto<?> lectureEventAll(LectureEventListRequestDto requestDto) {
        return lectureEventService.findAllLectureEvent(requestDto);
    }

    @PostMapping("/lectureEventList")
    public CommonResponseDto<?> lectureEventList(@RequestBody LectureEventListRequestDto requestDto) {
        return lectureEventService.findLectureEventList(requestDto);
    }

    @GetMapping("/lectureEventCatalog")
    public CommonResponseDto<?> lectureEventCatalog(HttpServletRequest request) {
        return lectureEventService.findLectureEventCatalog(request);
    }

    @DeleteMapping("/lectureDeleteEvent")
    public void lectureDeleteEvent(HttpServletRequest request) {
        lectureEventService.lectureEventDelete(request);
    }

    @DeleteMapping("/lectureDeleteEventList")
    public void lectureDeleteEventList(HttpServletRequest request) {
        lectureEventService.lectureEventListDelete(request);
    }

    @GetMapping("/lectureStateList")
    public CommonResponseDto<?> lectureStateList() {
        return lectureListService.findAllLectureState();
    }

    @PostMapping("/lectureUploadImage")
    public CommonResponseDto<?> lectureUploadImage(@RequestPart("files") MultipartFile multipartFile, @RequestPart("type") String type) {
        return imageUploadUtil.imageUploadS3(multipartFile, type);
    }

    @DeleteMapping("/lectureDeleteImage")
    public void lectureDeleteImage(HttpServletRequest request) {
        imageUploadUtil.ImageDeleteS3(request);
    }

    @GetMapping("/lectureDetail")
    public CommonResponseDto<?> lectureDetail(HttpServletRequest request) {
        return lectureListService.findLectureDetail(request);
    }

    @PostMapping("/lectureEventType")
    public CommonResponseDto<?> lectureEventType(@RequestBody LectureListRequestDto requestDto) {
        return lectureListService.findLectureEventType(requestDto);
    }

    @PostMapping("/insertMainEvent")
    public CommonResponseDto<?> insertMainEvent(@RequestBody LectureEventWriteRequestDto requestDto) {
        return lectureWriteService.insertLectureMainEvent(requestDto);
    }

    @GetMapping("/eventCategoryList")
    public CommonResponseDto<?> eventCategoryList(HttpServletRequest request) {
        return lectureListService.findEventCategoryList(request);
    }

    @PostMapping("/insertInstitutionImage")
    public void insertInstitutionImage(@RequestBody LectureInstitutionRequestDto requestDto) {
        lectureImageService.lectureImageInsert(requestDto.getInstitutionNo(), requestDto.getInstitutionImage(), "I");
    }

    @GetMapping("/lectureInstitutionImageList")
    public CommonResponseDto<?> lectureInstitutionImageList(HttpServletRequest request) {
        return lectureImageService.findLectureInstitutionImage(request);
    }

    @DeleteMapping("/lectureInstitutionImageDelete")
    public CommonResponseDto<?> lectureInstitutionImageDelete(HttpServletRequest request) {
        return lectureImageService.deleteLectureInstitutionImage(request);
    }

    @PostMapping("/lectureApplicationInsert")
    public CommonResponseDto<?> lectureApplicationInsert(@RequestBody LectureApplicationWriteRequestDto requestDto) {
        return lectureApplicationService.lectureApplicationWrite(requestDto);
    }

    @PostMapping("/lectureApplicationList")
    public CommonResponseDto<?> lectureApplicationList(@RequestBody LectureApplicationListRequestDto requestDto) {
        return lectureApplicationService.findAllLectureApplicationList(requestDto);
    }
}
