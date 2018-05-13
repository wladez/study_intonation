package ru.spbstu.icc.kspt.study_intonation.utilities;

public class Pitch {
    final private double timeStamp;
    final private float pitch;

    public Pitch(double timeStamp, float pitch) {
        this.timeStamp = timeStamp;
        this.pitch = pitch;
    }

    public double getTimeStamp() {
        return timeStamp;
    }

    public float getPitch() {
        return pitch;
    }

    @Override
    public String toString() {
        return timeStamp + " " + pitch;
    }
}
