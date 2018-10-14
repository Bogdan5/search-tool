import React from 'react';
import '../App.css';

// this component includes a set of buttons
const DropDownMenu = (props) => {
  const { children, menuVisible } = props;
  const mouseOut = (event) => {
    
  };
  return (
    <div className={`dropDownMenu ${menuVisible ? 'z-visible' : 'z-invisible'}`}
    onMouseOut={mouseOut}>
      {children}
    </div>
  );
};

export default DropDownMenu;
