import React, { Component } from 'react';
import '../App.css';

class ButtonGroup extends Component {
  render() {
    return (
      <div class={buttonGroup}>
        {this.props.children}
      </div>
    );
  }
}

export default ButtonGroup;
