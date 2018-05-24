import { observable, action } from 'mobx';
import { call } from '../utils/api';
import history from '../utils/history';
import {BaseModel} from "./BaseModel";

export class LessonModel extends BaseModel {
  @observable lessons = [];
  @observable sampleLesson = {};
  @observable isLoading = false;

  endpoint = '/lessons';

  constructor(id) {
    super(id, history);
  }

  @action
  fetchAll = async () => {
    this.isLoading = true;
    this.lessons = await call(this.endpoint, {
      method: 'GET'
    });
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
}

const lessonModel = new LessonModel('LESSONS', history);
export default lessonModel;