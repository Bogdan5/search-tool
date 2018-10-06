import React from 'react';
import '../App.css';

// basic button pressed to construct queries
const ConditionButton = (props) => {
  const { children } = props;
  const clickHandler = () => { props.fromButton(name); };

  return (
    <div>
        {children}
    </div>
  );
};

export default ConditionButton;