package ru.spbstu.icc.kspt.study_intonation.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;
import ru.spbstu.icc.kspt.study_intonation.entities.Task;

import java.util.List;

@Mapper
@Component
public interface TasksMapper {
    @Select("SELECT ID, lessonID, courseID, instruction, text, pathToAudio, pitch, textMarkup " +
            "FROM tasks WHERE lessonID = #{id}")
    List<Task> getTasksByLessonAndCourseID(final Long id);

    @Select("SELECT ID, lessonID, courseID, instruction, text, pathToAudio, pitch, textMarkup " +
            "FROM tasks WHERE lessonID = #{lessonId} AND courseID = #{courseId}")
    List<Task> getNonUniqueTasks(@Param("lessonId") final Long lessonId, @Param("courseId") final Long courseId);
}
