import React, { Component } from 'react';
import classNames from "classnames";
import './LessonItem.css';

export class LessonItem extends Component {

  state = {
    active: true
  };

  onRemoveItem = id => {
    const { onRemove } = this.props;
    onRemove(id);
    this.setState({ active: false});
  };

  checkNew = () => {
    const { lesson, model } = this.props;
    return model.sampleCourse.lessons.findIndex(l => l.id === lesson.id) < 0;
  };

  render() {
    const { lesson } = this.props;
    const itemClasses = classNames({
      'list-group-item': true,
      'list-group-item-action': true,
      'edited': this.checkNew()
    });
    return (
      <div className="list-item__wrapper">
        <a className={itemClasses}>{lesson.title}</a>
        <span className="cross-icon" onClick={() => this.onRemoveItem(lesson.id)}>x</span>
      </div>
    );
  }
}