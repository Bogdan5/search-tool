import React from 'react';
import '../App.css';

const Icon = (props) => {
  const { type } = props;
  return (
    <div className={type ? 'icon' : ''}>
      {type}
    </div>
  );
};

export default Icon;
