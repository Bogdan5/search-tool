import React from 'react';
import '../App.css';

// this component includes a set of buttons
const MenuOption = (props) => {
  const { name } = props;
  return (
    <div className='menuOption'>
      {name}
    </div>
  );
};

export default MenuOption;
