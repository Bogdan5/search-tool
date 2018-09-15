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
      keyword: '',
      inputVisibility: 'hidden',
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
        this.setState({ inputVisibility: 'hidden' });
        if (currentOp[len - 1] === 'element') {
          this.setState({ currentOperation: currentOp.concat('submit') });
        }

        break;
      case 'element':
        currentOp && this.setState({ currentOperation: currentOp.concat(name) });
    }
  };

  render() {
    //a handler is added to buttons in order to pass data from DumbButton chid to
    //the App parent
    let ButtonWithHandler = ComponentEnhancer(DumbButton, this.fromButton, 'fromButton');
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
        </Keyboard>
        <ConditionButtonFormatter />
        <Sorter/>
        <DataDisplay dataLoad={this.state.dataLoad} />
      </div>
    );
  }
}

export default App;
