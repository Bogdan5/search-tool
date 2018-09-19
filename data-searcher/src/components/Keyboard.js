import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

// this component includes a description on the left and to the right a set of\
// buttons used to construct the query
const Keyboard = (props) => {
  const { typeContent } = props;
  const { children } = props;
  return (
    <div className='keyboardClass'>
      <div>{typeContent}</div>
      <div>{children}</div>
    </div>
  );
};

Keyboard.propTypes = {
  typeContent: PropTypes.string.isRequired,
};

export default Keyboard;
