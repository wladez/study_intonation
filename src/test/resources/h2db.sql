DROP ALL objects;
-- DROP SCHEMA IF EXISTS study_intonation;
-- -----------------------------------------------------
-- Schema study_intonation
-- -----------------------------------------------------
-- CREATE SCHEMA IF NOT EXISTS study_intonation;
-- USE study_intonation;

-- -----------------------------------------------------
-- Table `study_intonation`.`Tasks`
-- -- -----------------------------------------------------
-- DROP TABLE IF EXISTS Tasks;

CREATE TABLE IF NOT EXISTS Tasks(
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  instruction VARCHAR(250) NULL,
  text VARCHAR(150) NULL,
  pathToAudio VARCHAR(45) NULL,
  pitch VARCHAR(45) NULL,
  textMarkup VARCHAR(45) NULL,
  deleted BIT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (id))
;

-- CREATE UNIQUE INDEX id_UNIQUE ON study_intonation.Tasks (id ASC);

-- -----------------------------------------------------
-- Table `study_intonation`.`Courses`
-- -----------------------------------------------------
-- DROP TABLE IF EXISTS study_intonation.Courses;

CREATE TABLE IF NOT EXISTS Courses (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  dirname VARCHAR(45) NULL,
  title VARCHAR(45) NULL,
  description VARCHAR(250) NULL,
  logo VARCHAR(45) NULL,
  difficulty INT NULL,
  category VARCHAR(45) NULL,
  releaseDate VARCHAR(45) NULL,
  available BIT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (id))
;

-- CREATE UNIQUE INDEX `id_UNIQUE` ON `study_intonation`.`Courses` (`id` ASC);


-- -----------------------------------------------------
-- Table `study_intonation`.`Lessons`
-- -----------------------------------------------------
-- DROP TABLE IF EXISTS study_intonation.Lessons;

CREATE TABLE IF NOT EXISTS Lessons (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(45) NULL,
  description VARCHAR(250) NULL,
  shortDescription VARCHAR(45) NULL,
  logo VARCHAR(45) NULL,
  duration INT NULL,
  deleted BIT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (id))
;

-- CREATE UNIQUE INDEX `id_UNIQUE` ON `study_intonation`.`Lessons` (`id` ASC);

-- -----------------------------------------------------
-- Table `study_intonation`.`Users`
-- -----------------------------------------------------
-- DROP TABLE IF EXISTS study_intonation.Users;

CREATE TABLE IF NOT EXISTS Users (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NULL,
  email VARCHAR(45) NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB;

-- CREATE UNIQUE INDEX `id_UNIQUE` ON `study_intonation`.`Users` (`id` ASC);


-- -----------------------------------------------------
-- Table `study_intonation`.`Statistics`
-- -----------------------------------------------------
-- DROP TABLE IF EXISTS study_intonation.Attempts ;

CREATE TABLE IF NOT EXISTS Attempts (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  userID INT UNSIGNED NOT NULL,
  taskID INT UNSIGNED NOT NULL,
  lessonID INT UNSIGNED NOT NULL,
  courseDir VARCHAR(45) NULL,
  CR DOUBLE NULL,
  MSE DOUBLE NULL,
  MSE_K DOUBLE NULL,
  PRIMARY KEY (id))
;

-- CREATE UNIQUE INDEX `id_UNIQUE` ON `study_intonation`.`Attempts` (`id` ASC);

CREATE INDEX userID_idx ON Attempts (userID ASC);

CREATE INDEX taskID_idx ON Attempts (taskID ASC);

alter table attempts
	add constraint FK_ATTEMPTS_USER_ID
		foreign key (userID) references users (ID)
			on update cascade on delete cascade;

alter table attempts
	add constraint FK_ATTEMPTS_TASK_ID
		foreign key (taskID) references tasks (ID)
			on update cascade on delete cascade;
-- -----------------------------------------------------
-- Table `study_intonation`.`lesson_task`
-- -----------------------------------------------------
-- DROP TABLE IF EXISTS study_intonation.lesson_task ;

CREATE TABLE IF NOT EXISTS lesson_task (
  lessonID INT UNSIGNED NOT NULL,
  taskID INT UNSIGNED NOT NULL,
  PRIMARY KEY (lessonID, taskID))
;

CREATE INDEX lessonID_idx ON lesson_task (lessonID ASC);

CREATE INDEX taskID_idx_lt ON lesson_task (taskID ASC);

alter table lesson_task
	add constraint LESSONTASK_LESSON_ID_FK
		foreign key (lessonID) references lessons (ID)
			on update cascade on delete cascade;

alter table lesson_task
    add constraint LESSONTASK_TASK_ID_FK
		foreign key (taskID) references tasks (ID)
			on update cascade on delete cascade;

-- -----------------------------------------------------
-- Table `study_intonation`.`course_lesson`
-- -----------------------------------------------------
-- DROP TABLE IF EXISTS study_intonation.course_lesson;

CREATE TABLE IF NOT EXISTS course_lesson (
  courseID INT UNSIGNED NOT NULL,
  lessonID INT UNSIGNED NOT NULL,
  PRIMARY KEY (courseID, lessonID))
ENGINE = InnoDB;

CREATE INDEX lessonID_idx_cl ON course_lesson (lessonID ASC);

CREATE INDEX courseID_idx ON course_lesson (courseID ASC);

alter table course_lesson
	add constraint COURSELESSON_LESSON_ID_FK
		foreign key (lessonID) references lessons (ID)
			on update cascade on delete cascade;

alter table course_lesson
    add constraint COURSELESSON_COURSE_ID_FK
		foreign key (courseID) references courses (ID)
			on update cascade on delete cascade;

