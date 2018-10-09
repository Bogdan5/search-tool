import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DropDownMenu from './DropDownMenu';
import ComponentEnhancer from './ComponentEnhancer';
import MenuOption from './MenuOption';
import ConditionButton from './ConditionButton';
import '../App.css';

// the area where queries are dislayed as they are constructed
class ConditionButtonFormatter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuVisible: false,
      idConditionalButtonClicked: null,
    };
  }

  menuClickHandler = (name) => {
    const { fromMenu } = this.props;
    const { idConditionalButtonClicked } = this.state;
    fromMenu(name, idConditionalButtonClicked);
  }

  conditionalClickHandler =(id) => { this.setState({ idConditionalButtonClicked: id }); }

  render() {
    const { menuVisible } = this.state;
    const { structure } = this.props;
    const propertiesMenu = { fromMenu: this.menuClickHandler };
    const MenuElementWithHandler = ComponentEnhancer(MenuOption, propertiesMenu);
    return (
      <div className='formatterClass'>
        {structure.map(el => <ConditionButton {...el} fromFormatter={this.conditionalClickHandler} />)}
        <DropDownMenu visibility={menuVisible}>
          <MenuElementWithHandler name='not' />
          <MenuElementWithHandler name='and' />
          <MenuElementWithHandler name='or' />
          <MenuElementWithHandler name='delete' />
        </DropDownMenu>
      </div>
    );
  };
};

// ConditionButtonFormatter.propTypes = { structure: PropTypes.shape };

export default ConditionButtonFormatter;
