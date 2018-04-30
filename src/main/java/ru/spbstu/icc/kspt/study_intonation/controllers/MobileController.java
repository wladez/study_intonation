package ru.spbstu.icc.kspt.study_intonation.controllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import ru.spbstu.icc.kspt.study_intonation.entities.Attempt;
import ru.spbstu.icc.kspt.study_intonation.services.StatisticsService;

import java.util.List;

@RestController
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class MobileController {
    private StatisticsService statisticsService;

    @PostMapping("/stat")
    @ResponseStatus(HttpStatus.OK)
    public void statistic(@RequestBody List<Attempt> request){
        System.out.println("THIS IS A REQUEST!!!!!!:\n" + request + "\n");
        statisticsService.batchInsert(request);
    }
}
