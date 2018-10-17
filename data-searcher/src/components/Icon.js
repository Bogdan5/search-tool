import React from 'react';
import '../App.css';

const Icon = (props) => {
  const { type, fromIcon } = props;
  const handler = () => fromIcon(type);
  return (
    <div className={type ? 'icon' : ''} onClick={handler}>
      {type}
    </div>
  );
};

export default Icon;
