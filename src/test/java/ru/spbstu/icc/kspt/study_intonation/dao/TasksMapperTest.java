package ru.spbstu.icc.kspt.study_intonation.dao;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import ru.spbstu.icc.kspt.study_intonation.entities.Task;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:test-application-context.xml")
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class TasksMapperTest {
    private static final Long DEFAULT_ID = 1L;
    private static final String TEST_TEXT = "Hello!";
    private static final String TEST_INSTRUCTION = "We start speaking with greetings";
    private static final String TEST_AUDIO = "01EverydayDiscourse/l1t1.mp3";
    private static final String TEST_PITCH = "01EverydayDiscourse/l1t1.pitch";
    private static final String TEST_MARKUP = "01EverydayDiscourse/l1t1.text";

    @Autowired
    private TasksMapper mapper;

    @Test
    public void getById() {
        final Task task = mapper.get(DEFAULT_ID);

        assertThat(task.getId(), is(DEFAULT_ID));
        assertThat(task.getText(), is(TEST_TEXT));
        assertThat(task.getInstruction(), is(TEST_INSTRUCTION));
        assertThat(task.getPathToAudio(), is(TEST_AUDIO));
        assertThat(task.getPitch(), is(TEST_PITCH));
        assertThat(task.getTextMarkup(), is(TEST_MARKUP));
        assertThat(task.isDeleted(), is(false));
    }

    @Test
    public void createAndDelete(){
        final String text = "newText";
        final String instruction = "newInstruction";
        final Task task = new Task();
        task.setText(text);
        task.setInstruction(instruction);

        final Long test = mapper.create(task);
        assertThat(test, is(1L));

        final Long id = task.getId();

        Task entity = mapper.get(id);
        assertThat(entity.getText(), is(text));
        assertThat(entity.getInstruction(), is(instruction));

        final Boolean result = mapper.delete(id);
        assertThat(result, is(true));

        entity = mapper.get(id);
        assertThat(entity.isDeleted(), is(true));
    }
}
