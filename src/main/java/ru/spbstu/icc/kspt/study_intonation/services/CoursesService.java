package ru.spbstu.icc.kspt.study_intonation.services;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.spbstu.icc.kspt.study_intonation.dao.CoursesMapper;
import ru.spbstu.icc.kspt.study_intonation.dao.TasksMapper;
import ru.spbstu.icc.kspt.study_intonation.entities.Course;
import ru.spbstu.icc.kspt.study_intonation.entities.Lesson;

import java.util.List;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class CoursesService {

    private CoursesMapper coursesMapper;
    private TasksMapper tasksMapper;

    public List<Course> showAll() {
        return coursesMapper.getAll();
    }

    public List<Course> showAllNonUnique() {
        List<Course> courses = showAll();
        for (Course c: courses) {
            for (Lesson lesson : c.getLessons()) {
                lesson.setTasks(tasksMapper.getNonUniqueTasks(lesson.getId() ,c.getId()));
            }
        }
        return courses;
    }

    public Long create(Course course) {
        return coursesMapper.create(course);
    }
}
