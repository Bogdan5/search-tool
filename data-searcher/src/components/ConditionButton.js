import React from 'react';
import '../App.css';

// basic button pressed to construct queries
const ConditionButton = (props) => {
  const { children, fromFormatter, id } = props;
  const handler = () => {
    fromFormatter(id);
  };
  return (
    <div onClick={handler}>
      {children}
    </div>
  );
};

export default ConditionButton;
