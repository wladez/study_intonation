package ru.spbstu.icc.kspt.study_intonation.utilities;

import be.tarsos.dsp.AudioDispatcher;
import be.tarsos.dsp.AudioEvent;
import be.tarsos.dsp.io.jvm.JVMAudioInputStream;
import be.tarsos.dsp.pitch.PitchDetectionHandler;
import be.tarsos.dsp.pitch.PitchDetectionResult;
import be.tarsos.dsp.pitch.PitchProcessor;

import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.UnsupportedAudioFileException;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class PitchDetector implements PitchDetectionHandler {
    private static final int SAMPLE_RATE = 22050;
    private static final int BUFFER_SIZE = 384;
    private static final int BUFFER_OVERLAP = 0;


    private List<Pitch> pitches = new ArrayList<>();

    public List<Pitch> process(String filename) throws IOException, UnsupportedAudioFileException {
        pitches.clear();

        AudioInputStream audioStream = AudioSystem.getAudioInputStream(new File(filename));
        JVMAudioInputStream JVMAudioStream = new JVMAudioInputStream(audioStream);

        PitchProcessor.PitchEstimationAlgorithm algorithm = PitchProcessor.PitchEstimationAlgorithm.YIN;

        AudioDispatcher dispatcher = new AudioDispatcher(JVMAudioStream, BUFFER_SIZE, BUFFER_OVERLAP);
        dispatcher.addAudioProcessor(new PitchProcessor(algorithm, SAMPLE_RATE, BUFFER_SIZE, this));
        dispatcher.run();
        return pitches;
    }

    public void handlePitch(PitchDetectionResult pitchDetectionResult, AudioEvent audioEvent) {
        if (pitchDetectionResult.getPitch() != -1) {
            Pitch pitch = new Pitch(audioEvent.getTimeStamp(), pitchDetectionResult.getPitch());
            pitches.add(pitch);
        }
    }
}