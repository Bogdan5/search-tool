import React from 'react';
import PropTypes from 'prop-types';
import DumbButton from './DumbButton';
import '../App.css';

// the area where queries are dislayed as they are constructed
const ConditionButtonFormatter = (props) => {
  const { structure } = props;
  return (
    <div className='formatterClass'>
      {structure.map(el => <button>{el.props.children.map(elem => elem)}</button>)}
    </div>
  );
};

// ConditionButtonFormatter.propTypes = { structure: PropTypes.shape };

export default ConditionButtonFormatter;
