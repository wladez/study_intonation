import { observable, action } from 'mobx';
import { call } from '../utils/api';

export class CourseStore {
  @observable courses = [];
  @observable isLoading = false;

  endpoint = '/courses';

  constructor(id, history) {
    this.id = id;
    this.history = history;
    this.fetch();
  }

  @action
  fetch = async () => {
    this.isLoading = true;
    const courses = await call(this.endpoint, {
      method: 'GET'
    });
    this.courses = courses;
    this.isLoading = false;
  }
}