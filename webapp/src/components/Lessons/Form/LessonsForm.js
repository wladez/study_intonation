import React, { Component } from 'react';
import { TaskItem } from "./TaskItem";
import './Form.css';

export class LessonsForm extends Component {

  state = {
    tasksMap : new Map(),
    title: '',
    description: '',
    duration: 0,
    logo: ""
  };

  handleTitle = e => {
    this.setState({ title: e.target.value });
  };

  handleDescription = e => {
    this.setState({ description: e.target.value });
  };

  handleDuration = e => {
    this.setState({ duration: e.target.value });
  };

  handleLogo = e => {
    this.setState({ logo: e.target.value });
  };

  onRemoveTask = lessonId => {
    const { tasksMap } = this.state;
    tasksMap.set(lessonId, false);
  };

  onAddTask = lessonId => {
    const { tasksMap } = this.state;
    tasksMap.set(lessonId, true);
    console.log(tasksMap);
  };

  handleCancel = e => {
    const { modal } = this.props;
    e.preventDefault();
    modal.hide();
  };
  
  addLesson = e => {
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
    const tasksView =
      tasks.map(task =>
        <TaskItem
          task={task}
          onRemove={this.onRemoveTask}
          onAdd={this.onAddTask} />
      );
    return (
      <div className="form-wrapper">
        <form>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control" id="titleInput" placeholder="Enter title" name="title"
              onChange={this.handleTitle} value={this.state.title}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              id="descriptionInput" placeholder="Enter something" name="description"
              onChange={this.handleDescription} value={this.state.description}
            />
          </div>

          <div className="form-group">
            <label>Duration</label>
            <input type="text"
                   className="form-control"
                   id="durationInput" placeholder="Enter duration" name="duration"
                   onChange={this.handleDuration} value={this.state.duration}
            />
          </div>

          <div className="form-group">
            <label>Logo path</label>
            <input type="text"
                   className="form-control"
                   id="logoInput" placeholder="Enter path to logo-file" name="logo"
                   onChange={this.handleLogo} value={this.state.logo}
            />
          </div>



          <div className="form-group">
            {tasksView}
          </div>


          <button className="btn btn-success" onClick={ this.addLesson}>Add lesson</button>
          <button className="btn btn-danger" onClick={this.handleCancel.bind(this)}>Cancel</button>
        </form>
      </div>
    );
  }
}
