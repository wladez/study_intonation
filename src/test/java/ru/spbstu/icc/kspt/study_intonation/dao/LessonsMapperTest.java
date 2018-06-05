package ru.spbstu.icc.kspt.study_intonation.dao;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import ru.spbstu.icc.kspt.study_intonation.entities.Lesson;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:test-application-context.xml")
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class LessonsMapperTest {
    private static final Long DEFAULT_ID = 1L;
    private static final String TEST_TITLE = "Everyday discourse";
    private static final String TEST_DESCRIPTION = "Lets start from the very beginning. Listen to the pattern, observe the pitch curve and try to repeat the phrase in tune looking at the pitch as if you sing a song. This warm-up will help you to get along with Study Intonation. Good luck!";
    private static final int TEST_DURATION = 25;
    private static final int TEST_TASKS_COUNT = 13;

    @Autowired
    private LessonsMapper mapper;

    @Test
    public void getById() {
        final Lesson lesson = mapper.getWithTasks(DEFAULT_ID);

        assertThat(lesson.getId(), is(DEFAULT_ID));
        assertThat(lesson.getTitle(), is(TEST_TITLE));
        assertThat(lesson.getDescription(), is(TEST_DESCRIPTION));
        assertThat(lesson.getDuration(), is(TEST_DURATION));
        assertThat(lesson.getTasks().size(), is(TEST_TASKS_COUNT));
        assertThat(lesson.isDeleted(), is(false));
    }

    @Test
    public void createAndDelete(){
        final String title = "newTitle";
        final String description = "newDescription";
        final int duration = 3;
        final Lesson lesson = new Lesson();
        lesson.setTitle(title);
        lesson.setDescription(description);
        lesson.setDuration(duration);

        final Long test = mapper.create(lesson);
        assertThat(test, is(1L));

        final Long id = lesson.getId();

        Lesson entity = mapper.getWithTasks(id);
        assertThat(entity.getTitle(), is(title));
        assertThat(entity.getDescription(), is(description));
        assertThat(entity.getDuration(), is(duration));

        final Boolean result = mapper.delete(id);
        assertThat(result, is(true));

        entity = mapper.getWithTasks(id);
        assertThat(entity.isDeleted(), is(true));
    }
}
