package ru.spbstu.icc.kspt.study_intonation.dao;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import ru.spbstu.icc.kspt.study_intonation.entities.Course;

import java.util.List;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:test-application-context.xml")
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class CoursesMapperTest {
    private static final long DEFAULT_ID = 1L;
    private static final String TEST_TITLE = "Study Intonation";
    private static final int TEST_DIFFICULTY = 2;
    private static final String TEST_LOGO = "logo.png";
    private static final int TEST_LESSONS_COUNT = 4;

    @Autowired
    private CoursesMapper mapper;

    @Test
    public void getById() {
        final Course course = mapper.getById(DEFAULT_ID);

        assertThat(course.getId(), is(DEFAULT_ID));
        assertThat(course.getDifficulty(), is(TEST_DIFFICULTY));
        assertThat(course.getTitle(), is(TEST_TITLE));
        assertThat(course.getLogo(), is(TEST_LOGO));
        assertThat(course.getLessons().size(), is(TEST_LESSONS_COUNT));
        assertThat(course.isAvailable(), is(true));
    }

    @Test
    public void createAndDelete(){
        final String title = "newTitle";
        final String description = "newDescription";
        final int difficulty = 3;
        final String category = "abc";
        final Course course = new Course();
        course.setTitle(title);
        course.setDescription(description);
        course.setDifficulty(difficulty);
        course.setCategory(category);

        final Long test = mapper.create(course);
        assertThat(test, is(1L));

        final Long id = course.getId();

        final Course entity = mapper.getById(id);
        assertThat(entity.getTitle(), is(title));
        assertThat(entity.getDescription(), is(description));
        assertThat(entity.getDifficulty(), is(difficulty));
        assertThat(entity.getCategory(), is(category));

        final Boolean result = mapper.delete(id);
        assertThat(result, is(true));

        assertNull(mapper.getById(id));
    }

    @Test
    public void updateById() {
        final String newTitle = "newTitle";
        final String newDescription = "newDescription";
        final int newDifficulty = 3;
        final Course course = new Course();
        course.setId(DEFAULT_ID);
        course.setTitle(newTitle);
        course.setDescription(newDescription);
        course.setDifficulty(newDifficulty);

        final Boolean result = mapper.update(course);
        assertThat(result, is(true));

        final Course entity = mapper.getById(DEFAULT_ID);
        assertThat(entity.getTitle(), is(newTitle));
        assertThat(entity.getDescription(), is(newDescription));
        assertThat(entity.getDifficulty(), is(newDifficulty));
    }

    @Test
    public void removeAndAddLessonToCourse() {
        Boolean removeLessonFromCourse = mapper.removeLessonFromCourse(DEFAULT_ID, DEFAULT_ID);
        assertThat(removeLessonFromCourse, is(true));

        Course course = mapper.getById(DEFAULT_ID);
        assertThat(course.getLessons().size(), is(3));

        Boolean addLessonToCourse = mapper.addLessonToCourse(DEFAULT_ID, DEFAULT_ID);
        assertThat(addLessonToCourse, is(true));

        course = mapper.getById(DEFAULT_ID);
        assertThat(course.getLessons().size(), is(4));
    }

    @Test
    public void setAvailable() {
        final boolean newStatus = false;
        Boolean setAvailable = mapper.setAvailable(DEFAULT_ID, newStatus);
        assertThat(setAvailable, is(true));

        Course course = mapper.getById(DEFAULT_ID);
        assertThat(course.isAvailable(), is(newStatus));

        List<Course> availableCourses = mapper.getAvailableCourses();
        assertThat(availableCourses.size(), is(1));

        mapper.setAvailable(DEFAULT_ID, !newStatus);

        availableCourses = mapper.getAvailableCourses();
        assertThat(availableCourses.size(), is(2));

        course = mapper.getById(DEFAULT_ID);
        assertThat(course.isAvailable(), is(!newStatus));
    }

    @Test
    public void getAll() {
        List<Course> all = mapper.getAll();

        assertThat(all.size(), is(2));
    }
}
