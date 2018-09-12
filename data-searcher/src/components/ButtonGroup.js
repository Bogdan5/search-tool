import React, { Component } from 'react';
import '../App.css';

//this component includes a set of buttons
class ButtonGroup extends Component {
  render() {
    return (
      <div className='buttonGroup'>
        {this.props.children}
      </div>
    );
  }
}

export default ButtonGroup;
