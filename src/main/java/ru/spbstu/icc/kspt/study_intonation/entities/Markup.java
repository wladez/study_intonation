package ru.spbstu.icc.kspt.study_intonation.entities;

import lombok.Data;

@Data
public class Markup {
    private String fragment;
    private String start;
    private String stop;
    private boolean catchword;
}
