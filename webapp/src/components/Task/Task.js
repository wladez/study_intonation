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
    audio: [],
    isValid: true
  };

  async componentWillMount() {
    const { taskId } = this.props.match.params;
    await this.fetchAndUpdate(taskId);
    this.fileNameMap = new Map();
  }

  fetchAndUpdate = async (taskId) => {
    await taskModel.fetchSample(taskId);
    const { text, instruction, markups } = taskModel.sampleTask;
    this.setState({
      text,
      instruction,
      fragments: markups ? markups.map(f => new FragmentModel(f)) : [],
      audio: [taskModel.audio]
    });
  };

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
    const { text, instruction, fragments } = this.state;
    const { sampleTask, sampleTask: { id } } = taskModel;
    const markups = [];
    fragments.forEach(f => {
      const { fragment, start, stop, catchword } = f;
      markups.push({fragment, start, stop, catchword});
    });

    const updatedTask = {
        ...sampleTask,
      text,
      instruction,
      markups
    };
    await taskModel.save(updatedTask);
    await taskModel.fetchSample(id);
    this.updateStateAfterSave();
  };

  updateStateAfterSave = () => {
    const { text, instruction, markups } = taskModel.sampleTask;
    this.setState({
      text,
      instruction,
      fragments: markups || []
    });
  };

  addFragment = e => {
    e.preventDefault();
    const { fragments } = this.state;
    this.setState({
      fragments: [...fragments, new FragmentModel({id: Date.now()/1000})]
    });
  };

  deleteTask = async (e) => {
    e.preventDefault();

  };

  addAudio = async (e) => {
    e.preventDefault();
    const { sampleTask } = taskModel;
    const files = Array.from(e.target.files);
    e.target.value = '';
    files.forEach(file => this.fileNameMap.set(file.name, file));
    const updatedFileList = Array.from(this.fileNameMap.values());
    this.setState({
      audio: [...updatedFileList],
    });
    await taskModel.uploadAudio(sampleTask, files[0]);
    await this.fetchAndUpdate(sampleTask.id);
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
      audio
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

        <button className="btn btn-success" onClick={this.addFragment}>Add fragment</button>
        <button className="btn btn-success" onClick={this.saveTask}>Save task</button>

        <div className="file-upload">
          <input id="file" type='file' onChange={ this.addAudio } />
          <label className='file-upload btn btn-primary' for="file">Add audio</label>
        </div>
        {
          (audio[0] && audio[0].status === 200) &&
          <audio src={`http://localhost:8080/tasks/${taskModel.sampleTask.id}/downloadAudio`} controls>
            Your browser does not support the audio element.
          </audio>
        }
      </div>
    );
  }
}

export default Task;
