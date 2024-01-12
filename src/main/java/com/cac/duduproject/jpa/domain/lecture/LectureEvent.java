package com.cac.duduproject.jpa.domain.lecture;

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
@Table(name = "Lecture_Event")
public class LectureEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lecture_event_no")
    private Long lectureEventNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "institution_no")
    private LectureInstitution lectureInstitution;

    @Column(name = "lecture_event_type")
    @NotEmpty
    private String lectureEventType; // L : 강좌 상단에 표시될 이벤트, M : 메인화면에 표시될 이벤트

    @Column(name = "lecture_event_name")
    @NotEmpty
    private String lectureEventName;

    @Column(name = "lecture_event_desc")
    @NotBlank
    private String lectureEventDesc;

    @Column(name = "lecture_event_thumbnail")
    @NotBlank
    private String lectureEventThumbnail;

    @Column(name = "lecture_event_created_date")
    @NotBlank
    private String lectureEventCreatedDate;

    @PrePersist
    public void onPrePersist() {
        this.lectureEventCreatedDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd_HH:mm"));
    }

    @Builder
    public LectureEvent(LectureInstitution lectureInstitution, String lectureEventName,
                        String lectureEventDesc, String lectureEventThumbnail) {
        this.lectureInstitution = lectureInstitution;
        this.lectureEventName = lectureEventName;
        this.lectureEventDesc = lectureEventDesc;
        this.lectureEventThumbnail = lectureEventThumbnail;
    }
}
