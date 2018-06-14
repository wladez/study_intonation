package ru.spbstu.icc.kspt.study_intonation.utilities;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

public final class ValidationUtility {
    private ValidationUtility() {
    }

    public static boolean isValidId(final Long id) {
        return id != null && id > 0;
    }

    public static boolean isValidAllocatedTime(final Integer time) {
        return time != null && time >= 0;
    }

    public static boolean isEmpty(final Object object) {
        return object == null;
    }

    public static boolean isEmpty(final String string) {
        return string == null || string.isEmpty();
    }

    public static boolean isEmpty(final List<?> list) {
        return list == null || list.isEmpty() || list.stream().allMatch(Objects::isNull);
    }

    public static boolean hasEmptyElements(final List<?> list) {
        return list.contains(null);
    }

    public static boolean isValidAudio(final MultipartFile file) {
        return (file.getContentType().equals("audio/mpeg")
                || file.getContentType().equals("audio/wav"));
    }

    public static <T> Optional<T> get(final T o) {
        return Optional.of(o);
    }
}
