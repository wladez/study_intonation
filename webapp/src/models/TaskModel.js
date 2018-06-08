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
}

const taskModel = new TaskModel('tasks', history);
export default taskModel;