import React, { Component } from 'react';
import '../App.css';

class Keyboard extends Component {
  render() {
    return (
      <div class={keyboardClass}>
        <div>{this.props.typeContent}</div>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default Keyboard;
