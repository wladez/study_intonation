package ru.spbstu.icc.kspt.study_intonation.services;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.spbstu.icc.kspt.study_intonation.dao.TasksMapper;
import ru.spbstu.icc.kspt.study_intonation.entities.Task;

import java.util.List;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class TasksService {
    private TasksMapper tasksMapper;

    public Long create(Task task) {
        return tasksMapper.create(task);
    }

    public List<Task> getAll() {
        return tasksMapper.getAll();
    }
}
