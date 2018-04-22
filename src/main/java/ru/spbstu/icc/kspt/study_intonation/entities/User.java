package ru.spbstu.icc.kspt.study_intonation.entities;

import lombok.Data;

@Data
public class User {
    private Long id;
    private String name;
    private String email;
}