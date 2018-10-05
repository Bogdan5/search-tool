import React, { Component } from 'react';
import Keyboard from './components/Keyboard';
import ButtonGroup from './components/ButtonGroup';
import DataDisplay from './components/DataDisplay';
import DumbButton from './components/DumbButton';
import Header from './components/Header';
import Sorter from './components/Sorter';
import ComponentEnhancer from './components/ComponentEnhancer';
import ConditionButtonFormatter from './components/ConditionButtonFormatter';
import DropDownMenu from './components/DropDownMenu';
import MenuOption from './components/MenuOption';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      currentOperation: [],
      listOperations: [],
      keyword: '', // content of the keyword input text field
      inputVisibility: 'hidden', // in the second Keyboard, whether the position input is visible
      keywordButtonClicked: '', // name of button clicked in the keyword(2nd) Keyboard
      active: [], // array of buttons active
      indexOp: 0, // how many elements have been added in an operation
      position: 0,
    };
  }

  componentDidMount() {
    this.textInput.current.focus();
  }

  textHandler = (e) => {
    this.setState({ keyword: e.target.value });
  };

  positionHandler = (e) => {
    this.setState({ position: e.target.value });
  }

  // function that passes data from DumbButton
  fromButton = (name) => {
    const {
      currentOperation, listOperations, keyword, keywordButtonClicked,
      indexOp, position,
    } = this.state;

    // function that determines whether the keyword matches the data at the required position
    const include = (word, posit) => data => {
      if (position || position > 0) {
        return data.match(new RegExp(word)).index === posit;
      } else {
        return data.match(new RegExp(word));
      }
    };

    // function that determines whether the data string starts with the keyword
    const endsWith = (dataString, word) => {
      const len = dataString.length - word.length;
      include(dataString, word, len);
    };

    this.setState({ keywordButtonClicked: name });
    if (name === 'INCLUDES') { this.setState({ inputVisibility: 'visible' }); }
    // const len = currentOperation.length;
    switch (name) {
      case 'SUMBIT':
        if (keywordButtonClicked && keyword) {
          this.setState({ listOperations: listOperations.concat(include(keyword, position || 0)) });
        }

        break;
      case 'CANCEL':
        this.setState({ currentOperation: [] });
        break;
      default:
    }
  };

  fromMenu = (operationClicked, indexButton) => {
    switch (operationClicked) {
      case 'NOT':
        this.setState({ listOperations: listOperations.concat(())})
      case 'AND':
      case 'OR':
      case 'DELETE':
      default:
    }
  }

  render() {
    const { inputVisibility, listOperations, active } = this.state;
    // enhancing DumbButtons to ButtonWithHandler through ComponentEnhancer
    const propertiesObj = { // properties object passed to ComponentEnhancer
      fromButton: this.fromButton, // a handler is added to buttons in order to pass data
      // from DumbButton chid to the App parent
      active, // in element buttons, true greyed out
      keywordButtonClicked: this.state, // what element button is clicked
    };
    const ButtonWithHandler = ComponentEnhancer(DumbButton, propertiesObj);
    const propertiesMenu = { fromMenu: this.fromMenu };
    const MenuElementWithHandler = ComponentEnhancer(MenuOption, propertiesMenu);

    //
    return (
      <div className='App'>
        <Header title='Data display - Search and sort' />
        { /* includes description and operator buttons */ }
        <Keyboard typeContent='Boolean operators'>
          <ButtonWithHandler name='AND' />
          <ButtonWithHandler name='OR' />
          <ButtonWithHandler name='NOT' />
        </Keyboard>
        <Keyboard typeContent='Search keyword'>
          <ButtonGroup>
            <ButtonWithHandler name='INCLUDES' />
            <ButtonWithHandler name='STARTS WITH' />
            <ButtonWithHandler name='ENDS WITH' />
          </ButtonGroup>
          <input // the keyword used to search
            type='text' onChange={this.textHandler}
            placeholder='Type keyword' ref={this.textInput}
          />
          <div className={inputVisibility}>in position</div>
          <input // the position; 0 by default
            type='text' className={`positionInput ${inputVisibility}`}
            onChange={this.positionHandler}
          />
          <ButtonWithHandler name='SUBMIT' visibility={inputVisibility} />
          <ButtonWithHandler name='CANCEL' />
        </Keyboard>
        {/* includes the query structure */}
        <ConditionButtonFormatter structure={listOperations} />
        {/* buttons for sorting the data */}
        <Sorter />
        {/* data displayed as resulted from search and sort operations */}
        <DataDisplay dataLoad={this.state} />
        <DropDownMenu>
          <MenuElementWithHandler name='not' />
          <MenuElementWithHandler name='and' />
          <MenuElementWithHandler name='or' />
          <MenuElementWithHandler name='delete' />
        </DropDownMenu>
      </div>
    );
  }
}

export default App;
