import React from 'react';
import '../App.css';

// this component includes a set of buttons
const DropDownMenu = (props) => {
  const { children, menuVisible, mouseOutMenu } = props;
  const mouseOut = () => {
    mouseOutMenu();
  };
  return (
    <div
      className={`dropDownMenu ${menuVisible ? 'z-visible' : 'z-invisible'}`}
      onMouseOut={mouseOut} onBlur={mouseOut}
    >
      {children}
    </div>
  );
};

export default DropDownMenu;
