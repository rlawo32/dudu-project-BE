package com.cac.duduproject.jpa.domain.lecture;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
@Getter
@Table(name = "Lecture_Institution")
public class LectureInstitution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "institution_no")
    private Long institutionNo;

    @Column(name = "institution_name")
    @NotBlank
    private String institutionName;

    @Column(name = "institution_position")
    @NotBlank
    private String institutionPosition;

    @Column(name = "institution_contact")
    @NotBlank
    private String institutionContact;

    @Builder
    public LectureInstitution(String institutionName, String institutionPosition, String institutionContact) {
        this.institutionName = institutionName;
        this.institutionPosition = institutionPosition;
        this.institutionContact = institutionContact;
    }
}
