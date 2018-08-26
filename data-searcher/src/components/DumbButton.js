import React, { Component } from 'react';
import '../App.css';

class DumbButton extends Component {
  render() {
    return (
      <button class={dumbButtonClass} onClick={this.props.buttonClicked}>
        {this.props.name}
      </button>
    );
  }
}

export default DumbButton;
