import React from 'react';
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

export default ConditionButtonFormatter;
