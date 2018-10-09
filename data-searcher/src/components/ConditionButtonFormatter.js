import React from 'react';
import PropTypes from 'prop-types';
import DropDownMenu from './DropDownMenu';
import ComponentEnhancer from './ComponentEnhancer';
import MenuOption from './MenuOption';
import ConditionButton from './ConditionButton';
import '../App.css';

// the area where queries are dislayed as they are constructed
const ConditionButtonFormatter = (props) => {
  const { structure } = props;
  const doStuff = name => console.log('clicked:' + name);
  const conditionalClickHandler = (id) => console.log(`conditional no ${id} clicked in formatter`);
  const propertiesMenu = { fromMenu: doStuff };
  const MenuElementWithHandler = ComponentEnhancer(MenuOption, propertiesMenu);
  return (
    <div className='formatterClass'>
      {structure.map(el => <ConditionButton {...el} fromFormatter={conditionalClickHandler} />)}
      <DropDownMenu>
        <MenuElementWithHandler name='not' />
        <MenuElementWithHandler name='and' />
        <MenuElementWithHandler name='or' />
        <MenuElementWithHandler name='delete' />
      </DropDownMenu>
    </div>
  );
};

// ConditionButtonFormatter.propTypes = { structure: PropTypes.shape };

export default ConditionButtonFormatter;
