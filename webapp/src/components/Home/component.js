import React, { Component } from 'react';
import './Home.css';
import { store } from '../../store/configureStore'

export class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { messages } = this.props;
        return (
            <div>
                <div className="content">
                    <div className="container" id="inbox-head">
                        <div className="row">
                            <p1>Welcome to StudyIntonation project!</p1>
                        </div>
                        {/*<div className="row">*/}
                            {/*<p1>To see more, check the list below</p1>*/}
                        {/*</div>*/}
                    </div>
                    <div className="container" id="inbox-list">

                        {
                            messages.data.length > 0 &&

                            <table className='table table-striped'>
                                <thead>
                                <tr>
                                    <th scope="col">Sender</th>
                                    <th scope="col">Subject</th>
                                    <th scope="col">Moved to</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    messages.data.map((msg, index) =>
                                        <tr key={index}>
                                            <th scope="row">{msg.sender}</th>
                                            <td>{msg.subject}</td>
                                            <td>{msg.category}</td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </table>
                        }
                        </div>

                    {/*<div className="container" id="test">*/}
                        {/*<button className="btn btn-dark" id="test-btn">Add New</button>*/}
                    {/*</div>*/}

                </div>
            </div>
            )

    }

}