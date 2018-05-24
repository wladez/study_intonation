package ru.spbstu.icc.kspt.study_intonation.services;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.spbstu.icc.kspt.study_intonation.dao.CoursesMapper;
import ru.spbstu.icc.kspt.study_intonation.dao.StatisticsMapper;
import ru.spbstu.icc.kspt.study_intonation.entities.Attempt;

import java.util.List;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class StatisticsService {
    private StatisticsMapper statisticsMapper;
    private CoursesMapper coursesMapper;

    public Long batchInsert(List<Attempt> attempts) {
//        for (Attempt stat: attempts) {
//            stat.setCourseId(coursesMapper.getIdByDirName(stat.getCourseDir()));
//        }
        return statisticsMapper.batchInsert(attempts);
    }

    public List<Attempt> getAllStatistic() {
        return statisticsMapper.getAll();
    }

    public List<Attempt> getByUserId(final Long userID) {
        return statisticsMapper.getStatisticsByUserID(userID);
    }


}
