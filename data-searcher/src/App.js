import React, { Component } from 'react';
import Keyboard from './components/Keyboard';
import ButtonGroup from './components/ButtonGroup';
import DataDisplay from './components/DataDisplay';
import DumbButton from './components/DumbButton';
import Header from './components/Header';
import Sorter from './components/Sorter';
import ComponentEnhancer from './components/ComponentEnhancer';
import ConditionButtonFormatter from './components/ConditionButtonFormatter';

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
      active: true, // true if all buttons are active, false if some should be greyed out
    };
  }

  componentDidMount() {
    this.textInput.current.focus();
  }

  typeFinder = (buttonName) => {
    if (['AND', 'OR'].includes(buttonName)) {
      return 'operator';
    }
    if (['INCLUDES', 'STARTS WITH', 'ENDS WITH'].includes(buttonName)) {
      return 'element';
    }
    if (buttonName === 'NOT') {
      return 'operator-not';
    }

    return buttonName.toLowerCase();
  };

  textHandler = (e) => {
    this.setState({ keyword: e.target.value });
  };

  // function that passes data from DumbButton
  fromButton = (name) => {
    this.setState({ keywordButtonClicked: name });
    if (name === 'INCLUDES') { this.setState({ inputVisibility: 'visible' }); }
    const currentOp = this.state.currentOperation;
    const len = currentOp.length;
    switch (this.typeFinder(name)) {
      case 'operation-not':
        if (len === 0) {
          this.setState({ currentOperation: { not: true } });
        } else if (currentOp[len - 1] === 'operator') {
          this.setState({ currentOperation: currentOp.concat([{ not: true }]) });
        }

        break;
      case 'operation':
        if (currentOp[len - 1] === 'submit') {
          this.setState({ currentOperation: currentOp.concat([{ operation: name }]) });
        }

        break;
      case 'submit':
        this.setState({ inputVisibility: 'hidden', active: true });
        if (currentOp[len - 1] === 'element') {
          this.setState({ currentOperation: currentOp.concat('submit') });
        }

        break;
      case 'element':
        if (currentOp) {
          this.setState({ currentOperation: currentOp.concat(name), active: false, });
        }
        break;
      case 'cancel':
        this.setState({ inputVisibility: 'hidden', active: true, currentOperation: [] });
        break;
      default:
    }
  };

  render() {
    const propertiesObj = { // properties object passed to ComponentEnhancer
      fromButton: this.fromButton, // a handler is added to buttons in order to pass data
      // from DumbButton chid to the App parent
      active: this.state, // in element buttons, true greyed out
      keywordButtonClicked: this.state, // what element button is clicked
    };
    const ButtonWithHandler = ComponentEnhancer(DumbButton, propertiesObj);
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
          <div className={this.state.inputVisibility}>in position</div>
          <input type='text' className={`positionInput ${this.state.inputVisibility}`} />
          <ButtonWithHandler name='SUBMIT' visibility={this.state.inputVisibility} />
          <ButtonWithHandler name='CANCEL' />
        </Keyboard>
        {/* includes the query structure */}
        <ConditionButtonFormatter structure={this.state.listOperations} />
        {/* buttons for sorting the data */}
        <Sorter />
        {/* data displayed as resulted from search and sort operations */}
        <DataDisplay dataLoad={this.state} />
      </div>
    );
  }
}

export default App;
