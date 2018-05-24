import { observable, action, computed } from 'mobx';
import { call } from '../utils/api';
import history from '../utils/history';
import {BaseModel} from "./BaseModel";

export class CourseModel extends BaseModel {
  @observable courses = [];
  @observable sampleCourse = {};
  @observable isLoading = false;

  @computed get coursesCount() {
    return this.courses.length;
  }

  endpoint = '/courses';

  constructor(id) {
    super(id, history);
  }

  @action
  fetchAll = async () => {
    this.isLoading = true;
    this.courses = await call(this.endpoint, {
      method: 'GET'
    });
    this.isLoading = false;
  };

  @action
  fetchSample = async (courseId) => {
    this.isLoading = true;
    this.sampleCourse = await call(`${this.endpoint}/${courseId}`, {
      method: 'GET'
    });
    this.isLoading = false;
  };
}

const courseModel = new CourseModel('COURSES', history);
export default courseModel;