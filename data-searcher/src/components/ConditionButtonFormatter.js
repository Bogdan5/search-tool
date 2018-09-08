import React, { Component } from 'react';
import '../App.css';

//the area where queries are dislayed as they are constructed
class ConditionButtonFormatter extends Component {
  render() {
    return (
      <div className='formatterClass'>
        {/* <div>{this.props.text}</div>
        <input type='text' placeholder={`Type search term`}></input>
        {this.props.typeInput || <input type='text' placeholder={`Type position`}></input>} */}
      </div>
    );
  }
}

export default ConditionButtonFormatter;
