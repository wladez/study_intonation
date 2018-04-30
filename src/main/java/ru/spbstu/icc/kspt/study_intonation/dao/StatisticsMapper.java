package ru.spbstu.icc.kspt.study_intonation.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;
import ru.spbstu.icc.kspt.study_intonation.entities.Attempt;

import java.util.List;

@Mapper
@Component
public interface StatisticsMapper {

    Long batchInsert(@Param("attempts") final List<Attempt> attempts);

    @Select("SELECT id, userId, taskId, cr, mse, mse_k " +
            "FROM attempts")
    List<Attempt> getAll();

    @Select("SELECT id, userId, taskId, cr, mse, mse_k " +
            "FROM attempts WHERE userId=#{id}")
    List<Attempt> getStatisticsByUserID(final Long id);

}
