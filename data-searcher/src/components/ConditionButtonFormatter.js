import React, { Component } from 'react';
import '../App.css';

//the area where queries are dislayed as they are constructed
class ConditionButtonFormatter extends Component {
  render() {
    return (
      <div className='formatterClass'>
        {this.props.structure.map(el => <div>{el.operation}</div>)}
      </div>
    );
  }
}

export default ConditionButtonFormatter;
