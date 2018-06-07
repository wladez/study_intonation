import React, { Component, Fragment } from 'react';

import './NewTaskForm.css';

export class NewTaskForm extends Component {

  state = {
    text: '',
    instruction: '',
    pathToAudio: '',
    pitch: '',
    textMarkup: ''
  };

  handleText = e => {
    this.setState({ text: e.target.value });
  };

  handleInstruction = e => {
    this.setState({ instruction: e.target.value });
  };

  handlePathToAudio = e => {
    this.setState({ pathToAudio: e.target.value });
  };

  handlePitch = e => {
    this.setState({ pitch: e.target.value });
  };

  handleTextMarkup = e => {
    this.setState({ textMarkup: e.target.value });
  };

  handleCancel = e => {
    const { modal } = this.props;
    e.preventDefault();
    modal.hide();
  };

  addTask = e => {
    e.preventDefault();
    const { text, instruction, pathToAudio, pitch, textMarkup } = this.state;
    const { model, modal } = this.props;
    // const attachedTasks = Array.from(tasksMap)
    //   .map(taskItems => ({id: taskItems[0], isAdded: taskItems[1]}))
    //   .filter(task => task.isAdded === true);
    // const newTasks = [];
    // attachedTasks
    //   .forEach(attachedLesson => {
    //     const foundTask = tasks.find(task => task.id === attachedLesson.id);
    //     newTasks.push(foundTask);
    //   });
    const newTask = {
      text,
      instruction,
      pathToAudio,
      pitch,
      textMarkup
    };
    model.addTask(newTask);
    modal.hide();

  };

  render() {
    const { tasks } = this.props;
    return (
      <div className="form-wrapper">
        <form>
          <div className="form-group">
            <label>Text</label>
            <input
              type="text"
              className="form-control" id="textInput" placeholder="Enter text" name="text"
              onChange={this.handleText} value={this.state.text}
            />
          </div>

          <div className="form-group">
            <label>Instruction</label>
            <textarea
              className="form-control"
              id="instructionInput" placeholder="Enter instruction" name="instruction"
              onChange={this.handleInstruction} value={this.state.instruction}
            />
          </div>

          <button className="btn btn-success" onClick={ this.addTask}>Add task</button>
          <button className="btn btn-danger" onClick={this.handleCancel.bind(this)}>Cancel</button>
        </form>
      </div>
    );
  }
}
