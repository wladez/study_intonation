package ru.spbstu.icc.kspt.study_intonation.entities;

import lombok.Data;

import java.util.List;

@Data
public class Task {
    private Long id;
    private Long lessonId;
    private Long courseId;
    private String instruction;
    private String text;
    private String pathToAudio;
    private String pitch;
    private String textMarkup;
    private boolean deleted;
    private List<Markup> markups;
}