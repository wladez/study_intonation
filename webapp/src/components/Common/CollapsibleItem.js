import React, { Component } from 'react';
import { observer } from "mobx-react";
import classNames from "classnames";
import Switch from "react-switch";
import './CollapsibleItem.css';

@observer
export class CollapsibleItem extends Component {

  constructor(props) {
    super(props);
    const { entity } = props;
    this.state = {
      isActive: false,
      isEntityAvailable: entity ? entity.available : true
    };
  }

  toggleActive = () => {
    this.setState({ isActive: !this.state.isActive });
  };

  handleClick = () => {
    this.toggleActive();
  };

  getItems = () => {
    const { entity, target } = this.props;
    return entity[target];
  };

  handleChange = async (id) => {
    const { model } = this.props;
    const { isEntityAvailable } = this.state;
    await model.setAvailability(id, !isEntityAvailable);
    this.setState({ isEntityAvailable: !isEntityAvailable });
  };


  render() {
    const { entity, target, model, history } = this.props;
    const { isActive } = this.state;
    const buttonClasses = classNames({
      'collapsible-item__button': true,
      'collapsible-item__button-active': isActive
    });
    const contentClasses = classNames({
      'collapsible-item__content': true,
      'collapsible-item__content-opened': isActive
    });
    return (
      <div className='collapsible-item__wrapper'>
        <div className={buttonClasses}>
          <span className="entity-title__wrapper">
            <span className="entity-title" onClick={() => history.push(`/${model ? 'courses' : 'lessons'}/${entity.id}`) }>{entity.title}</span>
            {
              (model && model.id === 'courses') &&
              <Switch
                className='switcherOnOff'
                onChange={() => this.handleChange(entity.id)}
                checked={this.state.isEntityAvailable}
                id="normal-switch"
              />
            }
            </span>

          <span className="arrow" onClick={() => this.handleClick()} />
        </div>
        <div
          className={contentClasses}
          ref={node => this.contentRef = node}
          style={{maxHeight: `${isActive ? this.contentRef.scrollHeight : 0}px`}}
        >
          {
            entity[target].map(item =>
              <div key={`itemId-${item.id}`} className='item' onClick={this.props.onClick}>
                <p id={`${item.id}`}>{item[target === 'tasks' ? 'text' : 'title']}
                </p>
              </div>)
          }
        </div>
      </div>
    );
  }
}