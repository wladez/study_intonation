import React, { Component, Fragment } from 'react';
import classNames from "classnames";

export class FormTaskItem extends Component {

  state = {
    active: false
  };

  toggleItem = id => {
    const { onRemove, onAdd } = this.props;
    this.state.active ? onRemove(id) : onAdd(id);
    this.setState({ active: !this.state.active });
  };

  render() {
    const { task } = this.props;
    const itemClasses = classNames({
      'list-group-item': true,
      'list-group-item-action': true,
      'active' : this.state.active
    });
    return (
      <Fragment>
        <a className={itemClasses} onClick={() => this.toggleItem(task.id)}>{task.text}</a>
      </Fragment>
    );
  }
}