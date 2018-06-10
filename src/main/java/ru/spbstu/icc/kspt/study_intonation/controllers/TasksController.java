package ru.spbstu.icc.kspt.study_intonation.controllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.AbstractResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.spbstu.icc.kspt.study_intonation.common.Methods;
import ru.spbstu.icc.kspt.study_intonation.common.Paths;
import ru.spbstu.icc.kspt.study_intonation.entities.Task;
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
    public Task get(@PathVariable final Long id) {
        return tasksService.getById(id);
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

    @GetMapping(Methods.ID_PATTERN+Methods.DOWNLOAD_AUDIO)
    public ResponseEntity<Resource> downloadAudio(@PathVariable final Long id) {
        AbstractResource audioFile = tasksService.getAudioFile(id);

        return ResponseEntity.ok()
                             .contentType(MediaType.parseMediaType("audio/mpeg"))
                             .body(audioFile);
    }
}
