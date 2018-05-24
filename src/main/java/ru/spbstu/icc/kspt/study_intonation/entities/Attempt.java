package ru.spbstu.icc.kspt.study_intonation.entities;

import lombok.Data;

@Data
public class Attempt {
    private Long id;
    private Long userId;
    private Long taskId;
    private Long lessonId;
    private String courseDirName;
    private Double cr;
    private Double mse;
    private Double mse_k;
}