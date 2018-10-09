import React from 'react';
import '../App.css';

// basic button pressed to construct queries
const ConditionButton = (props) => {
  const { children, fromFormatter, id } = props;
  const handler = () => {
    fromFormatter(id);
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
