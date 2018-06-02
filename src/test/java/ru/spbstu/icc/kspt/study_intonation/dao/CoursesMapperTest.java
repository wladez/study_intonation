package ru.spbstu.icc.kspt.study_intonation.dao;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import ru.spbstu.icc.kspt.study_intonation.entities.Course;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:test-application-context.xml")
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class CoursesMapperTest {
    private static final int TEST_DIFFICULTY = 2;
    private static final long DEFAULT_ID = 1L;

    @Autowired
    private CoursesMapper mapper;

    @Test
    public void getById() {
        final Course course = mapper.getById(DEFAULT_ID);

        assertThat(course.getId(), is(DEFAULT_ID));
        assertThat(course.getDifficulty(), is(TEST_DIFFICULTY));
    }
}
