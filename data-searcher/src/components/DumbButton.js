import React from 'react';
import '../App.css';

// basic button pressed to construct queries
const DumbButton = (props) => {
  const { name, active } = props;
  const isActive = (active.includes(name)) ? 'active' : 'inactive';
  const clickHandler = () => { if (isActive === 'active') { props.fromButton(name); } };

  return (
    <button
      type='submit' className={`dumbButtonClass ${isActive}`}
      onClick={clickHandler}
    >
      {name}
    </button>
  );
};

export default DumbButton;
