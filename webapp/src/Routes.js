import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/configureStore';


import Common from './components/Common/component';
import Home  from './components/Home';
import Courses from "./components/Courses/Courses";
import Course  from './components/Course/Course';
import Lessons from './components/Lessons/Lessons';
import Lesson from './components/Lesson/Lesson';
import Tasks from './components/Tasks/Tasks';
import Task from './components/Task/Task';

export class Routes extends Component {
  render() {
    return (
        <Provider store={store}>
            <Router history={this.props.history}>
                <Switch>
                    <Common>
                      <Route exact path='/' component={Home} />

                      <Route exact path='/lessons' component={Lessons}/>
                      <Route path='/lessons/:lessonId' component={Lesson}/>

                      <Route exact path='/courses' component={Courses} />
                      <Route path='/courses/:courseId' component={Course}/>

                      <Route exact path='/tasks' component={Tasks} />
                      <Route path='/tasks/:taskId' component={Task}/>
                    </Common>
                </Switch>
            </Router>
        </Provider>
    );
  }
}

export default Routes;

// export default connect(mapStateToProps)(Routes);
// export { Routes };

