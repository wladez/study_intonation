package ru.spbstu.icc.kspt.study_intonation.controllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.spbstu.icc.kspt.study_intonation.common.Methods;
import ru.spbstu.icc.kspt.study_intonation.entities.Attempt;
import ru.spbstu.icc.kspt.study_intonation.entities.Course;
import ru.spbstu.icc.kspt.study_intonation.services.CoursesService;
import ru.spbstu.icc.kspt.study_intonation.services.StatisticsService;

import java.util.List;

@RestController
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class MobileController {
    private StatisticsService statisticsService;
    private CoursesService coursesService;

    @PostMapping("/stat")
    @ResponseStatus(HttpStatus.OK)
    public void statistic(@RequestBody List<Attempt> request){
        System.out.println("THIS IS A REQUEST!!!!!!:\n" + request + "\n");
        statisticsService.batchInsert(request);
    }

    @GetMapping(Methods.GET_AVAILABLE_COURSES)
    public List<Course> getAvailableCourses(){
        return coursesService.getAvailableCourses();
    }
}
