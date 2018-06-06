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

  render() {
    const { lesson, classes } = this.props;
    const itemClasses = classNames({
      'list-group-item': true,
      'list-group-item-action': true,
    });
    return (
      <div className="list-item__wrapper">
        <a className={classes || itemClasses}>{lesson.title}</a>
        <span className="cross-icon" onClick={() => this.onRemoveItem(lesson.id)}>x</span>
      </div>
    );
  }
}