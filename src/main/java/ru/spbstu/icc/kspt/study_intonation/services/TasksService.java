package ru.spbstu.icc.kspt.study_intonation.services;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ru.spbstu.icc.kspt.study_intonation.common.Paths;
import ru.spbstu.icc.kspt.study_intonation.dao.TasksMapper;
import ru.spbstu.icc.kspt.study_intonation.entities.Task;
import ru.spbstu.icc.kspt.study_intonation.utilities.Pitch;
import ru.spbstu.icc.kspt.study_intonation.utilities.PitchDetector;
import ru.spbstu.icc.kspt.study_intonation.utilities.ValidationUtility;

import javax.sound.sampled.UnsupportedAudioFileException;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.Formatter;
import java.util.List;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class TasksService {
    private TasksMapper tasksMapper;

    public Long create(final Task task) {
        tasksMapper.create(task);
        return task.getId();
    }

    public List<Task> getAll() {
        return tasksMapper.getAll();
    }

    public Task update(final Task task) {
        if (ValidationUtility.isEmpty(task))
            throw new RuntimeException("Task is not specified");

        if (!ValidationUtility.isValidId(task.getId())) {
            throw new RuntimeException("Task id is invalid");
        }

        if (tasksMapper.update(task))
            return task;

        else throw new RuntimeException("Update failed");

    }

    public Task getById(final Long id) {
        return tasksMapper.get(id);
    }

    public void delete(final Long id) {
        if (!ValidationUtility.isValidId(id))
            throw new RuntimeException("Invalid taskID for deleting!");

        if (!tasksMapper.delete(id)) {
            throw new RuntimeException("Task not found!");
        }
    }

    public void uploadAudio(MultipartFile file, Long id) {
        if (file != null) {
            if (file.isEmpty())
                throw new IllegalArgumentException("Incorrect file");
            if (!ValidationUtility.isValidAudio(file))
                throw new IllegalArgumentException("Incorrect extension of the file");
        }

//        File resourcesDirectory = new File("src/main/resources/tasks");

        String path = "tasks/"+id+".mp3";

//        System.out.println(path);

        File toSave = new File(Paths.RESOURCE_DIRECTORY.getAbsolutePath()+"/"+path);

        try {
            file.transferTo(toSave);
        } catch (IOException e) {
            e.printStackTrace();
        }

        tasksMapper.setAudio(path, id);

        try {
            generatePitch(path, id);
        } catch (IOException | UnsupportedAudioFileException e) {
            e.printStackTrace();
        }

    }

    private void generatePitch(final String filename, final Long id) throws IOException, UnsupportedAudioFileException {
        PitchDetector detector = new PitchDetector();
        List<Pitch> pitches = detector.process(Paths.RESOURCE_DIRECTORY.getAbsolutePath() + "/" + filename);

        System.out.println(pitches.size() + " pitches was found");

        printToFile(pitches, getPitchFilename(filename));

        tasksMapper.setPitch(getPitchFilename(filename), id);
    }

    private static void printToFile(List<Pitch> pitches, String filename) {
        try {
            Formatter output = new Formatter(Paths.RESOURCE_DIRECTORY.getAbsolutePath() + "/" + filename, "UTF-8");

            for (Pitch pitch : pitches) {
                output.format("%.3f %.3f%n", pitch.getTimeStamp(), pitch.getPitch());
            }

            output.flush();
        } catch (UnsupportedEncodingException | FileNotFoundException e) {
            System.out.println("Saving to file failed");
        }
        System.out.println("Saved to file " + filename);
    }

    private static String getPitchFilename(String filename) {
        String[] tokens = filename.split("\\.(?=[^\\.]+$)");
        return tokens[0] + ".pitch";
    }
}
