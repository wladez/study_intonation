import React, { Component, Fragment } from 'react';

import './NewTaskForm.css';

export class NewTaskForm extends Component {

  state = {
    tasksMap : new Map(),
    text: '',
    instruction: '',
    pathToAudio: '',
    pitch: '',
    textMarkup: ''
  };

  handleText = e => {
    this.setState({ title: e.target.value });
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
    const { title, description, duration, logo, tasksMap } = this.state;
    const { tasks, model, modal } = this.props;
    const attachedTasks = Array.from(tasksMap)
      .map(taskItems => ({id: taskItems[0], isAdded: taskItems[1]}))
      .filter(task => task.isAdded === true);
    const newTasks = [];
    attachedTasks
      .forEach(attachedLesson => {
        const foundTask = tasks.find(task => task.id === attachedLesson.id);
        newTasks.push(foundTask);
      });
    const newLesson = {
      title,
      description,
      duration,
      logo,
      tasks: newTasks
    };
    model.addLesson(newLesson);
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

          <div className="form-group">
            <label>Path to Audio</label>
            <input type="text"
                   className="form-control"
                   id="pathToAudioInput" placeholder="Enter path to audio" name="pathToAudio"
                   onChange={this.handlePathToAudio} value={this.state.pathToAudio}
            />
          </div>

          <div className="form-group">
            <label>Pitch</label>
            <input type="text"
                   className="form-control"
                   id="pitchInput" placeholder="Enter pitch" name="pitch"
                   onChange={this.handlePitch} value={this.state.pitch}
            />
          </div>

          <div className="form-group">
            <label>Text Markup</label>
            <input type="text"
                   className="form-control"
                   id="markupInput" placeholder="Enter text markup" name="markup"
                   onChange={this.handleTextMarkup} value={this.state.textMarkup}
            />
          </div>

          <button className="btn btn-success" onClick={ this.addTask}>Add task</button>
          <button className="btn btn-danger" onClick={this.handleCancel.bind(this)}>Cancel</button>
        </form>
      </div>
    );
  }
}
