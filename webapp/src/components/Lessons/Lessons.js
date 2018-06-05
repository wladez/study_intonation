import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { CollapsibleItem } from '../Common/CollapsibleItem';
import lessonModel from '../../models/LessonModel';
import { EntityTitle } from "../Common/EntityTitle";
import { LessonsForm } from "./Form/LessonsForm";

import './Lessons.css';

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
      onClick={this.onClickTaskOfLesson}
      history={this.props.history}
    />
  );

  onClickTaskOfLesson = e => {
    e.preventDefault();
    const { id } = e.target;
    this.props.history.push(`/tasks/${id}`);
  };

  addLesson = modalRef => (
    <LessonsForm model={lessonModel} modal={modalRef} tasks={lessonModel.tasks} />
  );

  renderList = () => {
    const { lessons } = lessonModel;
    return (
      <div className='container'>
        <EntityTitle model={lessonModel} modalDialog={this.addLesson} />
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
