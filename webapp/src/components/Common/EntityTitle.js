import React, {Component, Fragment} from 'react';
import { observer } from 'mobx-react';
import SkyLight from 'react-skylight';
import './EntityTitle.css';


@observer
export class EntityTitle extends Component {

  dialog = model => {
    {this.props.addEntity()}
  };

  render() {
    const { model, modalDialog } = this.props;
    return (
      <Fragment>
        <div id='inbox-head' className='title__wrapper'>
          <h2>{`Followed ${model.id}`}</h2>
          <i className="fa fa-plus-square plus-icon" onClick={() => this.addEntityDialog.show()} />
        </div>
        <SkyLight
          hideOnOverlayClicked
          ref={ref => this.addEntityDialog = ref}
          title={`New ${model.id.slice(0, model.id.length-1)}`}>
          {modalDialog ? modalDialog(this.addEntityDialog) : null}
        </SkyLight>
      </Fragment>
    );
  }
}