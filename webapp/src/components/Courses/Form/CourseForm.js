import React, { Component } from 'react';
import { LessonItem } from "./LessonItem";
import './Form.css';

export class CourseForm extends Component {

  state = {
    lessonsMap : new Map(),
    title: '',
    category: '',
    description: ''
  };

  handleTitle = e => {
    this.setState({ title: e.target.value });
  };

  handleCategory = e => {
    this.setState({ category: e.target.value });
  };

  handleDescription = e => {
    this.setState({ description: e.target.value });
  };

  onRemoveLesson = lessonId => {
    const { lessonsMap } = this.state;
    lessonsMap.set(lessonId, false);
  };

  onAddLesson = lessonId => {
    const { lessonsMap } = this.state;
    lessonsMap.set(lessonId, true);
    console.log(lessonsMap);
  };

  handleCancel = e => {
    const { modal } = this.props;
    e.preventDefault();
    modal.hide();
  };

  addCourse = e => {
    e.preventDefault();
    const { title, category, description, lessonsMap } = this.state;
    const { lessons, model, modal } = this.props;
    const attachedLessons = Array.from(lessonsMap)
      .map(lessonItems => ({id: lessonItems[0], isAdded: lessonItems[1]}))
      .filter(lesson => lesson.isAdded === true);
    const newLessons = [];
    attachedLessons
      .forEach(attachedLesson => {
        const foundLesson = lessons.find(lesson => lesson.id === attachedLesson.id);
        newLessons.push(foundLesson);
      });
    const newCourse = {
      title,
      category,
      description,
      lessons: newLessons
    };
    model.addCourse(newCourse);
    modal.hide();

  };

  render() {
    const { lessons } = this.props;
    const lessonsView =
      lessons.map(lesson =>
        <LessonItem
          lesson={lesson}
          onRemove={this.onRemoveLesson}
          onAdd={this.onAddLesson} />
      );
    return (
      <div className="form-wrapper">
        <form>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control" id="titleInput" placeholder="Enter title" name="title"
              onChange={this.handleTitle} value={this.state.title}
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input type="text"
                   className="form-control"
                   id="categoryInput" placeholder="Enter category" name="category"
                   onChange={this.handleCategory} value={this.state.category}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              id="descriptionInput" placeholder="Enter something" name="description"
              onChange={this.handleDescription} value={this.state.description}
            />
          </div>

          <div className="form-group">
            <label>Lessons</label>
            {lessonsView}
          </div>


          <button className="btn btn-success" onClick={ this.addCourse}>Add course</button>
          <button className="btn btn-danger" onClick={this.handleCancel.bind(this)}>Cancel</button>
        </form>
      </div>
    );
  }
}
