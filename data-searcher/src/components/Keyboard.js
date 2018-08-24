import React, { Component } from 'react';
import '../App.css';

class Keyboard extends Component {
  render() {
    return (
      <div class={keyboardClass}>
        <div>{this.props.title}</div>
        <div>
          {this.props.componentList}
        </div>
      </div>
    );
  }
}

export default Keyboard;
