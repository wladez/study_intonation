import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import taskModel from "../../models/TaskModel";
import Task from '../Task/Task';

@inject('history')
@observer
class Tasks extends Component {

  componentWillMount() {
    taskModel.fetchAll();
  }

  taskMapper = tasks => {
    return (
      <li
        key={`taskId-${tasks.id}`}
        id={tasks.id}
        onClick={this.handleTaskClick}
      >{tasks.instruction}
      </li>
    )
  };

  handleTaskClick = e => {
    e.preventDefault();
    const { id } = e.target;
    this.props.history.push(`/tasks/${id}`);
  };

  getTaskNumber = () => {
    const path = window.location.pathname.slice();
    const lastIndex = path.lastIndexOf('/');
    if (lastIndex === 0) {
      return null;
    }
    const value = path.slice(lastIndex+1);
    return value.length ? Number(value) : null;
  };

  renderList = () => {
    const { tasks } = taskModel;
    return (
      <div>
        <div className="container" id="inbox-head">
          <h2>Followed tasks:</h2>
        </div>
        <div className="container" id="inbox-list">
          <ul>
            {
              tasks.map(this.taskMapper)
            }
          </ul>
        </div>
      </div>
    );
  };

  renderParticularTask = taskNumber => {
    return <Task taskNumber={taskNumber} />
  };

  render() {
    return (
      this.renderList()
    );

  }
}

export default Tasks;
