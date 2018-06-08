import React, { Component, Fragment } from 'react';

import './NewTaskForm.css';

export class NewTaskForm extends Component {

  state = {
    text: '',
    instruction: '',
  };

  handleText = e => {
    this.setState({ text: e.target.value });
  };

  handleInstruction = e => {
    this.setState({ instruction: e.target.value });
  };

  handleCancel = e => {
    const { modal } = this.props;
    e.preventDefault();
    modal.hide();
  };

  addTask = e => {
    e.preventDefault();
    const { text, instruction } = this.state;
    const { model, modal } = this.props;
    const newTask = {
      text,
      instruction
    };
    model.add(newTask);
    modal.hide();

  };

  render() {
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

          <button className="btn btn-success" onClick={this.addTask}>Add task</button>
          <button className="btn btn-danger" onClick={() => this.handleCancel()}>Cancel</button>
        </form>
      </div>
    );
  }
}
