import React from 'react';
import '../App.css';

const Sorter = (props) => {
  const { header } = props;
  return (
    <div className='sorterClass'>
      {header.map(el => (
        <div>
          <div>{el}</div>

        </div>))}
    </div>
    );
};

export default Sorter;
