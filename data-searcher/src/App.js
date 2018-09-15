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
    this.state = {
      currentOperation: [],
      listOperations: {},
      keyword: '',//content of the keyword input text field
      inputVisibility: 'hidden',
      keywordButtonClicked: '',//name of button clicked in the keyword(2nd) Keyboard
      active: true,//true if all buttons are active, false if some should be greyed out
    };
  }

  typeFinder = (buttonName) => {
    if (['AND', 'OR'].includes(buttonName)) {
      return 'operator';
    } else if (['INCLUDES', 'STARTS WITH', 'ENDS WITH'].includes(buttonName)) {
      return 'element';
    } else if (buttonName === 'NOT') {
      return 'operator-not';
    } else if (buttonName === 'SUBMIT') {
      return 'submit';
    }
  };

  textHandler = (e) => {
    this.setState({ keyword: e.target.value });
  };

  //function that passes data from DumbButton
  fromButton = (name) => {
    this.setState({ keywordButtonClicked: name, active: false });
    (name === 'INCLUDES') && this.setState({ inputVisibility: 'visible' });
    let currentOp = Array.from(this.state.currentOperation);
    let len = currentOp.length;
    switch (this.typeFinder(name)) {
      case 'operation-not':
        if (len === 0) {
          this.setState({ currentOperation: ['not'] });
        } else if (currentOp[len - 1] === 'operator') {
          this.setState({ currentOperation: currentOp.concat('not') });
        }

        break;
      case 'operation':
        if (currentOp[len - 1] === 'submit') {
          this.setState({ currentOperation: currentOp.concat(name) });
        }

        break;
      case 'submit':
        this.setState({ inputVisibility: 'hidden', active: true, });
        if (currentOp[len - 1] === 'element') {
          this.setState({ currentOperation: currentOp.concat('submit') });
        }

        break;
      case 'element':
        currentOp && this.setState({ currentOperation: currentOp.concat(name) });
        break;
      case 'cancel':
        this.setState({ inputVisibility: 'hidden', active: true, });
        break;
    }
  };

  render() {
    let propertiesObj = {
      fromButton: this.fromButton,//a handler is added to buttons in order to pass data
      //from DumbButton chid to the App parent
      active: this.state.active,//in element buttons, true greyed out
      keywordButtonClicked: this.state.keywordButtonClicked,//what element button is clicked
    };
    let ButtonWithHandler = ComponentEnhancer(DumbButton, propertiesObj);
    return (
      <div className="App">
        <Header title='Data display - Search and sort'/>
        <Keyboard typeContent='Boolean operators'>
          <ButtonWithHandler name='AND'/>
          <ButtonWithHandler name='OR'/>
          <ButtonWithHandler name='NOT'/>
        </Keyboard>
        <Keyboard typeContent='Search keyword'>
          <ButtonGroup>
            <ButtonWithHandler name='INCLUDES' />
            <ButtonWithHandler name='STARTS WITH' />
            <ButtonWithHandler name='ENDS WITH' />
          </ButtonGroup>
          <input type='text' onChange={this.textHandler} placeholder='Type keyword'/>
          <div className={this.state.inputVisibility}>in position</div>
          <input type='text'  className={`positionInput ${this.state.inputVisibility}`}/>
          <ButtonWithHandler name='SUBMIT' visibility={this.state.inputVisibility}/>
          <ButtonWithHandler name='CANCEL'/>

        </Keyboard>
        <ConditionButtonFormatter />
        <Sorter/>
        <DataDisplay dataLoad={this.state.dataLoad} />
      </div>
    );
  }
}

export default App;
