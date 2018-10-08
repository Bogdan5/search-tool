import React from 'react';
import '../App.css';

// basic button pressed to construct queries
const ConditionButton = (props) => {
  const { children, fromConditional } = props;
  const handler = () => {
    fromConditional();
  };
  return (
    <div onClick={handler}>
      {children}
    </div>
  );
};

export default ConditionButton;
