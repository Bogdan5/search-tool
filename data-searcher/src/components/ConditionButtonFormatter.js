import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

// the area where queries are dislayed as they are constructed
const ConditionButtonFormatter = (props) => {
  const { structure } = props;
  return (
    <div className='formatterClass'>
      {structure.map(el => <div>{el.operation}</div>)}
    </div>
  );
};

ConditionButtonFormatter.propTypes = { structure: PropTypes.shape };

export default ConditionButtonFormatter;
