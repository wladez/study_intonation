package ru.spbstu.icc.kspt.study_intonation.controllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.spbstu.icc.kspt.study_intonation.common.Methods;
import ru.spbstu.icc.kspt.study_intonation.common.Paths;
import ru.spbstu.icc.kspt.study_intonation.entities.Task;
import ru.spbstu.icc.kspt.study_intonation.responses.TaskResponse;
import ru.spbstu.icc.kspt.study_intonation.services.TasksService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
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

    @GetMapping(Methods.ID_PATTERN)
    public TaskResponse get(@PathVariable final Long id) {
        TaskResponse response = new TaskResponse();
        response.setTask(tasksService.getById(id));
        if (response.getTask().getTextMarkup() != null)
            response.setMarkups(tasksService.getMarkup(response.getTask()));
//        if (response.getTask().getPathToAudio() != null)
//            response.setAudio(tasksService.getAudioFile(response.getTask()));
        return response;
    }

    @PutMapping(Methods.ID_PATTERN)
    public Task update(@PathVariable final Long id, @RequestBody final Task task) {
        task.setId(id);
        return tasksService.update(task);
    }

    @DeleteMapping(Methods.ID_PATTERN)
    public void delete(@PathVariable final Long id) {
        tasksService.delete(id);
    }

    @PostMapping(Methods.ID_PATTERN+Methods.UPLOAD_AUDIO)
    public void uploadAudio(@PathVariable final Long id, @RequestBody MultipartFile file) {
        tasksService.uploadAudio(id, file);
    }

    @PostMapping(Methods.ID_PATTERN+Methods.UPLOAD_MARKUP)
    public void uploadMarkup(@PathVariable final Long id, @RequestBody String string) {
        tasksService.uploadMarkup(id, string);
    }
}
