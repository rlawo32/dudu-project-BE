package com.cac.duduproject.jpa.domain.lecture;

import com.cac.duduproject.jpa.domain.member.Member;
import com.cac.duduproject.jpa.repository.lecture.LectureInstitutionRepository;
import com.cac.duduproject.jpa.repository.lecture.LectureRepository;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@NoArgsConstructor
@Entity
@Getter
@Table(name = "Lecture_Room")
public class LectureRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lecture_room_no")
    private Long lectureRoomNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "institution_no")
    private LectureInstitution lectureInstitution;

    @Column(name = "lecture_room_name")
    @NotEmpty
    private String lectureRoomName;

    @Column(name = "lecture_room_contact")
    @NotBlank
    private String lectureRoomContact;

    @Builder
    public LectureRoom(LectureInstitution lectureInstitution, String lectureRoomName, String lectureRoomContact) {
        this.lectureInstitution = lectureInstitution;
        this.lectureRoomName = lectureRoomName;
        this.lectureRoomContact = lectureRoomContact;
    }
}
