import React from 'react';
import '../App.css';

// basic button pressed to construct queries
const ConditionButton = (props) => {
  const { children, fromFormatter } = props;
  const handler = () => {
    fromFormatter();
  };
  return (
    <div onClick={handler}>
      {children}
    </div>
  );
};

export default ConditionButton;
