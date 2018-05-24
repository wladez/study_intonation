import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { isEmpty } from 'ramda';
import lessonModel from '../../models/LessonModel';

@observer
class Lesson extends Component {

  componentWillMount() {
    const { lessonId } = this.props.match.params;
    lessonModel.fetchSample(lessonId);
  }

  render() {
    const lesson = lessonModel.sampleLesson;
    if (isEmpty(lesson)) {
      return (
        <div>Go to Lessons list firstly to fetch the data!</div>
      );
    }
    return (
      <div>
        <p>ID: #{lesson.id}</p>
        <p>Title: {lesson.title}</p>
        <p>Description: {lesson.description}</p>
      </div>
    );
  }
}

export default Lesson;
