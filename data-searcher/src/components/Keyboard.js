import React from 'react';
// import PropTypes from 'prop-types';
import '../App.css';

// this component includes a description on the left and to the right a set of\
// buttons used to construct the query
const Keyboard = (props) => {
  const { classProp, leftSection, rightSection } = props;
  const { children } = props;
  return (
    <div className={`keyboardGeneric${classProp}`}>
      <div className='leftSection'>{leftSection}</div>
      <div>{children}</div>
      <section>{rightSection}</section>
    </div>
  );
};

// Keyboard.propTypes = { typeContent: PropTypes.string.isRequired };

export default Keyboard;
