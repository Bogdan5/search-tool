import React from 'react';
import '../App.css';

// basic button pressed to construct queries
const ConditionButton = (props) => {
  const { children, fromFormatter, id, fromConditional } = props;
  const buttonRef = React.createRef();
  const handler = () => {
    const top = buttonRef.current.offsetTop;
    const left = buttonRef.current.offsetLeft;
    fromConditional(id, top, left);
  };
  return (
    <div
      className='ConditionButton' onClick={handler}
      tabIndex={0} onKeyDown={handler}
      role='button' ref={buttonRef}
    >
      {children}
    </div>
  );
};

export default ConditionButton;
