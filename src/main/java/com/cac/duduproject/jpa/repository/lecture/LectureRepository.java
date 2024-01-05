package com.cac.duduproject.jpa.repository.lecture;

import com.cac.duduproject.jpa.domain.lecture.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LectureRepository extends JpaRepository<Lecture, Long>, LectureRepositoryCustom {

    @Query("SELECT l.lectureNo, l.lectureReception FROM Lecture l")
    List<Lecture> findAllLectureNoAndLectureReception();
    List<Lecture> findAllByLectureEvent(LectureEvent lectureEvent);
    @Query("SELECT l FROM Lecture l WHERE l.lectureInstitution = :lectureInstitution AND " +
            "(l.lectureTitle LIKE CONCAT('%', :searchText, '%') OR l.lectureDivision LIKE CONCAT('%', :searchText, '%')) AND " +
            "l.lectureDivision LIKE CONCAT('%', :searchDivision, '%')")
    List<Lecture> findAllBySearch(@Param("lectureInstitution") LectureInstitution lectureInstitution, @Param("searchText") String searchText,
                                  @Param("searchDivision") String searchDivision);

    @Query("SELECT l FROM Lecture l WHERE l.lectureInstitution = :lectureInstitution AND " +
            "l.lectureMainCategory = :lectureMainCategory AND" +
            "(l.lectureTitle LIKE CONCAT('%', :searchText, '%') OR l.lectureDivision LIKE CONCAT('%', :searchText, '%')) AND " +
            "l.lectureDivision LIKE CONCAT('%', :searchDivision, '%')")
    List<Lecture> findAllByMainCategorySearch(@Param("lectureInstitution") LectureInstitution lectureInstitution,
                                              @Param("lectureMainCategory") LectureMainCategory lectureMainCategory,
                                              @Param("searchText") String searchText, @Param("searchDivision") String searchDivision);

    @Query("SELECT l FROM Lecture l WHERE l.lectureInstitution = :lectureInstitution AND " +
            "l.lectureState = :lectureState AND" +
            "(l.lectureTitle LIKE CONCAT('%', :searchText, '%') OR l.lectureDivision LIKE CONCAT('%', :searchText, '%')) AND " +
            "l.lectureDivision LIKE CONCAT('%', :searchDivision, '%')")
    List<Lecture> findAllByLectureStateSearch(@Param("lectureInstitution") LectureInstitution lectureInstitution,
                                              @Param("lectureState") LectureState lectureState, @Param("searchText") String searchText,
                                              @Param("searchDivision") String searchDivision);

    @Query("SELECT l FROM Lecture l WHERE l.lectureInstitution = :lectureInstitution AND " +
            "l.lectureMainCategory = :lectureMainCategory AND l.lectureState = :lectureState AND " +
            "(l.lectureTitle LIKE CONCAT('%', :searchText, '%') OR l.lectureDivision LIKE CONCAT('%', :searchText, '%')) AND " +
            "l.lectureDivision LIKE CONCAT('%', :searchDivision, '%')")
    List<Lecture> findAllByMainCategoryAndLectureStateSearch(@Param("lectureInstitution") LectureInstitution lectureInstitution,
                                                             @Param("lectureMainCategory") LectureMainCategory lectureMainCategory,
                                                             @Param("lectureState") LectureState lectureState,
                                                             @Param("searchText") String searchText, @Param("searchDivision") String searchDivision);

    @Query("SELECT l FROM Lecture l WHERE l.lectureInstitution = :lectureInstitution AND " +
            "l.lectureMainCategory = :lectureMainCategory AND l.lectureSubCategory = :lectureSubCategory AND " +
            "(l.lectureTitle LIKE CONCAT('%', :searchText, '%') OR l.lectureDivision LIKE CONCAT('%', :searchText, '%')) AND " +
            "l.lectureDivision LIKE CONCAT('%', :searchDivision, '%')")
    List<Lecture> findAllByMainCategoryAndSubCategorySearch(@Param("lectureInstitution") LectureInstitution lectureInstitution,
                                                            @Param("lectureMainCategory") LectureMainCategory lectureMainCategory,
                                                            @Param("lectureSubCategory") LectureSubCategory lectureSubCategory,
                                                            @Param("searchText") String searchText, @Param("searchDivision") String searchDivision);

    @Query("SELECT l FROM Lecture l WHERE l.lectureInstitution = :lectureInstitution AND " +
            "l.lectureMainCategory = :lectureMainCategory AND l.lectureState = :lectureState AND " +
            "l.lectureSubCategory = :lectureSubCategory AND " +
            "(l.lectureTitle LIKE CONCAT('%', :searchText, '%') OR l.lectureDivision LIKE CONCAT('%', :searchText, '%')) AND " +
            "l.lectureDivision LIKE CONCAT('%', :searchDivision, '%')")
    List<Lecture> findAllByMainCategoryAndLectureStateAndSubCategorySearch(@Param("lectureInstitution") LectureInstitution lectureInstitution,
                                                                           @Param("lectureMainCategory") LectureMainCategory lectureMainCategory,
                                                                           @Param("lectureState") LectureState lectureState,
                                                                           @Param("lectureSubCategory") LectureSubCategory lectureSubCategory,
                                                                           @Param("searchText") String searchText, @Param("searchDivision") String searchDivision);
}
