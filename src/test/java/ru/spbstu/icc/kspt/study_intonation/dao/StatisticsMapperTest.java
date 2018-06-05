package ru.spbstu.icc.kspt.study_intonation.dao;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import ru.spbstu.icc.kspt.study_intonation.entities.Attempt;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:test-application-context.xml")
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class StatisticsMapperTest {
    private static final Long DEFAULT_USER_ID = 1L;
    private static final int TEST_DEFAULT_ATTEMPT_COUNT = 2;

    @Autowired
    private StatisticsMapper mapper;

    @Test
    public void batchInsert(){
        Attempt first = new Attempt();
        first.setUserId(DEFAULT_USER_ID);
        first.setTaskId(DEFAULT_USER_ID);
        first.setLessonId(DEFAULT_USER_ID);

        Attempt second = new Attempt();
        second.setUserId(DEFAULT_USER_ID);
        second.setTaskId(DEFAULT_USER_ID);
        second.setLessonId(DEFAULT_USER_ID);

        List<Attempt> attempts = Arrays.asList(first, second);

        Long aLong = mapper.batchInsert(attempts);
        assertThat(aLong, is(2L));

        List<Attempt> all = mapper.getAll();
        assertThat(all.size(), is(TEST_DEFAULT_ATTEMPT_COUNT + 2));
    }

    @Test
    public void getAll() {
        List<Attempt> all = mapper.getAll();

        assertThat(all.size(), is(TEST_DEFAULT_ATTEMPT_COUNT));
    }

    @Test
    public void getByUserID() {
        List<Attempt> byUserID = mapper.getStatisticsByUserID(DEFAULT_USER_ID);

        assertThat(byUserID.size(),is(TEST_DEFAULT_ATTEMPT_COUNT));

        List<Attempt> emptyList = mapper.getStatisticsByUserID(DEFAULT_USER_ID + 1);
        assertThat(emptyList.isEmpty(), is(true));
    }
}
