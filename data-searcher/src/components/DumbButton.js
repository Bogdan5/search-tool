import React, { Component } from 'react';
import '../App.css';

//basic button pressed to construct queries
class DumbButton extends Component {
  clickHandler = () => this.props.fromButton(this.props.name);

  render() {
    let isActive = ['INCLUDES', 'STARTS WITH', 'ENDS WITH'].includes(this.props.name) ?
      (this.props.active ? 'active' : (this.props.keywordButtonClicked === this.props.name) ?
      'active' : 'inactive') : 'active';
    return (
      <button className={`dumbButtonClass ${isActive}`}
        onClick={this.clickHandler}>
        {this.props.name}
      </button>
    );
  }
}

export default DumbButton;
