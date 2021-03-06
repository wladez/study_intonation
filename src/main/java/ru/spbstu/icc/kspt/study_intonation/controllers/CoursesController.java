package ru.spbstu.icc.kspt.study_intonation.controllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.spbstu.icc.kspt.study_intonation.common.Methods;
import ru.spbstu.icc.kspt.study_intonation.common.Paths;
import ru.spbstu.icc.kspt.study_intonation.entities.Course;
import ru.spbstu.icc.kspt.study_intonation.services.CoursesService;

import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = Paths.COURSES)
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class CoursesController {

    private final CoursesService coursesService;

    @GetMapping
    public List<Course> getAllCourses() {
        return coursesService.showAll();
    }

    @GetMapping(Methods.ID_PATTERN)
    public Course get(@PathVariable final Long id) {
        return coursesService.getById(id);
    }

    @PostMapping
    public Long create(@RequestBody final Course course) {
        return coursesService.create(course);
    }

    @PutMapping(Methods.ID_PATTERN)
    public Course update(@PathVariable final Long id, @RequestBody final Course course) {
        course.setId(id);
        return coursesService.update(course);
    }

    @PutMapping(Methods.ID_PATTERN+Methods.AVAILABLE)
    public void setAvailable(@PathVariable final Long id, @RequestParam("status") boolean status){
        coursesService.setAvailable(id, status);
    }

    @DeleteMapping(Methods.ID_PATTERN)
    public void delete(@PathVariable final Long id) {
        coursesService.delete(id);
    }

}
