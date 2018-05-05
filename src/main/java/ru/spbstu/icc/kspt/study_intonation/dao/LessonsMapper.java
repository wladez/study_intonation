package ru.spbstu.icc.kspt.study_intonation.dao;

import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;
import ru.spbstu.icc.kspt.study_intonation.entities.Lesson;

import java.util.List;

@Mapper
@Component
public interface LessonsMapper {

    @Select("SELECT ID, title, description, shortDescription, duration, logo " +
            "FROM lessons " +
            "JOIN course_lesson ON lessons.id=course_lesson.lessonID " +
            "WHERE course_lesson.courseID = #{id}")
    @Results({@Result(property = "id", column = "ID", id = true),
            @Result(property = "tasks", javaType = List.class, column = "ID",
                    many = @Many(select = "ru.spbstu.icc.kspt.study_intonation.dao.TasksMapper.getTasksByLessonID"))})
    List<Lesson> getLessonsByCourseID(final Long id);

    @Select("SELECT ID, courseID, title, description, shortDescription, duration, logo " +
            "FROM lessons WHERE courseID = #{id}")
    List<Lesson> getNonUniqueLessons(final Long id);

    @Select("SELECT ID, title, description, shortDescription, duration, logo FROM lessons")
    @Results({@Result(property = "id", column = "ID"),
            @Result(property = "tasks", javaType = List.class, column = "ID",
                    many = @Many(select = "ru.spbstu.icc.kspt.study_intonation.dao.TasksMapper.getTasksByLessonID"))})
    List<Lesson> getAll();

    @Select("SELECT ID, title, description, shortDescription, duration, logo FROM lessons WHERE id = #{lessonID}")
    @Results({@Result(property = "id", column = "ID"),
            @Result(property = "tasks", javaType = List.class, column = "ID",
                    many = @Many(select = "ru.spbstu.icc.kspt.study_intonation.dao.TasksMapper.getTasksByLessonID"))})
    Lesson getWithTasks(final Long lessonID);

    @Insert("INSERT INTO lesson_task (lessonID, taskID) " +
            "VALUES (#{lessonID}, #{taskID})")
    Boolean addTaskToLesson(@Param("lessonID") final Long lessonID,
                            @Param("taskID") final Long taskID);

    @Update("UPDATE lesson_task SET taskID = #{newTaskID} WHERE lessonID = #{lessonID} AND taskID = #{taskID}")
    Boolean updateTaskToLesson(@Param("lessonID") final Long lessonID,
                                @Param("taskID") final Long taskID,
                                @Param("newTaskID") final Long newTaskID);

    @Delete("DELETE FROM lesson_task WHERE taskID = #{taskID} "
            + "AND lessonID = #{lessonID} ")
    Boolean removeTaskFromLesson(
            @Param("lessonID") final Long lessonID,
            @Param("taskID") final Long taskID
    );

    @Insert("INSERT INTO lessons (title, description, shortDescription, duration, logo) VALUES " +
            "(#{lesson.title}, #{lesson.description}, #{lesson.shortDescription}, #{lesson.duration}, #{lesson.logo})")
    @Options(useGeneratedKeys = true, keyProperty="lesson.id", keyColumn = "id")
    Long create(@Param("lesson") final Lesson lesson);

    @Update("UPDATE lessons " +
            "SET title = #{title}, description = #{description}, shortDescription = #{shortDescription}, " +
            "duration = #{duration}, logo = #{logo} " +
            "WHERE id = #{id}")
    Boolean update(final Lesson lesson);

    @Update("UPDATE lessons SET deleted = 1 WHERE ID = #{id}")
    Boolean delete(final Long id);
}
