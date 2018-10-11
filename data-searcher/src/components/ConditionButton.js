import React from 'react';
import '../App.css';

// basic button pressed to construct queries
const ConditionButton = (props) => {
  const { children, fromFormatter, id, fromConditional } = props;
  const handler = () => {
    // fromFormatter(id);
    fromConditional(id);
  };
  return (
    <button
      className='ConditionButton' onClick={handler}
      tabIndex={0} onKeyDown={handler}
      type='submit'
    >
      {children}
    </button>
  );
};

export default ConditionButton;
