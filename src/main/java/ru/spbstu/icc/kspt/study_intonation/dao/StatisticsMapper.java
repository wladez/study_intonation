package ru.spbstu.icc.kspt.study_intonation.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;
import ru.spbstu.icc.kspt.study_intonation.entities.Statistic;

import java.util.List;

@Mapper
@Component
public interface StatisticsMapper {

    Long batchInsert(@Param("statistics") final List<Statistic> statistics);

    @Select("SELECT id, userId, taskId, lessonId, courseId, cr, mse, mse_k " +
            "FROM statistics")
    List<Statistic> getAll();

    @Select("SELECT id, userId, taskId, lessonId, courseId, cr, mse, mse_k " +
            "FROM statistics WHERE userId=#{id}")
    List<Statistic> getStatisticsByUserID(final Long id);

}
