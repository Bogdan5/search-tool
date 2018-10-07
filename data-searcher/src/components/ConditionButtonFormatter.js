import React from 'react';
import PropTypes from 'prop-types';
import DropDownMenu from './DropDownMenu';
import ComponentEnhancer from './ComponentEnhancer';
import '../App.css';

// the area where queries are dislayed as they are constructed
const ConditionButtonFormatter = (props) => {
  const { structure } = props;
  const menuClickHandler = () => this.props.menuHandler()
  const propertiesMenu = { fromMenu: this.fromMenu };
  const MenuElementWithHandler = ComponentEnhancer(MenuOption, propertiesMenu);
  return (
    <div className='formatterClass'>
      {structure.map(el => <button type='submit'>{el.props.children.map(elem => elem)}</button>)}
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
