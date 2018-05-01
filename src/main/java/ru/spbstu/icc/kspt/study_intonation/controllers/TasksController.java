package ru.spbstu.icc.kspt.study_intonation.controllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.spbstu.icc.kspt.study_intonation.common.Methods;
import ru.spbstu.icc.kspt.study_intonation.common.Paths;
import ru.spbstu.icc.kspt.study_intonation.entities.Task;
import ru.spbstu.icc.kspt.study_intonation.services.TasksService;

import java.util.List;

@RestController
@RequestMapping(value = Paths.TASKS)
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class TasksController {
    private TasksService tasksService;


    @PostMapping
    public Long create(@RequestBody final Task task) {
        return tasksService.create(task);
    }

    @GetMapping
    public List<Task> getAll() {
        return tasksService.getAll();
    }

    @PutMapping(Methods.ID_PATTERN)
    public Task update(@PathVariable final Long id, @RequestBody final Task task) {
        task.setId(id);
        return tasksService.update(task);
    }
}
