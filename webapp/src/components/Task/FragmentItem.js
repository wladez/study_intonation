import React, { Component, Fragment } from 'react';

import './FragmentItem.css';


const FRAGMENT_LABEL = "fragment_label";
const START_LABEL = "start_label";
const STOP_LABEL = "stop_label";
const CATCHWORD_LABEL = "catchword_label";

const LABELS = {
  [FRAGMENT_LABEL]: "Fragment",
  [START_LABEL]: "Start",
  [STOP_LABEL]: "Stop",
  [CATCHWORD_LABEL]: "Catch word"
};


export class FragmentItem extends Component {

  state = {
    fragment: "",
    start: "",
    stop: "",
    catchword: true
  };

  componentWillMount() {
    const { model } = this.props;
    const { fragment, start, stop, catchword } = model;
    this.setState({
      fragment, start, stop, catchword
    });
  }

  onChangeFragment = e => {
    const { model } = this.props;
    const { value } = e.target;
    this.setState({ fragment: value });
    model.setFragment(value);
  };

  onChangeStart = e => {
    const { model } = this.props;
    const { value } = e.target;
    this.setState({ start: value });
    model.setStart(value)
  };

  onChangeStop = e => {
    const { model } = this.props;
    const { value } = e.target;
    this.setState({ stop: value });
    model.setStop(value);
  };

  onChangeCatchWord = e => {
    const { model } = this.props;
    const { value } = e.target;
    const boolValue = value === "true";
    this.setState({ catchword: boolValue });
    model.setCatchWord(boolValue);
  };

  render() {
    const { model } = this.props;
    return (
      <Fragment>
        <div className="form-group row">
          <label className="col-sm-2">{LABELS[FRAGMENT_LABEL]}</label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control" id={`${LABELS[FRAGMENT_LABEL]}-${model.id}`} placeholder={`Enter ${LABELS[FRAGMENT_LABEL]}`} name={LABELS[FRAGMENT_LABEL]}
              onChange={this.onChangeFragment} value={this.state.fragment}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2">{LABELS[START_LABEL]}</label>
          <div className="col-sm-2">
            <input
              type="text"
              className="form-control" id={`${LABELS[START_LABEL]}-${model.id}`} placeholder={`Enter ${LABELS[START_LABEL]}`} name={LABELS[START_LABEL]}
              onChange={this.onChangeStart} value={this.state.start}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2">{LABELS[STOP_LABEL]}</label>
          <div className="col-sm-2">
            <input
              type="text"
              className="form-control" id={`${LABELS[STOP_LABEL]}-${model.id}`} placeholder={`Enter ${LABELS[STOP_LABEL]}`} name={LABELS[STOP_LABEL]}
              onChange={this.onChangeStop} value={this.state.stop}
            />
          </div>
        </div>



        <div className="form-group row">
          <label className="col-sm-2">{LABELS[CATCHWORD_LABEL]}</label>

          <div onChange={this.onChangeCatchWord}>
            <div className="form-check form-check-inline">
              <label className="form-check-label">
                <input className="form-check-input" checked={model.catchword === true} type="radio" name="inlineRadioOptions" id={`${'yesRadio'}-${model.id}`} value="true" />
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <label className="form-check-label">
                <input className="form-check-input" checked={model.catchword === false} type="radio" name="inlineRadioOptions" id={`${'noRadio'}-${model.id}`} value="false" />
                No
              </label>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}