import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import { isEmpty } from 'ramda';
import classNames from "classnames";
import SkyLight from 'react-skylight';
import { PulseLoader } from "halogenium";
import courseModel from '../../models/CourseModel';
import { LessonItem } from "./LessonItem";
import { FormLessonItem } from "./FormLessonItem";

import './Course.css';

@inject("history")
@observer
class Course extends Component {

  state = {
    editTitleMode: false,
    editDescriptionMode: false,
    lessons: courseModel.sampleCourse ? courseModel.sampleCourse.lessons : [],
    title: "",
    description: ""
  };

  async componentWillMount() {
    const { courseId } = this.props.match.params;
    await courseModel.fetchSample(courseId);
    if (courseModel.lessons.length === 0) {
      await courseModel.fetchAll();
    }
    this.setState({
      lessons: courseModel.sampleCourse.lessons,
      title: courseModel.sampleCourse.title,
      description: courseModel.sampleCourse.description
    });
  }

  onTitleMode = () => {
    this.setState({editTitleMode: true});
  };

  offTitleMode = () => {
    this.setState({editTitleMode: false});
  };

  onDescriptionMode = () => {
    this.setState({editDescriptionMode: true});
  };

  offDescriptionMode = () => {
    this.setState({editDescriptionMode: false});
  };

  handleTitle = e => {
    e.preventDefault();
    this.setState({ title: e.target.value });
  };

  handleDescription = e => {
    e.preventDefault();
    this.setState({ description: e.target.value });
  };

  onRemoveLesson = lessonId => {
    this.setState({ lessons: this.state.lessons.filter(lesson => lesson.id !== lessonId)});
  };

  onAddLesson = lessonId => {
    const lessonToAdd = courseModel.lessons.find(lesson => lesson.id === lessonId);
    if (lessonToAdd) {
      this.setState({ lessons: [...this.state.lessons, lessonToAdd]})
    }
  };

  openModal = () => {
    this.addLessonsDialog.show();
  };

  hideModal = () => {
    this.addLessonsDialog.hide();
  };

  getDifference = (my, all) => {
    return all.filter(lesson => my.findIndex(l1 => l1.id === lesson.id) < 0);
  };

  addLessonsForm = model => {
    const {lessons: my} = model.sampleCourse;
    const { lessons } = model;
    const others = this.getDifference(my, lessons);
    console.log(others);
    return (
      <SkyLight
        hideOnOverlayClicked
        ref={ref => this.addLessonsDialog = ref}
        title="Add lessons">
        <h4>Choose lessons to add</h4>
        {
          others.map(lesson =>
            <FormLessonItem
              lesson={lesson}
              model={courseModel}
              onRemove={this.onRemoveLesson}
              onAdd={this.onAddLesson} />
          )
        }
      </SkyLight>
    )
  };

  renderLessonsList = () => {
    const { lessons } = this.state;
    return (
      <div className="lessons-list">
        <h3>Lessons</h3>
        {
          lessons &&
          lessons
            .map(lesson =>
              <LessonItem
                lesson={lesson}
                model={courseModel}
                onRemove={this.onRemoveLesson}
                onAdd={() => {}}
              />
            )
        }
        </div>
    );
  };

  getClasses = field => {
    const { sampleCourse } = courseModel;
    return classNames({
      'edited': this.state[field] !== sampleCourse[field]
    });
  };

  saveCourse = async (e) => {
    e.preventDefault();
    const { sampleCourse, sampleCourse: { id } } = courseModel;
    const { title, description, lessons } = this.state;
    const updatedCourse = {
      ...sampleCourse,
      title,
      description,
      lessons
    };
    await courseModel.save(updatedCourse);
    await courseModel.fetchSample(id);
  };

  deleteCourse = async (e) => {
    e.preventDefault();
    const { sampleCourse } = courseModel;
    await courseModel.delete(sampleCourse);
    this.props.history.push('/courses');
  };

  render() {
    const course = courseModel.sampleCourse;
    const { editTitleMode, editDescriptionMode, title, description } = this.state;
    if (isEmpty(course)) {
      return (
        <div>Go to Courses list firstly to fetch the data!</div>
      );
    }
    return (
      <div className="container">
        {
          courseModel.isLoading && <PulseLoader className="spinner" color="#26A65B" size="16px" margin="4px"/>
        }
        <p>ID: #{course.id}</p>
        <p>Title:
          {
          editTitleMode ?
            <input type="text"
                   className="form-control"
                   id="titleInput" name="title"
                   onChange={this.handleTitle} value={this.state.title} onBlur={() => this.offTitleMode()} />
            :
            <Fragment>
              <span className={this.getClasses("title")}>{title}</span>
              <span className="edit-icon" onClick={this.onTitleMode}>&#x270E;</span>
            </Fragment>
        }
        </p>
        <p>Description:
          {
            editDescriptionMode ?
              <input type="text"
                     className="form-control"
                    id="descriptionInput" name="description"
                    onChange={this.handleDescription} value={this.state.description} onBlur={() => this.offDescriptionMode()} />
              :
              <Fragment>
                <span className={this.getClasses("description")}>{description}</span>
                <span className="edit-icon" onClick={this.onDescriptionMode}>&#x270E;</span>
              </Fragment>
          }
          </p>
        {this.renderLessonsList()}
        <button className="btn btn-primary" onClick={() => this.openModal()}>Add lessons</button>
        <button className="btn btn-success" onClick={this.saveCourse}>Save course</button>
        <button className="btn btn-danger" onClick={this.deleteCourse}>Delete course</button>
        {this.addLessonsForm(courseModel)}
      </div>
    );
  }
}

export default Course;
