import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import courseModel from "../../models/CourseModel";
import '../Common/CollapsibleItem';
import { CollapsibleItem } from "../Common/CollapsibleItem";
import { EntityTitle } from "../Common/EntityTitle";
import { CourseForm } from "./Form/CourseForm";

import './Courses.css';
import './../Common/common.css';

@inject('history')
@observer
class Courses extends Component {

  componentWillMount() {
    courseModel.fetchAll();
  }

  courseMapper = course => (
    <CollapsibleItem
      key={`courseId-${course.id}`}
      entity={course}
      target='lessons'
      onClick={this.onClickLessonOfCourse}
      model={courseModel}
      history={this.props.history}
    />
  );

  onClickLessonOfCourse = e => {
    e.preventDefault();
    const { id } = e.target;
    this.props.history.push(`/lessons/${id}`);
  };

  getCourseNumber = () => {
    const path = window.location.pathname.slice();
    const lastIndex = path.lastIndexOf('/');
    if (lastIndex === 0) {
      return null;
    }
    const value = path.slice(lastIndex+1);
    return value.length ? Number(value) : null;
  };

  addCourse = modalRef => (
    <CourseForm model={courseModel} modal={modalRef} lessons={courseModel.lessons} />
  );

  renderList = () => {
    const { courses } = courseModel;
    return (
      <div className='container'>
        <EntityTitle model={courseModel} modalDialog={this.addCourse} />
        <div className="courses-wrapper">
          {
            courses.map(this.courseMapper)
          }
        </div>
      </div>
    );
  };

  render() {
    return (
      this.renderList()
    );

  }
}

export default Courses;
