import React, { Component } from 'react';
import '../App.css';

//this component includes a description on the left and to the right a set of\
//buttons used to construct the query
class Keyboard extends Component {
  constructor(props) {
    super(props);
    this.state = { fromButton: (name, operation) => {console.log('fromButton');}, };
  }

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
