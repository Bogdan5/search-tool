import React, { Component } from 'react';
import '../App.css';

class DumbButton extends Component {
  render() {
    return (
      <div class={dumbButtonClass}>
        {this.props.name}
      </div>
    );
  }
}

export default DumbButton;
