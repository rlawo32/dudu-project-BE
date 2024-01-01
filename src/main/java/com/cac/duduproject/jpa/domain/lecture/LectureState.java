package com.cac.duduproject.jpa.domain.lecture;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
@Getter
@Table(name = "Lecture_State")
public class LectureState {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lecture_state_no")
    private Long lectureStateNo;

    @Column(name = "lecture_state_name")
    @NotEmpty
    private String lectureStateName;

    @Column(name = "lecture_state_desc")
    @NotBlank
    private String lectureStateDesc;

    @Builder
    public LectureState(String lectureStateName, String lectureStateDesc) {
        this.lectureStateName = lectureStateName;
        this.lectureStateDesc = lectureStateDesc;
    }
}
