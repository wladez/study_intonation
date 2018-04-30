package ru.spbstu.icc.kspt.study_intonation.controllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.spbstu.icc.kspt.study_intonation.common.Paths;
import ru.spbstu.icc.kspt.study_intonation.entities.Course;
import ru.spbstu.icc.kspt.study_intonation.services.CoursesService;

import java.util.List;


@RestController
@RequestMapping(value = Paths.COURSES)
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class CoursesController {

    private final CoursesService coursesService;

    @GetMapping
    public List<Course> getAllCourses() {
        return coursesService.showAll();
    }

    @PostMapping
    public Long create(@RequestBody final Course course) {
        return coursesService.create(course);
    }

}
