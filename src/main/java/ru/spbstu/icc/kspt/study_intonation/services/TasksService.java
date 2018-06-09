package ru.spbstu.icc.kspt.study_intonation.services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ru.spbstu.icc.kspt.study_intonation.common.Paths;
import ru.spbstu.icc.kspt.study_intonation.dao.TasksMapper;
import ru.spbstu.icc.kspt.study_intonation.entities.Task;
import ru.spbstu.icc.kspt.study_intonation.responses.Markup;
import ru.spbstu.icc.kspt.study_intonation.utilities.Pitch;
import ru.spbstu.icc.kspt.study_intonation.utilities.PitchDetector;
import ru.spbstu.icc.kspt.study_intonation.utilities.ValidationUtility;

import javax.sound.sampled.UnsupportedAudioFileException;
import java.io.*;
import java.util.Formatter;
import java.util.List;
import java.util.Locale;

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

    public void uploadAudio(final Long id, final MultipartFile file) {
        if (!ValidationUtility.isValidId(id))
            throw new RuntimeException("Invalid taskID for adding audio!");

        if (file != null) {
            if (file.isEmpty())
                throw new IllegalArgumentException("Incorrect file");
            if (!ValidationUtility.isValidAudio(file))
                throw new IllegalArgumentException("Incorrect extension of the file");
        }

//        File resourcesDirectory = new File("src/main/resources/tasks");

        String path = "tasks/" + id + ".mp3";

//        System.out.println(path);

        File toSave = new File(Paths.RESOURCE_DIRECTORY.getAbsolutePath() + "/" + path);

        try {
            file.transferTo(toSave);
        } catch (IOException e) {
            e.printStackTrace();
        }

        tasksMapper.setAudio(path, id);

        try {
            generatePitch(id, path);
        } catch (IOException | UnsupportedAudioFileException e) {
            e.printStackTrace();
        }

    }

    private void generatePitch(final Long id, final String filename) throws IOException, UnsupportedAudioFileException {
        PitchDetector detector = new PitchDetector();
        List<Pitch> pitches = detector.process(Paths.RESOURCE_DIRECTORY.getAbsolutePath() + "/" + filename);

        System.out.println(pitches.size() + " pitches was found");

        printPitchToFile(pitches, getPitchFilename(filename));

        tasksMapper.setPitch(getPitchFilename(filename), id);
    }

    private static void printPitchToFile(final List<Pitch> pitches, final String filename) {
        try {
            Formatter output = new Formatter(Paths.RESOURCE_DIRECTORY.getAbsolutePath() + "/" + filename, "UTF-8", Locale.US);

            for (Pitch pitch : pitches) {
                output.format("%.3f %.3f%n", pitch.getTimeStamp(), pitch.getPitch());
            }

            output.flush();
        } catch (UnsupportedEncodingException | FileNotFoundException e) {
            System.out.println("Saving to file failed");
        }
        System.out.println("Saved to file " + filename);
    }

    private static String getPitchFilename(final String filename) {
        String[] tokens = filename.split("\\.(?=[^\\.]+$)");
        return tokens[0] + ".pitch";
    }

    public void uploadMarkup(final Long id, final String string) {
        if (!ValidationUtility.isValidId(id))
            throw new RuntimeException("Invalid taskID for adding text markup!");

        if (ValidationUtility.isEmpty(string))
            throw new RuntimeException("No content for markup");

        String filename = "tasks/" + id + ".text";

        try (BufferedWriter writer = new BufferedWriter(
                new FileWriter(Paths.RESOURCE_DIRECTORY.getAbsolutePath() + "/" + filename))) {
            writer.write(string);
        } catch (IOException e) {
            e.printStackTrace();
        }

        tasksMapper.setTextMarkup(filename, id);

    }

    public List<Markup> getMarkup(Task task) {
        String filename = "tasks/" + task.getId() + ".text";
        StringBuilder builder = new StringBuilder();
        String currentLine = null;
        List<Markup> result = null;
        try (BufferedReader reader = new BufferedReader(new FileReader(Paths.RESOURCE_DIRECTORY.getAbsolutePath() + "/" + filename))) {
           while ((currentLine = reader.readLine()) != null ) builder.append(currentLine);
            ObjectMapper mapper = new ObjectMapper();
            result = mapper.readValue(builder.toString(), new TypeReference<List<Markup>>() {
            });
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result;
    }

    public FileSystemResource getAudioFile(Task task) {
        String filename = "tasks/" + task.getId() + ".text";
        return new FileSystemResource(new File(Paths.RESOURCE_DIRECTORY.getAbsolutePath() + "/" + filename));
    }
}
