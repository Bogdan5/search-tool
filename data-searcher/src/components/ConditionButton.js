import React from 'react';
import '../App.css';

// basic button pressed to construct queries
const ConditionButton = (props) => {
  const { children } = props;
  return (
    <div>
      {children}
    </div>
  );
};

export default ConditionButton;
