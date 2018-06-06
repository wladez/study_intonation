import { observable, action } from 'mobx';
import { call } from '../utils/api';
import history from '../utils/history';
import {BaseModel} from "./BaseModel";

export class LessonModel extends BaseModel {
  @observable lessons = [];
  @observable tasks = [];
  @observable sampleLesson = {};
  @observable isLoading = false;

  endpoint = '/lessons';
  tasksEndpoint = '/tasks';

  constructor(id) {
    super(id, history);
  }

  @action
  fetchAll = async () => {
    this.isLoading = true;
    this.lessons = await call(this.endpoint, {
      method: 'GET'
    });
    this.tasks = await call(this.tasksEndpoint, {
      method: 'GET'
    });
    this.lessons = this.lessons.filter(lesson => lesson.deleted !== true);
    this.isLoading = false;
  };

  @action
  fetchSample = async (lessonId) => {
    this.isLoading = true;
    this.sampleLesson = await call(`${this.endpoint}/${lessonId}`, {
      method: 'GET'
    });
    this.isLoading = false;
  };

  @action
  addLesson = async (lesson) => {
    this.isLoading = true;
    await call(`${this.endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(lesson)
    }, true);
    await this.fetchAll();
    this.isLoading = false;
  };

  @action
  save = async (lesson) => {
    this.isLoading = true;
    await call(`${this.endpoint}/${lesson.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(lesson)
    }, true);
    const index = this.lessons.findIndex(l => l.id === lesson.id);
    if (index > -1) {
      this.lessons[index] = lesson;
    }
    this.isLoading = false;
  }

  @action
  delete = async (lesson) => {
    this.isLoading = true;
    await call(`${this.endpoint}/${lesson.id}`, {
      method: 'DELETE'
    }, true);
    await this.fetchAll();
    this.isLoading = false;
  }
}

const lessonModel = new LessonModel('lessons', history);
export default lessonModel;