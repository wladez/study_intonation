package ru.spbstu.icc.kspt.study_intonation.controllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.spbstu.icc.kspt.study_intonation.common.Methods;
import ru.spbstu.icc.kspt.study_intonation.common.Paths;
import ru.spbstu.icc.kspt.study_intonation.entities.Statistic;
import ru.spbstu.icc.kspt.study_intonation.services.StatisticsService;

import java.util.List;

@RestController
@RequestMapping(value = Paths.STATISTICS)
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class StatisticsController {

    private StatisticsService statisticsService;

    @GetMapping
    @ResponseBody
    String getAllStatistic() {
        return statisticsService.getAllStatistic().toString();
    }


    @GetMapping(value = Methods.USER_ID_PATTERN)
    @ResponseBody
    String getUserStatistic(@PathVariable Long userId) {
        return statisticsService.getByUserId(userId).toString();
    }
}
