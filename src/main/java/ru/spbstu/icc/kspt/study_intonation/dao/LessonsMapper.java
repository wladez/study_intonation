package ru.spbstu.icc.kspt.study_intonation.dao;

import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;
import ru.spbstu.icc.kspt.study_intonation.entities.Lesson;

import java.util.List;

@Mapper
@Component
public interface LessonsMapper {

    @Select("SELECT ID, courseID, title, description, shortDescription, duration, logo " +
            "FROM lessons WHERE courseID = #{id}")
    @Results({@Result(property = "id", column = "ID"),
            @Result(property = "tasks", javaType = List.class, column = "ID",
                    many = @Many(select = "ru.spbstu.icc.kspt.study_intonation.dao.TasksMapper.getTasksByLessonID"))})
    List<Lesson> getLessonsByCourseID(final Long id);

    @Select("SELECT ID, courseID, title, description, shortDescription, duration, logo " +
            "FROM lessons WHERE courseID = #{id}")
    List<Lesson> getNonUniqueLessons(final Long id);

    @Select("SELECT ID, courseID, title, description, shortDescription, duration, logo FROM lessons")
    @Results({@Result(property = "id", column = "ID"),
            @Result(property = "tasks", javaType = List.class, column = "ID",
                    many = @Many(select = "ru.spbstu.icc.kspt.study_intonation.dao.TasksMapper.getTasksByLessonID"))})
    List<Lesson> getAll();

    @Insert("INSERT INTO lessons (courseID, title, description, shortDescription, duration, logo) VALUES " +
            "(#{courseId}, #{title}, #{description}, #{shortDescription}, #{duration}, #{logo})")
    @Options(useGeneratedKeys = true, keyColumn = "id")
    Long create(final Lesson lesson);
}
