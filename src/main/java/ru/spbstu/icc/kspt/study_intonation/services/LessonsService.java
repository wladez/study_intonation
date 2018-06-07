package ru.spbstu.icc.kspt.study_intonation.services;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.spbstu.icc.kspt.study_intonation.dao.LessonsMapper;
import ru.spbstu.icc.kspt.study_intonation.dao.TasksMapper;
import ru.spbstu.icc.kspt.study_intonation.entities.Lesson;
import ru.spbstu.icc.kspt.study_intonation.entities.Task;
import ru.spbstu.icc.kspt.study_intonation.utilities.ValidationUtility;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class LessonsService {
    private LessonsMapper lessonsMapper;
    private TasksMapper tasksMapper;

    public List<Lesson> getAll() {
        return lessonsMapper.getAll();
    }

    public List<Lesson> getAllByCourseID(final Long courseID) {
        return lessonsMapper.getLessonsByCourseID(courseID);
    }

    public Long create(final Lesson lesson) {
        lessonsMapper.create(lesson);
        addTasksToNewLesson(lesson);
        return lesson.getId();
    }

    public Lesson getById(final Long id) {
        return lessonsMapper.getWithTasks(id);
    }

    public void delete(final Long id) {
        if (!ValidationUtility.isValidId(id))
            throw new RuntimeException("Invalid lessonID for deleting!");

        if (!lessonsMapper.delete(id)) {
            throw new RuntimeException("Lesson not found!");
        }
    }

    public Lesson update(final Lesson lesson) {
        if (ValidationUtility.isEmpty(lesson))
            throw new RuntimeException("Lesson is not specified");

        return tryUpdate(lesson);
    }

    private Lesson tryUpdate(final Lesson fromReq) {
        if (!ValidationUtility.isValidId(fromReq.getId())) {
            throw new RuntimeException("Lesson id is invalid");
        }

        List<Task> tasksFromRequest = fromReq.getTasks();

        if (tasksFromRequest == null || ValidationUtility.hasEmptyElements(tasksFromRequest))
            throw new RuntimeException("TasksList from request is not valid");

        Lesson fromDB = lessonsMapper.getWithTasks(fromReq.getId());

        updateFields(fromDB, fromReq);

        lessonsMapper.update(fromDB);

        return lessonsMapper.getWithTasks(fromReq.getId());
    }

    private void updateFields(Lesson fromDB, Lesson fromReq) {
        updateTitle(fromDB, fromReq);
        updateDescription(fromDB, fromReq);
        updateDuration(fromDB, fromReq);
        fromDB.setShortDescription(fromReq.getShortDescription());
        fromDB.setLogo(fromReq.getLogo());
        updateTasks(fromDB, new HashSet<>(fromReq.getTasks()));
    }

    private void updateTitle(Lesson fromDB, Lesson fromReq) {
        if (ValidationUtility.isEmpty(fromReq.getTitle())) {
            throw new RuntimeException("Title of lesson can't be empty");
        }
        fromDB.setTitle(fromReq.getTitle());
    }

    private void updateDescription(Lesson fromDB, Lesson fromReq) {
        if (ValidationUtility.isEmpty(fromReq.getDescription())) {
            throw new RuntimeException("Description of lesson can't be empty");
        }
        fromDB.setDescription(fromReq.getDescription());
    }

    private void updateDuration(Lesson fromDB, Lesson fromReq) {
        if (ValidationUtility.isEmpty(fromReq.getDuration())) {
            throw new RuntimeException("Duration of lesson can't be empty");
        }
        fromDB.setDuration(fromReq.getDuration());
    }

    private void updateTasks(Lesson fromDB, Set<Task> requestTasks) {
        addTasks(fromDB, requestTasks);

//        updateExistingTasks(fromDB, requestTasks);

        deleteLessonTasks(fromDB, requestTasks);
    }

    private void addTasks(Lesson fromDB, Set<Task> requestTasks) {
        final Set<Task> newTasks = new HashSet<>(requestTasks);

        newTasks.removeIf(task -> fromDB.getTasks().stream()
                                        .anyMatch(t -> t.getId().equals(task.getId())));

//        final List<Task> allTasksFromDB = tasksMapper.getAll();

        newTasks.forEach(newTask -> {
//            createNonexistentTasks(allTasksFromDB, newTask);
            lessonsMapper.addTaskToLesson(fromDB.getId(), newTask.getId());
        });
    }

    private void createNonexistentTasks(List<Task> allTasksFromDB, Task newTask) {
        if (!allTasksFromDB.contains(newTask)) {
            tasksMapper.create(newTask);
        }
    }

    private void updateExistingTasks(Lesson fromDB, Set<Task> requestTasks) {
        final Set<Task> updatedTasks = new HashSet<>(requestTasks);
        updatedTasks.removeIf(reqTask -> fromDB.getTasks().stream()
                                               .noneMatch(t -> t.getId().equals(reqTask.getId())
                                                       && !t.getText().equals(reqTask.getText())));

        updatedTasks.forEach(taskForUpdate -> tasksMapper.update(taskForUpdate));
    }

    private void deleteLessonTasks(Lesson fromDB, Set<Task> requestTasks) {
        final Set<Task> deletedTasks = new HashSet<>(fromDB.getTasks());

        deletedTasks.removeIf(delTask -> requestTasks.stream()
                                                  .anyMatch(t -> delTask.getId().equals(t.getId())));

        deletedTasks.forEach(task -> lessonsMapper.removeTaskFromLesson(fromDB.getId(), task.getId()));
    }


    private void addTasksToNewLesson(Lesson fromReq) {
        final Set<Task> newTasks = new HashSet<>(fromReq.getTasks());

        newTasks.forEach(newTask -> lessonsMapper.addTaskToLesson(fromReq.getId(), tasksMapper.getByText(newTask.getText()).getId()));

    }

}
