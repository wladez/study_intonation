package ru.spbstu.icc.kspt.study_intonation.services;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.spbstu.icc.kspt.study_intonation.dao.TasksMapper;
import ru.spbstu.icc.kspt.study_intonation.entities.Task;
import ru.spbstu.icc.kspt.study_intonation.utilities.ValidationUtility;

import java.util.List;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class TasksService {
    private TasksMapper tasksMapper;

    public Long create(final Task task) {
        return tasksMapper.create(task);
    }

    public List<Task> getAll() {
        return tasksMapper.getAll();
    }

    public Task update(final Task task) {
        if (ValidationUtility.isEmpty(task))
            throw new RuntimeException("Task is not specified");

        if (!ValidationUtility.isValidId(task.getId())) {
            throw new RuntimeException("Task id is invalid");
        }

        if (tasksMapper.update(task))
            return task;

        else throw new RuntimeException("Update failed");

    }

    public Task getById(final Long id) {
        return tasksMapper.get(id);
    }

    public void delete(final Long id) {
        if (!ValidationUtility.isValidId(id))
            throw new RuntimeException("Invalid taskID for deleting!");

        if (!tasksMapper.delete(id)) {
            throw new RuntimeException("Task not found!");
        }
    }

}
