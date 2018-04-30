package ru.spbstu.icc.kspt.study_intonation.controllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.spbstu.icc.kspt.study_intonation.common.Paths;
import ru.spbstu.icc.kspt.study_intonation.entities.Lesson;
import ru.spbstu.icc.kspt.study_intonation.services.LessonsService;

import java.util.List;

@RestController
@RequestMapping(value = Paths.LESSONS)
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class LessonsController {
    private LessonsService lessonsService;

    @GetMapping
    public List<Lesson> getAll() {
        return lessonsService.getAll();
    }

    @PostMapping
    public Long create(@RequestBody final Lesson lesson) {
        return lessonsService.create(lesson);
    }
}
