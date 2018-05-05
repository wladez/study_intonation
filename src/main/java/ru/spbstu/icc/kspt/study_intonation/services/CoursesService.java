package ru.spbstu.icc.kspt.study_intonation.services;

import com.sun.javaws.exceptions.InvalidArgumentException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.spbstu.icc.kspt.study_intonation.dao.CoursesMapper;
import ru.spbstu.icc.kspt.study_intonation.dao.LessonsMapper;
import ru.spbstu.icc.kspt.study_intonation.dao.TasksMapper;
import ru.spbstu.icc.kspt.study_intonation.entities.Course;
import ru.spbstu.icc.kspt.study_intonation.entities.Lesson;
import ru.spbstu.icc.kspt.study_intonation.utilities.ValidationUtility;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class CoursesService {

    private LessonsService lessonsService;

    private CoursesMapper coursesMapper;
    private TasksMapper tasksMapper;
    private LessonsMapper lessonsMapper;

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

    public Course getById(Long id) {
        return coursesMapper.getById(id);
    }

    public Long create(final Course course) {
        coursesMapper.create(course);
        return course.getId();
    }

    public void delete(final Long id) {
        if (!ValidationUtility.isValidId(id))
            throw new RuntimeException("Invalid courseID for deleting!");

        List<Lesson> lessons = lessonsService.getAllByCourseID(id);

        if (!coursesMapper.delete(id)) {
            throw new RuntimeException("Course not found!");
        }
        else {
            lessons.forEach(lesson -> coursesMapper.removeLessonFromCourse(id,lesson.getId()));
        }
    }

    public Course update(final Course course) {
        if (ValidationUtility.isEmpty(course))
            throw new RuntimeException("Course is not specified");
        return tryUpdate(course);
    }

    private Course tryUpdate(final Course fromReq) {
        if (!ValidationUtility.isValidId(fromReq.getId())) {
            throw new RuntimeException("Course id is invalid");
        }

        List<Lesson> lessonsFromRequest = fromReq.getLessons();

        if (lessonsFromRequest == null || ValidationUtility.hasEmptyElements(lessonsFromRequest))
            throw new RuntimeException("LessonsList from request is not valid");

        Course fromDB = coursesMapper.getById(fromReq.getId());

        updateFields(fromDB, fromReq);

        coursesMapper.update(fromDB);

        return coursesMapper.getById(fromReq.getId());
    }

    private void updateFields(Course fromDB, Course fromReq) {
        updateTitle(fromDB, fromReq);
        updateDescription(fromDB, fromReq);
        updateDifficulty(fromDB, fromReq);
        updateCategory(fromDB, fromReq);
        updateReleaseDate(fromDB, fromReq);
        fromDB.setLogo(fromReq.getLogo());
        updateLessons(fromDB, new HashSet<>(fromReq.getLessons()));
    }

    private void updateTitle(Course fromDB, Course fromReq) {
        if (ValidationUtility.isEmpty(fromReq.getTitle())) {
            throw new RuntimeException("Title of course can't be empty");
        }
        fromDB.setTitle(fromReq.getTitle());
    }

    private void updateDescription(Course fromDB, Course fromReq) {
        if (ValidationUtility.isEmpty(fromReq.getDescription())) {
            throw new RuntimeException("Description of course can't be empty");
        }
        fromDB.setDescription(fromReq.getDescription());
    }

    private void updateDifficulty(Course fromDB, Course fromReq) {
        if (ValidationUtility.isEmpty(fromReq.getDifficulty())) {
            throw new RuntimeException("Difficulty of course can't be empty");
        }
        fromDB.setDifficulty(fromReq.getDifficulty());
    }

    private void updateCategory(Course fromDB, Course fromReq) {
        if (ValidationUtility.isEmpty(fromReq.getCategory())) {
            throw new RuntimeException("Category of course can't be empty");
        }
        fromDB.setCategory(fromReq.getCategory());
    }

    private void updateReleaseDate(Course fromDB, Course fromReq) {
        if (ValidationUtility.isEmpty(fromReq.getReleaseDate())) {
            throw new RuntimeException("ReleaseDate of course can't be empty");
        }
        fromDB.setReleaseDate(fromReq.getReleaseDate());
    }

    private void updateLessons(Course fromDB, Set<Lesson> requestLessons) {
        addLessons(fromDB, requestLessons);

        updateExistingLessons(fromDB, requestLessons);

        deleteCourseLessons(fromDB, requestLessons);
    }

    private void addLessons(Course fromDB, Set<Lesson> requestLessons) {
        final Set<Lesson> newLessons = new HashSet<>(requestLessons);

        newLessons.removeIf(lesson -> fromDB.getLessons().stream()
                                        .anyMatch(t -> t.getId().equals(lesson.getId())));

        final List<Lesson> allLessonsFromDB = lessonsMapper.getAll();

        newLessons.forEach(newLesson -> {
            createNonexistentTasks(allLessonsFromDB, newLesson);
            coursesMapper.addLessonToCourse(fromDB.getId(), newLesson.getId());
        });
    }

    private void createNonexistentTasks(List<Lesson> allLessonsFromDB, Lesson newLesson) {
        if (!allLessonsFromDB.contains(newLesson)) {
            lessonsMapper.create(newLesson);
        }
    }

    private void updateExistingLessons(Course fromDB, Set<Lesson> requestLessons) {
        final Set<Lesson> updatedLessons = new HashSet<>(requestLessons);
        updatedLessons.removeIf(reqTask -> fromDB.getLessons().stream()
                                               .noneMatch(t -> t.getId().equals(reqTask.getId())
                                                       && !t.getTitle().equals(reqTask.getTitle())));

        updatedLessons.forEach(lessonForUpdate -> lessonsService.update(lessonForUpdate));
    }

    private void deleteCourseLessons(Course fromDB, Set<Lesson> requestLessons) {
        final Set<Lesson> deletedLessons = new HashSet<>(fromDB.getLessons());

        deletedLessons.removeIf(delLesson -> requestLessons.stream()
                                                     .anyMatch(lesson -> delLesson.getId().equals(lesson.getId())));

        deletedLessons.forEach(lesson -> coursesMapper.removeLessonFromCourse(fromDB.getId(), lesson.getId()));
    }
}
