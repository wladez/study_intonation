import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './common.css';
import 'rc-slider/assets/index.css';

export default class Common extends Component {
    render() {
        return (
            <div className='app-container'>
                <nav className="navbar sticky-top navbar-expand-sm navbar-dark bg-dark">
                    <div className="container">
                        <a className="navbar-brand text-light" href='/'>
                            <img src='images/si_logo.jpg' id="logo" className="d-inline-block align-middle" alt="" />
                            StudyIntonation
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar7">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="navbar-collapse collapse justify-content-stretch" id="navbar7">
                            <ul className="navbar-nav nav-fill">
                              <li className="nav-item">
                                <Link to='/courses'><a className="nav-link">Courses</a></Link>
                              </li>
                              <li className="nav-item">
                                <Link to='/lessons'><a className="nav-link">Lessons</a></Link>
                              </li>
                              <li className="nav-item">
                                <Link to='/tasks'><a className="nav-link">Tasks</a></Link>
                              </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                {this.props.children}

                <footer>
                    <div>
                        <b>Contact us: bogach@gmail.com</b> <br />
                        We can help you to train your intonation skills
                    </div>
                </footer>


            </div>
        )
    }
}