package ru.spbstu.icc.kspt.study_intonation.services;

import com.sun.javaws.exceptions.InvalidArgumentException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.spbstu.icc.kspt.study_intonation.dao.CoursesMapper;
import ru.spbstu.icc.kspt.study_intonation.dao.TasksMapper;
import ru.spbstu.icc.kspt.study_intonation.entities.Course;
import ru.spbstu.icc.kspt.study_intonation.entities.Lesson;
import ru.spbstu.icc.kspt.study_intonation.utilities.ValidationUtility;

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

    public Long create(final Course course) {
        return coursesMapper.create(course);
    }

    public Course update(final Course course) {
        if (ValidationUtility.isEmpty(course))
            throw new RuntimeException("Course is not specified");
        return tryUpdate(course);
    }

    private Course tryUpdate(final Course course) {
        if (!ValidationUtility.isValidId(course.getId())) {
            throw new RuntimeException("Course id is invalid");
        }

        if (coursesMapper.update(course))
            return course;
        else throw new RuntimeException("Update failed");
    }
}
