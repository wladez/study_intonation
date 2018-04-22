package ru.spbstu.icc.kspt.study_intonation.entities;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class Lesson {
    private Long id;
    private Long courseId;
    private String title;
    private String description;
    private String shortDescription;
    private int duration;
    private String logo;
    private List<Task> tasks = new ArrayList<>();
}