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
      listOperations: {},
      keyword: '', // content of the keyword input text field
      inputVisibility: 'hidden', // in the second Keyboard, whether the position input is visible
      keywordButtonClicked: '', // name of button clicked in the keyword(2nd) Keyboard
      active: [], // array of buttons active
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
    const { currentOperation, listOperations, keyword, keywordButtonClicked } = this.state;
    const operationAdder = (elem) => {
      if (typeof elem === 'function') {
        const newList = Object.assign({}, { operation: elem, operand: listOperations });
        return newList;
      }
    };

    this.setState({ keywordButtonClicked: name });
    if (name === 'INCLUDES') { this.setState({ inputVisibility: 'visible' }); }
   
    const len = currentOperation.length;
    switch (this.typeFinder(name)) {
      case 'operation-not':
        if (len === 0) {
          this.setState({ currentOperation: { not: true } });
        } else if (currentOperation[len - 1] === 'operator') {
          this.setState({ currentOperation: currentOperation.concat([{ not: true }]) });
        }
        this.setState({ active: ['element']});
        break;
      case 'operation':
        if (currentOperation[len - 1] === 'submit') {
          this.setState({ currentOperation: currentOperation.concat([{ operation: name }]) });
        }

        break;
      case 'submit':
        this.setState({ inputVisibility: 'hidden', active: true });
        if (keywordButtonClicked && keyword) {
          this.setState({ listOperations: operationAdder(operation)})
        }

        break;
      case 'element':
        this.setState({ keywordButtonClicked: name });
        
        if (currentOperation) {
          this.setState({ currentOperation: currentOperation.concat(name), active: false });
        }
        break;
      case 'cancel':
        this.setState({ inputVisibility: 'hidden', active: true, currentOperation: [] });
        break;
      default:
    }
  };

  render() {
    // enhancing DumbButtons to ButtonWithHandler through ComponentEnhancer
    const propertiesObj = { // properties object passed to ComponentEnhancer
      fromButton: this.fromButton, // a handler is added to buttons in order to pass data
      // from DumbButton chid to the App parent
      active: this.state, // in element buttons, true greyed out
      keywordButtonClicked: this.state, // what element button is clicked
    };
    const ButtonWithHandler = ComponentEnhancer(DumbButton, propertiesObj);

    //
    const { inputVisibility, listOperations } = this.state;
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
          <input type='text' className={`positionInput ${inputVisibility}`} />
          <ButtonWithHandler name='SUBMIT' visibility={inputVisibility} />
          <ButtonWithHandler name='CANCEL' />
        </Keyboard>
        {/* includes the query structure */}
        <ConditionButtonFormatter structure={listOperations} />
        {/* buttons for sorting the data */}
        <Sorter />
        {/* data displayed as resulted from search and sort operations */}
        <DataDisplay dataLoad={this.state} />
      </div>
    );
  }
}

export default App;
