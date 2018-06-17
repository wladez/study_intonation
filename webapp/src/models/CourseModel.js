import { observable, action, computed } from 'mobx';
import { call } from '../utils/api';
import history from '../utils/history';
import {BaseModel} from "./BaseModel";

export class CourseModel extends BaseModel {
  @observable courses = [];
  @observable lessons = [];
  @observable sampleCourse = {};
  @observable isLoading = false;

  @computed get coursesCount() {
    return this.courses.length;
  }

  endpoint = '/courses';
  lessonsEndpoint = '/lessons';

  constructor(id) {
    super(id, history);
  }

  @action
  fetchAll = async () => {
    this.isLoading = true;
    this.courses = await call(this.endpoint, {
      method: 'GET'
    });
    this.lessons = await call(this.lessonsEndpoint, {
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

  @action
  setAvailability = async (courseId, newStatus) => {
    this.isLoading = true;
    await call(`${this.endpoint}/${courseId}/available?status=${newStatus}`, {
      method: 'PUT',
    }, true);
    this.isLoading = false;
  };

  @action
  addCourse = async (course) => {
    this.isLoading = true;
    await call(`${this.endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(course)
    }, true);
    await this.fetchAll();
    this.isLoading = false;
  };

  @action
  save = async (course) => {
    this.isLoading = true;
    await call(`${this.endpoint}/${course.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(course)
    }, true);
    const index = this.courses.findIndex(l => l.id === course.id);
    if (index > -1) {
      this.courses[index] = course;
    }
    this.isLoading = false;
  }

  @action
  delete = async (course) => {
    this.isLoading = true;
    await call(`${this.endpoint}/${course.id}`, {
      method: 'DELETE'
    }, true);
    this.courses = this.courses.filter(c => c.id !== course.id);
    this.isLoading = false;
  }
}

const courseModel = new CourseModel('courses', history);
export default courseModel;