package ru.spbstu.icc.kspt.study_intonation.services;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import ru.spbstu.icc.kspt.study_intonation.entities.Lesson;
import ru.spbstu.icc.kspt.study_intonation.entities.Task;

import java.util.List;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:test-application-context.xml")
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class LessonsServiceTest {
    private static final Long INVALID_ID = -1L;
    private static final Long ID_NOT_IN_TABLE = 100L;
    private static final Long DEFAULT_ID = 2L;

    @Autowired
    private LessonsService lessonsService;

    @Autowired
    private TasksService tasksService;

    @Test(expected = RuntimeException.class)
    public void failedToDeleteDueToInvalidId(){
        lessonsService.delete(INVALID_ID);
    }

    @Test(expected = RuntimeException.class)
    public void failedToDeleteDueToIdNotFound() {
        lessonsService.delete(ID_NOT_IN_TABLE);
    }

    @Test
    public void successfullyUpdate() {
        final String title = "newTitle";
        final String description = "newDescription";
        Lesson fromDB = lessonsService.getById(DEFAULT_ID);

        List<Task> tasks = fromDB.getTasks();

        tasks.add(tasksService.getById(DEFAULT_ID));

        fromDB.setTasks(tasks);
        fromDB.setTitle(title);
        fromDB.setDescription(description);

        Lesson update = lessonsService.update(fromDB);
        assertThat(update.getTasks().size(),is(1));
        assertThat(update.getTitle(),is(title));
        assertThat(update.getDescription(),is(description));

    }

}
