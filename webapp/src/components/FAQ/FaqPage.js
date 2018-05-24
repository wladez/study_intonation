import React, { Component } from 'react';
import './faq.css';
import './animate.css';
import WOW from './animation';

export class FaqPage extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        new WOW.WOW({
            live: false
        }).init();
    }

    render() {
        return (
            <div className="content">
                <div className="container-fluid padding0">
                    <div className="container-fluid padding0" id="home-head">
                        <div className="spaceUnder row">
                            <div className="col-sm-4 td">
                                <div className="col-sm-12 text-center">
                                    <p1> How to use MailCat?</p1>
                                </div>
                            </div>
                            <div className="col-sm-6  text-justify td">
                                <div className="spaceUnder1 row">
                                    <p>1. Install the application</p>
                                </div>
                                <div className="spaceUnder1 row">
                                    <p>2. Create thematic catalogs in the mailbox and move to each of at least
                                        10 emails for learning the application</p>
                                </div>
                                <div className="spaceUnder1 row">
                                    <p>3. Run the application</p>
                                </div>
                                <div className="spaceUnder1 row">
                                    <p>4. Configure the connection settings for the mail service</p>
                                </div>
                                <div className="spaceUnder3 row">
                                    <p>After starting and setting up the application will start working
                                        with your mailbox to sort incoming messages. It is very important
                                        to give the application correctly, in your opinion, the sorted letters,
                                        because on the basis of the received data the application will further make
                                        decisions on assigning a category to a new letter.</p>
                                </div>
                            </div>
                        </div>
                        <div className="row backjpg" style={{textShadow: '1px 1px 1px rgba(0,0,0,0.25)'}}>
                            <div className="col-sm-4 td">
                                <div className="col-sm-12 text-center">
                                    <p1> Does MailCat read my letters?</p1>
                                </div>
                            </div>
                            <div className="col-sm-6  col-centered text-justify td">
                                <div className="spaceUnder3 row">
                                    <p>No, the cataloguer evaluates the contents of incoming letters
                                        according to various criteria (the number of images, repeated words,
                                        emotional color, etc.), and then selects the catalog most similar in
                                        content and sends a letter there.
                                        In addition, personal information and user's letters are stored personally
                                        by the user and are not transmitted anywhere.</p>
                                </div>
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-sm-4 td">
                                <div className="col-sm-12 text-center ">
                                    <p1> Which OS are supported by MailCat?</p1>
                                </div>
                            </div>
                            <div className="col-sm-6  text-center  td ">
                                <div className="row spaceUnder3">
                                    <div className="col-sm-4 wow rollIn " data-wow-duration="2s" data-wow-offset="100">
                                        <img  src={require('../../img/wind.png')} />
                                    </div>
                                    <div className="col-sm-4 wow rollIn paddinds" data-wow-duration="2s" data-wow-offset="100">
                                        <img src={require('../../img/linx.png')} />
                                    </div>
                                    <div className="col-sm-4 wow rollIn paddinds" data-wow-duration="2s" data-wow-offset="100">
                                        <img src={require('../../img/mac.png')} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="col-sm-12 text-center">
                                    <p1>Which languages are supported by MailCat?</p1>
                                </div>
                            </div>
                            <div className="col-sm-6  text-center ">
                                <div className="row spaceUnder3">
                                    <div className="col-6 wow rollIn" data-wow-duration="2s" data-wow-offset="100">
                                        <img src={require('../../img/russia.png')} width="128" height="128" />
                                    </div>
                                    <div className="col-6 wow rollIn" data-wow-duration="2s" data-wow-offset="100">
                                        <img src={require('../../img/united-kingdom.png')} width="128" height="128" />
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="row  backgrndgrey">
                            <div className="col-sm-4 text-justify">
                                <div className="col-sm-12 text-center">
                                    <p1>What the MailCat includes</p1>
                                </div>
                            </div>
                            <div className="col-sm-6 col-centered text-justify">
                                <div className="row wow flipInX padding4 mardinbot " data-wow-duration="2s" data-wow-offset="100" >
                                    <div className="col-sm-8 col-center text-justify">
                                        <p>The web interface allows you to configure the connection to the selected mail service and watch the results of the application.
                                        </p>
                                    </div>
                                    <div className="col-sm-4 col-center text-center">
                                        <img src={require('../../img/monitor.png')} width="128" height="128" />
                                    </div>
                                </div>
                                <div className="row wow flipInX padding4 mardinbot " data-wow-duration="2s" data-wow-offset="100">
                                    <div className="col-sm-4 col-center text-center">

                                        <img src={require('../../img/server.png')} width="128" height="128" />

                                    </div>
                                    <div className="col-sm-8 col-center text-justify">
                                        <p>The application is installed on the local or remote server, connects to the selected mail service and catalogs the incoming mail.

                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-sm-4 td">
                                <div className="col-sm-12 text-center ">
                                    <p1> Which e-mail service I can use?</p1>
                                </div>
                            </div>
                            <div className="col-sm-6  text-center  td ">
                                <div className="row spaceUnder3 ">
                                    <div className="col-sm-4 wow fadeInLeft " data-wow-duration="2s" data-wow-offset="100">
                                        <img src={require('../../img/yandexmail.png')} width="128" height="128" />
                                    </div>
                                    <div className="col-sm-4 wow bounceIn paddinds" data-wow-duration="2s" data-wow-offset="100">
                                        <img src={require('../../img/gmail.png')} width="128" height="128" />
                                    </div>
                                    <div className="col-sm-4 wow fadeInRight paddinds" data-wow-duration="2s" data-wow-offset="100">
                                        <img src={require('../../img/mailru.png')} width="128" height="128" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row spaceUnder3">
                            <div className="col-sm-4 text-justify">
                                <div className="col-sm-12 text-center">
                                    <p1>Why did the letter fall into the wrong category?</p1>
                                </div>
                            </div>
                            <div className="col-sm-6 col-centered text-justify">
                                <div className="row wow fadeInLeft qw padding4 mardinbot mardinright" data-wow-duration="2s" data-wow-offset="100" >
                                    <pq>Reason 1: The letter is different from letters belonging to the category</pq>
                                </div>
                                <div className="row wow fadeInRight qa padding4 mardinbot mardinleft" data-wow-duration="2s" data-wow-offset="100">
                                    <pa>✔ Move the letter manually to the desired category</pa>
                                </div>
                                <div className="row wow fadeInLeft qw padding4 mardinbot mardinright" data-wow-duration="2s" data-wow-offset="100">
                                    <pq>Reason 2: The category had insufficient initial data</pq>
                                </div>
                                <div className="row wow fadeInRight qa padding4 mardinbot mardinleft" data-wow-duration="2s" data-wow-offset="100">
                                    <pa>✔ Add the letter to that category manually</pa>
                                </div>
                                <div className="row wow fadeInLeft qw padding4 mardinbot mardinright" data-wow-duration="2s" data-wow-offset="100">
                                    <pq>Reason 3: The letter is written in an unsupported language</pq>
                                </div>
                                <div className="row wow fadeInRight qa padding4 mardinbot mardinleft" data-wow-duration="2s" data-wow-offset="100">
                                    <pa>✔ Even in this case, MailCat tries to place the letter using its sender email address</pa>
                                </div>
                            </div>
                        </div>

                        <div className="modal fade" aria-hidden="true" id="modal-settings">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 className="modal-title">Settings</h4>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="form-group row">
                                            <div className="col-12">
                                                <label for="inputEmail" className="sr-only">Email address</label>
                                                <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <div className="col-12">
                                                <label for="inputPassword" className="sr-only">Password</label>
                                                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <div className="col-12">
                                                <label for="inputHost" className="sr-only">Host</label>
                                                <input type="url" id="inputHost" className="form-control" placeholder="Host" required />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <div className="col-12">
                                                <label for="inputPort" className="sr-only">Port</label>
                                                <input id="inputPort" className="form-control" placeholder="Port" required />
                                            </div>
                                        </div>

                                        <div className="form-group row slider-group">
                                            <div className="col-sm-6">Learning Threshold: <span id="learning-slider-value">30</span></div>
                                            <div className="col-sm-6 col-xs-12">
                                                <input id="count-slider" data-slider-min="10" data-slider-max="50" data-slider-step="1" data-slider-value="30" data-slider-id="learning-threshold-slider" type="text" value="30"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                        <button type="button" className="btn btn-primary">OK</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default FaqPage;
