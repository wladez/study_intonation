import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import lessonModel from "../../models/LessonModel";
import Lesson from '../Lesson/Lesson';

@inject('history')
@observer
class Lessons extends Component {

  componentWillMount() {
    lessonModel.fetchAll();
  }

  lessonMapper = lessons => {
    return (
      <li
        key={`lessonsId-${lessons.id}`}
        id={lessons.id}
        onClick={this.handleLessonClick}
      >{lessons.title}
      </li>
    )
  };

  handleLessonClick = e => {
    e.preventDefault();
    const { id } = e.target;
    this.props.history.push(`/lessons/${id}`);
  };

  getLessonNumber = () => {
    const path = window.location.pathname.slice();
    const lastIndex = path.lastIndexOf('/');
    if (lastIndex === 0) {
      return null;
    }
    const value = path.slice(lastIndex+1);
    return value.length ? Number(value) : null;
  };

  renderList = () => {
    const { lessons } = lessonModel;
    return (
      <div>
        <div className="container" id="inbox-head">
          <h2>Followed lessons:</h2>
        </div>
        <div className="container" id="inbox-list">
          <ul>
            {
              lessons.map(this.lessonMapper)
            }
          </ul>
        </div>
      </div>
    );
  };

  renderParticularLesson = lessonNumber => {
    return <Lesson lessonNumber={lessonNumber} />
  };

  render() {
    return (
      this.renderList()
    );

  }
}

export default Lessons;
