import React, { Component } from 'react';
import classNames from "classnames";

import './TaskItem.css';

export class TaskItem extends Component {

  state = {
    active: true
  };

  onRemoveItem = id => {
    const { onRemove } = this.props;
    onRemove(id);
    this.setState({ active: false});
  };

  checkNew = () => {
    const { task, model } = this.props;
    return model.sampleLesson.tasks.findIndex(t => t.id === task.id) < 0;
  };

  render() {
    const { task } = this.props;
    const itemClasses = classNames({
      'list-group-item': true,
      'list-group-item-action': true,
      'edited': this.checkNew()
    });
    return (
      <div className="list-item__wrapper">
        <a className={itemClasses}>{task.text}</a>
        <span className="cross-icon" onClick={() => this.onRemoveItem(task.id)}>x</span>
      </div>
    );
  }
}