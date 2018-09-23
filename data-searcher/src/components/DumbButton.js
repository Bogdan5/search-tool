import React from 'react';
import '../App.css';

// basic button pressed to construct queries
const DumbButton = (props) => {
  const clickHandler = () => props.fromButton(props.name);

  // let isActive = ['INCLUDES', 'STARTS WITH', 'ENDS WITH'].includes(this.props.name) ?
  //   (this.props.active ? 'active' : (this.props.keywordButtonClicked === this.props.name) ?
  //   'active' : 'inactive') : 'active';

  return (
    <button
      type='submit' className={`dumbButtonClass ${isActive}`}
      onClick={clickHandler}
    >
      {props.name}
    </button>
  );
};

export default DumbButton;
