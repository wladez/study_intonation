import { observable, action } from 'mobx';
import { call } from '../utils/api';
import history from '../utils/history';
import {BaseModel} from "./BaseModel";

export class TaskModel extends BaseModel {
  @observable tasks = [];
  @observable sampleTask = {};
  @observable isLoading = false;

  endpoint = '/tasks';

  constructor(id) {
    super(id, history);
  }

  @action
  fetchAll = async () => {
    this.isLoading = true;
    this.tasks = await call(this.endpoint, {
      method: 'GET'
    });
    this.isLoading = false;
  };

  @action
  fetchSample = async (taskId) => {
    this.isLoading = true;
    this.sampleTask = await call(`${this.endpoint}/${taskId}`, {
      method: 'GET'
    });
    this.isLoading = false;
  };

  @action
  add = async (task) => {
    this.isLoading = true;
    await call(`${this.endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    await this.fetchAll();
    this.isLoading = false;
  };

  @action
  save = async (task) => {
    this.isLoading = true;
    await call(`${this.endpoint}/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    }, true);
    // update Tasks array
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index > -1) {
      this.tasks[index] = task;
    }
  };

  @action
  downloadAudio = async (task) => {
    this.isLoading = true;
    const file = await call(`${this.endpoint}/${task.id}/downloadAudio`, {
      method: 'GET'
    }, true);
    this.isLoading = false;
    return file;
  };

  @action
  uploadAudio = async (task, file) => {
    this.isLoading = true;
    const formData = new FormData();
    formData.append("file", file);
    await call(`${this.endpoint}/${task.id}/uploadAudio`, {
      method: 'POST',
      body: formData
    }, true);
    this.isLoading = false;
  }
}

const taskModel = new TaskModel('tasks', history);
export default taskModel;