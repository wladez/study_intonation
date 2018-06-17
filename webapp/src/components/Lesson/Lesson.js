import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';
import classNames from "classnames";
import SkyLight from 'react-skylight';
import { PulseLoader } from "halogenium";
import lessonModel from '../../models/LessonModel';
import { TaskItem } from "./TaskItem";
import { FormTaskItem } from "./FormTaskItem";

import './Lesson.css';

@observer
class Lesson extends Component {

  state = {
    editTitleMode: false,
    editDescriptionMode: false,
    title: "",
    description: "",
    tasks: lessonModel.sampleLesson ? lessonModel.sampleLesson.tasks : []
  };

  async componentWillMount() {
    const { lessonId } = this.props.match.params;
    await lessonModel.fetchSample(lessonId);
    if (lessonModel.tasks.length === 0) {
      await lessonModel.fetchAll();
    }
    this.setState({
      tasks: lessonModel.sampleLesson.tasks,
      title: lessonModel.sampleLesson.title,
      description: lessonModel.sampleLesson.description,
    });
  }

  onTitleMode = () => {
    this.setState({editTitleMode: true});
  };

  offTitleMode = () => {
    this.setState({editTitleMode: false});
  };

  onDescriptionMode = () => {
    this.setState({editDescriptionMode: true});
  };

  offDescriptionMode = () => {
    this.setState({editDescriptionMode: false});
  };

  handleTitle = e => {
    e.preventDefault();
    this.setState({ title: e.target.value });
  };

  handleDescription = e => {
    e.preventDefault();
    this.setState({ description: e.target.value });
  };

  onRemoveTask = taskId => {
    this.setState({ tasks: this.state.tasks.filter(task => task.id !== taskId)});
  };

  onAddTask = taskId => {
    const taskToAdd = lessonModel.tasks.find(task => task.id === taskId);
    if (taskToAdd) {
      this.setState({ tasks: [...this.state.tasks, taskToAdd]})
    }
  };

  openModal = () => {
    this.addTasksDialog.show();
  };

  hideModal = () => {
    this.addTasksDialog.hide();
  };

  getDifference = (my, all) => {
    return all.filter(task => my.findIndex(t1 => t1.id === task.id) < 0);
  };

  addTasksForm = model => {
    const {tasks: my} = model.sampleLesson;
    const { tasks } = model;
    const others = this.getDifference(my, tasks);
    return (
      <SkyLight
        hideOnOverlayClicked
        ref={ref => this.addTasksDialog = ref}
        title="Add tasks">
        <div className="form-wrapper">
          <h4>Choose tasks to add</h4>
          {
            others.map(task =>
              <FormTaskItem
                task={task}
                model={lessonModel}
                onRemove={this.onRemoveTask}
                onAdd={this.onAddTask} />
            )
          }
        </div>
      </SkyLight>
    )
  };

  renderTasksList = () => {
    const { tasks } = this.state;
    return (
      <div className="tasks-list">
        <h3>Tasks</h3>
        {
          tasks &&
          tasks
            .map(task =>
              <TaskItem
                task={task}
                model={lessonModel}
                onRemove={this.onRemoveTask}
                onAdd={() => {}}
              />
            )
        }
      </div>
    );
  };

  getClasses = field => {
    const { sampleLesson } = lessonModel;
    return classNames({
      'edited': this.state[field] !== sampleLesson[field]
    });
  };

  saveLesson = async (e) => {
    e.preventDefault();
    const { sampleLesson , sampleLesson: { id } } = lessonModel;
    const { title, description, tasks } = this.state;
    const updatedLesson = {
      ...sampleLesson,
      title,
      description,
      tasks
    };
    await lessonModel.save(updatedLesson);
    await lessonModel.fetchSample(id);
  };

  deleteLesson = async (e) => {
    e.preventDefault();
    const { sampleLesson } = lessonModel;
    await lessonModel.delete(sampleLesson);
    this.props.history.push('/lessons');
  };



  render() {
    const { editTitleMode, editDescriptionMode, title, description } = this.state;

    return (
      <div className="container">
        {
          lessonModel.isLoading && <PulseLoader className="spinner" color="#26A65B" size="20px" margin="4px"/>
        }
        <p>Title:
          {
            editTitleMode ?
              <input type="text"
                     className="form-control"
                     id="titleInput" name="title"
                     onChange={this.handleTitle} value={title} onBlur={() => this.offTitleMode()} />
              :
              <Fragment>
                <span className={this.getClasses("title")}>{title}</span>
                <span className="edit-icon" onClick={this.onTitleMode}>&#x270E;</span>
              </Fragment>
          }
        </p>
        <p>Description:
          {
            editDescriptionMode ?
              <input type="text"
                     className="form-control"
                     id="descriptionInput" name="description"
                     onChange={this.handleDescription} value={description} onBlur={() => this.offDescriptionMode()} />
              :
              <Fragment>
                <span className={this.getClasses("description")}>{description}</span>
                <span className="edit-icon" onClick={this.onDescriptionMode}>&#x270E;</span>
              </Fragment>
          }
        </p>
        {this.renderTasksList()}
        <button className="btn btn-primary" onClick={() => this.openModal()}>Add task</button>
        <button className="btn btn-success" onClick={this.saveLesson}>Save lesson</button>
        <button className="btn btn-danger" onClick={this.deleteLesson}>Delete lesson</button>
        {this.addTasksForm(lessonModel)}
      </div>
    );
  }
}

export default Lesson;
