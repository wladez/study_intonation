import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { isEmpty } from 'ramda';
import taskModel from '../../models/TaskModel';

@observer
class Task extends Component {

  componentWillMount() {
    const { taskId } = this.props.match.params;
    taskModel.fetchSample(taskId);
  }

  render() {
    const task = taskModel.sampleTask;
    if (isEmpty(task)) {
      return (
        <div>Go to Tasks list firstly to fetch the data!</div>
      );
    }
    return (
      <div>
        <p>ID: #{task.id}</p>
        <p>Instruction: {task.instruction}</p>
        <p>Text: {task.text}</p>
      </div>
    );
  }
}

export default Task;
