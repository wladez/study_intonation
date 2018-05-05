package ru.spbstu.icc.kspt.study_intonation.dao;

import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;
import ru.spbstu.icc.kspt.study_intonation.entities.Course;

import java.util.List;

@Mapper
@Component
public interface CoursesMapper {
    @Select("SELECT ID, title, description, difficulty, category, releaseDate, logo " +
            "FROM courses")
    @Results({@Result(property = "id", column = "ID"),
            @Result(property = "lessons", javaType = List.class, column = "ID",
                    many = @Many(select = "ru.spbstu.icc.kspt.study_intonation.dao.LessonsMapper.getLessonsByCourseID"))})
    List<Course> getAll();

    @Select("SELECT ID, title, description, difficulty, category, releaseDate, logo " +
            "FROM courses WHERE id = #{courseID}")
    @Results({@Result(property = "id", column = "ID"),
            @Result(property = "lessons", javaType = List.class, column = "ID",
                    many = @Many(select = "ru.spbstu.icc.kspt.study_intonation.dao.LessonsMapper.getLessonsByCourseID"))})
    Course getById(final Long courseID);

    @Select("SELECT ID FROM courses WHERE dirname=#{dirName}")
    Long getIdByDirName(final String dirName);

    @Insert("INSERT INTO courses (title, description, logo, difficulty, category, releaseDate) VALUES " +
            "(#{title}, #{description}, #{logo}, #{difficulty}, #{category}, #{releaseDate})")
    @Options(useGeneratedKeys = true, keyColumn = "ID")
    Long create(final Course course);

    @Update("UPDATE courses " +
            "SET title = #{title}, description = #{description}, difficulty = #{difficulty}, category = #{category}, " +
            "releaseDate = #{releaseDate}, logo = #{logo} " +
            "WHERE id = #{id}")
    Boolean update(final Course course);

    @Insert("INSERT INTO course_lesson (courseID, lessonID) " +
            "VALUES (#{courseID}, #{lessonID})")
    Boolean addLessonToCourse(@Param("courseID") final Long courseID,
                            @Param("lessonID") final Long lessonID);

    @Update("UPDATE course_lesson SET lessonID = #{newLessonID} WHERE lessonID = #{lessonID} AND courseID = #{courseID}")
    Boolean updateLessonToCourse(@Param("courseID") final Long courseID,
                                 @Param("lessonID") final Long lessonID,
                                 @Param("newLessonID") final Long newLessonID);

    @Delete("DELETE FROM course_lesson WHERE courseID = #{courseID} "
            + "AND lessonID = #{lessonID} ")
    Boolean removeLessonFromCourse(
            @Param("courseID") final Long courseID,
            @Param("lessonID") final Long lessonID
    );

    @Delete("DELETE FROM courses WHERE id = #{id}")
    Boolean delete(final Long id);
}
