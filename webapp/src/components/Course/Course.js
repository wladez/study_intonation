import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { isEmpty } from 'ramda';
import courseModel from '../../models/CourseModel';
import './Course.css';

@observer
class Course extends Component {

  state = {
    editMode: false
  };

  componentWillMount() {
    const { courseId } = this.props.match.params;
    courseModel.fetchSample(courseId);
  }

  render() {
    const course = courseModel.sampleCourse;
    if (isEmpty(course)) {
      return (
        <div>Go to Courses list firstly to fetch the data!</div>
      );
    }
    return (
      <div>
        <p>ID: #{course.id}</p>
        <p>Title: {course.title}</p>
        <p>Description: {course.description}</p>
      </div>
    );
  }
}

export default Course;
