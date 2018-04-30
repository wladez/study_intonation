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

    @Select("SELECT ID FROM courses WHERE dirname=#{dirName}")
    Long getIdByDirName(final String dirName);

    @Insert("INSERT INTO courses (dirname, title, description, logo, difficulty, category, releaseDate) VALUES " +
            "(#{title}, #{description}, #{logo}, #{difficulty}, #{category}, #{releaseDate})")
    @Options(useGeneratedKeys = true, keyColumn = "ID")
    Long create(Course course);
}
