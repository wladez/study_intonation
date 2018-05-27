import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { CollapsibleItem } from '../Common/CollapsibleItem';
import lessonModel from '../../models/LessonModel';
import Lesson from '../Lesson/Lesson';

@inject('history')
@observer
class Lessons extends Component {

  componentWillMount() {
    lessonModel.fetchAll();
  }

  lessonMapper = lesson => (
    <CollapsibleItem
      key={`lessonId-${lesson.id}`}
      entity={lesson}
      target='tasks'
      onClick={this.onClickTaskOfLesson} />
  );

  onClickTaskOfLesson = e => {
    e.preventDefault();
    const { id } = e.target;
    this.props.history.push(`/tasks/${id}`);
  };

  getLessonNumber = () => {
    const path = window.location.pathname.slice();
    const lastIndex = path.lastIndexOf('/');
    if (lastIndex === 0) {
      return null;
    }
    const value = path.slice(lastIndex+1);
    return value.length ? Number(value) : null;
  };

  renderList = () => {
    const { lessons } = lessonModel;
    return (
      <div className='container'>
        <div id='inbox-head'>
          <h2>Followed lessons:</h2>
        </div>
        <div id='inbox-list'>
          {lessons.map(this.lessonMapper)}
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

export default Lessons;
