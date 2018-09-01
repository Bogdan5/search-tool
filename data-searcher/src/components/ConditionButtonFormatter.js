import React, { Component } from 'react';
import '../App.css';

class ConditionButtonFormatter extends Component {
  render() {
    return (
      <div class='formatterClass'>
        <div>
          <div>{this.props.text}</div>
          <input type='text' placeholder={`Type search term`}></input>
          {this.props.typeInput || <input type='text' placeholder={`Type position`}></input>}
        </div>
      </div>
    );
  }
}

export default ConditionButtonFormatter;
