package ru.spbstu.icc.kspt.study_intonation.entities;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Course {
    private Long id;
    private String title;
    private String description;
    private int difficulty;
    private String category;
    private String releaseDate;
    private String logo;
    private List<Lesson> lessons = new ArrayList<>();
    boolean available;
}