package ru.spbstu.icc.kspt.study_intonation.services;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.spbstu.icc.kspt.study_intonation.dao.LessonsMapper;
import ru.spbstu.icc.kspt.study_intonation.entities.Lesson;

import java.util.List;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class LessonsService {
    private LessonsMapper lessonsMapper;

    public List<Lesson> getAll() {
        return lessonsMapper.getAll();
    }

    public List<Lesson> getAllByCourseID(final Long courseID) {
        return lessonsMapper.getLessonsByCourseID(courseID);
    }

    public Long create(final Lesson lesson){
        return lessonsMapper.create(lesson);
    }

}
