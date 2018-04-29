package ru.spbstu.icc.kspt.study_intonation.controllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;
import ru.spbstu.icc.kspt.study_intonation.common.Paths;
import ru.spbstu.icc.kspt.study_intonation.dao.TasksMapper;
import ru.spbstu.icc.kspt.study_intonation.entities.Course;
import ru.spbstu.icc.kspt.study_intonation.entities.Lesson;
import ru.spbstu.icc.kspt.study_intonation.entities.Statistic;
import ru.spbstu.icc.kspt.study_intonation.services.CoursesService;

import java.util.List;


@RestController
@RequestMapping(value = Paths.COURSES)
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class CoursesController {

    private final CoursesService coursesService;

    @GetMapping
    @ResponseBody
    String home() {
        return coursesService.showAll().toString();
    }
}
