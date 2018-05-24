package ru.spbstu.icc.kspt.study_intonation.controllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.spbstu.icc.kspt.study_intonation.common.Methods;
import ru.spbstu.icc.kspt.study_intonation.common.Paths;
import ru.spbstu.icc.kspt.study_intonation.entities.Attempt;
import ru.spbstu.icc.kspt.study_intonation.services.StatisticsService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = Paths.STATISTICS)
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class StatisticsController {

    private StatisticsService statisticsService;

    @GetMapping
    public List<Attempt> getAllAttempts() {
        return statisticsService.getAllStatistic();
    }


    @GetMapping(value = Methods.USER_ID_PATTERN)
    public List<Attempt> getUserAttempts(@PathVariable Long userId) {
        return statisticsService.getByUserId(userId);
    }
}
