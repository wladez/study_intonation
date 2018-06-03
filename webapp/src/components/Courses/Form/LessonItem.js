import React, { Component, Fragment } from 'react';
import classNames from "classnames";

export class LessonItem extends Component {

  state = {
    active: false
  };

  toggleItem = id => {
    const { onRemove, onAdd } = this.props;
    this.state.active ? onRemove(id) : onAdd(id);
    this.setState({ active: !this.state.active });
  };

  render() {
    const { lesson } = this.props;
    const itemClasses = classNames({
      'list-group-item': true,
      'list-group-item-action': true,
      'active' : this.state.active
    });
    return (
      <Fragment>
        <a className={itemClasses} onClick={() => this.toggleItem(lesson.id)}>{lesson.title}</a>
      </Fragment>
    );
  }
}