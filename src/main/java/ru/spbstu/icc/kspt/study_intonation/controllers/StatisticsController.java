package ru.spbstu.icc.kspt.study_intonation.controllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.spbstu.icc.kspt.study_intonation.entities.Statistic;
import ru.spbstu.icc.kspt.study_intonation.services.StatisticsService;

import java.util.List;

@Controller
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class StatisticsController {

    private StatisticsService statisticsService;

    @PostMapping("/stat")
    @ResponseStatus(HttpStatus.OK)
    void statistic(@RequestBody List<Statistic> request){
        System.out.println("THIS IS A REQUEST!!!!!!:\n" + request + "\n");
        statisticsService.batchInsert(request);
    }

    @GetMapping("/statistic")
    @ResponseBody
    String getAllStatistic() {
        return statisticsService.getAllStatistic().toString();
    }


    @GetMapping("/statistic/{userId}")
    @ResponseBody
    String getUserStatistic(@PathVariable Long userId) {
        return statisticsService.getByUserId(userId).toString();
    }
}
