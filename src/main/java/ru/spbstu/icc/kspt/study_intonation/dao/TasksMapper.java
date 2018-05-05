package ru.spbstu.icc.kspt.study_intonation.dao;

import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;
import ru.spbstu.icc.kspt.study_intonation.entities.Task;

import java.util.List;

@Mapper
@Component
public interface TasksMapper {
    @Select("SELECT ID, instruction, text, pathToAudio, pitch, textMarkup " +
            "FROM tasks WHERE lessonID = #{id}")
    List<Task> getTasksByLessonAndCourseID(final Long id);

    @Select("SELECT ID, lessonID, courseID, instruction, text, pathToAudio, pitch, textMarkup " +
            "FROM tasks WHERE lessonID = #{lessonId} AND courseID = #{courseId}")
    List<Task> getNonUniqueTasks(@Param("lessonId") final Long lessonId, @Param("courseId") final Long courseId);

    @Select("SELECT ID, instruction, text, pathToAudio, pitch, textMarkup "
            + "FROM tasks "
            + "JOIN lesson_task ON tasks.id=lesson_task.taskID "
            + "WHERE lesson_task.lessonID = #{id} "
            + "AND deleted = 0")
    @Results({@Result(property = "id", column = "id", id = true)})
    List<Task> getTasksByLessonID(final Long id);

    @Select("SELECT ID, instruction, text, pathToAudio, pitch, textMarkup FROM tasks WHERE deleted = 0")
    List<Task> getAll();

    @Select("SELECT ID, instruction, text, pathToAudio, pitch, textMarkup FROM tasks WHERE text = #{text}")
    Task getByText(final String text);

    @Select("SELECT ID, instruction, text, pathToAudio, pitch, textMarkup FROM tasks WHERE id = #{id}")
    Task get(final Long id);

    @Insert("INSERT INTO tasks (instruction, text) VALUES " +
            "(#{instruction}, #{text})")
    @Options(useGeneratedKeys = true, keyColumn = "id")
    Long create(final Task task);

    @Update("UPDATE tasks " +
            "SET instruction = #{instruction}, text = #{text} " +
            "WHERE id = #{id}")
    Boolean update(final Task task);

    @Update("UPDATE tasks SET deleted = 1 WHERE ID = #{id}")
    Boolean delete(final Long id);
}
