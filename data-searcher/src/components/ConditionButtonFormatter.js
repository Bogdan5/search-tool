import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DropDownMenu from './DropDownMenu';
import ComponentEnhancer from './ComponentEnhancer';
import MenuOption from './MenuOption';
import ConditionButton from './ConditionButton';
import '../App.css';

// the area where queries are dislayed as they are constructed
const ConditionButtonFormatter = (props) => {
  const { fromFormatter } = props;
  const formatterConditionButton = React.createRef();
  const handler = () => {
    const top = formatterConditionButton.current.offsetTop;
    fromFormatter(top);
    console.log('formatter clicked');
  };
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     menuVisible: false,
  //     idConditionalButtonClicked: null,
  //     mergerArray: [null, null, null],
  //   };
  // }

  // menuClickHandler = (name) => {
  //   const { fromMenu } = this.props;
  //   const { idConditionalButtonClicked, mergerArray } = this.state;
  //   fromMenu(name, idConditionalButtonClicked);
  //   this.setState({ menuVisible: false });
  //   if (mergerArray[0] && !mergerArray[2]) {
  //     this.setState({ mergerArray: [mergerArray[0], name, null] });
  //   }
  //   console.log('menu Click:' + name);
  // }

  // conditionalClickHandler =(id) => {
  //   const { mergerArray } = this.state;
  //   this.setState({ idConditionalButtonClicked: id, menuVisible: true });
  //   if (mergerArray[1]) {
  //     this.setState({ mergerArray: [mergerArray[0], mergerArray[1], id] });
  //     // send to App component the array
  //     this.setState({ mergerArray: [null, null, null] });
  //   } else {
  //     this.setState({ mergerArray: [id, null, null] });
  //   }
  //   console.log('conditinal Click' + id);
  // }

    // const { menuVisible } = this.state;
    // const { structure } = this.props;
    // const propertiesMenu = { fromMenu: this.menuClickHandler };
    // const MenuElementWithHandler = ComponentEnhancer(MenuOption, propertiesMenu);
    return (
      <div
        className='formatterClass' ref={formatterConditionButton}
        onClick={handler}
      >
        {props.children}
        {/* {structure.map(el => <ConditionButton {...el} fromFormatter={this.conditionalClickHandler} />)}
        <DropDownMenu menuVisible={menuVisible}>
          <MenuElementWithHandler name='not' />
          <MenuElementWithHandler name='and' />
          <MenuElementWithHandler name='or' />
          <MenuElementWithHandler name='delete' />
        </DropDownMenu> */}
      </div>
    );
}

// ConditionButtonFormatter.propTypes = { structure: PropTypes.shape };

export default ConditionButtonFormatter;
