package ru.spbstu.icc.kspt.study_intonation.controllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.spbstu.icc.kspt.study_intonation.common.Methods;
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

    @GetMapping(Methods.ID_PATTERN)
    public Lesson get(@PathVariable final Long id) {
        return lessonsService.getById(id);
    }

    @PostMapping
    public Long create(@RequestBody final Lesson lesson) {
        return lessonsService.create(lesson);
    }

    @PutMapping(Methods.ID_PATTERN)
    public Lesson update(@PathVariable final Long id, @RequestBody final Lesson lesson) {
        lesson.setId(id);
        return lessonsService.update(lesson);
    }

    @DeleteMapping(Methods.ID_PATTERN)
    public void delete(@PathVariable final  Long id) {
        lessonsService.delete(id);
    }
}
