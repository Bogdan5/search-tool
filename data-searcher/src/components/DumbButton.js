import React, { Component } from 'react';
import '../App.css';

//basic button pressed to construct queries
class DumbButton extends Component {
  render() {
    return (
      <button className='dumbButtonClass' onClick={this.props.buttonClicked}>
        {this.props.name}
      </button>
    );
  }
}

export default DumbButton;
