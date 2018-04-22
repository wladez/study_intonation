package ru.spbstu.icc.kspt.study_intonation.services;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.spbstu.icc.kspt.study_intonation.dao.CoursesMapper;
import ru.spbstu.icc.kspt.study_intonation.dao.StatisticsMapper;
import ru.spbstu.icc.kspt.study_intonation.entities.Statistic;

import java.util.List;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class StatisticsService {
    private StatisticsMapper statisticsMapper;
    private CoursesMapper coursesMapper;

    public Long batchInsert(List<Statistic> statistics) {
        for (Statistic stat: statistics) {
            stat.setCourseId(coursesMapper.getIdByDirName(stat.getCourseDirName()));
        }
        return statisticsMapper.batchInsert(statistics);
    }

    public List<Statistic> getAllStatistic() {
        return statisticsMapper.getAll();
    }

    public List<Statistic> getByUserId(final Long userID) {
        return statisticsMapper.getStatisticsByUserID(userID);
    }


}
