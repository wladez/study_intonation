import React, {Component, Fragment} from 'react';
import { observer, inject } from 'mobx-react';
import taskModel from "../../models/TaskModel";
import { EntityTitle } from "../Common/EntityTitle";
import { NewTaskForm } from "./NewTaskForm";

import './Tasks.css';

@inject('history')
@observer
class Tasks extends Component {

  componentWillMount() {
    taskModel.fetchAll();
  }

  taskMapper = tasks => {
    return (
      <li
        className='link'
        key={`taskId-${tasks.id}`}
        id={tasks.id}
        onClick={this.handleTaskClick}
      >{tasks.text}
      </li>
    )
  };

  handleTaskClick = e => {
    e.preventDefault();
    const { id } = e.target;
    this.props.history.push(`/tasks/${id}`);
  };

  renderAddTaskForm = modalRef => (
    <NewTaskForm model={taskModel} modal={modalRef} tasks={taskModel.tasks} />
  );

  renderList = () => {
    const { tasks } = taskModel;
    return (
      <div id="inbox-list">
        <ul>
          {
            tasks.map(this.taskMapper)
          }
          </ul>
      </div>
    );
  };

  render() {
    return (
          <div className="container">
            <EntityTitle model={taskModel} modalDialog={this.renderAddTaskForm} />
            {this.renderList()}
          </div>
    );

  }
}

export default Tasks;
