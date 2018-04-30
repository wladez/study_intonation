package ru.spbstu.icc.kspt.study_intonation.entities;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class Statistic {
    private Long userID;
    private Map<Integer, List<Attempt>> statisticByLessons;
}
