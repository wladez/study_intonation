import React, { Component } from 'react';
import classNames from "classnames";
import './CollapsibleItem.css';


export class CollapsibleItem extends Component {

  state = {
    isActive: false
  };

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


  render() {
    const { entity, target } = this.props;
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
        <button
          className={buttonClasses}
          onClick={() => this.handleClick()}
        >
          {entity.title}
        </button>
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