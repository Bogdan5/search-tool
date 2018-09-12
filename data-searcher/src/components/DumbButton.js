import React, { Component } from 'react';
import '../App.css';

//basic button pressed to construct queries
class DumbButton extends Component {
  clickHandler = () => this.props.fromButton(this.props.name, this.props.type);

  render() {
    return (
      <button className='dumbButtonClass' onClick={this.clickHandler}>
        {this.props.name}
      </button>
    );
  }
}

export default DumbButton;
