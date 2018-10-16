import React from 'react';
// import PropTypes from 'prop-types';
import Icon from './Icon';
import '../App.css';

// this component includes a description on the left and to the right a set of\
// buttons used to construct the query
const Keyboard = (props) => {
  const { typeContent, classProp, isLast } = props;
  const { children } = props;
  return (
    <div className={`keyboardGeneric${classProp}`}>
      <div>{typeContent}</div>
      <div>{children}</div>
      <section>
        {isLast ? <Icon type='+' /> : null}
        <Icon type='-' />
      </section>
    </div>
  );
};

// Keyboard.propTypes = { typeContent: PropTypes.string.isRequired };

export default Keyboard;
