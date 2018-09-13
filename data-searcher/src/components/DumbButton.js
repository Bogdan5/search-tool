import React, { Component } from 'react';
import '../App.css';

//basic button pressed to construct queries
class DumbButton extends Component {
  clickHandler = () => this.props.fromButton(this.props.name);

  render() {
    return (
      <button className={`dumbButtonClass ${this.props.visibility}`} onClick={this.clickHandler}>
        {this.props.name}
      </button>
    );
  }
}

export default DumbButton;
