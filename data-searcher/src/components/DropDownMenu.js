import React from 'react';
import '../App.css';

// this component includes a set of buttons
const DropDownMenu = (props) => {
  const { children } = props;
  return (
    <div className='dropDownMenu'>
      {children}
    </div>
  );
};

export default DropDownMenu;
