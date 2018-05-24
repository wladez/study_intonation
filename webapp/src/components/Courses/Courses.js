import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import courseModel from "../../models/CourseModel";
import Course from '../Course/Course';

@inject('history')
@observer
class Courses extends Component {

  componentWillMount() {
    courseModel.fetchAll();
  }

  courseMapper = course => {
    return (
      <li
        key={`courseId-${course.id}`}
        id={course.id}
        onClick={this.handleCourseClick}
      >{course.title}
      </li>
    )
  };

  handleCourseClick = e => {
    e.preventDefault();
    const { id } = e.target;
    this.props.history.push(`/courses/${id}`);
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

  renderList = () => {
    const { courses } = courseModel;
    return (
      <div>
        <div className="container" id="inbox-head">
          <h2>Followed courses:</h2>
        </div>
        <div className="container" id="inbox-list">
          <ul>
            {
              courses.map(this.courseMapper)
            }
          </ul>
        </div>
      </div>
    );
  };

  renderParticularCourse = courseNumber => {
    return <Course courseNumber={courseNumber} />
  };

  render() {
    return (
      this.renderList()
    );

  }
}

export default Courses;
