package ru.spbstu.icc.kspt.study_intonation.services;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import ru.spbstu.icc.kspt.study_intonation.entities.Course;
import ru.spbstu.icc.kspt.study_intonation.entities.Lesson;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:test-application-context.xml")
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class CoursesServiceTest {
    private static final Long INVALID_ID = -1L;
    private static final Long ID_NOT_IN_TABLE = 100L;
    private static final Long DEFAULT_ID = 1L;

    @Autowired
    private CoursesService coursesService;

    @Autowired
    private LessonsService lessonsService;

    @Test
    public void successfullyDelete() {
        coursesService.delete(DEFAULT_ID);

        List<Lesson> lessons = lessonsService.getAllByCourseID(DEFAULT_ID);
        assertThat(lessons.isEmpty(), is(true));
    }

    @Test(expected = RuntimeException.class)
    public void failedToDeleteDueToInvalidId(){
        coursesService.delete(INVALID_ID);
    }

    @Test(expected = RuntimeException.class)
    public void failedToDeleteDueToIdNotFound() {
        coursesService.delete(ID_NOT_IN_TABLE);
    }

    @Test
    public void successfullyCreate() {
        final String title = "newTitle";
        final String description = "newDescription";
        final int difficulty = 3;
        final String category = "abc";
        final Course course = new Course();
        course.setTitle(title);
        course.setDescription(description);
        course.setDifficulty(difficulty);
        course.setCategory(category);

        List<Lesson> lessons = new ArrayList<>();
        lessons.add(lessonsService.getById(DEFAULT_ID));

        course.setLessons(lessons);

        final Long test = coursesService.create(course);
        assertThat(test, is(3L));

        Course byId = coursesService.getById(test);
        assertThat(byId.getLessons().size(), is(1));
    }
}
