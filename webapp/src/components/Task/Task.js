import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';
import classNames from "classnames";
import { PulseLoader } from "halogenium";
import { FragmentItem } from "./FragmentItem";
import { FragmentModel } from "../../models/FragmentModel";
import taskModel from '../../models/TaskModel';

import './Task.css';

@observer
class Task extends Component {

  state = {
    editTextMode: false,
    editInstructionMode: false,
    text: "",
    instruction: "",
    fragments: [],
    audio: {}
  };

  async componentWillMount() {
    const { taskId } = this.props.match.params;
    await taskModel.fetchSample(taskId);
    const { text, instruction, markups } = taskModel.sampleTask;
    this.setState({ text, instruction });
    // this.setState({ fragments: markups }); Waiting for back-end to implement
    const mockedFragments = [
      {
        id: 1,
        fragment: "Hallelujah! Hallelujah!",
        start: "0.125",
        stop: "0.475",
        catchWord: true
      },
      {
        id: 2,
        fragment: "Welcome to the!",
        start: "0.502",
        stop: "0.648",
        catchWord: true
      }];
    this.setState({ fragments: mockedFragments.map(f => new FragmentModel(f))});
  }

  toggleTextMode = () => {
    this.setState({ editTextMode: !this.state.editTextMode });
  };

  toggleInstructionMode = () => {
    this.setState({ editInstructionMode: !this.state.editInstructionMode });
  };


  onChangeText = e => {
    e.preventDefault();
    this.setState({ text: e.target.value });
  };

  onChangeInstruction = e => {
    e.preventDefault();
    this.setState({ instruction: e.target.value });
  };

  getClasses = field => {
    const { sampleTask } = taskModel;
    return classNames({
      'edited': this.state[field] !== sampleTask[field]
    });
  };

  saveTask = async (e) => {
    e.preventDefault();
    console.log(this.state.fragments);

  };

  deleteTask = async (e) => {
    e.preventDefault();

  };

  renderFragmentForm = model => {
    return (
      <Fragment>
        <hr/>
        <div className="form-wrapper">
          <form>
            <FragmentItem model={model}/>
          </form>
        </div>
      </Fragment>
    )
  };

  renderFragments = () => {
    const { fragments } = this.state;
    return (
      <div className="fragments-wrapper">
        {fragments.map(fragment => this.renderFragmentForm(fragment))}
      </div>
    );
  };

  render() {
    const {
      editTextMode,
      editInstructionMode,
      text,
      instruction,
    } = this.state;

    return (
      <div className="container">
        {
          taskModel.isLoading && <PulseLoader className="spinner" color="#26A65B" size="20px" margin="4px"/>
        }

        <p><span className="header">Text:</span>
          {
            editTextMode ?
              <input type="text"
                     className="form-control"
                     id="textInput" name="text"
                     onChange={this.onChangeText} value={text} onBlur={() => this.toggleTextMode()} />
              :
              <Fragment>
                <span className={this.getClasses("text")}>{text}</span>
                <span className="edit-icon" onClick={this.toggleTextMode}>&#x270E;</span>
              </Fragment>
          }
        </p>

        <p><span className="header">Instruction:</span>
          {
            editInstructionMode ?
              <input type="text"
                     className="form-control"
                     id="instructionInput" name="instruction"
                     onChange={this.onChangeInstruction} value={instruction} onBlur={() => this.toggleInstructionMode()} />
              :
              <Fragment>
                <span className={this.getClasses("instruction")}>{instruction}</span>
                <span className="edit-icon" onClick={this.toggleInstructionMode}>&#x270E;</span>
              </Fragment>
          }
        </p>

        {this.renderFragments()}

        <button className="btn btn-success" onClick={this.saveTask}>Save task</button>
        <button className="btn btn-primary" onClick={this.addAudio}>Add audio</button>
      </div>
    );
  }
}

export default Task;
