import React, { Component } from 'react';
import DumbButton from './DumbButton';
import ComponentEnhancer from './ComponentEnhancer';
import '../App.css';

//this component includes a description on the left and to the right a set of\
//buttons used to construct the query
class Keyboard extends Component {
  constructor(props) {
    super(props);
    this.state = { fromButton: (name, operation) => {console.log('fromButton');}, };
  }

  fromButton = (name, operation) => {console.log('fromButton');};

  render() {
    let ButtonWithHandler = ComponentEnhancer(DumbButton, this.fromButton);
    return (
      <div className='keyboardClass'>
          <div>{this.props.typeContent}</div>
          <div>{this.props.children}</div>
      </div>
    );
  }
}

export default Keyboard;
