import React from 'react';
// import PropTypes from 'prop-types';
import '../App.css';

// this component includes a description on the left and to the right a set of\
// buttons used to construct the query
const Keyboard = (props) => {
  const { typeContent, classProp, icon } = props;
  const { children } = props;
  return (
    <div className={`keyboardGeneric${classProp}`}>
      <div>{typeContent}</div>
      <div>{children}</div>
      <section className='icon'><div>{icon}</div></section>
    </div>
  );
};

// Keyboard.propTypes = { typeContent: PropTypes.string.isRequired };

export default Keyboard;
