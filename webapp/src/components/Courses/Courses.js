import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import courseModel from "../../models/CourseModel";
import '../Common/CollapsibleItem';
import { CollapsibleItem } from "../Common/CollapsibleItem";

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

  renderList = () => {
    const { courses } = courseModel;
    return (
      <div className='container'>
        <div id="inbox-head">
          <h2>Followed courses:</h2>
        </div>

        {
          courses.map(this.courseMapper)
        }

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
