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
    };
  }

  typeFinder(buttonName) {
    if (['AND', 'OR'].includes(buttonName)) {
      return 'operator';
    } else if (['INCLUDES', 'STARTS WITH', 'ENDS WITH'].includes(buttonName)) {
      return 'element';
    } else if (buttonName === 'NOT') {
      return 'operator-not';
    } else if (buttonName === 'SUBMIT') {
      return 'submit';
    }
  }

  //function that passes data from DumbButton
  fromButton(name) {
    let currentOp = Array.from(this.state.currentOperation);
    let len = currentOp.length;
    switch (this.typeFinder(name)) {
      case 'operation-not':
        if (len === 0) {
          this.setState({ currentOperation: [true] });
        } else if (currentOp[len - 1] === 'operator') {
          this.setState({ currentOperation: currentOp.push[true] });
        }

        break;
      case 'operation':
      case 'submit':
      case 'element':

    }
  }

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
            <ButtonWithHandler name='INCLUDES' type='element' />
            <ButtonWithHandler name='STARTS WITH' type='element' />
            <ButtonWithHandler name='ENDS WITH' type='element' />
          </ButtonGroup>
          <input type='text'/>
          <div>in position</div>
          <input type='text' className='positionInput'/>
          <ButtonWithHandler name='SUBMIT'/>
        </Keyboard>
        <ConditionButtonFormatter />
        <Sorter/>
        <DataDisplay dataLoad={this.state.dataLoad} />
      </div>
    );
  }
}

export default App;
