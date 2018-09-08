import React, { Component } from 'react';
import DumbButton from './DumbButton';
import ButtonWithHandler from './ComponentEnhancer';
import '../App.css';

//this component includes a description on the left and to the right a set of\
//buttons used to construct the query
class Keyboard extends Component {
  fromButton = (name, operation) => {console.log('fromButton');};

  render() {
    return (
      <div className='keyboardClass'>
          <div>{this.props.typeContent}</div>
          <div>{this.props.children}</div>
      </div>
    );
  }
}

export default Keyboard;
