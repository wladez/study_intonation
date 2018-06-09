package ru.spbstu.icc.kspt.study_intonation.responses;

import lombok.Data;
import org.springframework.core.io.FileSystemResource;
import org.springframework.web.multipart.MultipartFile;
import ru.spbstu.icc.kspt.study_intonation.entities.Task;

import java.util.List;

@Data
public class TaskResponse {
    private Task task;
    private List<Markup> markups;
//    private FileSystemResource audio;
}
