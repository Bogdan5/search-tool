import React from 'react';
import '../App.css';

// this component includes a description on the left and to the right a set of\
// buttons used to construct the query
const Keyboard = (typeContent, children) => (
  <div className='keyboardClass'>
    <div>{typeContent}</div>
    <div>{children}</div>
  </div>
);

export default Keyboard;
